import Image from "next/image";
import Link from "next/link";
import BrushUnderline from "./BrushUnderline";

export default function Hero() {
  return (
    <section className="relative py-14 sm:py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 french-gradient-subtle pointer-events-none" />
      <div className="max-w-content mx-auto px-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Texte */}
          <div className="lg:col-span-7">
            <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[12px] font-bold uppercase tracking-widest mb-6 rounded">
              Accompagnement en ligne
            </span>

            <h1 className="text-[28px] leading-9 sm:text-[32px] sm:leading-10 md:text-[40px] md:leading-11 lg:text-[44px] lg:leading-tight font-black tracking-tight text-ink-black mb-6 sm:mb-8">
              Accompagnement en ligne pour vos{" "}
              <span className="relative inline-block text-french-blue">
                démarches administratives
                <BrushUnderline />
              </span>{" "}
              en France.
            </h1>

            <p className="text-[15px] sm:text-[17px] leading-7 text-on-surface-variant mb-8 sm:mb-10 max-w-2xl">
              Étudiants, titres de séjour, demandeurs d&apos;asile,
              regroupement familial, naturalisation, logement, insertion
              professionnelle. Un accompagnement humain et transparent.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-french-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-[15px] sm:text-[16px] font-bold hover:opacity-95 transition-all shadow-sm"
              >
                Découvrir nos services
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'wght' 400" }}
                >
                  arrow_right_alt
                </span>
              </Link>
              <Link
                href="#rendez-vous"
                className="inline-flex items-center justify-center gap-2 border-2 border-french-blue text-french-blue px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-[15px] sm:text-[16px] font-bold hover:bg-french-blue hover:text-white transition-all"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'wght' 400" }}
                >
                  calendar_month
                </span>
                Prendre rendez-vous
              </Link>
            </div>
          </div>

          {/* Composition 2 photos */}
          <div className="lg:col-span-5 relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative w-full aspect-square">
              {/* Image principale (haut-droite) */}
              <div className="absolute top-0 right-0 w-[82%] aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white">
                <Image
                  src="/hero.png"
                  alt="Conseillère expliquant un dossier à un client"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 35vw, 80vw"
                  priority
                />
              </div>

              {/* Image secondaire (bas-gauche, en chevauchement) */}
              <div className="absolute bottom-0 left-0 w-[60%] aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white z-10 -rotate-2">
                <Image
                  src="/hero2.png"
                  alt="Poignée de main entre conseiller et client"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 60vw"
                  priority
                />
              </div>

              {/* Coins décoratifs */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-l-8 border-b-8 border-french-blue z-0" />
              <div className="absolute -top-4 -right-4 w-16 h-16 border-r-8 border-t-8 border-marianne-red z-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
