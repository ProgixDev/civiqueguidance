import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/stripe/checkout
 * Body: { amountCents: number, currency?: string, description: string, customerEmail: string, demandeId?: string }
 * Returns: { url: string }
 *
 * Crée une session Stripe Checkout et renvoie l'URL où rediriger le client.
 */
export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Stripe non configuré. Ajoute STRIPE_SECRET_KEY dans .env.local et redémarre.",
      },
      { status: 500 }
    );
  }

  let body: {
    amountCents: number;
    currency?: string;
    description: string;
    customerEmail: string;
    demandeId?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.amountCents || body.amountCents < 50 || !body.customerEmail) {
    return NextResponse.json(
      { ok: false, error: "amountCents (≥ 50) et customerEmail requis" },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Rattache le paiement au client connecté (s'il y en a un) pour qu'il le
  // retrouve dans son espace. Un visiteur anonyme peut payer sans compte.
  let clientId = "";
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    clientId = user?.id ?? "";
  } catch {
    // Supabase non configuré ou pas de session : paiement anonyme autorisé.
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: body.currency ?? "eur",
            product_data: {
              name: body.description,
            },
            unit_amount: body.amountCents,
          },
          quantity: 1,
        },
      ],
      customer_email: body.customerEmail,
      metadata: {
        demande_id: body.demandeId ?? "",
        client_id: clientId,
      },
      // Client connecté → espace client ; visiteur anonyme → page publique.
      success_url: clientId
        ? `${siteUrl}/compte?payment=success`
        : `${siteUrl}/merci?payment=success`,
      cancel_url: clientId
        ? `${siteUrl}/compte?payment=cancel`
        : `${siteUrl}/merci?payment=cancel`,
    });

    return NextResponse.json({ ok: true, url: session.url, id: session.id });
  } catch (e) {
    console.error("[stripe/checkout]", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur Stripe" },
      { status: 500 }
    );
  }
}
