"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Demandeurs d'asile", href: "/services/demandeurs-asile" },
      { label: "Étudiants", href: "/services/etudiants" },
      { label: "Titre de séjour", href: "/services/titre-de-sejour" },
      { label: "Naturalisation", href: "/services/naturalisation" },
      { label: "Entreprise", href: "#" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Contact", href: "/demande" },
      { label: "Mon compte", href: "/compte" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "#" },
      { label: "Confidentialité", href: "/conditions-utilisation" },
      { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050524] text-white overflow-hidden">
      {/* Liseré tricolore en haut */}
      <div className="absolute top-0 left-0 w-full h-[3px] flex pointer-events-none">
        <div className="w-[40%] h-full bg-[#000091]" />
        <div className="w-[10%] h-full bg-white opacity-20" />
        <div className="w-[50%] h-full bg-[#E1000F]" />
      </div>

      {/* Halo de fond */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#000091]/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-6 px-page py-16 sm:py-20 max-w-content mx-auto z-10">
        {/* Colonne identité + contact direct */}
        <div className="col-span-2 md:col-span-5 mb-4 md:mb-0">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/logo.png"
              alt="DémarchesCivique"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="text-[18px] font-black tracking-tight text-white">
              DémarchesCivique
            </span>
          </div>

          <p className="text-[14px] text-white/70 mb-8 leading-relaxed max-w-sm">
            Service privé et indépendant d&apos;accompagnement administratif
            pour les étrangers en France, au service de votre intégration.
          </p>

          {/* Coordonnées de contact */}
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-white/60 text-[18px]"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                call
              </span>
              <a
                href="tel:+33751252309"
                className="text-[14px] text-white/90 hover:text-white transition-colors"
              >
                +33 7 51 25 23 09
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-white/60 text-[18px]"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                mail
              </span>
              <a
                href="mailto:service.horizon224@gmail.com"
                className="text-[14px] text-white/90 hover:text-white transition-colors break-all"
              >
                service.horizon224@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-white/60 text-[18px]"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                schedule
              </span>
              <span className="text-[14px] text-white/90">
                Lun – Sam : 9h – 20h
              </span>
            </li>
          </ul>
        </div>

        {/* Colonnes liens */}
        {columns.map((col, i) => (
          <div
            key={col.title}
            className={
              i === 0
                ? "md:col-span-3"
                : i === 1
                ? "md:col-span-2"
                : "md:col-span-2"
            }
          >
            <h5 className="text-[11px] font-extrabold text-white/40 mb-5 uppercase tracking-widest">
              {col.title}
            </h5>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors flex items-center gap-0 hover:gap-1.5 duration-300 group"
                  >
                    <span className="w-0 h-[1px] bg-[#E1000F] transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bandeau inférieur de Copyright */}
      <div className="relative border-t border-white/5 py-6 px-page max-w-content mx-auto z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/50">
          <p className="flex items-center gap-3 flex-wrap justify-center">
            <span>
              © {new Date().getFullYear()} DémarchesCivique. Tous droits
              réservés.
            </span>
            <span className="hidden md:inline opacity-30">·</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-white/40 hover:text-white/80 transition-colors"
            >
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                lock
              </span>
              Admin
            </Link>
          </p>
          <div className="flex items-center gap-2 text-[11px] bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-[#e1000f] text-[8px] animate-pulse">●</span>{" "}
            Accompagnement administratif – pas un cabinet juridique.
          </div>
        </div>
      </div>
    </footer>
  );
}
