import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Pas de Supabase configuré → on laisse passer (le site marche en mode "sans backend")
  if (!url || !key) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    /**
     * Détermine si l'utilisateur connecté est administrateur.
     *
     * Deux sources acceptées :
     *  1. `ADMIN_EMAILS` — liste d'e-mails séparés par des virgules, définie
     *     dans les variables d'environnement Vercel. Variable SERVEUR (pas de
     *     préfixe NEXT_PUBLIC_) : elle n'est jamais envoyée au navigateur.
     *  2. `app_metadata.role === "admin"` — pour les comptes promus côté
     *     Supabase.
     *
     * Le rôle est lu dans `app_metadata` et jamais dans `user_metadata` : ce
     * dernier est modifiable par l'utilisateur via `supabase.auth.updateUser()`,
     * n'importe quel client pourrait donc s'auto-promouvoir.
     *
     * Aucun mot de passe n'apparaît ici : l'authentification reste entièrement
     * assurée par Supabase, on ne fait qu'autoriser un compte déjà authentifié.
     */
    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const isAdmin =
      !!user &&
      (user.app_metadata?.role === "admin" ||
        (!!user.email && adminEmails.includes(user.email.toLowerCase())));

    // Protège /dashboard : réservé aux administrateurs.
    // Le site permet l'inscription libre des clients (/compte/inscription) sur
    // le même projet Supabase : se contenter de « est connecté » donnerait à
    // tout client l'accès au back-office.
    if (path.startsWith("/dashboard")) {
      if (!user) {
        const redirect = request.nextUrl.clone();
        redirect.pathname = "/admin/login";
        return NextResponse.redirect(redirect);
      }
      if (!isAdmin) {
        const redirect = request.nextUrl.clone();
        redirect.pathname = "/compte";
        return NextResponse.redirect(redirect);
      }
    }

    // Protège /compte (client) : si pas connecté → /compte/connexion
    // (sauf les pages connexion + inscription elles-mêmes)
    if (
      path.startsWith("/compte") &&
      !user &&
      !path.startsWith("/compte/connexion") &&
      !path.startsWith("/compte/inscription")
    ) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/compte/connexion";
      return NextResponse.redirect(redirect);
    }

    // Admin déjà connecté + sur /admin/login → /dashboard.
    // On teste `isAdmin` et non `user` : un client connecté serait sinon renvoyé
    // vers /dashboard, qui le renverrait aussitôt ailleurs — boucle de redirection.
    if (path === "/admin/login" && isAdmin) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/dashboard";
      return NextResponse.redirect(redirect);
    }

    // Déjà connecté + sur /compte/connexion ou /compte/inscription → /compte
    if (
      (path === "/compte/connexion" || path === "/compte/inscription") &&
      user
    ) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/compte";
      return NextResponse.redirect(redirect);
    }
  } catch (err) {
    // Sécurité : si Supabase plante (clé invalide, réseau, etc.) on ne casse pas le site
    console.error("[middleware] Supabase auth check failed:", err);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
