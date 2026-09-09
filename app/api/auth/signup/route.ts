import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import { isEmailConfigured, sendEmail, accountConfirmationTemplate } from "@/lib/email";

/**
 * POST /api/auth/signup
 * Body: { email, password, fullName, phone }
 *
 * Crée le compte via l'API admin Supabase (auth.admin.generateLink), qui ne
 * déclenche pas l'email de confirmation intégré de Supabase — le lien renvoyé
 * est envoyé nous-mêmes via Zoho (support@demarchesciviques.fr), pour que
 * l'email de vérification parte de notre propre domaine plutôt que de
 * l'expéditeur générique Supabase.
 */
export async function POST(req: Request) {
  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase admin non configuré." },
      { status: 500 }
    );
  }

  let body: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email || !body.password || !body.fullName) {
    return NextResponse.json(
      { ok: false, error: "Champs requis manquants." },
      { status: 400 }
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.admin.generateLink({
    type: "signup",
    email: body.email,
    password: body.password,
    options: {
      data: { full_name: body.fullName, phone: body.phone },
      redirectTo: `${siteUrl}/compte/connexion`,
    },
  });

  if (error || !data?.properties?.action_link) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Impossible de créer le compte." },
      { status: 400 }
    );
  }

  if (isEmailConfigured()) {
    const tpl = accountConfirmationTemplate({
      name: body.fullName,
      confirmLink: data.properties.action_link,
    });
    const res = await sendEmail({ to: body.email, subject: tpl.subject, html: tpl.html });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: res.error }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
