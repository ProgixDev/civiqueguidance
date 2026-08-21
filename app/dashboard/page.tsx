"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "./DashboardShell";
import {
  loadDemandes,
  updateStatut,
  deleteDemande,
  type Demande,
  type Statut,
} from "@/lib/demandes";
import {
  loadAllDocuments,
  getAdminDocumentUrl,
  deleteAdminDocument,
  type AdminDocument,
} from "@/lib/admin-data";

const tabs = [
  { id: "rendez-vous", label: "Rendez-vous", icon: "event" },
  { id: "prestations", label: "Prestations", icon: "workspaces" },
  { id: "documents", label: "Documents", icon: "folder" },
  { id: "messages", label: "Messages", icon: "chat" },
  { id: "paiements", label: "Paiements", icon: "payments" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardContent />
    </DashboardShell>
  );
}

function DashboardContent() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [documents, setDocuments] = useState<AdminDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("rendez-vous");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [d, docs] = await Promise.all([loadDemandes(), loadAllDocuments()]);
      setDemandes(d);
      setDocuments(docs);
      setLoading(false);
    })();
  }, []);

  async function refresh() {
    const [d, docs] = await Promise.all([loadDemandes(), loadAllDocuments()]);
    setDemandes(d);
    setDocuments(docs);
  }

  async function onChangeStatut(id: string, statut: Statut) {
    // Optimistic UI : on met à jour localement avant la réponse serveur
    setDemandes((ds) =>
      ds.map((d) => (d.id === id ? { ...d, statut } : d))
    );
    await updateStatut(id, statut);
    await refresh();
  }

  async function onDelete(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    setDemandes((ds) => ds.filter((d) => d.id !== id));
    await deleteDemande(id);
    await refresh();
  }

  // Stats par catégorie
  const stats = useMemo(
    () => ({
      "rendez-vous": demandes.length,
      prestations: new Set(demandes.map((d) => d.service)).size,
      documents: documents.length,
      messages: demandes.filter((d) => d.message?.trim()).length,
      paiements: 0,
    }),
    [demandes, documents]
  );

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-[28px] sm:text-[34px] font-black tracking-tight text-ink-black mb-2">
          Tableau de bord
        </h1>
        <p className="text-[14px] text-on-surface-variant">
          Vue d&apos;ensemble des demandes envoyées par les clients depuis le
          site.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`text-left bg-white border rounded-2xl p-5 transition-all ${
              activeTab === t.id
                ? "border-french-blue shadow-md ring-2 ring-french-blue/10"
                : "border-ink-black/8 hover:border-french-blue/30 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  activeTab === t.id
                    ? "bg-french-blue text-white"
                    : "bg-french-blue/5 text-french-blue"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {t.icon}
                </span>
              </div>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              {t.label}
            </p>
            <p className="text-[26px] font-black text-ink-black leading-none">
              {stats[t.id as keyof typeof stats]}
            </p>
          </button>
        ))}
      </div>

      {/* Tabs nav */}
      <div className="border-b border-ink-black/8 flex flex-wrap gap-1">
        {tabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 text-[13px] font-bold tracking-tight transition-colors relative ${
                active
                  ? "text-french-blue"
                  : "text-on-surface-variant hover:text-ink-black"
              }`}
            >
              {t.label}
              {active && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-french-blue rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      {activeTab === "rendez-vous" && (
        <DemandesTable
          demandes={demandes}
          onChangeStatut={onChangeStatut}
          onDelete={onDelete}
        />
      )}
      {activeTab === "prestations" && (
        <PrestationsPanel demandes={demandes} />
      )}
      {activeTab === "documents" && (
        <DocumentsPanel documents={documents} onRefresh={refresh} />
      )}
      {activeTab === "messages" && <MessagesPanel demandes={demandes} />}
      {activeTab === "paiements" && (
        <EmptyState
          icon="payments"
          title="Aucun paiement"
          desc="Les transactions et factures apparaîtront ici."
        />
      )}
    </div>
  );
}

