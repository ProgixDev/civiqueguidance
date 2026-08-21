import { NextResponse } from "next/server";
import { createClient as createSupabase } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/admin/documents/delete
 * Body : { id: string }
 *
 * Supprime définitivement un document envoyé par un client : le fichier dans
 * le bucket `client-documents` ET la ligne correspondante dans la table.
 *
 * Pourquoi côté serveur plutôt que depuis le tableau de bord :
 *
 *  1. L'administrateur supprime le document d'un AUTRE utilisateur. Avec la clé
 *     publique et les politiques RLS, l'opération échouerait — silencieusement
 *     de surcroît, Supabase ne renvoyant pas d'erreur quand aucune ligne ne
 *     correspond à la policy. La clé service role contourne RLS.
 *
 *  2. L'autorisation est ainsi vérifiée sur le serveur, avec la même règle que
 *     `middleware.ts` : elle ne peut pas être contournée depuis le navigateur.
 */
export async function POST(req: Request) {
  // ── Authentification : une session valide est requise ────────────────────
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });
  }

  // ── Autorisation : même règle que le middleware ──────────────────────────
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAdmin =
    user.app_metadata?.role === "admin" ||
    (!!user.email && adminEmails.includes(user.email.toLowerCase()));

  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Accès refusé" }, { status: 403 });
  }

  // ── Entrée ───────────────────────────────────────────────────────────────
  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ ok: false, error: "id manquant" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("[admin/documents/delete] SUPABASE_SERVICE_ROLE_KEY manquante");
    return NextResponse.json(
      { ok: false, error: "Suppression indisponible : configuration serveur incomplète." },
      { status: 500 }
    );
  }
  const admin = createSupabase(supabaseUrl, serviceKey);

  // ── Relecture : on a besoin du chemin de stockage avant de supprimer ─────
  const { data: doc, error: readErr } = await admin
    .from("client_documents")
    .select("id, storage_path")
    .eq("id", body.id)
    .maybeSingle();

  if (readErr) {
    console.error("[admin/documents/delete] lecture:", readErr.message);
    return NextResponse.json({ ok: false, error: "Document introuvable" }, { status: 404 });
  }
  if (!doc) {
    // Déjà supprimé : on renvoie un succès, le tableau de bord est simplement
    // en retard sur l'état réel.
    return NextResponse.json({ ok: true, alreadyGone: true });
  }

  // ── Fichier d'abord, ligne ensuite ───────────────────────────────────────
  // Cet ordre est délibéré : si la suppression du fichier échoue, la ligne
  // subsiste et l'administrateur peut réessayer. L'ordre inverse laisserait un
  // fichier orphelin dans le bucket, invisible et impossible à retrouver.
  if (doc.storage_path) {
    const { error: storageErr } = await admin.storage
      .from("client-documents")
      .remove([doc.storage_path]);
    if (storageErr) {
      console.error("[admin/documents/delete] storage:", storageErr.message);
      return NextResponse.json(
        { ok: false, error: "Le fichier n'a pas pu être supprimé." },
        { status: 500 }
      );
    }
  }

  const { error: rowErr } = await admin
    .from("client_documents")
    .delete()
    .eq("id", body.id);

  if (rowErr) {
    console.error("[admin/documents/delete] ligne:", rowErr.message);
    return NextResponse.json(
      { ok: false, error: "Le fichier a été supprimé mais pas son enregistrement." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
