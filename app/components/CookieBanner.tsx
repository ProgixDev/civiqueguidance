"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "ds_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(KEY, "accepted");
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem(KEY, "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="
        fixed z-50 bg-white border border-ink-black/8 shadow-2xl
        bottom-0 left-0 right-0 rounded-t-2xl
        sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm sm:rounded-2xl
        p-4 sm:p-5
      "
      role="dialog"
      aria-label="Bandeau cookies"
    >
      {/* En-tête : icône + titre côte à côte */}
      <div className="flex items-center gap-3 mb-2">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-french-blue/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-french-blue text-[18px]">
            cookie
          </span>
        </div>
        <h3 className="text-[14px] sm:text-[15px] font-bold text-ink-black">
          Cookies &amp; confidentialité
        </h3>
      </div>

      {/* Texte */}
      <p className="text-[12.5px] sm:text-[13px] leading-relaxed text-on-surface-variant mb-4">
        Nous utilisons uniquement des cookies essentiels au fonctionnement
        (session, préférences). Aucun traceur publicitaire.{" "}
        <Link
          href="/conditions-utilisation"
          className="text-french-blue underline underline-offset-2 font-semibold hover:no-underline whitespace-nowrap"
        >
          En savoir plus
        </Link>
      </p>

      {/* Boutons : pleine largeur en mobile, côte à côte sur ≥ sm */}
      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
        <button
          type="button"
          onClick={refuse}
          className="px-4 py-2.5 text-[13px] font-bold text-on-surface-variant hover:text-ink-black hover:bg-ink-black/5 rounded-lg transition-colors"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={accept}
          className="px-5 py-2.5 text-[13px] font-bold text-white bg-french-blue hover:bg-[#000066] rounded-lg transition-colors shadow-sm"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
