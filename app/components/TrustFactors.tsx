"use client";

import React from "react";
import BrushUnderline from "./BrushUnderline";
// Source unique des libellés de services : la même liste que /services et /demande.
import { SERVICE_LABELS } from "@/lib/demandes";

const values = [
  {
    icon: "gavel",
    title: "Évaluation objective des dossiers",
    desc: "Nous analysons vos chances réelles de succès dès le premier échange. Aucun frais n'est engagé sans une visibilité complète sur la stratégie juridique adoptée.",
  },
  {
    icon: "balance",
    title: "Suivi des démarches administratives",
    desc: "Une pratique régulière des procédures préfectorales pour anticiper les besoins de chaque dossier.",
  },
  {
    icon: "shield_person",
    title: "Rigueur et secret professionnel",
    desc: "Chaque situation est traitée dans le respect absolu de la déontologie, avec la réactivité nécessaire face aux urgences administratives.",
  },
];

export default function TrustFactors() {
  return (
    <section id="expertise" className="py-20 sm:py-28 relative bg-transparent">
      {/* Halos lumineux d'ambiance discrets */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-marianne-red/[0.03] blur-[130px] rounded-full translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-french-blue/[0.03] blur-[130px] rounded-full -translate-x-1/3 pointer-events-none" />

      <div className="max-w-content mx-auto px-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Colonne Gauche : Engagements */}
          <div className="lg:col-span-7 pt-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-french-blue">
              Garanties & Déontologie
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-16 text-ink-black mt-3 max-w-xl">
              <span className="relative inline-block">
                Un cadre rigoureux pour vos démarches
                <BrushUnderline />
              </span>
            </h2>
            
            <div className="space-y-14">
              {values.map((v) => (
                <div key={v.title} className="flex gap-8 items-start group">
                  
                  {/* Boîtier d'icône agrandi et plus affirmé */}
                  <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-french-blue/5 border border-french-blue/10 transition-all duration-300 group-hover:bg-[#000091] group-hover:border-transparent">
                    <span 
                      className="material-symbols-outlined text-french-blue group-hover:text-white transition-colors duration-300" 
                      style={{ 
                        fontSize: "32px", // Icône beaucoup plus grande et impactante
                        fontVariationSettings: "'wght' 250, 'opsz' 40"
                      }}
                    >
                      {v.icon}
                    </span>
                  </div>
                  
                  {/* Textes descriptifs réalignés */}
                  <div className="pt-1.5">
                    <h3 className="text-xl font-bold mb-2 text-ink-black tracking-tight">
                      {v.title}
                    </h3>
                    <p className="text-on-surface-variant text-[15px] leading-relaxed max-w-xl opacity-90">
                      {v.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Colonne Droite : Formulaire */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <ConsultForm />
          </div>

        </div>
      </div>
    </section>
  );
}

function ConsultForm() {
  return (
    <div className="p-8 rounded-2xl bg-white border border-ink-black/[0.06] shadow-xl shadow-ink-black/[0.02] flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h3 className="text-xl font-bold text-ink-black tracking-tight">
            Demande d&apos;examen de situation
          </h3>
          <p className="text-[13px] text-on-surface-variant mt-1 opacity-80">
            Un juriste vous recontacte sous 24h ouvrées.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-[10.5px] font-bold uppercase tracking-wider mb-2 text-ink-black/70">
              Nom et prénom
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex : Jean Dupont"
                className="w-full bg-transparent border border-ink-black/15 rounded-xl py-3 px-4 text-[14.5px] text-ink-black placeholder:text-ink-black/30 focus:border-french-blue focus:ring-1 focus:ring-french-blue focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10.5px] font-bold uppercase tracking-wider mb-2 text-ink-black/70">
              Nature de votre demande
            </label>
            <div className="relative">
              <select
                name="service"
                defaultValue=""
                className="w-full bg-white border border-ink-black/15 rounded-xl py-3 px-4 text-[14.5px] text-ink-black appearance-none focus:border-french-blue focus:ring-1 focus:ring-french-blue focus:outline-none transition-all cursor-pointer"
              >
                <option value="" disabled>
                  Sélectionnez votre démarche
                </option>
                {Object.entries(SERVICE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-black/40 pointer-events-none" style={{ fontSize: "18px" }}>
                expand_more
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#000091] hover:bg-[#000066] text-white py-3.5 rounded-xl text-[14px] font-bold tracking-wide active:scale-[0.99] transition-all mt-4"
          >
            Demander un premier échange
          </button>
        </form>
      </div>

      <div className="flex items-start gap-3 border-t border-ink-black/5 pt-5 mt-6 text-[11.5px] text-on-surface-variant leading-relaxed opacity-80">
        <span className="material-symbols-outlined text-[#000091] shrink-0 mt-0.5" style={{ fontSize: "15px", fontVariationSettings: "'wght' 300" }}>
          lock
        </span>
        <p>
          Conformément au règlement <span className="font-semibold text-ink-black">RGPD</span>, vos informations restent strictement confidentielles et sont protégées par le secret professionnel.
        </p>
      </div>
    </div>
  );
}