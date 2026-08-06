import BrushUnderline from "./BrushUnderline";

const channels = [
  {
    icon: "call",
    title: "Téléphone",
    desc: "+33 7 51 25 23 09",
    accent: "french-blue",
  },
  {
    icon: "videocam",
    title: "Visioconférence",
    desc: "Sur rendez-vous, en sécurisé.",
    accent: "french-blue",
  },
  {
    icon: "mail",
    title: "Email",
    desc: "support@demarchesciviques.fr",
    accent: "marianne-red",
  },
  {
    icon: "chat",
    title: "WhatsApp",
    desc: "Réactivité sur messages urgents.",
    accent: "marianne-red",
  },
];

export default function CoverageSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-content mx-auto px-page">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-french-blue bg-french-blue/5 px-3 py-1 rounded-full border border-french-blue/10 mb-4">
            100 % à distance
          </span>
          <h2 className="text-[26px] leading-8 sm:text-[32px] sm:leading-10 font-bold tracking-tight text-ink-black mb-4">
            <span className="relative inline-block">
              Nous vous accompagnons
              <BrushUnderline />
            </span>
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
            Pas de cabinet physique. Un accompagnement entièrement à distance,
            adapté à votre rythme — partout en France.
          </p>
        </div>

        {/* Zone couverte : France */}
        <div className="mb-10">
          <div className="relative bg-white border border-ink-black/[0.08] rounded-2xl p-8 sm:p-12 shadow-md overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-french-blue/5 blur-3xl rounded-full pointer-events-none" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                {/* Drapeau stylisé France */}
                <div className="inline-flex w-24 h-16 rounded-md shadow-md overflow-hidden mb-6 ring-1 ring-ink-black/10">
                  <div className="flex-1 bg-french-blue" />
                  <div className="flex-1 bg-white" />
                  <div className="flex-1 bg-marianne-red" />
                </div>
                <h3 className="text-[26px] sm:text-[30px] font-black tracking-tight text-ink-black mb-3">
                  France métropolitaine
                </h3>
                <p className="text-[15px] sm:text-[16px] text-on-surface-variant leading-relaxed">
                  OFPRA, CNDA, préfectures, OFII, naturalisation, regroupement
                  familial — toutes les démarches administratives françaises,
                  accompagnées à distance.
                </p>
              </div>

              <ul className="space-y-3 text-[15px] text-on-surface-variant md:border-l md:border-ink-black/[0.08] md:pl-8">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-french-blue text-[20px]">
                    done
                  </span>
                  Couverture toutes préfectures
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-french-blue text-[20px]">
                    done
                  </span>
                  OFPRA & CNDA à Paris
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-french-blue text-[20px]">
                    done
                  </span>
                  Demandes Campus France
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-french-blue text-[20px]">
                    done
                  </span>
                  Régularisation et naturalisation
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Canaux de contact */}
        <div className="bg-linear-to-br from-french-blue to-[#000053] text-white rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-marianne-red/20 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="relative">
            <h3 className="text-[20px] sm:text-[24px] font-bold mb-2">
              Comment nous joindre
            </h3>
            <p className="text-[14px] text-white/70 mb-8">
              Choisissez le canal qui vous convient — réponse sous 24h ouvrées.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {channels.map((c) => (
                <div
                  key={c.title}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[22px]">
                      {c.icon}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                    {c.title}
                  </p>
                  <p className="text-[14px] font-semibold text-white break-words">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
