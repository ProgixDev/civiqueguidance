import { Suspense } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrushUnderline from "@/app/components/BrushUnderline";
import DemandeForm from "./DemandeForm";

export const metadata = {
  title: "Demander une prestation | DÉMARCHES CIVIQUES",
  description:
    "Décrivez votre besoin et nous vous proposerons un accompagnement adapté à votre situation.",
};

export default function DemandePage() {
  return (
    <>
      <Navbar />
      <main className="py-12 sm:py-20">
        <div className="max-w-content mx-auto px-page">
          {/* Fil d'Ariane */}
          <nav className="text-[13px] mb-8 text-on-surface-variant">
            <a href="/" className="hover:text-french-blue transition-colors">
              Accueil
            </a>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-ink-black font-semibold">
              Demander une prestation
            </span>
          </nav>

          <header className="mb-10 sm:mb-12 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink-black mb-4">
              <span className="relative inline-block">
                Demander une prestation
                <BrushUnderline />
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-on-surface-variant mt-6">
              Décrivez votre besoin et nous vous proposerons un accompagnement
              adapté.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-ink-black/[0.08] rounded-2xl p-6 sm:p-10 shadow-md">
                <Suspense fallback={<div className="h-96" />}>
                  <DemandeForm />
                </Suspense>
              </div>
            </div>

            {/* Encart contact */}
            <aside className="lg:col-span-1">
              <div className="bg-linear-to-br from-french-blue to-[#000053] text-white rounded-2xl p-7 shadow-lg relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-marianne-red/20 blur-3xl rounded-full pointer-events-none" />
                <div className="relative">
                  <h2 className="text-xl font-bold mb-6">
                    Contact direct
                  </h2>
                  <ul className="space-y-5">
                    <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          call
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1">
                          Téléphone
                        </p>
                        <a
                          href="tel:+33751252309"
                          className="text-[15px] font-semibold hover:underline"
                        >
                          +33 7 51 25 23 09
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          mail
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1">
                          Email
                        </p>
                        <a
                          href="mailto:service.horizon224@gmail.com"
                          className="text-[14px] font-semibold hover:underline break-all"
                        >
                          service.horizon224@gmail.com
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          schedule
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1">
                          Horaires
                        </p>
                        <p className="text-[15px] font-semibold">
                          Lun – Sam : 9h – 20h
                        </p>
                      </div>
                    </li>
                  </ul>

                  <p className="text-[12px] text-white/60 mt-8 leading-relaxed">
                    Vos données sont confidentielles et conformes au RGPD. Pas
                    de démarchage, juste un retour personnalisé.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
