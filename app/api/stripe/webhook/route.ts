import { NextResponse } from "next/server";
import { createClient as createSupabase } from "@supabase/supabase-js";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { isEmailConfigured, sendEmail, receiptTemplate } from "@/lib/email";

/**
 * POST /api/stripe/webhook
 *
 * Endpoint webhook Stripe : reçoit les événements de paiement (checkout.session.completed, etc.)
 * 1. Valide la signature Stripe
 * 2. Met à jour la table `payments` côté Supabase (via service_role, bypass RLS)
 * 3. Envoie le reçu par email au client
 *
 * À configurer côté Stripe Dashboard :
 *   - Webhooks → Add endpoint
 *   - URL : https://demarchescivique.vercel.app/api/stripe/webhook
 *   - Events : checkout.session.completed, checkout.session.expired
 *   - Récupère le signing secret (whsec_...) et mets-le dans STRIPE_WEBHOOK_SECRET
 */

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, error: "Stripe non configuré" }, { status: 500 });
  }

  const stripe = getStripe();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { ok: false, error: "Signature ou STRIPE_WEBHOOK_SECRET manquant" },
      { status: 400 }
    );
  }

  // Le body brut est nécessaire pour vérifier la signature
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: `Signature invalide: ${e instanceof Error ? e.message : "?"}` },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    // On ne traite que les paiements complétés pour l'instant
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object as {
    id: string;
    payment_intent: string | null;
    amount_total: number | null;
    currency: string | null;
    customer_email: string | null;
    customer_details?: { name?: string | null } | null;
    metadata?: { demande_id?: string; client_id?: string } | null;
    payment_status: string;
  };

  // Connexion Supabase en service_role pour bypasser RLS sur la table payments
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    const sb = createSupabase(supabaseUrl, serviceKey);
    await sb.from("payments").insert({
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent ?? null,
      amount_cents: session.amount_total ?? 0,
      currency: session.currency ?? "eur",
      status: session.payment_status === "paid" ? "paid" : "pending",
      demande_id: session.metadata?.demande_id || null,
      client_id: session.metadata?.client_id || null,
      receipt_sent_at: new Date().toISOString(),
    });
  } else {
    console.warn(
      "[stripe/webhook] SUPABASE_SERVICE_ROLE_KEY manquante — paiement non enregistré en DB"
    );
  }

  // Envoie le reçu par email si Gmail est configuré
  if (isEmailConfigured() && session.customer_email) {
    const tpl = receiptTemplate({
      customerName: session.customer_details?.name || "client",
      amountCents: session.amount_total ?? 0,
      currency: session.currency ?? "eur",
      description: "Prestation d'accompagnement administratif",
      paymentDate: new Date(),
    });
    await sendEmail({
      to: session.customer_email,
      subject: tpl.subject,
      html: tpl.html,
    });
  }

  return NextResponse.json({ ok: true });
}
