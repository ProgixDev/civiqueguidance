"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ClientShell from "./ClientShell";
import ContractSignature from "@/app/components/ContractSignature";
import {
  loadMyDemandes,
  loadMyDocuments,
  loadMySignatures,
  uploadDocument,
  deleteDocument,
  getDocumentDownloadUrl,
  type ClientDocument,
  type ClientSignature,
} from "@/lib/client-data";
import { type Demande } from "@/lib/demandes";

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
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [d, docs, sigs] = await Promise.all([
        loadMyDemandes(),
        loadMyDocuments(),
        loadMySignatures(),
      ]);
      setDemandes(d);
      setDocuments(docs);
      setSignatures(sigs);
      setLoading(false);
    })();
  }, []);

  async function refresh() {
    const [d, docs, sigs] = await Promise.all([
      loadMyDemandes(),
      loadMyDocuments(),
      loadMySignatures(),
    ]);
    setDemandes(d);
    setDocuments(docs);
    setSignatures(sigs);
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
        <h2 className="text-[20px] font-bold text-ink-black mb-1">
          Signature du contrat
        </h2>
        <p className="text-[13px] text-on-surface-variant mb-4">
          Signature électronique à valeur légale (art. 1367 du Code civil,
          règlement eIDAS). Horodatée et archivée comme preuve.
        </p>

        {/* Contrats déjà signés */}
        {signatures.length > 0 && (
          <div className="mb-5 space-y-3">
            <p className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
              Contrats signés ({signatures.length})
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

        {/* Flux de signature du contrat (tant qu'aucun contrat n'est signé) */}
        {signatures.length === 0 && (
          <ContractSignature
            signerName={userEmail}
            demandeId={demandes[0]?.id}
            serviceLabel={demandes[0]?.serviceLabel}
            onSigned={refresh}
          />
        )}
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