function DemandesTable({
  demandes,
  onChangeStatut,
  onDelete,
}: {
  demandes: Demande[];
  onChangeStatut: (id: string, statut: Statut) => void;
  onDelete: (id: string) => void;
}) {
  if (demandes.length === 0) {
    return (
      <EmptyState
        icon="event_busy"
        title="Aucun rendez-vous"
        desc="Les demandes envoyées via le formulaire apparaîtront ici."
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-ink-black/8 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#fafafc] border-b border-ink-black/6">
            <tr className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-5 py-4">Nom</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Téléphone</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Heure</th>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Statut</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((d) => (
              <tr
                key={d.id}
                className="border-b border-ink-black/4 last:border-b-0 hover:bg-[#fafafc] transition-colors"
              >
                <td className="px-5 py-4 text-[14px] font-semibold text-ink-black whitespace-nowrap">
                  {d.name}
                </td>
                <td className="px-5 py-4 text-[13px] text-on-surface-variant break-all">
                  {d.email}
                </td>
                <td className="px-5 py-4 text-[13px] text-on-surface-variant whitespace-nowrap">
                  {d.phone}
                </td>
                <td className="px-5 py-4 text-[13px] text-ink-black whitespace-nowrap">
                  {d.date ? formatDateFR(d.date) : "—"}
                </td>
                <td className="px-5 py-4 text-[13px] text-ink-black whitespace-nowrap">
                  {d.time ?? "—"}
                </td>
                <td className="px-5 py-4 text-[13px] text-ink-black whitespace-nowrap">
                  {d.serviceLabel}
                </td>
                <td className="px-5 py-4">
                  <StatutBadge
                    statut={d.statut}
                    onChange={(s) => onChangeStatut(d.id, s)}
                  />
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onDelete(d.id)}
                    aria-label="Supprimer"
                    className="w-8 h-8 rounded-lg text-on-surface-variant hover:text-marianne-red hover:bg-marianne-red/10 inline-flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatutBadge({
  statut,
  onChange,
}: {
  statut: Statut;
  onChange: (s: Statut) => void;
}) {
  const styles: Record<Statut, string> = {
    "En attente": "bg-[#fff7e6] text-[#a25a00] border-[#ffd591]",
    Confirmé: "bg-[#e6f7e9] text-[#1e7a3a] border-[#9be0aa]",
    Annulé: "bg-[#fff0f0] text-[#a02020] border-[#ffb3b3]",
  };
  return (
    <select
      value={statut}
      onChange={(e) => onChange(e.target.value as Statut)}
      className={`text-[12px] font-bold rounded-full px-3 py-1.5 border cursor-pointer outline-none transition-all ${styles[statut]}`}
    >
      <option value="En attente">En attente</option>
      <option value="Confirmé">Confirmé</option>
      <option value="Annulé">Annulé</option>
    </select>
  );
}

