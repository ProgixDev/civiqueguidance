# Code style & conventions

Two parts: **(a)** what the codebase does *today* (so you match it when editing legacy modules), and **(b)** what *new* code must do. **Where (a) and (b) conflict, follow (b) in new files; match (a) only when editing inside an existing legacy module.**

## (a) Detected conventions (today)

- **Language/UI:** TypeScript + React function components. Tailwind CSS 4 utility classes inline; design tokens (colors like `french-blue`, `marianne-red`, `ink-black`) and custom utilities (`max-w-content`, `px-page`) defined in `app/globals.css`.
- **Components:** `app/components/` uses PascalCase filenames and default exports. `components/ui/` holds lowercase shadcn-style primitives.
- **Client-first:** interactive pages are `"use client"` and fetch data in `useEffect`; data access is centralised in `lib/*-data.ts` modules.
- **Data access:** `lib/demandes.ts`, `lib/admin-data.ts`, `lib/client-data.ts` expose typed functions and exported `type` aliases (e.g. `Demande`, `Statut`, `ClientDocument`). Supabase clients come from `lib/supabase/browser.ts` / `server.ts`.
- **Content as data:** service pages are driven by `app/services/[slug]/data.ts` (a typed `Record<string, ServiceDetail>`).
- **API routes:** narrow `await req.json()` with hand-written checks; return `NextResponse.json({ ok, ... })`; feature flags via `isStripeConfigured()` / `isEmailConfigured()` that no-op when env is absent.
- **Language:** user-facing copy and many code comments are in **French**. Keep product copy French.
- **Imports:** path alias `@/` for repo root.
- **Commits:** mostly Conventional Commits (`feat:`, `fix:`, `refactor:`), with occasional exceptions.

## (b) Target conventions (new code)

- **Strict TypeScript:** no new `any`, no new `@ts-ignore` (use `@ts-expect-error` with a short reason). Prefer precise types and exported `type` aliases next to the data-access function.
- **Validation at trust boundaries:** validate/narrow all user input, network responses, and Storage reads before use. Hand-written guards are acceptable (matching today's style); a shared validation helper is welcome but don't add a dependency without approval.
- **Separation:** keep components presentational; put data-fetching and business logic in `lib/` functions or hooks. New screens should not bury Supabase/Stripe calls inside JSX.
- **No new module-level singletons for state.** Use local state or props; client/server Supabase factories are the only blessed module-level instances.
- **Accessibility & states:** every new user-facing view ships designed **empty, loading, and error** states; interactive elements are keyboard-accessible and labelled.
- **Reuse first:** check `app/components/`, `components/ui/`, and `lib/` before adding anything. Extend an existing pattern rather than introduce a parallel one.
- **Security:** never bypass or weaken Supabase RLS from the client; privileged writes (e.g. `payments`) go through server routes with the service role only.
- **Commits:** Conventional Commits, present-tense, scoped where useful (`feat(demande): ...`).
