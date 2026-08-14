import LegalDoc, { LegalSection } from "@/app/components/LegalDoc";

export const metadata = {
  title: "Politique de cookies | DÉMARCHES CIVIQUES",
  description:
    "Politique de cookies de DÉMARCHES CIVIQUES : types de cookies, gestion du consentement, durée de conservation et paramétrage.",
};

const sections: LegalSection[] = [
  {
    title: "1. Introduction",
    body: `Notre site web https://demarchesciviques.fr utilise des cookies pour améliorer l'expérience de navigation des utilisateurs et pour analyser l'utilisation du site. La présente politique explique ce que sont les cookies, comment nous les utilisons, et comment vous pouvez gérer vos préférences.`,
  },
  {
    title: "2. Objet de la politique de cookies",
    body: `La présente politique a pour objet d'informer de manière claire et transparente les utilisateurs du Site sur l'utilisation des cookies et autres traceurs susceptibles d'être déposés sur leur terminal lors de leur navigation.

Cette politique complète la Politique de Confidentialité de la Société et s'inscrit dans le respect de la réglementation applicable, notamment le RGPD, la loi Informatique et Libertés modifiée, ainsi que les recommandations de la CNIL.`,
  },
  {
    title: "3. Qu'est-ce qu'un cookie ?",
    body: `Un cookie est un petit fichier texte susceptible d'être enregistré sur le terminal de l'utilisateur (ordinateur, smartphone, tablette) lors de la consultation d'un site internet. Les cookies permettent notamment de reconnaître un utilisateur, de mémoriser ses préférences ou d'analyser l'utilisation d'un site.

Les cookies ne permettent en aucun cas d'identifier directement un utilisateur de manière nominative.`,
  },
  {
    title: "4. Types de cookies utilisés",
    body: `4.1 Cookies strictement nécessaires : indispensables au bon fonctionnement du Site, ils ne peuvent être désactivés (accès sécurisé, gestion des formulaires, mémorisation des choix de consentement). Ils ne nécessitent pas de consentement préalable.

4.2 Cookies de mesure d'audience : ils recueillent des informations anonymes sur la fréquentation et l'utilisation du Site. Ils sont soumis au consentement préalable de l'utilisateur.

4.3 Cookies fonctionnels : ils améliorent l'expérience utilisateur en mémorisant certaines préférences (langue, affichage). Ils sont déposés uniquement avec le consentement de l'utilisateur.

4.4 Cookies tiers : le Site peut contenir des cookies émis par des services tiers nécessaires à certaines fonctionnalités (paiement, prise de rendez-vous, visioconférence, signature électronique). DÉMARCHES CIVIQUES n'exerce aucun contrôle direct sur ces cookies.`,
  },
  {
    title: "5. Gestion du consentement",
    body: `Lors de la première visite, un bandeau d'information permet à l'utilisateur :
• d'accepter l'ensemble des cookies ;
• de refuser les cookies non essentiels ;
• de paramétrer ses choix par catégorie.

Le consentement peut être retiré ou modifié à tout moment via le module de gestion des cookies accessible depuis le Site.`,
  },
  {
    title: "6. Durée de conservation des cookies",
    body: `Les cookies déposés sur le terminal de l'utilisateur sont conservés pour une durée maximale de treize (13) mois à compter de leur dépôt, conformément aux recommandations de la CNIL. Au-delà de cette durée, le consentement de l'utilisateur est à nouveau requis.`,
  },
  {
    title: "7. Paramétrage du navigateur",
    body: `L'utilisateur peut également configurer son navigateur afin de refuser tout ou partie des cookies. Le paramétrage varie selon le navigateur utilisé et peut entraîner une altération de certaines fonctionnalités du Site.`,
  },
  {
    title: "8. Protection des données personnelles",
    body: `Les données collectées via les cookies sont traitées conformément à la Politique de Confidentialité de DÉMARCHES CIVIQUES. L'utilisateur dispose notamment d'un droit d'accès, de rectification, d'opposition, d'effacement et de limitation du traitement.`,
  },
  {
    title: "9. Modification de la politique de cookies",
    body: `DÉMARCHES CIVIQUES se réserve le droit de modifier la présente politique à tout moment afin de l'adapter aux évolutions légales, réglementaires ou techniques. Toute modification substantielle fera l'objet d'une information sur le Site.`,
  },
  {
    title: "10. Contact",
    body: `Pour toute question relative à la présente politique de cookies ou à l'utilisation des traceurs, l'utilisateur peut contacter la Société à : support@demarchesciviques.fr.`,
  },
];

export default function PolitiqueCookies() {
  return (
    <LegalDoc
      title="Politique de cookies"
      intro="Types de cookies utilisés sur DÉMARCHES CIVIQUES, gestion de votre consentement et paramétrage."
      sections={sections}
      updated="26 juin 2026"
    />
  );
}
