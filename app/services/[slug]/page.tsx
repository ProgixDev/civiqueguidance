import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrushUnderline from "@/app/components/BrushUnderline";
import { getServicePriceCents, formatPriceCents } from "@/lib/demandes";
import { services } from "./data";

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug];
  if (!service) return { title: "Service introuvable | Démarches Civique" };
  return {
    title: `${service.title} | Démarches Civique`,
    description: service.intro,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) notFound();

  const priceCents = getServicePriceCents(slug);

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
            <Link
              href="/#services"
              className="hover:text-french-blue transition-colors"
            >
              Services
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-ink-black font-semibold">{service.title}</span>
          </nav>

          {/* Titre */}
          <header className="mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink-black mb-4">
              <span className="relative inline-block">
                {service.title}
                <BrushUnderline />
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-on-surface-variant max-w-3xl mt-6">
              {service.intro}
            </p>
          </header>

          {/* Pour qui ? + Ce que nous faisons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <section className="bg-white border border-ink-black/[0.08] rounded-2xl p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-french-blue">
                  group
                </span>
                <h2 className="text-xl font-bold text-ink-black">Pour qui ?</h2>
              </div>
              <ul className="space-y-3">
                {service.pourQui.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-6">
                    <span className="text-french-blue mt-1">•</span>
                    <span className="text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white border border-ink-black/[0.08] rounded-2xl p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-french-blue">
                  check_circle
                </span>
                <h2 className="text-xl font-bold text-ink-black">
                  Ce que nous faisons
                </h2>
              </div>
              <ul className="space-y-3">
                {service.ceQueNousFaisons.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-6">
                    <span className="material-symbols-outlined text-french-blue text-[18px] mt-0.5 shrink-0">
                      done
                    </span>
                    <span className="text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Documents demandés (pleine largeur, "Ce que nous ne faisons pas" retiré) */}
          <div className="mb-6">
            <section className="bg-white border border-ink-black/[0.08] rounded-2xl p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-french-blue">
                  description
                </span>
                <h2 className="text-xl font-bold text-ink-black">
                  Documents demandés
                </h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.documents.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-6">
                    <span className="material-symbols-outlined text-french-blue text-[18px] mt-0.5 shrink-0">
                      folder
                    </span>
                    <span className="text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Bloc Transparence */}
          <section className="bg-linear-to-br from-french-blue to-[#000053] text-white rounded-2xl p-8 sm:p-10 mb-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-marianne-red/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined">verified_user</span>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Transparence Démarches Civique
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] leading-relaxed text-white/90 max-w-3xl">
                {service.transparenceText}
              </p>
            </div>
          </section>

          {/* Étapes d'accompagnement */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink-black mb-8">
              <span className="relative inline-block">
                Étapes d&apos;accompagnement
                <BrushUnderline />
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.etapes.map((e) => (
                <div
                  key={e.n}
                  className="bg-white border border-ink-black/[0.08] rounded-2xl p-6 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-full bg-french-blue text-white flex items-center justify-center text-[20px] font-black mb-4 shadow-md">
                    {e.n}
                  </div>
                  <h3 className="text-[17px] font-bold text-ink-black mb-2">
                    {e.title}
                  </h3>
                  <p className="text-[14px] text-on-surface-variant leading-6">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA + tarif bien en évidence */}
          <section className="bg-white border border-ink-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-ink-black mb-2">
                Demander ce service
              </h2>
              <p className="text-[15px] text-on-surface-variant mb-4">
                Premier rendez-vous d&apos;analyse gratuit et confidentiel.
              </p>
              {priceCents !== null ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    Tarif
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-french-blue">
                    {formatPriceCents(priceCents)}
                  </span>
                  <span className="text-[13px] font-semibold text-on-surface-variant">
                    réglé en ligne lors de la demande
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-french-blue">
                    Sur devis
                  </span>
                  <span className="text-[13px] font-semibold text-on-surface-variant">
                    tarif communiqué après analyse
                  </span>
                </div>
              )}
            </div>
            <Link
              href={`/demande?service=${slug}`}
              className="inline-flex items-center justify-center bg-french-blue hover:bg-[#000066] text-white px-7 py-4 rounded-xl text-[15px] font-bold tracking-wide shadow-md transition-all whitespace-nowrap"
            >
              {priceCents !== null ? "Demander & payer" : "Demander un devis"}
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
