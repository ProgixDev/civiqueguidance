# Debt map

Known landmines, fragile areas, and missing coverage. **Append-only:** future sessions add findings here (dated) instead of fixing them in passing. Each entry: what, where, why it matters, what to do.

## Testing & gates

- **No test runner / no tests** — there is no `jest`/`vitest`/Playwright setup and no test script in `package.json`. New logic cannot get automated tests yet. _Do:_ verify via `npx tsc --noEmit` + `npm run build` + manual browser checks; propose adding a runner as its own change. (2026-06-10)
- **No `typecheck` script** — type errors only surface via `npx tsc --noEmit` or `next build`. _Do:_ run one of those before claiming green. (2026-06-10)

## Security & privacy

- **Real PII in seed migration** — `supabase/migrations/0001_init.sql` inserts real names, emails, and phone numbers as demo data. This is committed to git. _Do:_ never replicate; treat as sensitive; consider scrubbing in a dedicated, reviewed change. (2026-06-10)
- **Supabase project ref in comments** — migration headers reference a specific Supabase project dashboard URL. Low risk but avoid spreading. (2026-06-10)
- **Silent degradation** — Stripe, email, and Supabase paths no-op (often returning `ok: true`) when env vars are missing. _Do:_ don't read a skipped operation as success; check responses and env in the target environment. (2026-06-10)

## Architecture / maintainability

- **Logic inside page components** — `app/dashboard/page.tsx`, `app/compte/page.tsx`, and `app/demande/DemandeForm.tsx` mix data-fetching, business rules, and UI in large client components. _Do:_ extract to `lib`/hooks only when a task is explicitly about them; don't restructure as a side effect. (2026-06-10)
- **Two component homes** — `app/components/` and `components/ui/`. _Do:_ check both before adding a component; prefer the matching style. (2026-06-10)
- **Possibly-unused UI primitives** — `components/ui/aurora-background.tsx` and `animated-underline-text-one.tsx` may be unused; confirm before relying on or deleting. (2026-06-10) `[inferred]`
- **No input-validation library** — API routes narrow JSON by hand. Acceptable today, but easy to miss a field. _Do:_ be thorough at boundaries. (2026-06-10)

## Docs

- **README is stale** — still the create-next-app boilerplate; does not describe this project. _Do:_ trust `docs/` over README; update README in a dedicated change. (2026-06-10)
