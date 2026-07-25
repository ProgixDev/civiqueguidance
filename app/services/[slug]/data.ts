export type Etape = { n: string; title: string; desc: string };

export type ServiceDetail = {
  title: string;
  intro: string;
  pourQui: string[];
  ceQueNousFaisons: string[];
  ceQueNousNeFaisonsPas: string[];
  transparenceText: string;
  documents: string[];
  etapes: Etape[];
};

const TRANSPARENCE_BASE =
  "DÉMARCHES CIVIQUES ne modifie pas vos documents et n'écrit jamais à votre place.";

export const services: Record<string, ServiceDetail> = {
  "demandeurs-asile": {
    title: "Demandeurs d'asile",
    intro:
      "Un accompagnement humain et structuré pour vous aider à comprendre, organiser et préparer chaque étape de votre demande d'asile auprès de l'OFPRA et de la CNDA.",
    pourQui: [
      "Personnes fuyant des persécutions dans leur pays d'origine",
      "Demandeurs d'asile en cours de procédure OFPRA",
      "Personnes en attente d'entretien OFPRA ou CNDA",
    ],
    ceQueNousFaisons: [
      "Explication de la procédure OFPRA étape par étape",
      "Aide à l'organisation du récit de manière chronologique",
      "Vérification de la présence des documents nécessaires",
      "Préparation aux questions de l'entretien OFPRA",
    ],
    ceQueNousNeFaisonsPas: [
      "Écrire votre récit à votre place",
      "Modifier ou inventer des éléments de votre histoire",
      "Garantir l'obtention du statut de réfugié",
      "Donner des conseils juridiques",
    ],
    transparenceText: `${TRANSPARENCE_BASE} Nous vous accompagnons dans la compréhension et l'organisation de vos démarches, mais vous restez l'auteur de votre récit.`,
    documents: [
      "Attestation de demande d'asile",
      "Convocation OFPRA (si reçue)",
      "Pièce d'identité ou passeport",
      "Documents prouvant vos persécutions",
    ],
    etapes: [
      { n: "1", title: "Premier rendez-vous", desc: "Analyse de votre situation." },
      { n: "2", title: "Organisation", desc: "Aide à structurer votre histoire." },
      { n: "3", title: "Vérification", desc: "Contrôle de votre dossier." },
      { n: "4", title: "Préparation", desc: "Simulation d'entretien." },
    ],
  },

  etudiants: {
    title: "Étudiants (France)",
    intro:
      "Accompagnement à toutes les étapes de votre projet d'études : orientation, inscription, visa et installation en France.",
    pourQui: [
      "Étudiants souhaitant étudier en France",
      "Étudiants en France devant renouveler leur titre de séjour",
      "Étudiants changeant de statut (passage en salarié)",
    ],
    ceQueNousFaisons: [
      "Aide au choix de l'établissement et du programme",
      "Accompagnement pour l'inscription via Campus France ou Parcoursup",
      "Préparation du dossier de demande de visa étudiant",
      "Aide pour la demande de titre de séjour étudiant",
    ],
    ceQueNousNeFaisonsPas: [
      "Passer les examens ou tests de langue à votre place",
      "Garantir l'admission dans un établissement",
      "Garantir l'obtention du visa",
      "Falsifier des relevés de notes ou diplômes",
    ],
    transparenceText: `${TRANSPARENCE_BASE} Nous vous accompagnons dans vos démarches administratives.`,
    documents: [
      "Passeport valide",
      "Diplômes et relevés de notes",
      "Lettre d'admission (si déjà obtenue)",
      "Justificatifs de ressources financières",
    ],
    etapes: [
      { n: "1", title: "Orientation", desc: "Choix du programme et de l'école." },
      { n: "2", title: "Inscription", desc: "Aide aux démarches d'admission." },
      { n: "3", title: "Visa", desc: "Préparation du dossier consulaire." },
      { n: "4", title: "Installation", desc: "Démarches à l'arrivée (titre de séjour)." },
    ],
  },

  "titre-de-sejour": {
    title: "Titre de séjour",
    intro:
      "Accompagnement complet pour vos demandes et renouvellements de titre de séjour, en sécurisant chaque pièce du dossier.",
    pourQui: [
      "Première demande de titre de séjour",
      "Renouvellement de titre de séjour pluriannuel ou carte de résident",
      "Changement de statut",
    ],
    ceQueNousFaisons: [
      "Vérification de votre éligibilité",
      "Liste personnalisée des documents nécessaires",
      "Aide à la prise de rendez-vous en préfecture",
      "Aide à la préparation à l'examen du test civique",
      "Vérification de la complétude du dossier",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir la délivrance du titre par la préfecture",
      "Créer de faux justificatifs de domicile ou de travail",
      "Vous représenter physiquement à la préfecture",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Passeport valide",
      "Visa long séjour (si applicable)",
      "Justificatif de domicile",
      "Photos d'identité",
    ],
    etapes: [
      { n: "1", title: "Analyse", desc: "Vérification de votre situation." },
      { n: "2", title: "Constitution", desc: "Rassemblement des pièces." },
      { n: "3", title: "Rendez-vous", desc: "Prise de rendez-vous en préfecture." },
      { n: "4", title: "Suivi", desc: "Accompagnement jusqu'à la remise." },
    ],
  },

  naturalisation: {
    title: "Naturalisation française",
    intro:
      "Audit de votre dossier de naturalisation et préparation à l'entretien et aux tests de langue/civique.",
    pourQui: [
      "Résidents en France depuis au moins 5 ans",
      "Conjoints de Français (2 ans de mariage)",
      "Réfugiés et apatrides",
    ],
    ceQueNousFaisons: [
      "Vérification de votre éligibilité",
      "Constitution complète du dossier",
      "Préparation à l'entretien de naturalisation",
      "Aide pour le test de français (niveau B2)",
      "Aide à la préparation à l'examen du test civique",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir l'obtention de la nationalité",
      "Passer le test de langue à votre place",
      "Falsifier des documents d'état civil",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Acte de naissance avec filiation",
      "Justificatifs de résidence en France (5 dernières années)",
      "Avis d'imposition (3 dernières années)",
      "Diplôme de français (DELF B1 ou équivalent)",
    ],
    etapes: [
      { n: "1", title: "Éligibilité", desc: "Vérification des conditions." },
      { n: "2", title: "Dossier", desc: "Rassemblement des pièces." },
      { n: "3", title: "Préparation", desc: "Simulation de l'entretien." },
      { n: "4", title: "Dépôt", desc: "Soumission et suivi." },
    ],
  },

  "regroupement-familial": {
    title: "Regroupement familial",
    intro:
      "Aide à la préparation du dossier OFII pour faire venir votre conjoint et vos enfants mineurs en France.",
    pourQui: [
      "Étrangers résidant en France depuis au moins 18 mois",
      "Souhaitant faire venir conjoint et/ou enfants mineurs",
      "Disposant de ressources stables et suffisantes",
    ],
    ceQueNousFaisons: [
      "Vérification des conditions de ressources et de logement",
      "Constitution du dossier OFII",
      "Aide pour les documents à fournir",
      "Suivi de la procédure",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir l'accord de la préfecture ou de l'OFII",
      "Falsifier des fiches de paie ou des baux de location",
      "Intervenir dans les décisions consulaires",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Titre de séjour en cours de validité",
      "Justificatifs de ressources (12 derniers mois)",
      "Bail ou titre de propriété",
      "Actes de naissance et de mariage",
    ],
    etapes: [
      { n: "1", title: "Vérification", desc: "Contrôle des conditions requises." },
      { n: "2", title: "Dossier", desc: "Constitution du dossier OFII." },
      { n: "3", title: "Dépôt", desc: "Envoi et suivi de la demande." },
      { n: "4", title: "Arrivée", desc: "Démarches consulaires et accueil." },
    ],
  },

  logement: {
    title: "Aide au logement",
    intro:
      "Accompagnement pour trouver un logement en France et constituer un dossier de location solide auprès des bailleurs et agences.",
    pourQui: [
      "Nouveaux arrivants en France",
      "Étudiants sans garant français",
      "Familles avec enfants en cours de regroupement",
      "Personnes en recherche de logement social",
    ],
    ceQueNousFaisons: [
      "Constitution du dossier de location complet",
      "Aide pour la demande de logement social (DALO, SYPLO)",
      "Accompagnement aux démarches CAF (APL, ALS)",
      "Mise en relation avec des bailleurs et associations partenaires",
      "Préparation aux visites et entretiens avec propriétaires",
    ],
    ceQueNousNeFaisonsPas: [],
    transparenceText:
      "DÉMARCHES CIVIQUES vous accompagne dans la recherche et la constitution de dossier. Nous ne garantissons pas l'attribution d'un logement, mais nous maximisons vos chances avec un dossier irréprochable.",
    documents: [
      "Pièce d'identité ou titre de séjour",
      "3 derniers bulletins de salaire ou attestation de bourse",
      "Avis d'imposition (si applicable)",
      "Justificatif de domicile actuel",
    ],
    etapes: [
      { n: "1", title: "Évaluation", desc: "Analyse de votre profil et budget." },
      { n: "2", title: "Dossier", desc: "Constitution et mise en forme professionnelle." },
      { n: "3", title: "Recherche", desc: "Accompagnement aux candidatures et visites." },
      { n: "4", title: "Installation", desc: "Démarches CAF, assurance habitation, état des lieux." },
    ],
  },

  regularisation: {
    title: "Régularisation administrative",
    intro:
      "Étude de votre parcours et identification du motif de régularisation le mieux adapté à votre situation.",
    pourQui: [
      "Personnes en situation irrégulière souhaitant se régulariser",
      "Régularisation par le travail",
      "Régularisation pour vie privée et familiale",
    ],
    ceQueNousFaisons: [
      "Analyse de votre situation personnelle",
      "Identification du motif de régularisation le plus adapté",
      "Constitution du dossier de régularisation",
      "Vérification de tous les justificatifs",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir la régularisation par la préfecture",
      "Créer de fausses preuves de présence en France",
      "Vous représenter légalement en cas de refus",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Passeport ou document d'identité",
      "Justificatifs de présence en France",
      "Justificatifs de domicile",
      "Documents spécifiques selon le motif",
    ],
    etapes: [
      { n: "1", title: "Analyse", desc: "Étude de votre parcours." },
      { n: "2", title: "Stratégie", desc: "Choix du motif de régularisation." },
      { n: "3", title: "Dossier", desc: "Rassemblement des preuves." },
      { n: "4", title: "Dépôt", desc: "Soumission à la préfecture." },
    ],
  },

  cv: {
    title: "CV & Lettre de motivation",
    intro:
      "Aide à la rédaction de votre CV et de votre lettre de motivation selon les normes françaises, pour mettre en valeur votre parcours et vos compétences.",
    pourQui: [
      "Personnes cherchant un emploi en France",
      "Étudiants cherchant un stage ou une alternance",
      "Personnes en situation d'insertion professionnelle",
      "Personnes souhaitant améliorer leur CV existant",
    ],
    ceQueNousFaisons: [
      "Aide à structurer votre CV selon les normes françaises",
      "Mise en valeur de vos compétences et expériences",
      "Conseils pour adapter votre CV au poste visé",
      "Aide à la rédaction de la lettre de motivation",
    ],
    ceQueNousNeFaisonsPas: [],
    transparenceText:
      "DÉMARCHES CIVIQUES vous accompagne dans la structuration et la mise en forme de votre CV et de votre lettre de motivation. Vous restez l'auteur de votre candidature : nous vous conseillons et vous guidons à chaque étape.",
    documents: [
      "CV actuel (si existant)",
      "Liste de vos expériences professionnelles",
      "Diplômes et certifications",
      "Offre d'emploi visée (si applicable)",
    ],
    etapes: [
      { n: "1", title: "Bilan", desc: "Analyse de votre parcours." },
      { n: "2", title: "Rédaction", desc: "Structuration et mise en forme." },
      { n: "3", title: "Finalisation", desc: "Relecture et ajustements." },
    ],
  },

  dcem: {
    title: "Document de circulation pour étranger mineur (DCEM)",
    intro:
      "Accompagnement pour obtenir le Document de Circulation pour Étranger Mineur (DCEM), qui permet à votre enfant mineur étranger de voyager hors de France et d'y revenir sans visa.",
    pourQui: [
      "Parents étrangers résidant régulièrement en France avec un enfant mineur",
      "Familles dont l'enfant mineur né à l'étranger doit voyager",
      "Enfants mineurs étrangers scolarisés en France amenés à sortir du territoire",
    ],
    ceQueNousFaisons: [
      "Vérification de l'éligibilité de l'enfant au DCEM",
      "Liste personnalisée des pièces à fournir",
      "Aide à la constitution et à la vérification du dossier",
      "Aide à la prise de rendez-vous en préfecture",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir la délivrance du document par la préfecture",
      "Créer de faux documents d'état civil ou de filiation",
      "Vous représenter physiquement à la préfecture",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Titre de séjour du parent en cours de validité",
      "Acte de naissance de l'enfant avec filiation",
      "Passeport de l'enfant",
      "Justificatif de domicile et photos d'identité de l'enfant",
    ],
    etapes: [
      { n: "1", title: "Éligibilité", desc: "Vérification de la situation de l'enfant." },
      { n: "2", title: "Dossier", desc: "Rassemblement des pièces justificatives." },
      { n: "3", title: "Rendez-vous", desc: "Prise de rendez-vous en préfecture." },
      { n: "4", title: "Suivi", desc: "Accompagnement jusqu'à la remise du document." },
    ],
  },

  taj: {
    title: "Effacement du fichier TAJ",
    intro:
      "Accompagnement pour demander l'effacement ou la rectification de vos données dans le fichier TAJ (Traitement des Antécédents Judiciaires), qui peut affecter vos démarches de séjour, de naturalisation ou d'emploi.",
    pourQui: [
      "Personnes inscrites au TAJ après un classement sans suite, une relaxe ou un acquittement",
      "Personnes dont une démarche administrative est bloquée par une inscription au TAJ",
      "Personnes souhaitant faire valoir leur droit à l'effacement de leurs données",
    ],
    ceQueNousFaisons: [
      "Analyse de votre situation et des motifs d'inscription",
      "Aide à la rédaction de la demande d'effacement ou de rectification",
      "Orientation vers le bon interlocuteur (procureur, magistrat référent)",
      "Aide à la constitution du dossier de demande",
    ],
    ceQueNousNeFaisonsPas: [
      "Garantir l'effacement, qui relève d'une décision du magistrat",
      "Vous représenter en justice ou tenir un rôle d'avocat",
      "Accéder directement au fichier à votre place",
    ],
    transparenceText: TRANSPARENCE_BASE,
    documents: [
      "Pièce d'identité ou titre de séjour",
      "Décision de justice (classement sans suite, relaxe, acquittement) si disponible",
      "Justificatifs liés à la démarche bloquée",
      "Tout courrier reçu mentionnant votre inscription",
    ],
    etapes: [
      { n: "1", title: "Analyse", desc: "Étude de votre situation." },
      { n: "2", title: "Demande", desc: "Rédaction du courrier d'effacement." },
      { n: "3", title: "Dépôt", desc: "Envoi au bon interlocuteur." },
      { n: "4", title: "Suivi", desc: "Accompagnement jusqu'à la réponse." },
    ],
  },
};
