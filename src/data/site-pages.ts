import { allProjects, type Project } from './projects';

export type LocalizedText = {
  fr: string;
  en: string;
};

export type ProjectPageDefinition = {
  slug: string;
  projectIds: readonly string[];
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  cta: LocalizedText;
};

export type ServicePageDefinition = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  audience: LocalizedText;
  deliverables: LocalizedText[];
  approach: LocalizedText[];
  outcomes: LocalizedText[];
  faq: Array<{
    question: LocalizedText;
    answer: LocalizedText;
  }>;
  relatedProjectSlugs: readonly string[];
};

/**
 * The project pages exposed in the portfolio. The source project records
 * remain in src/data/projects and are rendered in full by the route page;
 * this file owns the public URL and SEO framing.
 */
const featuredProjectPageDefinitions: readonly ProjectPageDefinition[] = [
  {
    slug: "altme-wallet-provider",
    projectIds: ["wallet-provider"],
    title: {
      fr: "Altme Wallet Provider",
      en: "Altme Wallet Provider",
    },
    description: {
      fr: "Contribution à un produit de wallet d’identité numérique, de credentials vérifiables et d’interopérabilité européenne.",
      en: "Contribution to a digital-identity wallet product built around verifiable credentials and European interoperability.",
    },
    intro: {
      fr: "Une étude de cas publique qui détaille le contexte produit, ma contribution et la valeur livrée, tout en respectant la confidentialité des implémentations.",
      en: "A public case study covering the product context, my contribution and the value delivered while respecting implementation confidentiality.",
    },
    cta: {
      fr: "Parler d’un projet d’identité numérique",
      en: "Discuss a digital-identity project",
    },
  },
  {
    slug: "automatisations-n8n-reporting",
    projectIds: ["n8n-reporting"],
    title: {
      fr: "Automatisations n8n — Reporting",
      en: "n8n Automations — Reporting",
    },
    description: {
      fr: "Workflow n8n qui transforme un export PDF SocialPilot en rapport CM client structuré, analysé et prêt à relire.",
      en: "An n8n workflow that turns a SocialPilot PDF export into a structured, analysed client community-management report.",
    },
    intro: {
      fr: "Le flux couvre la réception, l’archivage, la normalisation des KPI, l’analyse bornée, la génération du PDF, le contrôle qualité et la livraison.",
      en: "The workflow covers intake, archiving, KPI normalisation, bounded analysis, PDF generation, quality checks and delivery.",
    },
    cta: {
      fr: "Automatiser un reporting similaire",
      en: "Automate a similar reporting flow",
    },
  },
  {
    slug: "automatisations-n8n-derush-video",
    projectIds: ["n8n-video-derush"],
    title: {
      fr: "Automatisations n8n — Dérush vidéo",
      en: "n8n Automations — Video derush",
    },
    description: {
      fr: "Pipeline n8n qui transforme des rushes bruts en séquences sélectionnées, transcrites et préparées pour le montage Instagram/TikTok.",
      en: "An n8n pipeline that turns raw footage into selected, transcribed and edit-ready sequences for Instagram and TikTok.",
    },
    intro: {
      fr: "De l’ingestion Drive au package de production, le workflow garde les timecodes, les sous-titres, la preview et les contrôles de qualité traçables.",
      en: "From Drive intake to the production package, the workflow keeps timestamps, subtitles, previews and quality checks traceable.",
    },
    cta: {
      fr: "Préparer un pipeline de dérush",
      en: "Prepare a video-derush pipeline",
    },
  },
  {
    slug: "altme-wallet-platform",
    projectIds: ["altme-wallet"],
    title: {
      fr: "Altme Wallet Platform",
      en: "Altme Wallet Platform",
    },
    description: {
      fr: "Développement et amélioration de briques d’une plateforme wallet réunissant credentials, NFTs et données de cryptomonnaies.",
      en: "Development and improvement of wallet-platform building blocks combining credentials, NFTs and cryptocurrency data.",
    },
    intro: {
      fr: "La fiche présente le périmètre Discover, les intégrations de données et la contribution réalisée au sein de l’équipe produit.",
      en: "The case study presents the Discover scope, data integrations and the contribution delivered as part of the product team.",
    },
    cta: {
      fr: "Discuter d’une plateforme métier",
      en: "Discuss a business platform",
    },
  },
] as const;

