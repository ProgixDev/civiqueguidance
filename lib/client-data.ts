import { createClient, isSupabaseConfigured } from "./supabase/browser";
import type { Demande, Statut } from "./demandes";

type DemandeRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  service_label: string;
  message: string | null;
  date: string | null;
  time: string | null;
  statut: Statut;
};

function rowToDemande(r: DemandeRow): Demande {
  return {
    id: r.id,
    createdAt: r.created_at,
    name: r.name,
    email: r.email,
    phone: r.phone,
    service: r.service,
    serviceLabel: r.service_label,
    message: r.message ?? "",
    date: r.date ?? undefined,
    time: r.time ?? undefined,
    statut: r.statut,
  };
}

/** Charge les demandes du client connecté. */
export async function loadMyDemandes(): Promise<Demande[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("demandes")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[client-data] loadMyDemandes:", error.message);
      return [];
    }
    return (data ?? []).map((r) => rowToDemande(r as DemandeRow));
  } catch (e) {
    console.error("[client-data] loadMyDemandes exception:", e);
    return [];
  }
}

export type ClientDocument = {
  id: string;
  createdAt: string;
  filename: string;
  storagePath: string;
  sizeBytes: number;
  mimeType: string;
};

export async function loadMyDocuments(): Promise<ClientDocument[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("client_documents")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[client-data] loadMyDocuments:", error.message);
      return [];
    }
    return (data ?? []).map((d) => ({
      id: d.id,
      createdAt: d.created_at,
      filename: d.filename,
      storagePath: d.storage_path,
      sizeBytes: d.size_bytes ?? 0,
      mimeType: d.mime_type ?? "",
    }));
  } catch (e) {
    console.error("[client-data] loadMyDocuments exception:", e);
    return [];
  }
}

/**
 * Upload un fichier dans Supabase Storage + crée l'enregistrement DB.
 * Le fichier est stocké sous `{user_id}/{timestamp}_{filename}` dans le bucket `client-documents`.
 */
export async function uploadDocument(
  file: File
): Promise<{ ok: true; doc: ClientDocument } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase n'est pas configuré." };
  }
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false, error: "Non connecté." };

    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${user.id}/${Date.now()}_${safeName}`;

    const { error: upErr } = await supabase.storage
      .from("client-documents")
      .upload(path, file, { upsert: false });
    if (upErr) return { ok: false, error: upErr.message };

    const { data, error: dbErr } = await supabase
      .from("client_documents")
      .insert({
        client_id: user.id,
        filename: file.name,
        storage_path: path,
        size_bytes: file.size,
        mime_type: file.type,
      })
      .select("*")
      .single();
    if (dbErr) return { ok: false, error: dbErr.message };

    return {
      ok: true,
      doc: {
        id: data.id,
        createdAt: data.created_at,
        filename: data.filename,
        storagePath: data.storage_path,
        sizeBytes: data.size_bytes,
        mimeType: data.mime_type,
      },
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erreur inconnue.",
    };
  }
}

export async function deleteDocument(doc: ClientDocument): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = createClient();
    await supabase.storage.from("client-documents").remove([doc.storagePath]);
    const { error } = await supabase
      .from("client_documents")
      .delete()
      .eq("id", doc.id);
    return !error;
  } catch {
    return false;
  }
}

/** Renvoie une URL signée temporaire (1h) pour télécharger le document. */
export async function getDocumentDownloadUrl(
  storagePath: string
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("client-documents")
      .createSignedUrl(storagePath, 60 * 60);
    if (error || !data) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
}

export type ClientSignature = {
  id: string;
  createdAt: string;
  signatureData: string; // data:image/png;base64,...
  documentLabel: string;
};

export async function loadMySignatures(): Promise<ClientSignature[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("signatures")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[client-data] loadMySignatures:", error.message);
      return [];
    }
    return (data ?? []).map((s) => ({
      id: s.id,
      createdAt: s.created_at,
      signatureData: s.signature_data,
      documentLabel: s.document_label ?? "",
    }));
  } catch (e) {
    console.error("[client-data] loadMySignatures exception:", e);
    return [];
  }
}

export async function saveSignature(
  signatureDataUrl: string,
  documentLabel: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;
    const { error } = await supabase.from("signatures").insert({
      client_id: user.id,
      signature_data: signatureDataUrl,
      document_label: documentLabel,
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent : "",
    });
    return !error;
  } catch {
    return false;
  }
}
