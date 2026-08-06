import Image from "next/image";
import BrushUnderline from "./BrushUnderline";

const features = [
  {
    icon: "quiz",
    title: "Questions officielles",
    desc: "Des milliers de questions tirées du livret du citoyen et des annales de l'examen.",
  },
  {
    icon: "psychology",
    title: "Simulations intelligentes",
    desc: "Adaptation au niveau, révisions ciblées, statistiques de progression.",
  },
  {
    icon: "trending_up",
    title: "Suivi personnalisé",
    desc: "Recommandations sur mesure pour combler les lacunes et gagner en confiance.",
  },
];

export default function AppShowcase() {
  return (
    <section
      id="app"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden scroll-mt-24"
    >
      {/* Halo décoratif */}
      <div className="absolute -top-20 -right-32 w-[500px] h-[500px] bg-french-blue/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-32 w-[500px] h-[500px] bg-marianne-red/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-content mx-auto px-page relative">
        <div className="bg-linear-to-br from-[#04042b] via-[#000053] to-[#000091] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Pattern de points subtil */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Halo rouge marianne */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-marianne-red/25 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Logo de l'app */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative">
                {/* Halo derrière le logo */}
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-110" />
                <div className="relative w-56 sm:w-64 lg:w-72 aspect-square rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-white/20">
                  <Image
                    src="/logo_de_lapp.png"
                    alt="Logo Objectif Civique"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 18rem, 14rem"
                  />
                </div>

                {/* Badges flottants */}
                <div className="absolute -top-3 -right-3 bg-white text-french-blue rounded-full px-3 py-1.5 text-[11px] font-bold shadow-lg flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    star
                  </span>
                  Nouveau
                </div>
                <div className="absolute -bottom-3 -left-3 bg-marianne-red text-white rounded-full px-3 py-1.5 text-[11px] font-bold shadow-lg">
                  Objectif Civique
                </div>
              </div>
            </div>

            {/* Texte */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15 mb-5">
                Notre application
              </span>

              <h2 className="text-[26px] leading-9 sm:text-[34px] sm:leading-tight lg:text-[44px] lg:leading-[1.1] font-black tracking-tight mb-6">
                Réussissez votre{" "}
                <span className="relative inline-block">
                  examen civique
                  <BrushUnderline />
                </span>{" "}
                et votre entretien de naturalisation.
              </h2>

              <p className="text-[15px] sm:text-[17px] leading-7 text-white/80 mb-8 max-w-2xl">
                Préparez votre avenir en France avec{" "}
                <span className="font-bold text-white">Objectif Civique</span>.
                Des milliers de questions officielles, des simulations
                intelligentes et un suivi personnalisé.
              </p>

              {/* Liste des fonctionnalités */}
              <ul className="space-y-4 mb-10">
                {features.map((f) => (
                  <li key={f.title} className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-white text-[20px]"
                        style={{ fontVariationSettings: "'wght' 400" }}
                      >
                        {f.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-white mb-0.5">
                        {f.title}
                      </p>
                      <p className="text-[14px] text-white/70 leading-6">
                        {f.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Boutons de téléchargement */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-3 bg-white text-ink-black hover:bg-white/90 px-6 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[26px]">
                    apple
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider opacity-70 leading-tight">
                      Télécharger sur
                    </p>
                    <p className="text-[15px] font-bold leading-tight">
                      App Store
                    </p>
                  </div>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-3 bg-white text-ink-black hover:bg-white/90 px-6 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[26px]">
                    android
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider opacity-70 leading-tight">
                      Disponible sur
                    </p>
                    <p className="text-[15px] font-bold leading-tight">
                      Google Play
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
