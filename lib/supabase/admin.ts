import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase avec la clé service_role (accès admin, bypass RLS).
 * Ne JAMAIS importer ce module dans un Client Component.
 */

export function isSupabaseAdminConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY manquante. Ajoute-la dans .env.local (et dans Vercel Environment Variables)."
    );
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
