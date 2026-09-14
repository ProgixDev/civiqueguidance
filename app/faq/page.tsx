import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrushUnderline from "@/app/components/BrushUnderline";

export const metadata = {
  title: "Questions fréquentes — Titre de séjour, asile, naturalisation | DÉMARCHES CIVIQUES",
  description:
    "Réponses aux questions les plus posées sur le titre de séjour, la demande d'asile, la naturalisation française, le regroupement familial, la régularisation et l'aide au logement.",
  alternates: { canonical: "/faq" },
};

type Faq = { q: string; a: string };
type FaqGroup = { title: string; items: Faq[] };

const groups: FaqGroup[] = [
  {
    title: "À propos de DÉMARCHES CIVIQUES",
    items: [
      {
        q: "DÉMARCHES CIVIQUES est-il un cabinet d'avocats ?",
        a: "Non. DÉMARCHES CIVIQUES est un service privé et indépendant d'accompagnement administratif — pas un cabinet juridique. Nous vous aidons à comprendre, organiser et préparer votre dossier ; nous ne donnons pas de consultation juridique et ne garantissons aucune décision de l'administration (titre, visa, naturalisation ou asile).",
      },
      {
        q: "Le premier échange est-il gratuit ?",
        a: "Oui. Chaque demande commence par un premier rendez-vous d'analyse gratuit et confidentiel, pour comprendre votre situation avant de proposer un accompagnement adapté.",
      },
      {
        q: "Comment se déroule un accompagnement, concrètement ?",
        a: "Vous décrivez votre situation via le formulaire de demande, un conseiller analyse votre dossier et revient vers vous sous 24h ouvrées, puis vous êtes accompagné étape par étape : vérification des documents, organisation du dossier, préparation aux entretiens le cas échéant.",
      },
      {
        q: "Dans quelles villes intervenez-vous ?",
        a: "L'accompagnement se fait entièrement à distance (en ligne et par téléphone), ce qui nous permet d'accompagner des personnes partout en France, quelle que soit la préfecture dont elles dépendent.",
      },
    ],
  },
  {
    title: "Demande d'asile",
    items: [
      {
        q: "Combien de temps dure une procédure de demande d'asile en France ?",
        a: "Les délais varient selon la préfecture et l'OFPRA, généralement de plusieurs mois à plus d'un an entre l'enregistrement de la demande et la décision de l'OFPRA, puis un délai supplémentaire en cas de recours devant la CNDA.",
      },
      {
        q: "Comment se préparer à l'entretien OFPRA ?",
        a: "L'entretien OFPRA porte sur votre récit et les raisons de votre demande de protection. Nous vous aidons à organiser votre récit de façon chronologique et claire, et à vous préparer aux questions les plus fréquemment posées — sans jamais écrire ou inventer votre histoire à votre place.",
      },
      {
        q: "Quels documents faut-il préparer pour une demande d'asile ?",
        a: "Généralement : l'attestation de demande d'asile, la convocation OFPRA si vous l'avez reçue, une pièce d'identité ou un passeport, ainsi que tout document appuyant les persécutions ou risques que vous invoquez.",
      },
    ],
  },
  {
    title: "Titre de séjour",
    items: [
      {
        q: "Combien de temps avant l'expiration faut-il demander le renouvellement d'un titre de séjour ?",
        a: "Il est recommandé d'engager les démarches de renouvellement plusieurs mois avant l'expiration du titre en cours, les délais de traitement en préfecture pouvant être longs et variables selon le département.",
      },
      {
        q: "Quels documents demande une préfecture pour un titre de séjour ?",
        a: "Selon le motif du titre : passeport en cours de validité, justificatif de domicile, photos d'identité, justificatifs de ressources ou de situation familiale/professionnelle, et les pièces spécifiques au motif du séjour (études, travail, vie privée et familiale...).",
      },
      {
        q: "Que faire en cas de refus ou de silence de la préfecture ?",
        a: "Un refus ou une absence de réponse ouvre des voies de recours (gracieux, hiérarchique ou contentieux) soumises à des délais stricts. Ces recours relèvent du conseil juridique — nous vous orientons vers un professionnel du droit si votre situation l'exige.",
      },
    ],
  },
  {
    title: "Naturalisation française",
    items: [
      {
        q: "Quelles sont les conditions pour demander la naturalisation française ?",
        a: "Entre autres : résider en France depuis une durée suffisante (généralement 5 ans, parfois réduite), justifier d'une stabilité de ressources, maîtriser la langue française, et adhérer aux principes et valeurs de la République — vérifiés lors de l'entretien d'assimilation.",
      },
      {
        q: "Combien de temps dure l'instruction d'un dossier de naturalisation ?",
        a: "Le délai légal maximal est de 18 mois (12 mois dans certains départements), mais le délai réel dépend fortement de la préfecture et de la complétude du dossier déposé.",
      },
      {
        q: "Comment se préparer à l'entretien de naturalisation ?",
        a: "L'entretien porte sur votre parcours, votre connaissance des institutions françaises et votre adhésion aux valeurs républicaines. Nous vous aidons à structurer votre dossier et à vous préparer aux questions les plus courantes.",
      },
    ],
  },
  {
    title: "Regroupement familial",
    items: [
      {
        q: "Quelles sont les conditions du regroupement familial ?",
        a: "Le demandeur doit résider en France depuis au moins 18 mois sous certains titres de séjour, justifier de ressources stables et suffisantes, et d'un logement considéré comme normal pour la taille de la famille.",
      },
      {
        q: "Combien de temps prend une procédure de regroupement familial ?",
        a: "Comptez généralement plusieurs mois entre le dépôt du dossier et la décision, incluant l'instruction par l'OFII et la préfecture, puis la procédure de visa auprès du consulat pour les membres de la famille restés à l'étranger.",
      },
    ],
  },
  {
    title: "Régularisation administrative",
    items: [
      {
        q: "Sur quels critères une régularisation administrative est-elle examinée ?",
        a: "L'administration examine notamment l'ancienneté de présence en France, l'insertion professionnelle et sociale, les attaches familiales, et la situation personnelle du demandeur — au cas par cas, selon un pouvoir d'appréciation de la préfecture.",
      },
      {
        q: "Quels justificatifs rassembler pour une demande de régularisation ?",
        a: "Tout document prouvant votre présence continue en France (factures, avis médicaux, attestations), votre insertion (bulletins de salaire, promesse d'embauche, formations) et vos attaches personnelles ou familiales.",
      },
    ],
  },
  {
    title: "Étudiants",
    items: [
      {
        q: "Quelles démarches pour étudier en France en tant qu'étranger ?",
        a: "Selon votre pays d'origine : procédure Études en France (Campus France), demande de visa long séjour valant titre de séjour étudiant, puis validation du visa et éventuel renouvellement annuel du titre de séjour étudiant en préfecture.",
      },
      {
        q: "Comment renouveler un titre de séjour étudiant ?",
        a: "Le renouvellement se prépare avant l'expiration du titre en cours et nécessite de justifier de la poursuite ou de la progression des études, ainsi que des ressources suffisantes pour financer votre séjour.",
      },
    ],
  },
  {
    title: "Logement",
    items: [
      {
        q: "Quelles aides existent pour se loger en France ?",
        a: "Les principales aides sont les APL/ALS de la CAF, la garantie Visale pour la caution locative, et certains dispositifs Action Logement selon votre situation professionnelle. Nous vous aidons à identifier les aides accessibles et à constituer votre dossier.",
      },
      {
        q: "Quels documents demande un dossier de location ?",
        a: "Généralement : pièce d'identité, justificatifs de ressources ou de garant, dernier avis d'imposition, justificatif de domicile actuel, et parfois une attestation employeur — la liste précise varie selon le bailleur.",
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((g) =>
    g.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="py-12 sm:py-20">
        <div className="max-w-content mx-auto px-page">
          <nav className="text-[13px] mb-8 text-on-surface-variant">
            <Link href="/" className="hover:text-french-blue transition-colors">
              Accueil
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-ink-black font-semibold">FAQ</span>
          </nav>

          <header className="mb-12 sm:mb-16 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink-black mb-4">
              <span className="relative inline-block">
                Questions fréquentes
                <BrushUnderline />
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-on-surface-variant mt-6">
              Titre de séjour, demande d&apos;asile, naturalisation,
              regroupement familial, régularisation, étudiants, logement — les
              réponses aux questions que l&apos;on nous pose le plus souvent.
            </p>
          </header>

          <div className="space-y-10 max-w-3xl">
            {groups.map((group) => (
              <section key={group.title}>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-ink-black mb-4">
                  {group.title}
                </h2>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <details
                      key={item.q}
                      className="group bg-white border border-ink-black/8 rounded-2xl p-5 shadow-xs"
                    >
                      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-[15px] text-ink-black">
                        {item.q}
                        <span
                          className="material-symbols-outlined text-french-blue text-[22px] shrink-0 transition-transform group-open:rotate-180"
                          style={{ fontVariationSettings: "'wght' 400" }}
                        >
                          expand_more
                        </span>
                      </summary>
                      <p className="text-[14px] text-on-surface-variant leading-6 mt-3">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-14 bg-linear-to-br from-french-blue to-[#000053] text-white rounded-2xl p-8 sm:p-10 max-w-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-marianne-red/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                Une question sur votre situation ?
              </h2>
              <p className="text-[15px] text-white/85 mb-6 max-w-xl">
                Chaque dossier est différent. Décrivez votre situation, un
                conseiller vous répond sous 24h ouvrées.
              </p>
              <Link
                href="/demande"
                className="inline-flex items-center justify-center bg-white text-french-blue hover:bg-white/90 px-7 py-4 rounded-xl text-[15px] font-bold tracking-wide shadow-md transition-all whitespace-nowrap"
              >
                Poser ma question
                <span
                  className="material-symbols-outlined text-[16px] ml-2"
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
