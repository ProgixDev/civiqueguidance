import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrushUnderline from "@/app/components/BrushUnderline";

export const metadata = {
  title: "Conditions d'utilisation | Démarches Civique",
  description:
    "Conditions d'utilisation du site Démarches Civique. Service privé d'accompagnement administratif.",
};

const sections = [
  {
    title: "1. Objet",
    body: `Les présentes conditions régissent l'utilisation du site Démarches Civique et des services d'accompagnement administratif proposés. En accédant au site ou en utilisant un service, vous acceptez sans réserve l'intégralité de ces conditions.`,
  },
  {
    title: "2. Nature du service",
    body: `Démarches Civique est un service privé et indépendant d'accompagnement administratif. Nous ne sommes pas un cabinet juridique. Nous ne donnons pas de conseils juridiques, ne représentons pas nos clients devant les administrations et ne modifions jamais leurs documents personnels. Nous vous accompagnons et vous guidons, mais vous restez maître de vos démarches.`,
  },
  {
    title: "3. Acceptation",
    body: `L'utilisation du site implique l'acceptation pleine et entière des présentes conditions. Si vous n'acceptez pas ces conditions, vous devez quitter le site.`,
  },
  {
    title: "4. Données personnelles",
    body: `Vos données personnelles collectées via les formulaires (nom, email, téléphone, description de situation) sont traitées dans le strict respect du RGPD. Elles servent uniquement à vous fournir l'accompagnement demandé et ne sont en aucun cas revendues, partagées ou transmises à des tiers à des fins commerciales. Vous disposez d'un droit d'accès, de rectification et de suppression — il suffit de nous écrire à service.horizon224@gmail.com.`,
  },
  {
    title: "5. Cookies",
    body: `Le site utilise uniquement des cookies techniques essentiels au fonctionnement (gestion de session admin, préférence d'affichage). Aucun cookie publicitaire ni traceur tiers n'est déposé sans votre consentement.`,
  },
  {
    title: "6. Tarifs & paiements",
    body: `Les prestations sont proposées sur devis, communiqué après analyse de la situation. Les modalités de paiement sont précisées au moment du devis. Un premier échange d'analyse est offert et n'engage à rien.`,
  },
  {
    title: "7. Limitation de responsabilité",
    body: `Démarches Civique met en œuvre tous les moyens raisonnables pour fournir un accompagnement de qualité. Cependant, nous ne pouvons garantir l'issue favorable d'une démarche administrative — celle-ci dépend exclusivement de la décision des autorités compétentes (OFPRA, CNDA, préfectures, OFII, etc.). Notre responsabilité ne peut être engagée pour des refus ou retards de l'administration.`,
  },
  {
    title: "8. Propriété intellectuelle",
    body: `L'ensemble des contenus présents sur ce site (textes, images, logos, mises en page) sont protégés par le droit d'auteur. Toute reproduction sans autorisation préalable est interdite.`,
  },
  {
    title: "9. Modifications",
    body: `Nous nous réservons le droit de modifier les présentes conditions à tout moment. Les utilisateurs sont invités à les consulter régulièrement. La date de dernière mise à jour figure en bas de cette page.`,
  },
  {
    title: "10. Droit applicable",
    body: `Les présentes conditions sont régies par le droit français. Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux français.`,
  },
];

export default function ConditionsUtilisationPage() {
  return (
    <>
      <Navbar />
      <main className="py-12 sm:py-20">
        <div className="max-w-content mx-auto px-page">
          <nav className="text-[13px] mb-8 text-on-surface-variant">
            <Link href="/" className="hover:text-french-blue transition-colors">
              Accueil
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-ink-black font-semibold">
              Conditions d&apos;utilisation
            </span>
          </nav>

          <header className="mb-12 max-w-3xl">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-french-blue bg-french-blue/5 px-3 py-1 rounded-full border border-french-blue/10 mb-4">
              Légal
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink-black mb-4">
              <span className="relative inline-block">
                Conditions d&apos;utilisation
                <BrushUnderline />
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-on-surface-variant mt-6">
              Règles d&apos;utilisation du site Démarches Civique et de nos
              services d&apos;accompagnement administratif.
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
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
