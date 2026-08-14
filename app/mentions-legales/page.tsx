import LegalDoc, { LegalSection } from "@/app/components/LegalDoc";

export const metadata = {
  title: "Mentions légales | DÉMARCHES CIVIQUES",
  description:
    "Mentions légales du site DÉMARCHES CIVIQUES : éditeur, hébergeur, propriété intellectuelle et responsabilité.",
};

const sections: LegalSection[] = [
  {
    title: "1. Éditeur du Site",
    body: `• Dénomination sociale : DÉMARCHES CIVIQUES
• Forme juridique : Société par Actions Simplifiée à associé unique (SASU)
• Capital social : 500 €
• Siège social : 138 Avenue Victor Hugo, 75016 PARIS
• Immatriculation : [RCS + ville + numéro SIREN]
• Numéro de TVA intracommunautaire : [si applicable]
• Président : Monsieur Ibrahima BARRY
• Directeur de la publication : Monsieur Ibrahima BARRY
• Contact : support@demarchesciviques.fr`,
  },
  {
    title: "2. Hébergeur du Site",
    body: `• Nom : HOSTINGER
• Adresse : [adresse de l'hébergeur]
• Contact : [contact de l'hébergeur]`,
  },
  {
    title: "3. Propriété intellectuelle",
    body: `L'ensemble des éléments présents sur le site www.demarchesciviques.fr, notamment les textes, contenus, graphismes, logos, vidéos, illustrations, éléments visuels, bases de données et structure du site, sont protégés par les dispositions du Code de la propriété intellectuelle.

Toute reproduction, représentation, diffusion, modification ou adaptation, totale ou partielle, sans autorisation écrite préalable est strictement interdite et pourra donner lieu à des poursuites.`,
  },
  {
    title: "4. Nature des services et responsabilité",
    body: `DÉMARCHES CIVIQUES propose des services d'information, d'accompagnement administratif et de préparation pédagogique aux démarches administratives, exclusivement en ligne.

Les prestations proposées ne constituent en aucun cas :
• un conseil juridique personnalisé ;
• une consultation juridique ;
• une assistance ou représentation devant une juridiction ou une autorité administrative ;
• une garantie d'obtention de titre, visa, naturalisation, asile ou toute décision administrative.

DÉMARCHES CIVIQUES s'efforce de fournir des informations actualisées et fiables. Toutefois, la Société ne peut garantir l'exactitude, l'exhaustivité ou l'actualité permanente des informations diffusées sur le site. La responsabilité de DÉMARCHES CIVIQUES ne saurait être engagée en cas d'erreur, d'omission, d'évolution réglementaire ou d'interprétation administrative différente.`,
  },
  {
    title: "5. Protection des données à caractère personnel",
    body: `DÉMARCHES CIVIQUES met en œuvre des traitements de données personnelles conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés. Les données collectées via le site sont nécessaires à la gestion des demandes, à l'exécution des prestations et à la relation client.

Conformément à la réglementation applicable, vous disposez des droits suivants : droit d'accès, de rectification, d'effacement, à la limitation du traitement, d'opposition et à la portabilité. Pour exercer vos droits, vous pouvez adresser votre demande à : support@demarchesciviques.fr.

Pour plus d'informations, vous pouvez consulter la Politique de Confidentialité disponible sur le site.`,
  },
  {
    title: "6. Cookies",
    body: `Le site www.demarchesciviques.fr utilise des cookies et traceurs afin d'améliorer l'expérience utilisateur et d'analyser la fréquentation du site. Le dépôt des cookies non essentiels est soumis au consentement préalable de l'utilisateur. Les modalités complètes sont détaillées dans la Politique de Cookies accessible sur le site.`,
  },
  {
    title: "7. Liens hypertextes",
    body: `Le site peut contenir des liens vers des sites tiers. DÉMARCHES CIVIQUES ne saurait être tenue responsable du contenu, des politiques ou des pratiques de ces sites externes.`,
  },
  {
    title: "8. Droit applicable et juridiction compétente",
    body: `Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux compétents seront ceux du ressort du siège social de DÉMARCHES CIVIQUES.`,
  },
];

export default function MentionsLegales() {
  return (
    <LegalDoc
      title="Mentions légales"
      intro="Informations légales relatives au site www.demarchesciviques.fr et à son éditeur."
      sections={sections}
    />
  );
}
