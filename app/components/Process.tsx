import React from "react";
import BrushUnderline from "./BrushUnderline";

const steps = [
  {
    n: "01",
    icon: "call",
    title: "Contact",
    desc: "Prise de contact initiale et analyse sommaire de votre situation.",
  },
  {
    n: "02",
    icon: "description",
    title: "Proposition",
    desc: "Établissement d'un devis transparent et d'une stratégie personnalisée.",
  },
  {
    n: "03",
    icon: "handshake",
    title: "Accompagnement",
    desc: "Montage du dossier, relecture critique et suivi avec les autorités.",
  },
  {
    n: "04",
    icon: "verified",
    title: "Finalisation",
    desc: "Obtention de votre titre ou validation de votre démarche.",
  },
];

// Classes utilitaires pour simplifier le JSX
const colors = {
  blue: {
    text: "text-french-blue",
    border: "border-french-blue/30",
    bg: "bg-french-blue/5",
    stop: "#000091", // French blue exact
  },
  red: {
    text: "text-marianne-red",
    border: "border-marianne-red/30",
    bg: "bg-marianne-red/5",
    stop: "#E1000F", // Marianne red exact
  },
};

export default function Process() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-content mx-auto px-page relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-french-blue/10 text-french-blue mb-4 border border-french-blue/20">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-french-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-french-blue"></span>
            </span>
            Méthodologie
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-ink-black mb-6">
            <span className="relative inline-block">
              Notre Processus d&apos;Accompagnement
              <BrushUnderline />
            </span>
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Une méthode rigoureuse en quatre étapes pour garantir la clarté,
            la <span className="font-semibold text-ink-black">sérénité</span> et l&apos;efficacité de vos démarches.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line - Modernized: dashed and subtle gradient */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-px pointer-events-none">
            <div className="w-full h-full border-t-2 border-dashed border-linear-to-r from-french-blue/20 via-french-blue/40 to-marianne-red/30" />
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            {steps.map((s, i) => {
              const isLast = i === steps.length - 1;
              const theme = isLast ? colors.red : colors.blue;
              
              // Dynamic gradient for the border border conic
              const borderColor = isLast 
                ? `conic-gradient(from 90deg at 50% 50%, #E1000F 0%, rgba(225,0,15,0.1) 80%, #E1000F 100%)`
                : `conic-gradient(from 90deg at 50% 50%, #000091 0%, rgba(0,0,145,0.1) 80%, #000091 100%)`;

              return (
                <li
                  key={s.n}
                  className="flex flex-col items-center text-center group" // 'group' for hover effects
                >
                  {/* Container du Marqueur avec effet Hover */}
                  <div className="relative mb-8 transform transition-transform duration-300 group-hover:-translate-y-2">
                    
                    {/* Soft Glow effect on hover */}
                    <div className={`absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150 ${isLast ? 'bg-marianne-red/10' : 'bg-french-blue/10'}`} />

                    {/* Anneau extérieur avec gradient conique moderne */}
                    <div 
                      className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full p-[2px] shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-french-blue/10 isLast:group-hover:shadow-marianne-red/10"
                      style={{ background: borderColor }}
                    >
                      {/* Intérieur : Effet Glassmorphism subtil */}
                      <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden border border-white">
                        
                        {/* Numéro - Stylisé, léger */}
                        <span className={`font-extrabold text-5xl tracking-tighter leading-none opacity-15 ${theme.text}`}>
                          {s.n}
                        </span>
                        
                        {/* Icône - Centrée et colorée */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                            <div className={`w-12 h-12 rounded-full ${theme.bg} flex items-center justify-center border ${theme.border}`}>
                                <span
                                    className={`material-symbols-outlined ${theme.text}`}
                                    style={{ fontSize: "24px", fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                                >
                                    {s.icon}
                                </span>
                            </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Contenu Texte */}
                  <div className="relative bg-white md:bg-transparent p-6 md:p-0 rounded-2xl shadow-lg shadow-ink-black/5 md:shadow-none border border-ink-black/5 md:border-none w-full max-w-sm md:max-w-none">
                    <h4 className="text-xl sm:text-2xl font-bold text-ink-black mb-3 tracking-tight">
                      {s.title}
                    </h4>
                    <p className="text-base leading-relaxed text-on-surface-variant group-hover:text-ink-black transition-colors">
                      {s.desc}
                    </p>
                    
                    {/* Petite flèche décorative pour mobile */}
                    <div className={`md:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-l border-t border-ink-black/5`}/>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}