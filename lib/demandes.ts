import { createClient, isSupabaseConfigured } from "./supabase/browser";

export type Statut = "En attente" | "Confirmé" | "Annulé";

// Forme renvoyée à l'app (camelCase pour rester compatible avec l'UI existante)
export type Demande = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  serviceLabel: string;
  message: string;
  date?: string | null;
  time?: string | null;
  statut: Statut;
};

// Forme côté DB (snake_case)
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

export async function loadDemandes(): Promise<Demande[]> {
  if (!isSupabaseConfigured()) {
    console.warn("[demandes] Supabase non configuré, dashboard vide");
    return [];
  }
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("demandes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[demandes] loadDemandes:", error.message);
      return [];
    }
    return (data ?? []).map((r) => rowToDemande(r as DemandeRow));
  } catch (e) {
    console.error("[demandes] loadDemandes exception:", e);
    return [];
  }
}

export async function saveDemande(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
  serviceLabel: string;
  message: string;
  date?: string;
  time?: string;
}): Promise<Demande | null> {
  if (!isSupabaseConfigured()) {
    console.error("[demandes] Supabase non configuré, impossible d'enregistrer");
    return null;
  }
  const supabase = createClient();

  // Si le client est connecté, on attache la demande à son compte (client_id)
  // pour qu'il la retrouve dans son espace personnel.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // INSERT seul — pas de .select() chaîné car la policy SELECT est réservée
  // aux utilisateurs authentifiés (admin). Un visiteur anon peut insérer mais
  // pas relire la ligne qu'il vient d'insérer.
  const { error } = await supabase.from("demandes").insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    service: input.service,
    service_label: input.serviceLabel,
    message: input.message,
    date: input.date || null,
    time: input.time || null,
    statut: "En attente",
    client_id: user?.id ?? null,
  });

  if (error) {
    console.error("[demandes] saveDemande:", error.message);
    return null;
  }

  // Notification email (best-effort : si Gmail pas configuré, l'API renvoie 200 sans envoyer)
  // Ne bloque pas le retour de la fonction en cas d'erreur d'email.
  fetch("/api/demande-notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone,
      serviceLabel: input.serviceLabel,
      message: input.message,
      date: input.date,
      time: input.time,
    }),
  }).catch((e) => console.warn("[demandes] notify email failed:", e));

  // On retourne un stub puisqu'on n'a pas l'id/created_at retournés
  return {
    id: "pending",
    createdAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    phone: input.phone,
    service: input.service,
    serviceLabel: input.serviceLabel,
    message: input.message,
    date: input.date,
    time: input.time,
    statut: "En attente",
  };
}

export async function updateStatut(id: string, statut: Statut): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("demandes")
    .update({ statut })
    .eq("id", id);
  if (error) console.error("[demandes] updateStatut:", error.message);
}

export async function deleteDemande(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("demandes").delete().eq("id", id);
  if (error) console.error("[demandes] deleteDemande:", error.message);
}

export const SERVICE_LABELS: Record<string, string> = {
  "demandeurs-asile": "Demandeurs d'asile",
  etudiants: "Étudiants (France)",
  "titre-de-sejour": "Titre de séjour",
  naturalisation: "Naturalisation française",
  "regroupement-familial": "Regroupement familial",
  regularisation: "Régularisation administrative",
  logement: "Aide au logement",
  cv: "CV & Lettre de motivation",
  autre: "Autre démarche",
};
