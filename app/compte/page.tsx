"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ClientShell from "./ClientShell";
import SignaturePad from "@/app/components/SignaturePad";
import {
  loadMyDemandes,
  loadMyDocuments,
  loadMySignatures,
  loadMyPaidDemandeIds,
  uploadDocument,
  deleteDocument,
  getDocumentDownloadUrl,
  saveSignature,
  type ClientDocument,
  type ClientSignature,
} from "@/lib/client-data";
import {
  getServicePriceCents,
  formatPriceCents,
  type Demande,
} from "@/lib/demandes";

export default function ClientHomePage() {
  return (
    <ClientShell>
      {(user) => <ClientContent userEmail={user.email ?? ""} />}
    </ClientShell>
  );
}

function ClientContent({ userEmail }: { userEmail: string }) {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [signatures, setSignatures] = useState<ClientSignature[]>([]);
  const [paidIds, setPaidIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [payError, setPayError] = useState<string | null>(null);
  const [payNotice, setPayNotice] = useState<"success" | "cancel" | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [d, docs, sigs, paid] = await Promise.all([
        loadMyDemandes(),
        loadMyDocuments(),
        loadMySignatures(),
        loadMyPaidDemandeIds(),
      ]);
      setDemandes(d);
      setDocuments(docs);
      setSignatures(sigs);
      setPaidIds(paid);
      setLoading(false);
    })();
  }, []);

  // Affiche un message au retour de Stripe Checkout (success_url / cancel_url),
  // puis nettoie l'URL. Lu via window pour éviter une Suspense boundary.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("payment");
    if (p === "success" || p === "cancel") {
      setPayNotice(p);
      window.history.replaceState({}, "", "/compte");
    }
  }, []);

  async function refresh() {
    const [d, docs, sigs, paid] = await Promise.all([
      loadMyDemandes(),
      loadMyDocuments(),
      loadMySignatures(),
      loadMyPaidDemandeIds(),
    ]);
    setDemandes(d);
    setDocuments(docs);
    setSignatures(sigs);
    setPaidIds(paid);
  }

  async function onPay(d: Demande) {
    const amountCents = getServicePriceCents(d.service);
    if (!amountCents) return; // service « sur devis » : pas de paiement en ligne
    setPayError(null);
    setPayingId(d.id);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents,
          description: `Accompagnement — ${d.serviceLabel}`,
          customerEmail: userEmail,
          demandeId: d.id,
        }),
      });
      const data = await res.json();
      if (!data.ok || !data.url) {
        setPayError(data.error ?? "Le paiement n'a pas pu démarrer. Réessayez.");
        setPayingId(null);
        return;
      }
      window.location.href = data.url; // redirection vers Stripe Checkout
    } catch {
      setPayError("Le paiement n'a pas pu démarrer. Réessayez.");
      setPayingId(null);
    }
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const result = await uploadDocument(file);
    if (!result.ok) {
      setUploadError(result.error);
    } else {
      await refresh();
    }
    setUploading(false);
    e.target.value = ""; // reset l'input
  }

  async function onDeleteDoc(doc: ClientDocument) {
    if (!confirm(`Supprimer "${doc.filename}" ?`)) return;
    await deleteDocument(doc);
    await refresh();
  }

  async function onDownloadDoc(doc: ClientDocument) {
    const url = await getDocumentDownloadUrl(doc.storagePath);
    if (url) window.open(url, "_blank");
  }

  async function onSaveSignature(dataUrl: string) {
    const ok = await saveSignature(dataUrl, "Mandat d'accompagnement");
    if (ok) await refresh();
  }

  // Demandes encore à régler (tarif fixe, non payées, non annulées).
  const toPay = demandes.filter(
    (d) =>
      d.statut !== "Annulé" &&
      !paidIds.has(d.id) &&
      getServicePriceCents(d.service) !== null
  );
  const totalToPayCents = toPay.reduce(
    (sum, d) => sum + (getServicePriceCents(d.service) ?? 0),
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[28px] sm:text-[34px] font-black tracking-tight text-ink-black mb-2">
          Bonjour 👋
        </h1>
        <p className="text-[14px] text-on-surface-variant">
          Connecté en tant que <span className="font-bold">{userEmail}</span>
        </p>
      </div>

      {/* Retour de Stripe Checkout */}
      {payNotice === "success" && (
        <div className="bg-[#e6f7e9] border border-[#9be0aa] text-[#1e7a3a] rounded-xl px-4 py-3 text-[14px] flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">
            check_circle
          </span>
          Paiement reçu. Un reçu vous a été envoyé par email. Merci !
        </div>
      )}
      {payNotice === "cancel" && (
        <div className="bg-[#fff7e6] border border-[#ffd591] text-[#a25a00] rounded-xl px-4 py-3 text-[14px] flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">info</span>
          Paiement annulé. Vous pouvez réessayer quand vous le souhaitez.
        </div>
      )}
      {payError && (
        <div className="bg-marianne-red/5 border border-marianne-red/20 text-marianne-red rounded-xl px-4 py-3 text-[13px] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {payError}
        </div>
      )}

      {/* Bandeau « À régler » — paiement bien en évidence en haut de la page */}
      {toPay.length > 0 && (
        <section className="bg-linear-to-br from-french-blue to-[#000053] text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-marianne-red/25 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined">credit_card</span>
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                {toPay.length === 1
                  ? "1 accompagnement à régler"
                  : `${toPay.length} accompagnements à régler`}
              </h2>
            </div>
            <p className="text-white/80 text-[14px] mb-5">
              Total à payer :{" "}
              <span className="font-bold text-white">
                {formatPriceCents(totalToPayCents)}
              </span>
            </p>
            <div className="space-y-2.5">
              {toPay.map((d) => {
                const price = getServicePriceCents(d.service) ?? 0;
                return (
                  <div
                    key={d.id}
                    className="flex items-center justify-between gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-[14px] truncate">
                        {d.serviceLabel}
                      </p>
                      <p className="text-white/70 text-[12px]">
                        {formatPriceCents(price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onPay(d)}
                      disabled={payingId === d.id}
                      className="inline-flex items-center gap-1.5 bg-marianne-red hover:brightness-110 disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-[13px] font-bold transition-all active:scale-[0.99] whitespace-nowrap shrink-0 shadow-sm"
                    >
                      {payingId === d.id ? (
                        "Redirection…"
                      ) : (
                        <>
                          Payer {formatPriceCents(price)}
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon="event" label="Mes demandes" value={demandes.length} />
        <StatCard icon="folder" label="Mes documents" value={documents.length} />
        <StatCard
          icon="schedule"
          label="En cours"
          value={demandes.filter((d) => d.statut === "En attente").length}
        />
      </div>

      {/* Mes demandes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-ink-black">Mes demandes</h2>
          <Link
            href="/demande"
            className="text-[13px] font-bold text-french-blue hover:underline"
          >
            + Nouvelle demande
          </Link>
        </div>
        {loading ? (
          <p className="text-[14px] text-on-surface-variant">Chargement…</p>
        ) : demandes.length === 0 ? (
          <div className="bg-white border border-dashed border-ink-black/15 rounded-2xl p-10 text-center">
            <span className="material-symbols-outlined text-french-blue text-[28px]">
              event_busy
            </span>
            <h3 className="text-[16px] font-bold text-ink-black mt-3 mb-1">
              Aucune demande
            </h3>
            <p className="text-[13px] text-on-surface-variant mb-4">
              Vos demandes d&apos;accompagnement apparaîtront ici.
            </p>
            <Link
              href="/demande"
              className="inline-flex items-center justify-center bg-french-blue hover:bg-[#000066] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold transition-all"
            >
              Faire une demande
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {demandes.map((d) => (
              <article
                key={d.id}
                className="bg-white border border-ink-black/8 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-ink-black">
                    {d.serviceLabel}
                  </p>
                  <p className="text-[12px] text-on-surface-variant mt-0.5">
                    {d.date ? formatDateFR(d.date) : "Sans date"}
                    {d.time ? ` · ${d.time}` : ""} ·{" "}
                    {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatutBadge statut={d.statut} />
                  <PaymentAction demande={d} paid={paidIds.has(d.id)} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Mes documents */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-ink-black">Mes documents</h2>
          <label className="text-[13px] font-bold text-french-blue hover:underline cursor-pointer">
            <input
              type="file"
              onChange={onUpload}
              disabled={uploading}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
            />
            {uploading ? "Envoi…" : "+ Téléverser un document"}
          </label>
        </div>

        {uploadError && (
          <div className="bg-marianne-red/5 border border-marianne-red/20 text-marianne-red rounded-xl px-4 py-3 text-[13px] mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {uploadError}
          </div>
        )}

        {documents.length === 0 ? (
          <div className="bg-white border border-dashed border-ink-black/15 rounded-2xl p-10 text-center">
            <span className="material-symbols-outlined text-french-blue text-[28px]">
              folder_open
            </span>
            <h3 className="text-[16px] font-bold text-ink-black mt-3 mb-1">
              Aucun document
            </h3>
            <p className="text-[13px] text-on-surface-variant">
              Téléversez vos pièces (passeport, justificatifs…) pour les
              partager avec votre conseiller. PDF, JPG, PNG, DOC acceptés.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc) => (
              <article
                key={doc.id}
                className="bg-white border border-ink-black/8 rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-french-blue/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-french-blue text-[20px]">
                    {fileIcon(doc.mimeType)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-ink-black truncate">
                    {doc.filename}
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    {formatBytes(doc.sizeBytes)} ·{" "}
                    {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => onDownloadDoc(doc)}
                    aria-label="Télécharger"
                    className="w-9 h-9 rounded-lg text-french-blue hover:bg-french-blue/10 flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      download
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteDoc(doc)}
                    aria-label="Supprimer"
                    className="w-9 h-9 rounded-lg text-on-surface-variant hover:text-marianne-red hover:bg-marianne-red/10 flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Signature électronique */}
      <section>
        <h2 className="text-[20px] font-bold text-ink-black mb-4">
          Signature électronique
        </h2>

        {/* Signatures déjà enregistrées */}
        {signatures.length > 0 && (
          <div className="mb-5 space-y-3">
            <p className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
              Signatures enregistrées ({signatures.length})
            </p>
            {signatures.map((sig) => (
              <article
                key={sig.id}
                className="bg-white border border-ink-black/8 rounded-2xl p-4 flex items-center gap-5"
              >
                <div className="shrink-0 w-32 h-20 bg-white border border-ink-black/8 rounded-lg overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sig.signatureData}
                    alt="Signature"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-ink-black mb-1">
                    {sig.documentLabel || "Signature"}
                  </p>
                  <p className="text-[12px] text-on-surface-variant flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'wght' 400" }}
                    >
                      verified
                    </span>
                    Signé le{" "}
                    {new Date(sig.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    à{" "}
                    {new Date(sig.createdAt).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pad pour ajouter une nouvelle signature */}
        <SignaturePad
          onSave={onSaveSignature}
          documentLabel={
            signatures.length > 0
              ? "Nouvelle signature"
              : "Mandat d'accompagnement administratif"
          }
        />
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white border border-ink-black/8 rounded-2xl p-5">
      <div className="w-9 h-9 rounded-lg bg-french-blue/10 text-french-blue flex items-center justify-center mb-3">
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
        {label}
      </p>
      <p className="text-[26px] font-black text-ink-black leading-none">
        {value}
      </p>
    </div>
  );
}

function PaymentAction({
  demande,
  paid,
}: {
  demande: Demande;
  paid: boolean;
}) {
  if (paid) {
    return (
      <span className="inline-flex items-center gap-1 text-[12px] font-bold rounded-full px-3 py-1.5 border bg-[#e6f7e9] text-[#1e7a3a] border-[#9be0aa]">
        <span className="material-symbols-outlined text-[16px]">paid</span>
        Payé
      </span>
    );
  }

  // Une demande annulée n'est pas payable.
  if (demande.statut === "Annulé") return null;

  const priceCents = getServicePriceCents(demande.service);
  if (priceCents === null) {
    return (
      <span className="text-[12px] font-semibold text-on-surface-variant">
        Sur devis
      </span>
    );
  }

  // Le paiement se fait via le bandeau « À régler » en haut de la page :
  // ici on indique juste qu'un règlement est attendu.
  return (
    <span className="inline-flex items-center gap-1 text-[12px] font-bold rounded-full px-3 py-1.5 border bg-[#fff7e6] text-[#a25a00] border-[#ffd591]">
      À régler · {formatPriceCents(priceCents)}
    </span>
  );
}

function StatutBadge({ statut }: { statut: Demande["statut"] }) {
  const styles: Record<Demande["statut"], string> = {
    "En attente": "bg-[#fff7e6] text-[#a25a00] border-[#ffd591]",
    Confirmé: "bg-[#e6f7e9] text-[#1e7a3a] border-[#9be0aa]",
    Annulé: "bg-[#fff0f0] text-[#a02020] border-[#ffb3b3]",
  };
  return (
    <span
      className={`text-[12px] font-bold rounded-full px-3 py-1.5 border ${styles[statut]}`}
    >
      {statut}
    </span>
  );
}

function fileIcon(mime: string): string {
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf") return "picture_as_pdf";
  if (mime.includes("word") || mime.includes("document"))
    return "description";
  return "draft";
}

function formatBytes(b: number): string {
  if (b < 1024) return `${b} o`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} Ko`;
  return `${(b / 1024 / 1024).toFixed(1)} Mo`;
}

function formatDateFR(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
