# 0001 — Adopt the AI operating model (without migrating existing code)

- **Status:** Accepted
- **Date:** 2026-06-10

## Context

DémarchesCivique is an in-production Next.js app that predates our skeleton standards (the NEXTJS-SKELETON operating model). The codebase works and serves real users, but it has no operating docs, no product specification, no tests, and several legacy patterns (logic inside page components, real PII in seed migrations, two component homes). We want every future AI session and human to work consistently and safely, without risking a working production app through a large refactor or migration.

## Decision

Adopt the AI operating model as an **additive harness**:

- An operating manual ([AGENTS.md](../../../AGENTS.md)) describing the Ground → Plan → Implement → Verify → Encode loop.
- Architecture, conventions, and a debt map under `docs/`.
- A reverse-engineered product layer (PRD, overview, critical user journeys) under `docs/product/`.
- Workflow-enforcing skills under `.claude/skills/`.

Existing code is **documented, not rewritten**. New code follows the target conventions; legacy patterns are recorded factually as legacy, never silently "corrected".

## Consequences

- New code follows [docs/conventions/code-style.md](../../conventions/code-style.md) section (b); legacy modules keep their existing style until a task is explicitly about them.
- Legacy patterns and risks are tracked in [docs/quality/debt-map.md](../../quality/debt-map.md) (append-only) instead of being fixed opportunistically.
- Future structural choices get a new ADR in this folder.
- No production behaviour, dependency, or config changes result from adopting this model — it is purely additive.