function PrestationsPanel({ demandes }: { demandes: Demande[] }) {
  const counts = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>();
    demandes.forEach((d) => {
      const e = map.get(d.service);
      if (e) e.count += 1;
      else map.set(d.service, { label: d.serviceLabel, count: 1 });
    });
    return Array.from(map.entries()).sort((a, b) => b[1].count - a[1].count);
  }, [demandes]);

  if (counts.length === 0) {
    return (
      <EmptyState
        icon="workspaces"
        title="Aucune prestation"
        desc="Les services demandés par les clients apparaîtront ici."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {counts.map(([slug, info]) => (
        <div
          key={slug}
          className="bg-white border border-ink-black/8 rounded-2xl p-5 shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-french-blue">
              {info.label}
            </p>
            <span className="text-[13px] font-bold text-on-surface-variant">
              #{slug}
            </span>
          </div>
          <p className="text-[34px] font-black text-ink-black leading-none mb-1">
            {info.count}
          </p>
          <p className="text-[12px] text-on-surface-variant">
            demande{info.count > 1 ? "s" : ""} reçue{info.count > 1 ? "s" : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

function DocumentsPanel({
  documents,
  onRefresh,
}: {
  documents: AdminDocument[];
  onRefresh: () => Promise<void>;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function onDownload(doc: AdminDocument) {
    const url = await getAdminDocumentUrl(doc.storagePath);
    if (url) window.open(url, "_blank");
  }

  async function onDelete(doc: AdminDocument) {
    // Suppression définitive d'une pièce d'identité : une confirmation nommant
    // le fichier et son propriétaire évite l'erreur de ligne dans un tableau.
    const ok = window.confirm(
      `Supprimer définitivement « ${doc.filename} » de ${doc.clientName} ?\n\n` +
        `Le fichier sera effacé du stockage et ne pourra pas être récupéré.`
    );
    if (!ok) return;

    setDeletingId(doc.id);
    const res = await deleteAdminDocument(doc.id);
    setDeletingId(null);

    if (!res.ok) {
      window.alert(res.error);
      return;
    }
    await onRefresh();
  }

  if (documents.length === 0) {
    return (
      <EmptyState
        icon="folder_open"
        title="Aucun document"
        desc="Les documents téléversés par les clients depuis leur espace personnel apparaîtront ici."
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-ink-black/8 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#fafafc] border-b border-ink-black/6">
            <tr className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-5 py-4">Client</th>
              <th className="px-5 py-4">Fichier</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Taille</th>
              <th className="px-5 py-4">Reçu le</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr
                key={d.id}
                className="border-b border-ink-black/4 last:border-b-0 hover:bg-[#fafafc] transition-colors"
              >
                <td className="px-5 py-4 whitespace-nowrap">
                  <p className="text-[14px] font-semibold text-ink-black">
                    {d.clientName}
                  </p>
                  {d.clientEmail && (
                    <p className="text-[12px] text-on-surface-variant break-all">
                      {d.clientEmail}
                    </p>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-french-blue/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-french-blue text-[18px]">
                        {fileIcon(d.mimeType)}
                      </span>
                    </div>
                    <span className="text-[14px] font-semibold text-ink-black break-all">
                      {d.filename}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-[12px] text-on-surface-variant uppercase tracking-wider">
                  {fileExtension(d.filename)}
                </td>
                <td className="px-5 py-4 text-[13px] text-on-surface-variant whitespace-nowrap">
                  {formatBytes(d.sizeBytes)}
                </td>
                <td className="px-5 py-4 text-[13px] text-ink-black whitespace-nowrap">
                  {new Date(d.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDownload(d)}
                      className="inline-flex items-center gap-2 bg-french-blue/5 hover:bg-french-blue hover:text-white text-french-blue border border-french-blue/15 hover:border-french-blue px-3 py-2 rounded-lg text-[12px] font-bold transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        download
                      </span>
                      Télécharger
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(d)}
                      disabled={deletingId === d.id}
                      title="Supprimer définitivement ce document"
                      aria-label={`Supprimer ${d.filename}`}
                      className="inline-flex items-center gap-2 bg-marianne-red/5 hover:bg-marianne-red hover:text-white text-marianne-red border border-marianne-red/15 hover:border-marianne-red px-3 py-2 rounded-lg text-[12px] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {deletingId === d.id ? "hourglass_empty" : "delete"}
                      </span>
                      {deletingId === d.id ? "Suppression…" : "Supprimer"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function fileIcon(mime: string): string {
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf") return "picture_as_pdf";
  if (mime.includes("word") || mime.includes("document")) return "description";
  return "draft";
}

function fileExtension(filename: string): string {
  const m = filename.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1] : "—";
}

function formatBytes(b: number): string {
  if (b < 1024) return `${b} o`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} Ko`;
  return `${(b / 1024 / 1024).toFixed(1)} Mo`;
}

function MessagesPanel({ demandes }: { demandes: Demande[] }) {
  const items = demandes.filter((d) => d.message?.trim());
  if (items.length === 0) {
    return (
      <EmptyState
        icon="chat"
        title="Aucun message"
        desc="Les messages laissés via le formulaire apparaîtront ici."
      />
    );
  }
  return (
    <div className="space-y-4">
      {items.map((d) => (
        <article
          key={d.id}
          className="bg-white border border-ink-black/8 rounded-2xl p-6 shadow-xs"
        >
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <div>
              <p className="text-[15px] font-bold text-ink-black">{d.name}</p>
              <p className="text-[12px] text-on-surface-variant">{d.email}</p>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-french-blue bg-french-blue/5 px-2.5 py-1 rounded-full border border-french-blue/10">
              {d.serviceLabel}
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-on-surface-variant whitespace-pre-line">
            {d.message}
          </p>
        </article>
      ))}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-dashed border-ink-black/15 rounded-2xl p-12 text-center">
      <div className="w-14 h-14 rounded-full bg-french-blue/5 flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-french-blue text-[28px]">
          {icon}
        </span>
      </div>
      <h3 className="text-[18px] font-bold text-ink-black mb-2">{title}</h3>
      <p className="text-[14px] text-on-surface-variant max-w-md mx-auto">
        {desc}
      </p>
    </div>
  );
}

function formatDateFR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