const featuredProjectIds = new Set(
  featuredProjectPageDefinitions.flatMap((definition) => definition.projectIds),
);

const projectIntros: Record<string, LocalizedText> = {
  "altme-documentation": {
    fr: "Documentation technique publiée en versions GitBook et Docusaurus pour guider l’intégration d’Altme Wallet Provider.",
    en: "Technical documentation published in GitBook and Docusaurus versions to guide Altme Wallet Provider integrations.",
  },
  "teams-bot-mastra": {
    fr: "Bot Microsoft Teams relié à Mastra pour agréger des flux RSS, préparer une synthèse NLP et la rendre exploitable dans l’équipe.",
    en: "A Microsoft Teams bot connected to Mastra to aggregate RSS feeds, prepare an NLP summary and make it useful to the team.",
  },
  "seo-geo-optimization": {
    fr: "Mission d’optimisation SEO et de référencement local centrée sur l’audit, les données structurées, le contenu et le suivi.",
    en: "An SEO and local-search engagement focused on audits, structured data, content and performance follow-up.",
  },
  "eloi-coachsteo": {
    fr: "Site vitrine pour présenter les accompagnements d’un coach sportif et ostéopathe, avec une galerie avant/après et un parcours de contact direct.",
    en: "A showcase website for a sports coach and osteopath, with a before-and-after gallery and a direct contact journey.",
  },
  "erp-micro-creches": {
    fr: "ERP métier pour centraliser le suivi de plusieurs micro-crèches, les comptes familles, les documents et les parcours d’administration.",
    en: "A business ERP for centralising multi-nursery operations, family accounts, documents and administration workflows.",
  },
  "luxury-auto-detailing": {
    fr: "Site vitrine orienté prestations pour présenter une activité de detailing automobile et faciliter la demande de rendez-vous.",
    en: "A service-led showcase website presenting an auto-detailing business and making appointment requests easier.",
  },
  cledevoute: {
    fr: "Site vitrine de maçonnerie conçu pour présenter les prestations, les réalisations et un accès rapide au contact.",
    en: "A masonry showcase website built to present services, completed work and a clear route to contact.",
  },
  "berserk-universe": {
    fr: "Plateforme open source consacrée à l’univers de Berserk, avec fiches de personnages, analyses et carte interactive.",
    en: "An open-source platform about Berserk, combining character profiles, analysis and an interactive map.",
  },
  "codex-limits-usage": {
    fr: "Application Windows locale pour suivre la consommation des quotas Codex et estimer leur épuisement selon le rythme de travail.",
    en: "A local Windows application for tracking Codex quota usage and estimating exhaustion from the current work pace.",
  },
  "pokemon-binder": {
    fr: "Application web de collection pour ajouter, classer, rechercher et visualiser des cartes Pokémon TCG dans un classeur virtuel.",
    en: "A collection web app for adding, organising, searching and viewing Pokémon TCG cards in a virtual binder.",
  },
  "ia-trading": {
    fr: "Projet expérimental de collecte de données, backtesting et analyse de signaux de marché avec IA, sans promesse de performance financière.",
    en: "An experimental project for market-data collection, backtesting and AI-assisted signal analysis, with no financial-performance claim.",
  },
  patripro: {
    fr: "Tableau de bord pour centraliser le suivi des comptes, placements, budgets et emprunts dans une même interface.",
    en: "A dashboard for centralising accounts, investments, budgets and loans in one interface.",
  },
  "ats-filter-resume": {
    fr: "Outil d’analyse ATS qui transforme un CV et une offre en retour lisible sur les correspondances, les écarts et les améliorations possibles.",
    en: "An explainable ATS analysis tool that turns a CV and a job offer into readable matches, gaps and improvement suggestions.",
  },
  "novotel-roue-chance": {
    fr: "Parcours mobile accessible par QR code pour recueillir un retour restaurant et animer une roue promotionnelle au NOVOTEL Reims Tinqueux.",
    en: "A QR-accessible mobile journey for restaurant feedback and a promotional prize wheel at NOVOTEL Reims Tinqueux.",
  },
  aqualis: {
    fr: "Projet mobile complet conservé dans la catégorie gaming, avec sa fiche, ses visuels et son contenu détaillé.",
    en: "A complete mobile project kept in the gaming category with its full record, visuals and detailed content.",
  },
  "nolvus-mod-automation": {
    fr: "Script AutoHotkey qui automatise les clics répétitifs nécessaires au téléchargement de mods Nolvus sans compte premium.",
    en: "An AutoHotkey script automating repetitive clicks required to download Nolvus mods without a premium account.",
  },
  "bloodborne-shadps4": {
    fr: "Guide d’installation de Bloodborne via l’émulateur ShadPS4, avec mods graphiques et corrections de compatibilité documentées.",
    en: "An installation guide for Bloodborne through the ShadPS4 emulator, with documented graphics mods and compatibility fixes.",
  },
  "demons-souls-rpcs3": {
    fr: "Guide d’installation de Demon’s Souls via RPCS3, avec réglages graphiques et corrections utiles pour jouer sur PC.",
    en: "An installation guide for Demon’s Souls through RPCS3, with graphics settings and useful PC fixes.",
  },
};

