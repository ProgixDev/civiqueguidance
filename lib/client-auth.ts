import { createClient, isSupabaseConfigured } from "./supabase/browser";

/**
 * Auth client (utilisateurs finaux du service).
 * Distincte de l'auth admin : pas de différence côté Supabase mais
 * on traite l'UX et les redirections différemment.
 */

export type SignupInput = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
};

export async function signUp(
  input: SignupInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Passe par l'API serveur (auth.admin.generateLink) plutôt que
  // supabase.auth.signUp() côté client : ça évite l'email de confirmation
  // intégré de Supabase (expéditeur générique) et permet d'envoyer le lien
  // nous-mêmes via Zoho (support@demarchesciviques.fr).
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!data.ok) return { ok: false, error: data.error ?? "Erreur inconnue." };
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erreur inconnue.",
    };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase n'est pas configuré." };
  }
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erreur inconnue.",
    };
  }
}

export async function signOut() {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // ignore
  }
}

export async function getCurrentClient() {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export function translateAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("email not confirmed")) return "Email pas encore confirmé. Vérifie ta boîte de réception.";
  if (m.includes("user already registered")) return "Un compte existe déjà avec cet email.";
  if (m.includes("password should be at least")) return "Mot de passe trop court (minimum 6 caractères).";
  if (m.includes("invalid email")) return "Adresse email invalide.";
  return msg;
}
