import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  isEmailConfigured,
  sendEmail,
  signedContractTemplate,
} from "@/lib/email";

export const runtime = "nodejs";

/**
 * POST /api/signature
 * Enregistre une signature électronique « simple » (eIDAS / art. 1367) :
 * consentement explicite + signature dessinée + horodatage + IP réelle +
 * user-agent, puis envoie la copie signée par email au client (copie admin).
 *
 * Body: {
 *   signatureData: string (data:image/png;base64,...),
 *   contractRef: string, contractVersion?: string, signerName: string,
 *   demandeId?: string,
 *   consents: { contract, cgv, privacy, withdrawal }
 * }
 */
export async function POST(req: Request) {
  let body: {
    signatureData?: string;
    contractRef?: string;
    contractVersion?: string;
    signerName?: string;
    demandeId?: string;
    consents?: {
      contract?: boolean;
      cgv?: boolean;
      privacy?: boolean;
      withdrawal?: boolean;
    };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const consents = {
    contract: !!body.consents?.contract,
    cgv: !!body.consents?.cgv,
    privacy: !!body.consents?.privacy,
    withdrawal: !!body.consents?.withdrawal,
  };

  // Tous les consentements sont requis + une signature non vide.
  if (
    !consents.contract ||
    !consents.cgv ||
    !consents.privacy ||
    !consents.withdrawal ||
    !body.signatureData?.startsWith("data:image/")
  ) {
    return NextResponse.json(
      { ok: false, error: "Consentements et signature requis." },
      { status: 400 }
    );
  }

  // Authentification obligatoire : la signature est rattachée au compte client.
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Service indisponible." },
      { status: 500 }
    );
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Vous devez être connecté pour signer." },
      { status: 401 }
    );
  }

  // Éléments de preuve : IP réelle (proxy Vercel) + user-agent.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const userAgent = req.headers.get("user-agent") || "";

  const contractRef = body.contractRef || "Mandat d'accompagnement administratif";
  const signerName = body.signerName || user.email || "Client";

  const { error } = await supabase.from("signatures").insert({
    client_id: user.id,
    demande_id: body.demandeId || null,
    signature_data: body.signatureData,
    document_label: contractRef,
    contract_ref: contractRef,
    contract_version: body.contractVersion || "",
    signer_name: signerName,
    signer_email: user.email ?? "",
    ip_address: ip,
    user_agent: userAgent,
    consent_contract: consents.contract,
    consent_cgv: consents.cgv,
    consent_privacy: consents.privacy,
    consent_withdrawal: consents.withdrawal,
  });

  if (error) {
    console.error("[signature] insert:", error.message);
    return NextResponse.json(
      { ok: false, error: "Enregistrement impossible." },
      { status: 500 }
    );
  }

  // Copie signée par email (best-effort : n'échoue pas si Gmail non configuré).
  if (isEmailConfigured() && user.email) {
    const base64 = body.signatureData.split(",")[1] ?? "";
    const tpl = signedContractTemplate({
      signerName,
      contractRef,
      signedAt: new Date(),
      ip,
      consents,
    });
    try {
      await sendEmail({
        to: user.email,
        bcc: process.env.GMAIL_USER, // copie à l'administration (2e Partie)
        subject: tpl.subject,
        html: tpl.html,
        attachments: [
          {
            filename: "signature.png",
            content: base64,
            encoding: "base64",
            cid: "signature",
          },
        ],
      });
    } catch (e) {
      console.warn("[signature] email copie signée échoué:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
