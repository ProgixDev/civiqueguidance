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
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase n'est pas configuré." };
  }
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        // Sans `emailRedirectTo`, Supabase construit le lien de confirmation à
        // partir du « Site URL » du tableau de bord — resté sur localhost, d'où
        // des e-mails renvoyant vers une adresse injoignable.
        //
        // `window.location.origin` est l'origine réellement servie au visiteur :
        // le lien revient donc toujours sur le bon domaine, sans dépendre d'un
        // réglage externe ni d'une variable d'environnement.
        emailRedirectTo: `${window.location.origin}/compte/connexion`,
        data: {
          full_name: input.fullName,
          phone: input.phone,
        },
      },
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
