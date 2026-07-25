import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrushUnderline from "@/app/components/BrushUnderline";

export type LegalSection = { title: string; body: string };

/**
 * Gabarit commun des quatre pages légales : mentions légales, CGV,
 * politique de confidentialité et politique de cookies.
 */
export default function LegalDoc({
  title,
  intro,
  sections,
  updated,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  updated?: string;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen pt-28 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <header className="mb-12 max-w-3xl">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-french-blue bg-french-blue/5 px-3 py-1 rounded-full border border-french-blue/10 mb-4">
              Légal
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink-black mb-4">
              <span className="relative inline-block">
                {title}
                <BrushUnderline />
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-on-surface-variant mt-6">
              {intro}
            </p>
          </header>

          <article className="bg-white border border-ink-black/[0.08] rounded-2xl p-6 sm:p-10 shadow-md space-y-8 max-w-4xl">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-[18px] sm:text-[20px] font-bold text-ink-black mb-3">
                  {s.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-on-surface-variant whitespace-pre-line">
                  {s.body}
                </p>
              </section>
            ))}

            <div className="border-t border-ink-black/[0.06] pt-6 mt-8">
              <p className="text-[12px] text-on-surface-variant/70">
                Dernière mise à jour :{" "}
                {updated ??
                  new Date().toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                .
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