const genericProjectPageDefinition = (project: Project): ProjectPageDefinition => {
  const englishProject = project.translations?.en;
  const title = project.title;
  const englishTitle = englishProject?.title ?? title;
  const description = project.description;
  const englishDescription = englishProject?.description ?? description;

  return {
    slug: project.id,
    projectIds: [project.id],
    title: { fr: title, en: englishTitle },
    description: { fr: description, en: englishDescription },
    intro: projectIntros[project.id] ?? { fr: description, en: englishDescription },
    cta: {
      fr: "Discuter d’un projet similaire",
      en: "Discuss a similar project",
    },
  };
};

const additionalProjectPageDefinitions = allProjects
  .filter((project) => !featuredProjectIds.has(project.id))
  .map(genericProjectPageDefinition);

export const projectPageDefinitions: readonly ProjectPageDefinition[] = [
  ...featuredProjectPageDefinitions,
  ...additionalProjectPageDefinitions,
];

export const servicePageDefinitions: readonly ServicePageDefinition[] = [
  {
    slug: "sites-vitrines",
    title: {
      fr: "Sites vitrines et présence en ligne",
      en: "Showcase websites and online presence",
    },
    description: {
      fr: "Des sites vitrines clairs, rapides et responsive pour présenter une activité et faciliter la prise de contact.",
      en: "Clear, fast and responsive showcase websites that present a business and make contact easier.",
    },
    intro: {
      fr: "Une grande partie de mes missions freelance concerne des sites vitrines. Je prends en charge la structure, l’intégration, le responsive, le SEO de base et la mise en ligne.",
      en: "A large part of my freelance work concerns showcase websites. I handle structure, implementation, responsive behaviour, baseline SEO and release.",
    },
    audience: {
      fr: "Entreprises locales, indépendants et petites équipes qui ont besoin d’une vitrine crédible, lisible sur mobile et simple à faire évoluer.",
      en: "Local businesses, independent professionals and small teams that need a credible, mobile-friendly showcase that can evolve cleanly.",
    },
    deliverables: [
      {
        fr: "Arborescence et contenus structurés autour de l’activité, des services et des réalisations.",
        en: "A site structure and content hierarchy built around the business, services and completed work.",
      },
      {
        fr: "Interface responsive, accessible et cohérente avec l’identité visuelle existante.",
        en: "A responsive, accessible interface aligned with the existing visual identity.",
      },
      {
        fr: "Fondations SEO : titres, descriptions, données structurées, partage social et performance contrôlée.",
        en: "SEO foundations: titles, descriptions, structured data, social sharing and checked performance.",
      },
      {
        fr: "Mise en ligne documentée, avec les éléments nécessaires pour reprendre le site après la livraison.",
        en: "A documented release with the information needed to take over the site after delivery.",
      },
    ],
    approach: [
      {
        fr: "Cadrer l’activité, les utilisateurs et l’action attendue sur chaque page.",
        en: "Scope the business, users and expected action for each page.",
      },
      {
        fr: "Construire une première version visible, puis ajuster les contenus et les détails d’interface.",
        en: "Build a visible first version, then refine content and interface details.",
      },
      {
        fr: "Tester les parcours, les tailles d’écran et la qualité du rendu avant la mise en ligne.",
        en: "Test journeys, screen sizes and rendering quality before release.",
      },
    ],
    outcomes: [
      {
        fr: "Une présentation professionnelle qui permet de comprendre l’offre sans chercher l’information.",
        en: "A professional presentation that makes the offer easy to understand.",
      },
      {
        fr: "Un accès direct à la prise de contact depuis mobile comme depuis desktop.",
        en: "A direct path to contact from both mobile and desktop.",
      },
      {
        fr: "Une base maintenable, documentée et prête à accueillir les prochaines évolutions.",
        en: "A documented, maintainable base ready for future improvements.",
      },
    ],
    faq: [
      {
        question: { fr: "Combien de pages faut-il prévoir ?", en: "How many pages should we plan?" },
        answer: {
          fr: "Le nombre dépend de l’activité et du contenu disponible. Nous retenons uniquement les pages utiles à la compréhension et à la prise de contact.",
          en: "It depends on the business and available content. We keep only the pages that help visitors understand the offer and get in touch.",
        },
      },
      {
        question: { fr: "Le site sera-t-il adapté au mobile ?", en: "Will the site work on mobile?" },
        answer: {
          fr: "Oui. Le responsive est vérifié sur les largeurs mobiles, tablette et desktop avant la livraison.",
          en: "Yes. Responsive behaviour is checked across mobile, tablet and desktop widths before delivery.",
        },
      },
      {
        question: { fr: "Pouvez-vous reprendre un site existant ?", en: "Can you take over an existing site?" },
        answer: {
          fr: "Oui, après un audit ciblé du code, de l’hébergement et des priorités. Le plan de reprise est défini avant les évolutions.",
          en: "Yes, after a focused review of the code, hosting and priorities. The takeover plan is defined before new work starts.",
        },
      },
    ],
    relatedProjectSlugs: ["cledevoute", "eloi-coachsteo"],
  },
  {
    slug: "applications-metier",
    title: {
      fr: "Applications métier sur mesure",
      en: "Tailored business applications",
    },
    description: {
      fr: "Des ERP légers, back-offices, portails internes et tableaux de bord qui traduisent vos règles métier en parcours simples.",
      en: "Light ERPs, back offices, internal portals and dashboards that turn business rules into clear workflows.",
    },
    intro: {
      fr: "Je pars du fonctionnement réel de l’équipe pour construire un outil utilisable, avec les droits, les données et les cas de reprise nécessaires.",
      en: "I start from how the team actually works and build a usable tool with the access rules, data and recovery paths it needs.",
    },
    audience: {
      fr: "PME et équipes qui suivent encore leurs opérations dans plusieurs fichiers, outils ou échanges difficiles à consolider.",
      en: "SMEs and teams still tracking operations across multiple files, tools or conversations that are hard to consolidate.",
    },
    deliverables: [
      {
        fr: "Parcours métier, rôles et permissions définis avec les utilisateurs concernés.",
        en: "Business journeys, roles and permissions defined with the people who use them.",
      },
      {
        fr: "Interface web, API et modèle de données adaptés au périmètre réellement prioritaire.",
        en: "A web interface, API and data model sized to the genuinely useful scope.",
      },
      {
        fr: "Contrôles sur les cas nominaux, erreurs, doublons et changements de contexte.",
        en: "Checks for normal cases, errors, duplicates and context changes.",
      },
      {
        fr: "Documentation de prise en main et de maintenance pour l’équipe.",
        en: "Usage and maintenance documentation for the team.",
      },
    ],
    approach: [
      {
        fr: "Observer le process actuel et choisir un premier périmètre livrable.",
        en: "Understand the current process and choose a first deliverable boundary.",
      },
      {
        fr: "Livrer par lots courts, avec des validations sur les écrans et les règles métier.",
        en: "Deliver in short increments, validating screens and business rules as we go.",
      },
      {
        fr: "Stabiliser les données, les droits et la transmission avant d’ajouter des fonctions secondaires.",
        en: "Stabilise data, permissions and handover before adding secondary features.",
      },
    ],
    outcomes: [
      {
        fr: "Une source de travail partagée qui réduit les ressaisies et les informations dispersées.",
        en: "A shared working source that reduces rekeying and scattered information.",
      },
      {
        fr: "Des règles métier visibles dans l’outil et vérifiables par l’équipe.",
        en: "Business rules made visible in the tool and verifiable by the team.",
      },
      {
        fr: "Un livrable documenté que l’équipe peut reprendre et faire évoluer.",
        en: "A documented deliverable the team can take over and evolve.",
      },
    ],
    faq: [
      {
        question: { fr: "Faut-il définir tout le produit avant de commencer ?", en: "Do we need to define the whole product first?" },
        answer: {
          fr: "Non. Le cadrage sert à choisir un premier lot utile, puis les retours du terrain guident les lots suivants.",
          en: "No. Scoping identifies a useful first increment, then real feedback guides the next increments.",
        },
      },
      {
        question: { fr: "Les droits d’accès sont-ils prévus ?", en: "Are access rules included?" },
        answer: {
          fr: "Oui, lorsqu’ils sont nécessaires au fonctionnement. Les rôles et périmètres sont définis avec les utilisateurs concernés.",
          en: "Yes, when they are part of the need. Roles and boundaries are defined with the relevant users.",
        },
      },
      {
        question: { fr: "Pouvez-vous connecter l’outil à l’existant ?", en: "Can you connect the tool to existing systems?" },
        answer: {
          fr: "Oui, si les interfaces ou exports nécessaires sont disponibles. Les intégrations sont cadrées et testées avec le périmètre de la mission.",
          en: "Yes, when the required interfaces or exports are available. Integrations are scoped and tested within the engagement boundary.",
        },
      },
    ],
    relatedProjectSlugs: ["erp-micro-creches", "altme-wallet-platform"],
  },
  {
    slug: "automatisations-n8n",
    title: {
      fr: "Automatisations n8n et workflows IA",
      en: "n8n automation and AI workflows",
    },
    description: {
      fr: "Des workflows documentés pour relier vos outils, transformer vos données et préparer des livrables contrôlables.",
      en: "Documented workflows that connect tools, transform data and prepare outputs that can be checked.",
    },
    intro: {
      fr: "Je conçois des chaînes n8n qui vont de la réception des sources à la sortie attendue : reporting, notifications, transcription, sélection et pré-montage.",
      en: "I design n8n chains from source intake to the expected output: reporting, notifications, transcription, selection and pre-editing.",
    },
    audience: {
      fr: "Équipes qui répètent les mêmes manipulations entre email, fichiers, outils métiers, médias et documents à livrer.",
      en: "Teams repeating the same manipulations between email, files, business tools, media and documents to deliver.",
    },
    deliverables: [
      {
        fr: "Workflow n8n lisible, découpé en étapes et relié aux outils réellement utilisés.",
        en: "A readable n8n workflow split into steps and connected to the tools actually in use.",
      },
      {
        fr: "Normalisation des données, contrôles de doublons et statuts de traitement.",
        en: "Data normalisation, duplicate checks and processing statuses.",
      },
      {
        fr: "Traitements IA ou média bornés, avec une validation humaine lorsque le résultat le demande.",
        en: "Bounded AI or media processing, with human review where the output requires it.",
      },
      {
        fr: "Livrables, notifications, reprise sur erreur et documentation de maintenance.",
        en: "Deliverables, notifications, error recovery and maintenance documentation.",
      },
    ],
    approach: [
      {
        fr: "Cartographier les entrées, les règles métier, les exceptions et la sortie attendue.",
        en: "Map inputs, business rules, exceptions and the expected output.",
      },
      {
        fr: "Construire le flux par étapes testables, en gardant les sources et les statuts traçables.",
        en: "Build the flow in testable steps while keeping sources and statuses traceable.",
      },
      {
        fr: "Contrôler le contenu et la forme du livrable, puis documenter la reprise et les limites.",
        en: "Check the content and form of the output, then document recovery paths and limits.",
      },
    ],
    outcomes: [
      {
        fr: "Moins de préparation manuelle entre les outils et des étapes visibles par l’équipe.",
        en: "Less manual preparation between tools and steps that remain visible to the team.",
      },
      {
        fr: "Des livrables homogènes, reliés à leurs sources et prêts à être relus ou produits.",
        en: "Consistent outputs linked to their sources and ready for review or production.",
      },
      {
        fr: "Un workflow transmissible plutôt qu’une automatisation opaque impossible à reprendre.",
        en: "A transferable workflow rather than an opaque automation no one can take over.",
      },
    ],
    faq: [
      {
        question: { fr: "Peut-on garder une validation humaine ?", en: "Can we keep a human review step?" },
        answer: {
          fr: "Oui. Les workflows peuvent préparer, contrôler et notifier un livrable avant sa validation ou sa publication manuelle.",
          en: "Yes. Workflows can prepare, check and notify an output before human approval or manual publication.",
        },
      },
      {
        question: { fr: "Que se passe-t-il si une étape échoue ?", en: "What happens when a step fails?" },
        answer: {
          fr: "Les erreurs utiles sont isolées, signalées et documentées afin de permettre une reprise sans recommencer toute la chaîne.",
          en: "Useful errors are isolated, reported and documented so the flow can resume without restarting everything.",
        },
      },
      {
        question: { fr: "Quels outils peuvent être connectés ?", en: "Which tools can be connected?" },
        answer: {
          fr: "Cela dépend des API, exports ou emails disponibles. Le périmètre est validé pendant le cadrage avant de construire les intégrations.",
          en: "It depends on available APIs, exports or emails. The boundary is confirmed during scoping before integrations are built.",
        },
      },
    ],
    relatedProjectSlugs: ["automatisations-n8n-reporting", "automatisations-n8n-derush-video"],
  },
] as const;

const projectPageBySlug = new Map(
  projectPageDefinitions.map((definition) => [definition.slug, definition]),
);

const projectSlugById = new Map(
  projectPageDefinitions.flatMap((definition) =>
    definition.projectIds.map((projectId) => [projectId, definition.slug] as const),
  ),
);

const servicePageBySlug = new Map(
  servicePageDefinitions.map((definition) => [definition.slug, definition]),
);

export const getProjectPage = (slug: string | undefined) =>
  slug ? projectPageBySlug.get(slug) : undefined;

export const getProjectPagePath = (projectId: string) => {
  const slug = projectSlugById.get(projectId);
  return slug ? `/projets/${slug}` : undefined;
};

export const getServicePage = (slug: string | undefined) =>
  slug ? servicePageBySlug.get(slug) : undefined;

export const getServicePagePath = (slug: string) => `/services/${slug}`;

export const canonicalProjectSlugs = projectPageDefinitions.map(({ slug }) => slug);
export const canonicalServiceSlugs = servicePageDefinitions.map(({ slug }) => slug);
