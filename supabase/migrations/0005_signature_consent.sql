-- ============================================================================
-- Signature électronique « simple » (eIDAS / art. 1367 Code civil)
-- Ajoute le consentement explicite et les éléments de preuve à la table
-- signatures existante. À exécuter dans le SQL Editor Supabase.
-- ============================================================================

alter table public.signatures
    add column if not exists consent_contract boolean not null default false,
    add column if not exists consent_cgv boolean not null default false,
    add column if not exists consent_privacy boolean not null default false,
    add column if not exists consent_withdrawal boolean not null default false,
    add column if not exists contract_ref text default '',
    add column if not exists contract_version text default '',
    add column if not exists signer_name text default '',
    add column if not exists signer_email text default '';

-- Les colonnes created_at (horodatage), ip_address et user_agent existent déjà
-- (migration 0004) et servent d'éléments de preuve.
--
-- RLS inchangée : le client lit/insère ses propres signatures
-- (auth.uid() = client_id). L'insertion réelle passe par /api/signature côté
-- serveur, qui renseigne l'IP réelle de la requête.
