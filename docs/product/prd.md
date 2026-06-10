# Product requirements (reverse-engineered)

Reconstructed from the codebase on 2026-06-10 and confirmed with the product owner where the code is silent. Every claim is **observed** (with a source) or **`[inferred]`**. Open questions are never assumptions.

## Problem & opportunity

Foreigners in France face complex, high-stakes administrative procedures (asylum, residence permits, naturalisation, family reunification, regularisation, housing, study, employment paperwork). DémarchesCivique offers a private, independent **accompaniment** service — not a law firm — to help them understand, organise, and prepare solid, compliant files. _Observed:_ service catalogue in `app/services/[slug]/data.ts`, copy in `app/components/Hero.tsx`, `Footer.tsx`, `TrustFactors.tsx`.

## Goals

- **Primary: generate qualified requests / appointments** ("demandes" and booked slots) from visitors. _Confirmed by product owner._ _Observed mechanism:_ `app/demande/DemandeForm.tsx` → `demandes` table + `app/components/BookingCalendar.tsx`.
- Present the service catalogue clearly and build trust (transparency about what the service does and does not do). _Observed:_ `docs`-style transparency blocks in `app/services/[slug]/page.tsx`, `data.ts` (`transparenceText`).
- Provide a client area to manage a file after contact: upload documents, e-sign, and pay. _Observed:_ `app/compte/`, `lib/client-data.ts`, `app/api/stripe/*`.
- Give the admin/manager one place to triage requests and follow files. _Observed:_ `app/dashboard/`.

## Non-goals (confirmed by product owner)

- **Not a law firm / no legal advice** — no legal counsel, no representation before administrations, no writing or altering the client's documents. _Observed:_ `ceQueNousNeFaisonsPas` arrays in `data.ts`, `app/conditions-utilisation/page.tsx`, `app/a-propos/page.tsx`.
- **No guarantee of outcome** — never guarantees a permit, visa, status, or nationality. _Observed:_ same sources.
- **No market outside France** — France only (Canada was removed 2026-06-10). _Observed:_ `app/services/[slug]/data.ts`, `CoverageSection.tsx`.
- **No AI/automated file generation** — accompaniment stays human; the client remains the author of their file.

## Users & jobs

- **Foreigners in France** _(primary, confirmed)_ — "Help me understand and prepare my administrative file correctly so I don't get rejected." Sub-segments map to the service catalogue (asylum, séjour, naturalisation, regroupement, régularisation, logement, étudiants). _Observed:_ `pourQui` arrays in `data.ts`.
- **The admin / manager** _(primary, confirmed)_ — "Show me incoming requests and let me follow each file (appointments, documents, payments)." _Observed:_ `app/dashboard/page.tsx`.
- **Job seekers** _(secondary, `[inferred]`)_ — CV & cover-letter help. Present as a service but not selected as a primary audience by the owner. _Observed:_ `cv` entry in `data.ts`; _**open question** below._

## Current scope (shipped capabilities, ranked by centrality)

1. **Request / appointment capture** — `/demande` form and homepage booking calendar write to `demandes`; email notifications to admin + client. _Observed:_ `DemandeForm.tsx`, `app/api/demande-notify/route.ts`.
2. **Service catalogue** — `/services` index and `/services/[slug]` detail pages (who it's for, what we do, documents, steps, transparency). _Observed:_ `app/services/`.
3. **Marketing landing** — hero, process, trust factors, coverage, app showcase. _Observed:_ `app/page.tsx`.
4. **Client area** — sign up / sign in, upload documents (private Storage), e-sign, see own requests & payments. _Observed:_ `app/compte/`, `lib/client-data.ts`, migration `0004`.
5. **Admin dashboard** — triage requests (status), view documents, messages, payments. _Observed:_ `app/dashboard/`.
6. **Payments** — Stripe Checkout + webhook updates `payments` and emails a receipt. _Observed:_ `app/api/stripe/*`, migration `0004`.
7. **CV & cover-letter service** — informational service page routing to a request. _Observed:_ `data.ts` (`cv`).

## Constraints

- France-only scope; French-language product. _Observed:_ copy + `html lang="fr"`.
- Must work even when backend integrations (Supabase/Stripe/email) are unconfigured (graceful no-op). _Observed:_ `middleware.ts`, `lib/stripe.ts`, `lib/email.ts`.
- Per-user data isolation enforced by Supabase RLS. _Observed:_ `supabase/migrations/`.
- Compliance posture: RGPD references and transparency commitments are part of the product promise. _Observed:_ `TrustFactors.tsx`, `conditions-utilisation`.

## Success metrics (confirmed by product owner)

- **Number of requests / appointments** submitted.
- **Conversion rate** (visitors → requests, requests → paying clients).
- **Client satisfaction** (reviews, referrals, retention).
- _Note:_ no analytics/instrumentation is wired in the code yet. `[inferred]` measurement gap — see open questions.

## Open questions

1. Is **CV & cover-letter** a real commercial offer to promote, or a secondary add-on? (Owner did not rank job-seekers as a primary audience.)
2. How are the success metrics **measured today** — is there analytics, or is it manual? No instrumentation exists in the codebase.
3. Is the **homepage booking calendar** a committed booking or just a preferred-slot capture? (It writes a `demandes` row with optional date/time.)
4. What is the intended **pricing model** behind Stripe payments (per service? per consultation?) — amounts are passed in dynamically, not defined in the repo.

## Decision log

- 2026-06-10 — PRD reverse-engineered from codebase; goals, non-goals, and metrics confirmed by product owner. Pending product-owner review of open questions.
