"use client";

import React from "react";

export default function CTA() {
  return (
    <section className="py-16 sm:py-24 bg-transparent">
      <div className="max-w-content mx-auto px-page">
        <div className="bg-white border border-ink-black/8 p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 rounded-2xl shadow-xl shadow-ink-black/1">
          
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink-black mb-4">
              Initier vos démarches d&apos;accompagnement
            </h2>
            <p className="text-[14.5px] leading-relaxed text-on-surface-variant opacity-90">
              Nos conseillers analysent votre situation lors d&apos;un premier examen de dossier.
              Disponibilités immédiates par téléphone ou par téléconsultation sécurisée.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
            {/* Action Secondaire : Urgences - Fine ligne rouge sobre */}
            <a
              href="/demande?service=urgence"
              className="inline-flex items-center justify-center border border-marianne-red/30 hover:border-marianne-red text-marianne-red bg-marianne-red/2 hover:bg-marianne-red/5 px-6 py-3.5 rounded-xl text-[14px] font-bold tracking-wide transition-all duration-300 text-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-marianne-red mr-2 animate-pulse" />
              Urgences administratives
            </a>

            {/* Action Principale : Prise de RDV - Bleu nuit institutionnel de la charte de l'État */}
            <a
              href="/demande"
              className="inline-flex items-center justify-center bg-french-blue hover:bg-[#000066] text-white px-7 py-3.5 rounded-xl text-[14px] font-bold tracking-wide shadow-md shadow-blue-900/10 active:scale-[0.99] transition-all text-center"
            >
              Demander un service
              <span className="material-symbols-outlined text-[16px] ml-2 opacity-80" style={{ fontVariationSettings: "'wght' 300" }}>
                arrow_right_alt
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}