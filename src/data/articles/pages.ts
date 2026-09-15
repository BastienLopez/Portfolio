import type { ArticleCategory } from "./types";

export type ArticlePageDefinition = {
  id: string;
  slug: string;
  category: ArticleCategory;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  relatedProjectSlugs: readonly string[];
};

/**
 * A small, deliberate selection of notes with stable URLs. The full notes
 * library remains available from the homepage; only these articles are
 * promoted to crawlable standalone pages for now.
 */
export const articlePageDefinitions: readonly ArticlePageDefinition[] = [
  {
    id: "devops-12",
    slug: "pipeline-ci-cd-github-actions",
    category: "devops",
    title: {
      fr: "Mettre en place une pipeline CI/CD simple avec GitHub Actions",
      en: "Set up a simple CI/CD pipeline with GitHub Actions",
    },
    description: {
      fr: "Une méthode concrète pour relier lint, tests et build dans une pipeline CI/CD GitHub Actions exploitable.",
      en: "A practical way to connect linting, tests and builds in a maintainable GitHub Actions CI/CD pipeline.",
    },
    relatedProjectSlugs: ["automatisations-n8n-reporting"],
  },
  {
    id: "devops-15",
    slug: "docker-pour-debutants",
    category: "devops",
    title: {
      fr: "Docker pour les débutants : comprendre images, conteneurs et volumes",
      en: "Docker for beginners: understanding images, containers and volumes",
    },
    description: {
      fr: "Les bases utiles de Docker : images, conteneurs, volumes et repères pour isoler un environnement de développement.",
      en: "The useful Docker fundamentals: images, containers, volumes and the basics of an isolated development environment.",
    },
    relatedProjectSlugs: ["codex-limits-usage"],
  },
  {
    id: "devops-20",
    slug: "monitorer-une-application-apres-deploiement",
    category: "devops",
    title: {
      fr: "Surveiller et monitorer ses apps après déploiement",
      en: "How to monitor your apps after deployment",
    },
    description: {
      fr: "Une introduction opérationnelle aux logs, métriques, traces et alertes qui rendent une application observable après sa mise en ligne.",
      en: "An operational introduction to logs, metrics, traces and alerts that make an application observable after release.",
    },
    relatedProjectSlugs: ["automatisations-n8n-reporting"],
  },
  {
    id: "architecture-33",
    slug: "architecture-hexagonale",
    category: "architecture",
    title: {
      fr: "Quand (et comment) adopter une architecture hexagonale",
      en: "When (and how) to adopt hexagonal architecture",
    },
    description: {
      fr: "Quand et comment isoler le cœur métier des bases de données, APIs et interfaces avec une architecture hexagonale.",
      en: "When and how to isolate business rules from databases, APIs and interfaces with hexagonal architecture.",
    },
    relatedProjectSlugs: ["erp-micro-creches"],
  },
  {
    id: "freelance-49",
    slug: "deploiement-production-checklist",
    category: "freelance",
    title: {
      fr: "Déploiement en production : check-list et bonnes pratiques de livraison",
      en: "Production deployment: checklist and delivery best practices",
    },
    description: {
      fr: "Une check-list de livraison pour préparer la production, vérifier les accès et transmettre un projet repris par l’équipe.",
      en: "A release checklist for preparing production, checking access and handing a project over to its team.",
    },
    relatedProjectSlugs: ["cledevoute"],
  },
  {
    id: "tools-27",
    slug: "gerer-secrets-cles-api-local",
    category: "tools",
    title: {
      fr: "Gérer ses secrets et clés API en local sans risque",
      en: "Manage your secrets and API keys locally without risk",
    },
    description: {
      fr: "Les règles pratiques pour conserver les secrets et clés API hors du dépôt, du navigateur et des journaux applicatifs.",
      en: "Practical rules for keeping secrets and API keys out of repositories, browsers and application logs.",
    },
    relatedProjectSlugs: ["codex-limits-usage"],
  },
  {
    id: "culture-7",
    slug: "refactoring-sans-tout-casser",
    category: "culture",
    title: {
      fr: "Comment faire du refactoring sans tout casser",
      en: "How to refactor without breaking everything",
    },
    description: {
      fr: "Une approche progressive du refactoring : réduire le risque, préserver le comportement observable et vérifier chaque étape.",
      en: "A gradual approach to refactoring: reduce risk, preserve observable behaviour and verify every step.",
    },
    relatedProjectSlugs: ["altme-wallet-platform"],
  },
  {
    id: "freelance-45",
    slug: "estimer-un-projet-freelance",
    category: "freelance",
    title: {
      fr: "Comment estimer un projet (temps, coûts, complexité)",
      en: "How to estimate a project (time, costs, complexity)",
    },
    description: {
      fr: "Une méthode pour découper un projet freelance, expliciter les hypothèses et présenter une estimation compréhensible.",
      en: "A method for breaking down a freelance project, making assumptions explicit and presenting a readable estimate.",
    },
    relatedProjectSlugs: ["erp-micro-creches"],
  },
  {
    id: "freelance-53",
    slug: "creer-site-internet-entreprise-cadrage",
    category: "freelance",
    title: {
      fr: "Créer un site internet pour son entreprise : cadrer le projet",
      en: "Creating a business website: how to frame the project",
    },
    description: {
      fr: "Les questions à poser pour cadrer un site d’entreprise, structurer les pages utiles et préparer un socle SEO maintenable.",
      en: "The questions to ask when framing a business website, structuring useful pages and preparing a maintainable SEO foundation.",
    },
    relatedProjectSlugs: ["eloi-coachsteo"],
  },
  {
    id: "freelance-54",
    slug: "automatiser-processus-entreprise-n8n-cadrage",
    category: "freelance",
    title: {
      fr: "Automatiser un processus d’entreprise avec n8n : méthode de cadrage",
      en: "Automating a business process with n8n: a framing method",
    },
    description: {
      fr: "Une méthode pour décrire un processus répétitif, prévoir les erreurs et mettre en place une automatisation n8n traçable.",
      en: "A method for describing a repeated process, planning for errors and building a traceable n8n automation.",
    },
    relatedProjectSlugs: ["automatisations-n8n-reporting"],
  },
];

export const getArticlePageDefinition = (slug: string | undefined) =>
  slug ? articlePageDefinitions.find((definition) => definition.slug === slug) : undefined;

export const getArticlePageDefinitionById = (id: string) =>
  articlePageDefinitions.find((definition) => definition.id === id);

export const canonicalArticleSlugs = articlePageDefinitions.map(({ slug }) => slug);
