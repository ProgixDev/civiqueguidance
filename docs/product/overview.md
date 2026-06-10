# Product overview

A plain-language tour of what DémarchesCivique does today, for a new teammate. Filled from the codebase.

## In one sentence

A French-language website that helps foreigners in France prepare their administrative procedures, captures their requests/appointments, and gives both the client and the manager a space to follow the file (documents, signatures, payments).

## Main user flows

- **Discover & request help.** A visitor lands on the homepage, browses services, opens a service page (who it's for, what's included, documents needed, steps), then submits the `/demande` form or books a slot on the homepage calendar. This creates a request and emails both the admin and the visitor.
- **Manage my file (client).** After contact, a client signs up / signs in to `/compte`, uploads documents to private storage, e-signs where needed, sees their requests, and can pay online.
- **Run the operation (admin).** The manager signs in at `/admin/login` and uses `/dashboard` to triage requests (set status to Confirmé/Annulé), review documents and messages, and track payments.

## Shipped capabilities (one paragraph each)

- **Service catalogue** — Seven accompaniment areas (asylum, residence permit, naturalisation, family reunification, regularisation, housing, students) plus a CV & cover-letter service. Each has a detail page generated from `app/services/[slug]/data.ts` with a transparency block stating the service is not legal counsel and guarantees no outcome.
- **Request & appointment capture** — `/demande` and the homepage booking calendar write to the `demandes` table and trigger notification emails. This is the core lead-generation mechanism.
- **Client area** — Authenticated space to upload documents (private per-user Storage folders), capture e-signatures, view one's own requests, and complete payments.
- **Admin dashboard** — Authenticated operations console with tabs for appointments, prestations, documents, messages, and payments.
- **Payments** — Stripe Checkout creates a payment session; a webhook records the result in `payments` and emails a receipt.

## Integrations that power it

- **Supabase** — accounts, database, and private document storage, with Row Level Security isolating each client's data.
- **Stripe** — online card payments and receipts.
- **Gmail SMTP (nodemailer)** — admin notifications, client acknowledgements, and receipts.

See [critical-user-journeys.md](critical-user-journeys.md) for the flows that must never break, and [prd.md](prd.md) for goals, non-goals, and open questions.
