"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  saveDemande,
  SERVICE_LABELS,
  getServicePriceCents,
} from "@/lib/demandes";

const servicesOptions = [
  { value: "demandeurs-asile", label: "Demandeurs d'asile" },
  { value: "etudiants", label: "Étudiants (France)" },
  { value: "titre-de-sejour", label: "Titre de séjour" },
  { value: "naturalisation", label: "Naturalisation française" },
  { value: "regroupement-familial", label: "Regroupement familial" },
  { value: "regularisation", label: "Régularisation administrative" },
  { value: "logement", label: "Aide au logement" },
  { value: "cv", label: "CV & Lettre de motivation" },
  { value: "dcem", label: "DCEM (enfants mineurs)" },
  { value: "taj", label: "Effacement de TAJ" },
  { value: "autre", label: "Autre démarche" },
];

export default function DemandeForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") ?? "";
  const prefilledDate = searchParams.get("date") ?? "";
  const prefilledTime = searchParams.get("time") ?? "";

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const service = String(fd.get("service") ?? "");
    const email = String(fd.get("email") ?? "");
    const serviceLabel = SERVICE_LABELS[service] ?? service;

    const result = await saveDemande({
      name: String(fd.get("name") ?? ""),
      email,
      phone: String(fd.get("phone") ?? ""),
      service,
      serviceLabel,
      message: String(fd.get("message") ?? ""),
      date: prefilledDate || undefined,
      time: prefilledTime || undefined,
    });

    if (!result) {
      setError(
        "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement."
      );
      setStatus("idle");
      return;
    }

    // Paiement immédiat pour les services à tarif fixe : on enchaîne sur Stripe
    // Checkout. Les services « sur devis » (DCEM, TAJ, autre) affichent juste la
    // confirmation — le conseiller enverra un devis. Si Stripe n'est pas
    // configuré ou échoue, on ne bloque pas : on retombe sur la confirmation.
    const amountCents = getServicePriceCents(service);
    if (amountCents) {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amountCents,
            description: `Accompagnement — ${serviceLabel}`,
            customerEmail: email,
            demandeId: result.id,
          }),
        });
        const data = await res.json();
        if (data.ok && data.url) {
          window.location.assign(data.url); // redirection vers Stripe
          return;
        }
      } catch {
        // silencieux : on affiche la confirmation ci-dessous
      }
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-french-blue/10 flex items-center justify-center mx-auto mb-5">
          <span className="material-symbols-outlined text-french-blue text-[32px]">
            mark_email_read
          </span>
        </div>
        <h3 className="text-2xl font-bold text-ink-black mb-3">
          Demande envoyée
        </h3>
        <p className="text-[15px] text-on-surface-variant max-w-md mx-auto">
          Nous revenons vers vous sous 24h ouvrées avec une proposition
          d&apos;accompagnement adaptée à votre situation.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[14px] font-bold text-french-blue hover:underline"
        >
          ← Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {(prefilledDate || prefilledTime) && (
        <div className="bg-french-blue/5 border border-french-blue/15 rounded-xl p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-french-blue">
            event_available
          </span>
          <div className="flex-1 text-[14px]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-french-blue mb-0.5">
              Créneau pré-sélectionné
            </p>
            <p className="font-semibold text-ink-black">
              {prefilledDate && formatDate(prefilledDate)}
              {prefilledDate && prefilledTime && " · "}
              {prefilledTime && `${prefilledTime}`}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nom complet" required>
          <input
            type="text"
            name="name"
            required
            placeholder="Jean Dupont"
            className="form-input"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            required
            placeholder="jean.dupont@email.com"
            className="form-input"
          />
        </Field>
      </div>

      <Field label="Téléphone" required>
        <input
          type="tel"
          name="phone"
          required
          placeholder="+33 6 12 34 56 78"
          className="form-input"
        />
      </Field>

      <Field label="Service souhaité" required>
        <select
          name="service"
          required
          className="form-input"
          defaultValue={prefilledService}
        >
          <option value="" disabled>
            Sélectionnez un service
          </option>
          {servicesOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Description de votre situation" required>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Décrivez votre besoin, votre situation actuelle, et toute information utile pour comprendre votre dossier…"
          className="form-input resize-y"
        />
      </Field>

      {error && (
        <div className="bg-marianne-red/5 border border-marianne-red/20 text-marianne-red rounded-xl px-4 py-3 text-[13px] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-french-blue hover:bg-[#000066] disabled:opacity-60 text-white py-4 rounded-xl text-[15px] font-bold tracking-wide shadow-md transition-all active:scale-[0.99]"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer la demande"}
      </button>

      <p className="text-[12px] text-on-surface-variant text-center">
        Vos données sont sécurisées et confidentielles, conformes au RGPD.
      </p>

      <style jsx>{`
        .form-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(22, 22, 22, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #161616;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder {
          color: rgba(22, 22, 22, 0.35);
        }
        .form-input:focus {
          border-color: #000091;
          box-shadow: 0 0 0 4px rgba(0, 0, 145, 0.08);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
        {label}
        {required && <span className="text-marianne-red ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
