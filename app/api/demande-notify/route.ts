import { NextResponse } from "next/server";
import {
  isEmailConfigured,
  sendEmail,
  notifyAdminTemplate,
  clientConfirmationTemplate,
} from "@/lib/email";

/**
 * POST /api/demande-notify
 * Body: { name, email, phone, serviceLabel, message, date?, time? }
 *
 * Appelé par le formulaire /demande après insertion réussie dans Supabase.
 * Envoie 2 emails :
 *   1. À l'admin (notification d'une nouvelle demande)
 *   2. Au visiteur (accusé de réception)
 *
 * Silencieux si l'email SMTP n'est pas configuré (200 OK avec note).
 */
export async function POST(req: Request) {
  if (!isEmailConfigured()) {
    return NextResponse.json(
      { ok: true, note: "Email not configured, skipped" },
      { status: 200 }
    );
  }

  let body: {
    name: string;
    email: string;
    phone: string;
    serviceLabel: string;
    message: string;
    date?: string;
    time?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email || !body.name) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER!;

  const adminTpl = notifyAdminTemplate(body);
  const clientTpl = clientConfirmationTemplate({
    name: body.name,
    serviceLabel: body.serviceLabel,
  });

  const [adminRes, clientRes] = await Promise.all([
    sendEmail({
      to: adminEmail,
      subject: adminTpl.subject,
      html: adminTpl.html,
      replyTo: body.email,
    }),
    sendEmail({
      to: body.email,
      subject: clientTpl.subject,
      html: clientTpl.html,
    }),
  ]);

  return NextResponse.json({
    ok: adminRes.ok && clientRes.ok,
    admin: adminRes,
    client: clientRes,
  });
}
