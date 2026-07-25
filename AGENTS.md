<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:ai-operating-manual -->
# DémarchesCivique — Operating Manual

Entry point for every AI session and every human working in this repo. Read this first.

## 1. What this repository is

DémarchesCivique is an in-production web app that helps foreigners in France navigate administrative procedures (asylum, residence permits, naturalisation, family reunification, regularisation, housing, students, and CV/cover-letter help). It is a marketing + lead-generation site with a client area and an admin dashboard — **not** a law firm and **not** an AI that fills files for users. Stack: **Next.js 16.2.6 (App Router)**, **React 19.2.4**, **TypeScript 5 (strict)**, **Tailwind CSS 4**, **Supabase** (auth + Postgres + Storage), **Stripe**, **nodemailer** (Gmail SMTP), **framer-motion**. This project predates our skeleton standards: we run it under an AI operating model — **evolution, not migration**. The code stays as it is; only new code follows the target conventions.

## 2. The loop — every task follows this

1. **Ground** — read this file, the relevant doc in the map below, and the neighboring code before writing anything.
2. **Plan** — for anything beyond a trivial fix, state a short plan first (files, steps, legacy zones touched).
3. **Implement** — small steps, keep the build green, reuse existing patterns before inventing new ones.
4. **Verify** — run the real check commands (section 3) and prove the change works. Never claim "done" without evidence. For UI, confirm the touched [critical user journey](docs/product/critical-user-journeys.md).
5. **Encode** — if a mistake could repeat, write the fix into a doc, rule, or (where possible) a test, in the same PR.

## 3. Commands (from `package.json`)

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (Next.js) on http://localhost:3000 |
| `npm run build` | Production build — the strongest correctness gate (type-checks + compiles all routes) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next` core-web-vitals + typescript) |
| `npx tsc --noEmit` | Type-check only (there is **no** `typecheck` script) |

**There is no test script and no test setup.** "Green" = `npm run lint` **and** `npx tsc --noEmit` **and** `npm run build` all pass. Until a test runner exists, verification is type-check + build + manual confirmation in the browser.

## 4. Docs map

| Read this | For a task about |
| --- | --- |
| [docs/architecture/overview.md](docs/architecture/overview.md) | How the system fits together, where things live, data flow |
| [docs/architecture/decisions/](docs/architecture/decisions/) | Why a structural choice was made (ADRs) |
| [docs/conventions/code-style.md](docs/conventions/code-style.md) | How to name, structure, and style new code |
| [docs/quality/debt-map.md](docs/quality/debt-map.md) | Known landmines and fragile areas before you touch them |
| [docs/product/prd.md](docs/product/prd.md) | What the product is for, goals, non-goals |
| [docs/product/overview.md](docs/product/overview.md) | Plain-language tour of the features |
| [docs/product/critical-user-journeys.md](docs/product/critical-user-journeys.md) | Flows that must never break |

## 5. Architecture as it is

- **Routing:** App Router under `app/`. Public pages (`/`, `/services`, `/services/[slug]`, `/demande`, `/a-propos`, and the four legal pages `/mentions-legales`, `/conditions-generales-vente`, `/politique-confidentialite`, `/politique-cookies`), client area (`/compte`, `/compte/connexion`, `/compte/inscription`), admin (`/admin/login`, `/dashboard`), and API routes under `app/api/` (`demande-notify`, `stripe/checkout`, `stripe/webhook`).
- **UI:** Presentational components in `app/components/` (PascalCase). A small `components/ui/` holds shadcn-style primitives.
- **Logic / data access:** lives in `lib/` (`demandes.ts`, `admin-data.ts`, `client-data.ts`, `admin-auth.ts`, `client-auth.ts`, `email.ts`, `stripe.ts`, `utils.ts`) and `lib/supabase/` (browser/server clients).
- **State:** mostly local `useState`/`useEffect` inside client-component pages that call `lib/*-data.ts`. No global store.
- **Auth:** Supabase SSR via `middleware.ts`, which guards `/dashboard` (admin) and `/compte` (client). Degrades gracefully when Supabase env is absent.
- **Data:** Supabase Postgres with full RLS — `demandes`, `client_profiles`, `client_documents`, `signatures`, `payments`, plus a private `client-documents` Storage bucket. Schema lives in `supabase/migrations/`.

## 6. Rules for new code

- New code follows [docs/conventions/code-style.md](docs/conventions/code-style.md) section (b); existing code is left alone unless the task is about it.
- **Inventory before adding** — reuse existing components/lib helpers; extend existing patterns rather than inventing new ones.
- TypeScript: **no new `any`, no new `@ts-ignore`** (use `@ts-expect-error` with a reason) — even though some old code has them.
- New logic gets a test where a runner exists; bug fixes get a regression test first. (No runner exists yet — see [debt-map](docs/quality/debt-map.md); until then, document the manual repro.)
- **Conventional Commits** for all new commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:` …).
- **Never weaken a gate** (lint rule, tsconfig `strict`, build, RLS policy) to make work pass; propose gate changes explicitly and separately.
- Validate at trust boundaries: user input, network responses, and Storage. Keep Supabase RLS as the source of truth for access.
- Boy-scout cleanup is **opt-in**: only refactor adjacent legacy code when explicitly asked.

## 7. Legacy zones — handle with care

- **Page components mix data-fetching + business logic** (`app/dashboard/page.tsx`, `app/compte/page.tsx`, `app/demande/DemandeForm.tsx`). Large client components. Don't restructure them as a side effect — extract to hooks/`lib` only when the task is about them.
- **Seed data with real PII** in `supabase/migrations/0001_init.sql` (real names, emails, phones). Do not copy this pattern; never add real personal data to migrations.
- **Two component homes** (`app/components/` and `components/ui/`) — check both before adding a component.
- **Silent degradation**: Stripe/email/Supabase no-op when env is unset (by design). Don't mistake a silent skip for success — check the response.
- **Stale README** is still the create-next-app boilerplate; trust `docs/` over README.

## 8. When unsure

Stop after **two failed attempts** at the same fix and ask one concrete question instead of forcing a hack. If a doc conflicts with the code, the doc may be stale — flag it and propose the doc fix in the same PR.
<!-- END:ai-operating-manual -->
...


