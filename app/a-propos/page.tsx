import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrushUnderline from "@/app/components/BrushUnderline";

export const metadata = {
  title: "À propos | Démarches Civique",
  description:
    "Démarches Civique est un service d'accompagnement administratif privé et indépendant — pas un cabinet juridique.",
};

const principes = [
  "Nous ne donnons pas de conseils juridiques",
  "Nous ne représentons pas nos clients devant les administrations",
  "Nous ne modifions jamais vos documents personnels",
  "Nous vous accompagnons et vous guidons, mais vous restez maître de vos démarches",
];

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main className="py-12 sm:py-20">
        <div className="max-w-content mx-auto px-page">
          {/* Fil d'Ariane */}
          <nav className="text-[13px] mb-8 text-on-surface-variant">
            <Link href="/" className="hover:text-french-blue transition-colors">
              Accueil
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-ink-black font-semibold">À propos</span>
          </nav>

          {/* Titre */}
          <header className="mb-12 sm:mb-16 max-w-3xl">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-french-blue bg-french-blue/5 px-3 py-1 rounded-full border border-french-blue/10 mb-4">
              Qui sommes-nous
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink-black mb-4">
              <span className="relative inline-block">
                À propos de Démarches Civique
                <BrushUnderline />
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-on-surface-variant mt-6">
              Un service indépendant d&apos;accompagnement administratif au
              service des étrangers en France. Notre mission : rendre les
              démarches lisibles, méthodiques et sereines.
            </p>
          </header>

          {/* Cadre légal — bloc principal */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink-black mb-8">
              <span className="relative inline-block">
                Cadre légal
                <BrushUnderline />
              </span>
            </h2>

            <div className="bg-linear-to-br from-french-blue to-[#000053] text-white rounded-2xl p-8 sm:p-10 mb-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-marianne-red/20 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-[28px]">
                    gavel
                  </span>
                  <p className="text-[15px] sm:text-[16px] font-bold uppercase tracking-wider">
                    Important
                  </p>
                </div>
                <p className="text-[17px] sm:text-[20px] font-bold leading-relaxed max-w-2xl">
                  Démarches Civique est un service d&apos;accompagnement
                  administratif, <span className="underline decoration-marianne-red decoration-4 underline-offset-4">pas un cabinet juridique</span>.
                </p>
              </div>
            </div>

            {/* Liste des principes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {principes.map((p) => (
                <div
                  key={p}
                  className="bg-white border border-ink-black/[0.08] rounded-xl p-5 flex gap-4 items-start shadow-xs"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-marianne-red/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-marianne-red text-[20px]">
                      close
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink-black pt-1">
                    {p}
                  </p>
                </div>
              ))}
            </div>

            {/* Note partenaires */}
            <div className="mt-8 bg-french-blue/5 border border-french-blue/20 rounded-2xl p-6 sm:p-8 flex gap-5 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-french-blue/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-french-blue">
                  handshake
                </span>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-ink-black mb-2">
                  Questions juridiques complexes ?
                </h3>
                <p className="text-[15px] leading-relaxed text-on-surface-variant">
                  Pour les situations qui nécessitent un véritable conseil
                  juridique, nous vous mettons en relation avec nos partenaires
                  juridiques ou associatifs spécialisés en droit des étrangers.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white border border-ink-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-ink-black mb-2">
                Une question, un besoin ?
              </h2>
              <p className="text-[15px] text-on-surface-variant">
                Décrivez votre situation et nous revenons vers vous sous 24h.
              </p>
            </div>
            <Link
              href="/demande"
              className="inline-flex items-center justify-center bg-french-blue hover:bg-[#000066] text-white px-7 py-4 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all whitespace-nowrap"
            >
              Demander un service
              <span
                className="material-symbols-outlined text-[16px] ml-2"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                arrow_right_alt
              </span>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
