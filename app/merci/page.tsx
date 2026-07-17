import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Merci | Démarches Civique",
  robots: { index: false },
};

/**
 * Page de confirmation publique après un paiement Stripe lancé depuis le
 * formulaire de demande (visiteur sans compte). Les clients connectés sont,
 * eux, renvoyés vers /compte (voir app/api/stripe/checkout/route.ts).
 */
export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;
  const cancelled = payment === "cancel";

  return (
    <>
      <Navbar />
      <main className="py-16 sm:py-24">
        <div className="max-w-content mx-auto px-page">
          <div className="max-w-xl mx-auto text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                cancelled ? "bg-[#fff7e6]" : "bg-[#e6f7e9]"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[34px] ${
                  cancelled ? "text-[#a25a00]" : "text-[#1e7a3a]"
                }`}
              >
                {cancelled ? "info" : "check_circle"}
              </span>
            </div>

            {cancelled ? (
              <>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink-black mb-3">
                  Paiement annulé
                </h1>
                <p className="text-[15px] sm:text-[16px] text-on-surface-variant leading-relaxed mb-8">
                  Votre paiement n&apos;a pas été finalisé. Aucune somme
                  n&apos;a été débitée. Vous pouvez relancer votre demande quand
                  vous le souhaitez.
                </p>
                <Link
                  href="/demande"
                  className="inline-flex items-center justify-center bg-french-blue hover:bg-[#000066] text-white px-7 py-4 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all"
                >
                  Reprendre ma demande
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink-black mb-3">
                  Paiement reçu, merci !
                </h1>
                <p className="text-[15px] sm:text-[16px] text-on-surface-variant leading-relaxed mb-8">
                  Un reçu vous a été envoyé par email. Notre équipe revient vers
                  vous sous 24h ouvrées pour démarrer votre accompagnement.
                  Créez votre espace client pour suivre votre dossier et
                  transmettre vos documents.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/compte/inscription"
                    className="inline-flex items-center justify-center bg-french-blue hover:bg-[#000066] text-white px-7 py-4 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all"
                  >
                    Créer mon espace client
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-white border border-ink-black/10 hover:border-ink-black/20 text-ink-black px-7 py-4 rounded-xl text-[14px] font-bold tracking-wide transition-all"
                  >
                    Retour à l&apos;accueil
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
