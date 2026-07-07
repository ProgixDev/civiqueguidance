"use client";

import { useState } from "react";
import Link from "next/link";
import SignaturePad from "./SignaturePad";

type Props = {
  signerName: string;
  demandeId?: string;
  serviceLabel?: string;
  /** Appelé après une signature réussie (ex. pour rafraîchir la liste). */
  onSigned: () => void | Promise<void>;
};

// Version du contrat : à incrémenter si le texte du mandat change.
const CONTRACT_VERSION = "v1";

// ── Mandat GÉNÉRIQUE — à personnaliser avec le vrai contrat du client ────────
const MANDAT_SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. Objet",
    body: "Le Client confie à DémarchesCivique (« le Prestataire ») une mission d'accompagnement administratif : information, aide à la constitution et à la vérification de dossiers, préparation aux démarches. Le Prestataire n'est pas un cabinet juridique, ne donne pas de conseils juridiques et ne représente pas le Client devant les administrations.",
  },
  {
    title: "2. Obligations du Prestataire",
    body: "Le Prestataire met en œuvre des moyens raisonnables pour accompagner le Client. Il s'agit d'une obligation de moyens et non de résultat : l'issue des démarches dépend exclusivement des autorités compétentes (OFPRA, CNDA, préfectures, OFII, etc.).",
  },
  {
    title: "3. Obligations du Client",
    body: "Le Client s'engage à fournir des informations exactes et les documents nécessaires. Le Client reste seul auteur et responsable de ses démarches, déclarations et de leur véracité.",
  },
  {
    title: "4. Données personnelles",
    body: "Les données du Client sont traitées conformément au RGPD et à la politique de confidentialité, uniquement pour l'exécution de la présente mission.",
  },
  {
    title: "5. Prix et paiement",
    body: "Le prix correspond à la prestation choisie ou au devis communiqué. Le paiement s'effectue en ligne de manière sécurisée.",
  },
  {
    title: "6. Droit de rétractation",
    body: "Le Client dispose d'un délai légal de rétractation de 14 jours. En demandant un démarrage immédiat de la prestation, le Client renonce expressément à ce droit pour la partie déjà exécutée.",
  },
  {
    title: "7. Durée et archivage",
    body: "Le présent mandat prend effet à sa signature électronique. Le contrat signé est conservé de manière sécurisée pendant une durée minimale de 5 ans.",
  },
];

export default function ContractSignature({
  signerName,
  demandeId,
  serviceLabel,
  onSigned,
}: Props) {
  const [consents, setConsents] = useState({
    contract: false,
    cgv: false,
    privacy: false,
    withdrawal: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const contractRef = serviceLabel
    ? `Mandat d'accompagnement — ${serviceLabel}`
    : "Mandat d'accompagnement administratif";

  const allConsents =
    consents.contract && consents.cgv && consents.privacy && consents.withdrawal;

  async function handleSign(dataUrl: string) {
    setError(null);
    const res = await fetch("/api/signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signatureData: dataUrl,
        contractRef,
        contractVersion: CONTRACT_VERSION,
        signerName,
        demandeId,
        consents,
      }),
    });
    const data = await res.json().catch(() => ({ ok: false }));
    if (!data.ok) {
      setError(
        data.error ?? "La signature n'a pas pu être enregistrée. Réessayez."
      );
      throw new Error("signature failed"); // empêche l'état « enregistrée »
    }
    setDone(true);
    await onSigned();
  }

  if (done) {
    return (
      <div className="bg-white border border-[#9be0aa] rounded-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#e6f7e9] flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[30px] text-[#1e7a3a]">
            verified
          </span>
        </div>
        <h3 className="text-[17px] font-bold text-ink-black mb-1">
          Contrat signé
        </h3>
        <p className="text-[13px] text-on-surface-variant max-w-md mx-auto">
          Une copie signée vous a été envoyée par email. Elle est horodatée et
          archivée comme preuve.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Contrat transmis (version courte) */}
      <div className="bg-white border border-ink-black/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-black/8 flex items-center gap-2">
          <span className="material-symbols-outlined text-french-blue text-[20px]">
            contract
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-ink-black">
              {contractRef}
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              Lisez le contrat, cochez les consentements puis signez.
            </p>
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto px-5 py-4 space-y-3">
          {MANDAT_SECTIONS.map((s) => (
            <div key={s.title}>
              <p className="text-[13px] font-bold text-ink-black">{s.title}</p>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Consentement explicite */}
      <div className="bg-white border border-ink-black/8 rounded-2xl p-5 space-y-3">
        <Consent
          checked={consents.contract}
          onChange={(v) => setConsents((c) => ({ ...c, contract: v }))}
        >
          J&apos;ai lu et j&apos;accepte le contrat / mandat d&apos;accompagnement
          ci-dessus.
        </Consent>
        <Consent
          checked={consents.cgv}
          onChange={(v) => setConsents((c) => ({ ...c, cgv: v }))}
        >
          J&apos;accepte les{" "}
          <Link
            href="/conditions-utilisation"
            target="_blank"
            className="text-french-blue font-semibold hover:underline"
          >
            Conditions Générales de Vente
          </Link>
          .
        </Consent>
        <Consent
          checked={consents.privacy}
          onChange={(v) => setConsents((c) => ({ ...c, privacy: v }))}
        >
          J&apos;accepte la{" "}
          <Link
            href="/conditions-utilisation"
            target="_blank"
            className="text-french-blue font-semibold hover:underline"
          >
            Politique de Confidentialité
          </Link>
          .
        </Consent>
        <Consent
          checked={consents.withdrawal}
          onChange={(v) => setConsents((c) => ({ ...c, withdrawal: v }))}
        >
          Je demande le démarrage immédiat de la prestation et renonce
          expressément à mon droit de rétractation pour la partie exécutée.
        </Consent>
      </div>

      {error && (
        <div className="bg-marianne-red/5 border border-marianne-red/20 text-marianne-red rounded-xl px-4 py-3 text-[13px] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      {/* Signature */}
      <SignaturePad
        onSave={handleSign}
        documentLabel={contractRef}
        disabled={!allConsents}
        disabledHint="Cochez les quatre consentements pour pouvoir signer."
      />
    </div>
  );
}

function Consent({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-french-blue cursor-pointer"
      />
      <span className="text-[13px] text-on-surface-variant leading-relaxed">
        {children}
      </span>
    </label>
  );
}
