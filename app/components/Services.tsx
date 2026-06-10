"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import BrushUnderline from "./BrushUnderline";

// Tiny LQIP (Low Quality Image Placeholder) — un dégradé bleu-marine flouté
// affiché instantanément pendant que la vraie image charge.
const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwMDUzIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDAwMDkxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

const services = [
  {
    slug: "demandeurs-asile",
    icon: "gavel",
    title: "Demandeurs d'asile",
    desc: "Accompagnement pour votre demande d'asile. Aide OFPRA, préparation entretien, suivi complet.",
    gridClass: "md:col-span-2 lg:col-span-7",
    bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "etudiants",
    icon: "school",
    title: "Étudiants (France)",
    desc: "Études en France. Inscription, visa, titre de séjour étudiant.",
    gridClass: "md:col-span-1 lg:col-span-5",
    bgImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "titre-de-sejour",
    icon: "badge",
    title: "Titre de séjour",
    desc: "Première demande ou renouvellement. Constitution et vérification du dossier.",
    gridClass: "md:col-span-1 lg:col-span-5",
    bgImage: "/titre-de-sejour.png",
  },
  {
    slug: "naturalisation",
    icon: "flag",
    title: "Naturalisation",
    desc: "Demande de nationalité française. Préparation complète du dossier.",
    gridClass: "md:col-span-2 lg:col-span-7",
    bgImage: "/naturalisation.png",
  },
  {
    slug: "regroupement-familial",
    icon: "diversity_3",
    title: "Regroupement familial",
    desc: "Faire venir votre famille en France. Dossier OFII, conditions de ressources.",
    gridClass: "md:col-span-1 lg:col-span-6",
    bgImage: "/regroupement.png",
  },
  {
    slug: "regularisation",
    icon: "balance",
    title: "Régularisation",
    desc: "Régulariser votre situation administrative en France.",
    gridClass: "md:col-span-1 lg:col-span-6",
    bgImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "logement",
    icon: "home",
    title: "Aide au logement",
    desc: "Trouver un logement en France. Dossier de location, APL, démarches CAF.",
    gridClass: "md:col-span-1 lg:col-span-6 lg:col-start-4",
    bgImage: "/logement.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 bg-[#f5f5f5] relative overflow-hidden">
      <div className="max-w-content mx-auto px-page relative z-10">
        
        {/* En-tête avec la réplique exacte de ton soulignement incurvé rouge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl relative">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-french-blue bg-french-blue/5 px-3 py-1 rounded-full border border-french-blue/10">
              Expertise
            </span>
            
            <div className="relative inline-block w-full mt-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink-black pb-3">
                Champs d&apos;Intervention
              </h2>
              
              {/* Trait pinceau rouge marianne — composant partagé */}
              <BrushUnderline />
            </div>

            <p className="text-[15px] sm:text-base text-on-surface-variant leading-relaxed mt-5">
              Un accompagnement rigoureux pour sécuriser et accélérer chaque étape de vos démarches administratives.
            </p>
          </div>
          
          <div className="h-px grow mx-8 bg-ink-black/5 hidden md:block" />
          
          <span className="text-[11px] font-mono font-bold text-ink-black/40 bg-white/80 px-3 py-1.5 rounded-lg border border-ink-black/4">
            SERVICES COMPLETS
          </span>
        </div>

        {/* Grille Bento avec Photos en Couleur et Zoom Unique */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {services.map((s, index) => (
            <Link
              href={`/services/${s.slug}`}
              key={s.title}
              className={`relative bg-ink-black border border-ink-black/8 transition-all duration-500 group cursor-pointer rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 ${s.gridClass}`}
            >
              
              {/* IMAGE EN BACKGROUND : next/image avec placeholder flouté + priority sur les 2 premières */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl bg-french-blue/20">
                <Image
                  src={s.bgImage}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  quality={85}
                  priority={index < 2}
                  className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Dégradé doux : noir dense en bas pour lisibilité du texte, transparent en haut */}
                <div className="absolute inset-0 bg-linear-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
              </div>

              {/* CONTENU AU PREMIER PLAN */}
              <div className="relative z-10 flex flex-col h-full justify-between grow">
                
                <div>
                  {/* Badge icône blanc translucide */}
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-10 transition-all duration-500 group-hover:bg-white group-hover:border-transparent group-hover:scale-105">
                    <span 
                      className="material-symbols-outlined text-white group-hover:text-french-blue transition-colors duration-300"
                      style={{ 
                        fontSize: "20px",
                        strokeWidth: "1.5",
                        fontVariationSettings: "'wght' 300, 'opsz' 24"
                      }}
                    >
                      {s.icon}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {s.title}
                  </h3>
                  
                  {/* Descriptif */}
                  <p className="text-[13.5px] leading-relaxed text-white/80 max-w-xl group-hover:text-white transition-colors duration-300">
                    {s.desc}
                  </p>
                </div>

                {/* Pied de la carte */}
                <div className="mt-12 flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center text-white/80 group-hover:text-white text-[11px] font-extrabold tracking-widest uppercase gap-1 transition-colors">
                    <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white group-hover:after:w-full after:transition-all after:duration-300">
                      Découvrir le pôle
                    </span>
                    <span className="material-symbols-outlined text-[14px] transition-transform duration-300 group-hover:translate-x-1" style={{ fontVariationSettings: "'wght' 300" }}>
                      arrow_right_alt
                    </span>
                  </div>
                  
                  {/* Index de la carte */}
                  <span className="text-[10px] font-mono font-bold text-white/30 group-hover:text-white/60 transition-colors">
                    [ 0{index + 1} ]
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* CTA : voir tous les services */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 bg-ink-black hover:bg-french-blue text-white px-8 py-4 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all"
          >
            Voir tous les services
            <span
              className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1"
              style={{ fontVariationSettings: "'wght' 400" }}
            >
              arrow_right_alt
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}