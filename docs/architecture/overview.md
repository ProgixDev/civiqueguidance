# Architecture overview

The system as it actually is today. Honest, not aspirational.

## Rendering & data-flow model

- **Framework:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript 5 (strict), Tailwind CSS 4.
- **Rendering:** Mostly **client components**. Public marketing pages render statically; interactive pages (`/demande`, `/compte`, `/dashboard`) are `"use client"` and fetch data in `useEffect` via the `lib/*-data.ts` helpers. `app/services/[slug]` is statically generated from a local data file (`generateStaticParams`).
- **Data flow:** Browser → `lib/*-data.ts` → Supabase client (`lib/supabase/browser.ts`) → Postgres/Storage, with Row Level Security enforcing per-user access. Server-side concerns (Stripe, email, webhook) run in API route handlers under `app/api/`.
- **Auth:** `middleware.ts` builds a Supabase SSR client, reads the session, and guards `/dashboard` (admin) and `/compte` (client). It fails open (site keeps working) when Supabase env vars are missing.

## Directory layout (role of each top-level folder)

| Path | Role |
| --- | --- |
| `app/` | App Router: pages, layouts, and API route handlers |
| `app/components/` | Shared presentational React components (PascalCase) |
| `app/api/` | Server route handlers: `demande-notify`, `stripe/checkout`, `stripe/webhook` |
| `app/services/[slug]/` | Dynamic service detail pages, content from `data.ts` |
| `components/ui/` | shadcn-style UI primitives (separate from `app/components/`) |
| `lib/` | Business logic & data access: demandes, admin/client data + auth, email, stripe, utils |
| `lib/supabase/` | Browser and server Supabase client factories |
| `middleware.ts` | Route protection / auth redirects |
| `supabase/migrations/` | SQL schema (tables, RLS policies, Storage, triggers) |
| `supabase/email-templates/` | Transactional email HTML |
| `public/` | Static assets (images, logo) |

## Pages (routes)

- Public: `/`, `/services`, `/services/[slug]`, `/demande`, `/a-propos`, `/conditions-utilisation`
- Client area (auth): `/compte`, `/compte/connexion`, `/compte/inscription`
- Admin (auth): `/admin/login`, `/dashboard`
- API: `POST /api/demande-notify`, `POST /api/stripe/checkout`, `POST /api/stripe/webhook`

## Data model (Supabase Postgres, RLS on every table)

- **`demandes`** — public-submitted requests/appointments (name, email, phone, service, service_label, message, optional date/time, `statut` ∈ {En attente, Confirmé, Annulé}, optional `client_id`). Anyone may INSERT; only authenticated users may read/update/delete.
- **`client_profiles`** — extended client info (full_name, phone). Auto-created by a trigger on sign-up. Owner-only RLS.
- **`client_documents`** — metadata for files uploaded to Storage (`client-documents` bucket, per-user folders). Owner-only RLS.
- **`signatures`** — click-to-sign e-signatures (base64 PNG, IP, user agent). Owner-only RLS.
- **`payments`** — Stripe transactions (amount, currency, status, receipt). Read-own for clients; writes go through the Stripe webhook using the service role.

## External services

- **Supabase** — auth, Postgres, Storage. Public env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Server/webhook uses the service role.
- **Stripe** — Checkout sessions (`/api/stripe/checkout`) and webhook (`/api/stripe/webhook`). Env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`.
- **Gmail SMTP via nodemailer** — transactional email (`lib/email.ts`). Env: `GMAIL_USER`, plus `ADMIN_NOTIFICATION_EMAIL`.
- **Remote images** — `images.unsplash.com`, `lh3.googleusercontent.com` (allowed in `next.config.ts`).
- **Fonts/icons** — Marianne (gouvfr CDN) and Material Symbols, preloaded in `app/layout.tsx`.

## Entry points

- `app/layout.tsx` — root layout, fonts, `SiteBackground`, `CookieBanner`.
- `app/page.tsx` — landing page composition (Hero → Services → Process → TrustFactors → CTA → Coverage → AppShowcase → BookingCalendar → Footer).
- `middleware.ts` — first thing that runs on protected routes.

## Known deviations from our target architecture (legacy patterns — factual, not "wrong")

- Business logic and data-fetching live **inside page client components** (e.g. `app/dashboard/page.tsx`, `app/compte/page.tsx`, `app/demande/DemandeForm.tsx`) rather than in hooks/services.
- **Two component locations** (`app/components/` and `components/ui/`).
- **No validation library** (e.g. Zod) at trust boundaries; request bodies are narrowed with hand-written checks in API routes.
- **No tests and no test runner** configured.
- **No `typecheck` npm script** — type-checking is done via `npx tsc --noEmit` or as part of `next build`.
- **Real PII committed** as seed data in `supabase/migrations/0001_init.sql`.
- **README** is the default create-next-app boilerplate and does not describe this project.
