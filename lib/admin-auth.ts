import { createClient, isSupabaseConfigured } from "./supabase/browser";

/**
 * Auth admin via Supabase Auth (email + password).
 * Pour créer le compte admin la première fois :
 *   1. https://supabase.com/dashboard/project/kfsublmmlcxqnaxoojpy/auth/users
 *   2. "Add user" → "Create new user"
 *   3. Renseigne l'email + mot de passe, coche "Auto Confirm User"
 */

export async function login(
  email: string,
  password: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error:
        "Supabase n'est pas configuré. Ajoute NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY dans .env.local (et redémarre le dev server), ou dans les Environment Variables de Vercel.",
    };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { ok: false, error: error.message };
    // L'autorisation (qui a le droit d'entrer dans /dashboard) est décidée par
    // `middleware.ts`, côté serveur. Ce fichier s'exécute dans le navigateur :
    // toute règle posée ici serait lisible — et contournable — par le visiteur.
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erreur inconnue.",
    };
  }
}

export async function logout(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // ignore
  }
}

export async function getCurrentUser() {
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
