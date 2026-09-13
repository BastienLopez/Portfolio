import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allProjects, Project, ProjectGalleryItem } from "@/data/projects";
import { getEnglishDetailedContent } from "@/data/projects/englishDetails";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { useLanguage } from "@/lib/i18n";
import { getHistoryState, getProjectIdFromHash } from "@/lib/project-navigation";
import {
  decorateDetailedContent,
  renderProjectMarkdown,
} from "@/lib/project-content";
import { getImageManifestEntry, getImageSrcSet } from "@/lib/image-variants";

type DisplayProjectCategory = Project["category"];
type DisplayProject = Project;

type FeaturedCaseStudySection = {
  title: string;
  items: string[];
};

type FeaturedCaseStudy = {
  id: string;
  title: string;
  context: string;
  need: string;
  solution: string;
  stack: string;
  result: string;
  role: string;
  tasks: string[];
  gains: string[];
  sections: FeaturedCaseStudySection[];
};

const portfolioProjects: DisplayProject[] = allProjects;
const freelancePageProjectIds = new Set([
  "ats-filter-resume",
  "n8n-workflow-automation",
  "seo-geo-optimization",
]);
const freelanceProjects: DisplayProject[] = allProjects.filter(
  (project) =>
    project.category === "freelance" || freelancePageProjectIds.has(project.id),
);

const freelanceDisplayOrder = [
  "eloi-coachsteo",
  "cledevoute",
  "luxury-auto-detailing",
  "ats-filter-resume",
  "erp-micro-creches",
  "seo-geo-optimization",
  "n8n-workflow-automation",
];

const freelanceDisplayOrderIndex = new Map(
  freelanceDisplayOrder.map((id, index) => [id, index]),
);

const freelancePageTitleOverrides: Record<string, string> = {
  "seo-geo-optimization": "SEO & GEO référencement local",
};

const openSourceDisplayOrder = [
  "ia-trading",
  "ats-filter-resume",
  "codex-limits-usage",
  "berserk-universe",
  "pokemon-binder",
  "patripro",
  "novotel-roue-chance",
];

const openSourceDisplayOrderIndex = new Map(
  openSourceDisplayOrder.map((id, index) => [id, index]),
);

const englishProjectSummaries: Record<
  string,
  Pick<DisplayProject, "title" | "description">
> = {
  "altme-wallet": {
    title: "Altme Wallet Platform",
    description:
      "Backend platform development and improvement for managing digital wallets and verifiable credentials.",
  },
  "altme-documentation": {
    title: "Altme Documentation",
    description:
      "Creation and maintenance of developer documentation for Altme Wallet Provider, across GitBook and Docusaurus.",
  },
  "seo-geo-optimization": {
    title: "SEO & Local Search Visibility",
    description:
      "SEO and local-search work for business websites: audit, structured data, content and performance monitoring.",
  },
  "n8n-workflow-automation": {
    title: "n8n Automations — Reporting, Video Derush & Prospecting",
    description:
      "n8n workflows for social-media reporting, social-video preparation and prospect-list preparation from Google Maps.",
  },
  "eloi-coachsteo": {
    title: "Eloi CoachSteo — Sport Trainer",
    description:
      "One-page showcase website for a sports coach and osteopath, presenting fitness, physical preparation and tailored HYROX programmes.",
  },
  "luxury-auto-detailing": {
    title: "Luxury Auto Detailing",
    description:
      "Showcase website for premium car-detailing services: cleaning, polishing, ceramic protection and interior restoration.",
  },
  cledevoute: {
    title: "Cle De Voute — Masonry",
    description:
      "Showcase website for Cle De Voute Masonry, presenting services and completed work.",
  },
  "berserk-universe": {
    title: "Berserk Universe",
    description:
      "Interactive platform dedicated to Kentarō Miura's Berserk universe, with summaries, character analysis and an interactive map.",
  },
  "codex-limits-usage": {
    title: "Codex Limits Usage",
    description:
      "Local Windows application that displays remaining Codex quota, measures consumption rate, and estimates when quota reaches 0% based on a configurable work schedule.",
  },
  "pokemon-binder": {
    title: "Pokémon Binder",
    description:
      "Web application for managing a Pokémon TCG card collection in a virtual binder, with search and collection statistics.",
  },
  "ia-trading": {
    title: "AI Stock Trading Bot",
    description:
      "Experimental data-collection, backtesting and AI market-signal analysis project, with no financial performance claims.",
  },
  patripro: {
    title: "PatriPro",
    description:
      "Application that centralises the tracking of accounts, investments, budgets and loans in one dashboard.",
  },
  "ats-filter-resume": {
    title: "ATS Filter Resume — Explainable CV Analysis",
    description:
      "Full-stack CV ATS-analysis application with prioritised, explainable recommendations, with or without a job description.",
  },
  "novotel-roue-chance": {
    title: "NOVOTEL — Prize Wheel",
    description:
      "QR-accessible mobile journey for NOVOTEL Reims Tinqueux, combining restaurant feedback with a promotional prize wheel.",
  },
  aqualis: {
    title: "Aqualis",
    description:
      "Gamified aquarium app for focus sessions: earn gold and XP, collect fish, manage aquariums and start breeding.",
  },
  "nolvus-mod-automation": {
    title: "Nolvus Mod Automation",
    description:
      "AutoHotkey script that automates many repetitive clicks needed to download Nolvus files without a premium account.",
  },
  "bloodborne-shadps4": {
    title: "Bloodborne — Emulator Installation Guide",
    description:
      "Installation guide for Bloodborne through the shadPS4 emulator, including graphical mods and community fixes.",
  },
  "demons-souls-rpcs3": {
    title: "Demon's Souls — Emulator Installation Guide",
    description:
      "Installation guide for Demon's Souls through RPCS3, including graphical mods and community fixes.",
  },
  "erp-micro-creches": {
    title: "Micro-nursery ERP",
    description:
      "A tailored business application for centralising administration, permissions and multi-site follow-up.",
  },
  "teams-bot-mastra": {
    title: "Teams Bot & Mastra Agents",
    description:
      "A Microsoft Teams bot that centralises technology monitoring with targeted AI-assisted summaries and alerts.",
  },
  "wallet-provider": {
    title: "Altme Wallet Provider",
    description:
      "Contribution to an enterprise digital-identity wallet product and its technical ecosystem.",
  },
};

const featuredProjectConfig: Record<string, { emoji: string }> =
  {
    "erp-micro-creches": { emoji: "💼" },
    "teams-bot-mastra": { emoji: "🤖" },
    "n8n-workflow-automation": { emoji: "⚙️" },
    "wallet-provider": { emoji: "🌐" },
  };

const resolveImage = (img?: string | null) => {
  if (!img) return "";
  if (img.startsWith("http") || img.startsWith("data:")) return img;
  const normalized = img.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
};

const shouldContainProjectImage = (project: DisplayProject) => {
  const entry = getImageManifestEntry(project.image);
  if (!entry) return false;

  // Preserve square/portrait artwork (wallet screens, documentation covers,
  // desktop screenshots) while letting wide project captures fill the card.
  return entry.width / entry.height < 1.35;
};

const prepareDetailedContent = (content: string) => {
  const renderedContent = content.trimStart().startsWith("# ")
    ? renderProjectMarkdown(content)
    : content;

  return DOMPurify.sanitize(
    decorateDetailedContent(renderedContent),
  );
};

type ProjectsProps = {
  mode?: "portfolio" | "freelance";
};

const Projects = ({ mode = "portfolio" }: ProjectsProps) => {
  const { isEnglish } = useLanguage();
  const isFreelancePage = mode === "freelance";
  const projectsForView = isFreelancePage ? freelanceProjects : portfolioProjects;
  const [selectedCategory, setSelectedCategory] =
    useState<DisplayProjectCategory | null>(isFreelancePage ? "freelance" : "emploi");
  const [selectedProject, setSelectedProject] = useState<DisplayProject | null>(
    null,
  );
  const [selectedFeaturedProjectId, setSelectedFeaturedProjectId] =
    useState<string | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(
    null,
  );
  const projectsHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const projectDetailRef = useRef<HTMLDivElement | null>(null);
  const galleryViewerRef = useRef<HTMLDivElement | null>(null);
  const hadProjectSelectionRef = useRef(false);
  const localizeProject = (project: DisplayProject) => {
    const englishDetailedContent = getEnglishDetailedContent(project.id);
    const localizedProject = isEnglish
      ? {
          ...project,
          ...project.translations?.en,
          ...englishProjectSummaries[project.id],
          ...(englishDetailedContent ? { detailedContent: englishDetailedContent } : {}),
        }
      : project;
    const freelanceTitle =
      !isEnglish && isFreelancePage
        ? freelancePageTitleOverrides[project.id]
        : undefined;

    return freelanceTitle
      ? { ...localizedProject, title: freelanceTitle }
      : localizedProject;
  };
  const featuredCaseStudies: FeaturedCaseStudy[] = isEnglish
    ? [
        {
          id: "erp-micro-creches",
          title: "Micro-nursery ERP",
          context:
            "A network of micro-nurseries with administration spread across multiple tools.",
          need: "Centralise operations and make multi-site management more reliable.",
          solution:
            "A complete business application with back office, tracking, permissions and dashboards.",
          stack: "React, Node.js, MongoDB, Docker, CI/CD",
          result:
            "Clearer processes and better day-to-day operational control.",
          role: "Full-stack design and development, plus delivery structuring.",
          tasks: [
            "Analyse the multi-site operating model and translate it into business modules.",
            "Build the React interfaces, Node.js services, MongoDB model and role-based access.",
            "Set up Docker, CI/CD, tests and delivery documentation.",
          ],
          gains: [
            "Five micro-nurseries can be managed from one shared workspace.",
            "Dashboards and role-based access make day-to-day follow-up easier to read.",
            "Historical data and documented delivery support continuity after handover.",
          ],
          sections: [
            {
              title: "Functional scope",
              items: [
                "Centralised multi-site management from one interface.",
                "Records, registrations, attendance and planning.",
                "Dashboards and granular access rights by role.",
              ],
            },
            {
              title: "Implementation",
              items: [
                "React frontend, Node.js services and MongoDB data model.",
                "Business modules and back office designed around operational needs.",
                "Docker, CI/CD and TDD included in the delivery approach.",
              ],
            },
            {
              title: "Project constraints",
              items: [
                "Sensitive records and role-based access require careful handling.",
                "Functional details remain partly anonymised for confidentiality.",
              ],
            },
          ],
        },
        {
          id: "teams-bot-mastra",
          title: "Teams Bot & Mastra Agents",
          context:
            "Technology monitoring to centralise within the team communication tool.",
          need: "Collect sources and make information usable without scattered manual monitoring.",
          solution:
            "RSS workflow → AI/Mastra summaries → Microsoft Teams → targeted alerts.",
          stack: "TypeScript, Azure Bot Framework, Mastra, OpenAI API",
          result:
            "Centralised monitoring and faster notifications on tracked topics.",
          role: "Workflow design, Teams integration and bot development.",
          tasks: [
            "Select RSS sources and define the monitoring and alerting workflow.",
            "Connect Mastra agents for summaries and prioritisation, then deliver through Teams.",
            "Develop the TypeScript bot with Azure Bot Framework and configurable rules.",
          ],
          gains: [
            "Technology monitoring is available in the team's existing communication space.",
            "Summaries prepare the signal before it reaches the people concerned.",
            "Adjustable sources and alerts keep the workflow focused on relevant topics.",
          ],
          sections: [
            {
              title: "Workflow",
              items: [
                "Collection of selected RSS sources.",
                "AI-assisted summaries and prioritisation with Mastra agents.",
                "Delivery into Microsoft Teams with targeted alerts.",
              ],
            },
            {
              title: "Implementation",
              items: [
                "TypeScript bot integrated through Azure Bot Framework.",
                "Teams used as the team-facing interface for monitoring.",
                "Sources and alerting rules can be adjusted to tracked subjects.",
              ],
            },
            {
              title: "Value delivered",
              items: [
                "Monitoring is consolidated in the team communication channel.",
                "Information is prepared before it reaches the people concerned.",
              ],
            },
          ],
        },
        {
          id: "n8n-workflow-automation",
          title: "n8n Automations",
          context:
            "Recurring reporting, video-preparation and prospecting operations.",
          need: "Reduce manual handoffs while keeping workflows traceable and repeatable.",
          solution:
            "n8n workflows for SocialPilot PDF reports, social-video preparation and Google Maps prospect lists.",
          stack: "n8n, REST APIs, Webhooks, JSON, PDF",
          result: "Centralised workflows and reproducible deliverables.",
          role: "Process analysis, workflow design and integrations.",
          tasks: [
            "Model SocialPilot reporting, video preparation and Google Maps prospecting flows.",
            "Wire APIs, webhooks, JSON transformations, branches and output formats in n8n.",
            "Add data checks, error handling and delivery documentation to each scenario.",
          ],
          gains: [
            "Reports, files, notifications and prospect lists follow repeatable paths.",
            "Fewer manual handoffs are needed between intake, processing and delivery.",
            "Traceable scenarios make later review and maintenance easier.",
          ],
          sections: [
            {
              title: "Automated workflows",
              items: [
                "SocialPilot data preparation and PDF reporting.",
                "Raw-video intake, transcription and preparation for social formats.",
                "Google Maps prospect collection and list structuring.",
              ],
            },
            {
              title: "Workflow design",
              items: [
                "Scheduled or on-demand triggers, APIs and webhooks.",
                "JSON transformations, conditional branches and suitable outputs.",
                "Data checks and error handling integrated into the scenarios.",
              ],
            },
            {
              title: "Delivery context",
              items: [
                "Outputs can be reports, files, notifications or structured lists.",
                "Client data and exact configuration remain confidential.",
              ],
            },
          ],
        },
        {
          id: "wallet-provider",
          title: "Altme Wallet Provider",
          context:
            "A digital-identity wallet product for organisations and end users.",
          need: "Support a clear, maintainable product and documentation ecosystem.",
          solution:
            "Contribution to developer documentation, including the move from GitBook to Docusaurus, alongside wallet product work.",
          stack: "eIDAS 2.0, Verifiable Credentials, OIDC4VC, EBSI",
          result:
            "A more structured base for product and developer information.",
          role: "Team contribution on wallet-ecosystem topics, documentation content and migration work.",
          tasks: [
            "Contribute to wallet-product topics involving credentials, identity and interoperability.",
            "Write and reorganise developer guidance during the GitBook to Docusaurus migration.",
            "Document user paths while keeping confidential implementation details out of the public case study.",
          ],
          gains: [
            "Developers have a clearer, more maintainable documentation entry point.",
            "The migration provides a structured base for continued product documentation.",
            "Standards context helps teams understand wallet and credential interoperability.",
          ],
          sections: [
            {
              title: "Product scope",
              items: [
                "Digital identity wallet for organisations and individuals.",
                "Management, sharing and verification of verifiable credentials.",
                "European eIDAS 2.0 and EUDI Wallet interoperability context.",
              ],
            },
            {
              title: "Standards & ecosystem",
              items: [
                "eIDAS 2.0, Verifiable Credentials, OIDC4VC and SSI.",
                "Technical ecosystem covering secure digital-identity use cases.",
                "Developer documentation maintained through GitBook then Docusaurus.",
              ],
            },
            {
              title: "My contribution",
              items: [
                "Contribution within the product team on wallet-related topics.",
                "Documentation content, user paths and migration work.",
                "Implementation details are deliberately limited for confidentiality.",
              ],
            },
          ],
        },
      ]
    : [
        {
          id: "erp-micro-creches",
          title: "ERP Micro-Crèches",
          context:
            "ERP web conçu pour centraliser la gestion de cinq micro-crèches, de leurs équipes et des informations liées aux familles.",
          need: "Remplacer des outils et fichiers dispersés par une interface unique avec des droits différenciés selon les rôles.",
          solution:
            "Application métier multi-établissements : dossiers, présences, planning, documents, facturation, tableaux de bord et permissions.",
          stack: "React, Node.js, MongoDB, Docker, CI/CD",
          result:
            "Gestion de cinq micro-crèches centralisée dans une interface unique, avec supervision multi-établissements et accès différenciés selon les rôles.",
          role: "Conception et développement full-stack : architecture fonctionnelle, interfaces, backend, données, droits d’accès, conteneurisation et préparation du déploiement.",
          tasks: [
            "Analyser le fonctionnement multi-établissements et le traduire en modules métier.",
            "Développer les interfaces React, les services Node.js, le modèle MongoDB et les droits par rôle.",
            "Mettre en place Docker, CI/CD, tests et documentation de livraison.",
          ],
          gains: [
            "Les cinq micro-crèches sont suivies depuis un espace de travail partagé.",
            "Les tableaux de bord et droits d’accès rendent le suivi quotidien plus lisible.",
            "Les données historiques et la documentation facilitent la continuité après la livraison.",
          ],
          sections: [
            {
              title: "Périmètre fonctionnel",
              items: [
                "Gestion multi-établissements depuis une interface centralisée.",
                "Enfants, parents, personnel, présences, planning, documents et facturation.",
                "Tableaux de bord et droits d’accès différenciés par rôle.",
              ],
            },
            {
              title: "Architecture",
              items: [
                "Frontend React, services Node.js et modèle de données MongoDB.",
                "Docker, CI/CD et TDD intégrés à l’approche de livraison.",
                "Séparation des données et contrôles d’accès selon l’établissement et le profil.",
              ],
            },
            {
              title: "Contraintes",
              items: [
                "Données sensibles liées aux enfants, parents et personnel.",
                "Détails fonctionnels partiellement anonymisés pour préserver la confidentialité.",
              ],
            },
          ],
        },
        {
          id: "teams-bot-mastra",
          title: "Teams Bot & Mastra Agents",
          context:
            "Veille à centraliser dans l'outil de communication des équipes.",
          need: "Collecter les sources et rendre l'information exploitable sans veille manuelle dispersée.",
          solution:
            "Workflow RSS → synthèse IA/Mastra → Microsoft Teams → alertes ciblées.",
          stack: "TypeScript, Azure Bot Framework, Mastra, OpenAI API",
          result:
            "Veille centralisée et notifications plus rapides sur les sujets suivis.",
          role: "Conception du workflow, intégration Teams et développement du bot.",
          tasks: [
            "Sélectionner les sources RSS et définir le workflow de veille et d’alertes.",
            "Connecter les agents Mastra pour les synthèses et la priorisation, puis diffuser dans Teams.",
            "Développer le bot TypeScript avec Azure Bot Framework et des règles configurables.",
          ],
          gains: [
            "La veille technologique est disponible dans l’espace de communication déjà utilisé par l’équipe.",
            "Les synthèses préparent l’information avant sa transmission aux personnes concernées.",
            "Les sources et alertes ajustables gardent le workflow centré sur les sujets utiles.",
          ],
          sections: [
            {
              title: "Workflow",
              items: [
                "Collecte de sources RSS sélectionnées.",
                "Synthèses et priorisation assistées par IA avec agents Mastra.",
                "Diffusion dans Microsoft Teams avec alertes ciblées.",
              ],
            },
            {
              title: "Réalisation",
              items: [
                "Bot TypeScript intégré via Azure Bot Framework.",
                "Teams utilisé comme interface de veille pour l’équipe.",
                "Sources et règles d’alerte ajustables selon les sujets suivis.",
              ],
            },
            {
              title: "Valeur apportée",
              items: [
                "Veille regroupée dans le canal de communication de l’équipe.",
                "Information préparée avant d’être transmise aux personnes concernées.",
              ],
            },
          ],
        },
        {
          id: "n8n-workflow-automation",
          title: "Automatisations n8n",
          context:
            "Opérations récurrentes de reporting, préparation vidéo et prospection.",
          need: "Réduire les manipulations manuelles tout en gardant des workflows traçables et reproductibles.",
          solution:
            "Workflows n8n pour rapports PDF SocialPilot, préparation de vidéos sociales et listes de prospects Google Maps.",
          stack: "n8n, API REST, Webhooks, JSON, PDF",
          result: "Workflows centralisés et livrables reproductibles.",
          role: "Analyse des processus, conception des workflows et intégrations.",
          tasks: [
            "Modéliser les flux de reporting SocialPilot, de préparation vidéo et de prospection Google Maps.",
            "Relier API, webhooks, transformations JSON, branches et formats de sortie dans n8n.",
            "Ajouter contrôles de données, gestion des erreurs et documentation de livraison à chaque scénario.",
          ],
          gains: [
            "Rapports, fichiers, notifications et listes de prospects suivent des parcours reproductibles.",
            "Les passages manuels diminuent entre la réception, le traitement et la livraison.",
            "Des scénarios traçables facilitent la relecture et la maintenance.",
          ],
          sections: [
            {
              title: "Workflows automatisés",
              items: [
                "Préparation des données SocialPilot et génération de rapports PDF.",
                "Réception de vidéos brutes, transcription et préparation pour les formats sociaux.",
                "Collecte Google Maps et structuration de listes de prospects.",
              ],
            },
            {
              title: "Conception des scénarios",
              items: [
                "Déclencheurs planifiés ou à la demande, API et webhooks.",
                "Transformations JSON, branches conditionnelles et sorties adaptées.",
                "Contrôles de données et gestion des erreurs intégrés aux scénarios.",
              ],
            },
            {
              title: "Cadre de livraison",
              items: [
                "Sorties possibles : rapport, fichier, notification ou liste structurée.",
                "Données client et paramétrages précis conservés confidentiels.",
              ],
            },
          ],
        },
        {
          id: "wallet-provider",
          title: "Altme Wallet Provider",
          context:
            "Produit de portefeuille d’identité numérique pour organisations et utilisateurs.",
          need: "Soutenir un écosystème produit et documentaire clair, maintenable.",
          solution:
            "Contribution à la documentation développeur, notamment à la migration de GitBook vers Docusaurus, en parallèle des sujets produit wallet.",
          stack: "eIDAS 2.0, Verifiable Credentials, OIDC4VC, EBSI",
          result:
            "Base plus structurée pour les informations produit et développeur.",
          role: "Contribution en équipe sur l’écosystème wallet, les contenus de documentation et les travaux de migration.",
          tasks: [
            "Contribuer aux sujets wallet liés aux credentials, à l’identité et à l’interopérabilité.",
            "Rédiger et réorganiser les guides développeur pendant la migration de GitBook vers Docusaurus.",
            "Documenter les parcours tout en gardant les détails d’implémentation confidentiels hors du cas public.",
          ],
          gains: [
            "Les développeurs disposent d’un point d’entrée documentaire plus clair et maintenable.",
            "La migration fournit une base structurée pour poursuivre la documentation produit.",
            "Le contexte des standards aide à comprendre l’interopérabilité des wallets et credentials.",
          ],
          sections: [
            {
              title: "Périmètre produit",
              items: [
                "Wallet d’identité numérique pour organisations et particuliers.",
                "Gestion, partage et vérification de données vérifiables.",
                "Contexte européen eIDAS 2.0 et interopérabilité EUDI Wallet.",
              ],
            },
            {
              title: "Standards & écosystème",
              items: [
                "eIDAS 2.0, Verifiable Credentials, OIDC4VC et SSI.",
                "Écosystème technique dédié à des cas d’usage d’identité numérique sécurisée.",
                "Documentation développeur maintenue avec GitBook puis Docusaurus.",
              ],
            },
            {
              title: "Ma contribution",
              items: [
                "Contribution au sein de l’équipe produit sur des sujets wallet.",
                "Contenus, parcours de documentation et travaux de migration.",
                "Détails d’implémentation volontairement limités pour confidentialité.",
              ],
            },
          ],
        },
      ];
  const visibleFeaturedCaseStudies = featuredCaseStudies;
  const selectedFeaturedCaseStudy = visibleFeaturedCaseStudies.find(
    (item) => item.id === selectedFeaturedProjectId,
  );

  const categoryDefinitions = {
    emploi: {
      emoji: "💼",
      title: isEnglish ? "PROFESSIONAL PROJECTS" : "PROJETS PRO",
    },
    freelance: {
      emoji: "🚀",
      title: isEnglish ? "FREELANCE PROJECTS" : "MISSIONS FREELANCE",
    },
    opensource: {
      emoji: "🌟",
      title: "OPEN SOURCE",
    },
    gaming: {
      emoji: "🎮",
      title: "GAMING / MOBILE",
    },
  };

  const categoryConfig = isFreelancePage
    ? { freelance: categoryDefinitions.freelance }
    : {
        emploi: categoryDefinitions.emploi,
        freelance: categoryDefinitions.freelance,
        opensource: categoryDefinitions.opensource,
        gaming: categoryDefinitions.gaming,
      };

  const categoryLabels: Record<DisplayProjectCategory, string> = {
    emploi: isEnglish ? "PROFESSIONAL PROJECTS" : "PROJETS PRO",
    freelance: isEnglish ? "FREELANCE PROJECTS" : "MISSIONS FREELANCE",
    opensource: "OPEN SOURCE",
    gaming: "GAMING / MOBILE",
  };

  const filteredProjects = selectedCategory
    ? (isFreelancePage
        ? projectsForView
        : projectsForView.filter((project) => project.category === selectedCategory))
        .sort((a, b) => {
          const displayOrderIndex =
            selectedCategory === "freelance"
              ? freelanceDisplayOrderIndex
              : selectedCategory === "opensource"
                ? openSourceDisplayOrderIndex
                : null;

          if (!displayOrderIndex) {
            return 0;
          }

          const aOrder = displayOrderIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER;
          const bOrder = displayOrderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER;
          return aOrder - bOrder;
        })
    : [];

  const handleCategoryClick = (category: DisplayProjectCategory) => {
    const clearProjectHash = () => {
      if (!window.location.hash.startsWith("#project=")) return;
      window.history.replaceState(
        { ...getHistoryState(), portfolioProjectId: null },
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    };

    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedProject(null);
    } else {
      setSelectedCategory(category);
      setSelectedProject(null);
    }
    hadProjectSelectionRef.current = false;
    setActiveGalleryIndex(null);
    clearProjectHash();
  };

  const handleProjectClick = (project: DisplayProject) => {
    const nextHash = `#project=${encodeURIComponent(project.id)}`;
    const historyState = getHistoryState();

    setSelectedProject(project);
    setSelectedCategory(isFreelancePage ? "freelance" : project.category);
    setActiveGalleryIndex(null);
    hadProjectSelectionRef.current = true;
    window.history.pushState(
      {
        ...historyState,
        portfolioProjectId: project.id,
        portfolioProjectNavigation: "push",
      },
      "",
      `${window.location.pathname}${window.location.search}${nextHash}`,
    );
  };

  const handleFeaturedProjectClick = (projectId: string) => {
    const project = projectsForView.find((entry) => entry.id === projectId);
    if (!project) return;
    handleProjectClick(project);
  };

  const handleBackToList = () => {
    const historyState = getHistoryState();
    const projectId = getProjectIdFromHash(window.location.hash);

    if (
      projectId &&
      historyState.portfolioProjectId === projectId &&
      historyState.portfolioProjectNavigation === "push"
    ) {
      window.history.back();
      return;
    }

    hadProjectSelectionRef.current = false;
    setSelectedProject(null);
    setActiveGalleryIndex(null);
    window.history.replaceState(
      { ...historyState, portfolioProjectId: null },
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  };

  useEffect(() => {
    const syncProjectFromHash = () => {
      const projectId = getProjectIdFromHash(window.location.hash);
      const project = projectId
        ? projectsForView.find((entry) => entry.id === projectId)
        : undefined;

      if (project) {
        hadProjectSelectionRef.current = true;
        setSelectedCategory(isFreelancePage ? "freelance" : project.category);
        setSelectedProject(project);
        setActiveGalleryIndex(null);
        return;
      }

      const shouldRestoreFocus = hadProjectSelectionRef.current;
      hadProjectSelectionRef.current = false;
      setSelectedProject(null);
      setActiveGalleryIndex(null);

      if (window.location.hash.startsWith("#project=")) {
        window.history.replaceState(
          { ...getHistoryState(), portfolioProjectId: null },
          "",
          `${window.location.pathname}${window.location.search}`,
        );
      }

      if (shouldRestoreFocus) {
        window.setTimeout(() => projectsHeadingRef.current?.focus(), 0);
      }
    };

    syncProjectFromHash();
    window.addEventListener("popstate", syncProjectFromHash);
    window.addEventListener("hashchange", syncProjectFromHash);
    return () => {
      window.removeEventListener("popstate", syncProjectFromHash);
      window.removeEventListener("hashchange", syncProjectFromHash);
    };
  }, [isFreelancePage, projectsForView]);

  const localizedSelectedProject = selectedProject
    ? localizeProject(selectedProject)
    : null;
  const galleryImages: ProjectGalleryItem[] =
    localizedSelectedProject?.gallery
      ?.map((image) => (typeof image === "string" ? { src: image } : image))
      .filter(
        (image) =>
          typeof localizedSelectedProject.image !== "string" ||
          image.title ||
          image.src !== localizedSelectedProject.image,
      ) ?? [];
  const isErpCaseStudy = localizedSelectedProject?.id === "erp-micro-creches";

  const showPreviousImage = () => {
    setActiveGalleryIndex((index) =>
      index === null
        ? null
        : (index - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNextImage = () => {
    setActiveGalleryIndex((index) =>
      index === null ? null : (index + 1) % galleryImages.length,
    );
  };

  const isGalleryViewerOpen = activeGalleryIndex !== null;

  useEffect(() => {
    if (!selectedProject) return;

    const scrollTimer = window.setTimeout(() => {
      projectDetailRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      projectDetailRef.current?.focus({ preventScroll: true });
    }, 0);

    return () => window.clearTimeout(scrollTimer);
  }, [selectedProject]);

  useEffect(() => {
    if (!isGalleryViewerOpen) return;

    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      galleryViewerRef.current
        ?.querySelector<HTMLButtonElement>("[data-gallery-close]")
        ?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveGalleryIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveGalleryIndex((index) =>
          index === null
            ? null
            : (index - 1 + galleryImages.length) % galleryImages.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveGalleryIndex((index) =>
          index === null ? null : (index + 1) % galleryImages.length,
        );
      }
      if (event.key === "Tab") {
        const focusableElements =
          galleryViewerRef.current?.querySelectorAll<HTMLElement>(
            "button:not([disabled])",
          );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isGalleryViewerOpen, galleryImages.length]);

  return (
    <section
      id="projects"
      className={`px-4 w-full overflow-x-hidden section-even ${
        isFreelancePage
          ? "pb-20 pt-8 md:pb-20 md:pt-12"
          : "py-20"
      }`}
    >
      <div className="container mx-auto max-w-7xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12 w-full">
          <h2
            ref={projectsHeadingRef}
            tabIndex={-1}
            className="text-3xl md:text-4xl font-bold mb-4 focus-visible:outline-none"
          >
            {isFreelancePage
              ? (isEnglish ? "Freelance projects" : "Projets freelance")
              : (isEnglish ? "Case studies & work" : "Études de cas et réalisations")}
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-primary"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 px-4">
            {isFreelancePage
              ? (isEnglish
                ? "Websites, business applications and tailored tools delivered for freelance clients."
                : "Sites vitrines, applications métier et outils sur mesure réalisés pour des clients freelance.")
              : (isEnglish
                ? "Business applications, APIs, AI workflows and automations: a selection of concrete projects, followed by access to all work and explorations."
                : "Applications métier, APIs, workflows IA et automatisations : une sélection de projets concrets, puis accès à l'ensemble des réalisations et explorations.")}
          </p>
        </div>

        {!selectedProject && !isFreelancePage && (
          <div className="mb-12">
            <div className="mb-5">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {isEnglish
                  ? `${visibleFeaturedCaseStudies.length} key projects`
                  : `${visibleFeaturedCaseStudies.length} projets clés`}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {isEnglish
                  ? "Context, need, role, solution and value delivered — for a role or a client project. ↓ Click to view my key projects below. ↓"
                  : "Contexte, besoin, rôle, solution et valeur produite — pour un recrutement comme pour une mission. ↓ Cliquez pour voir mes projets clés ci-dessous. ↓"}
              </p>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {visibleFeaturedCaseStudies.map((item) => {
                const config = featuredProjectConfig[item.id];
                const isSelected = selectedFeaturedProjectId === item.id;

                return (
                  <Button
                    key={item.id}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() =>
                      setSelectedFeaturedProjectId((currentId) =>
                        currentId === item.id ? null : item.id,
                      )
                    }
                    aria-expanded={isSelected}
                    aria-controls="featured-case-study"
                      className={`h-auto min-h-20 whitespace-normal px-3 py-4 text-center text-xs transition-colors sm:text-sm md:text-base ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    <span className="mr-2 text-lg" aria-hidden="true">
                      {config.emoji}
                    </span>
                    {item.id === "teams-bot-mastra" ? (
                      <span className="leading-5">
                        <span className="block">Teams Bot</span>
                        <span className="block">&amp;</span>
                        <span className="block">Mastra Agents</span>
                      </span>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </Button>
                );
              })}
            </div>

            {selectedFeaturedCaseStudy && (
              <Card
                id="featured-case-study"
                className="mx-auto flex w-full max-w-none flex-col border-border bg-card p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold">
                    {selectedFeaturedCaseStudy.title}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFeaturedProjectId(null)}
                    aria-label={isEnglish ? "Close case study" : "Fermer l’étude de cas"}
                  >
                    {isEnglish ? "Close" : "Fermer"}
                  </Button>
                </div>
                <div className="mt-5 grid flex-1 gap-x-10 gap-y-4 text-sm leading-7 text-foreground/80 md:grid-cols-2 md:text-base">
                  <p>
                    <span className="font-medium text-foreground">
                      {isEnglish ? "Context:" : "Contexte:"}
                    </span>{" "}
                    {selectedFeaturedCaseStudy.context}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      {isEnglish ? "Need:" : "Besoin:"}
                    </span>{" "}
                    {selectedFeaturedCaseStudy.need}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      {isEnglish ? "Solution:" : "Solution:"}
                    </span>{" "}
                    {selectedFeaturedCaseStudy.solution}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Stack:</span>{" "}
                    {selectedFeaturedCaseStudy.stack}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      {isEnglish ? "Result:" : "Résultat:"}
                    </span>{" "}
                    {selectedFeaturedCaseStudy.result}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      {isEnglish ? "My role:" : "Mon rôle:"}
                    </span>{" "}
                    {selectedFeaturedCaseStudy.role}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 border-t border-border pt-6 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-secondary/20 p-4">
                    <h4 className="mb-3 font-semibold text-foreground">
                      {isEnglish ? "Tasks delivered" : "Tâches réalisées"}
                    </h4>
                    <ul className="space-y-2 text-sm leading-6 text-foreground/75">
                      {selectedFeaturedCaseStudy.tasks.map((task) => (
                        <li key={task} className="flex gap-2">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            aria-hidden="true"
                          />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/20 p-4">
                    <h4 className="mb-3 font-semibold text-foreground">
                      {isEnglish ? "Value delivered" : "Gains / valeur produite"}
                    </h4>
                    <ul className="space-y-2 text-sm leading-6 text-foreground/75">
                      {selectedFeaturedCaseStudy.gains.map((gain) => (
                        <li key={gain} className="flex gap-2">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {gain}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 border-t border-border pt-6 md:grid-cols-3">
                  {selectedFeaturedCaseStudy.sections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-lg border border-border bg-secondary/20 p-4"
                    >
                      <h4 className="mb-3 font-semibold text-foreground">
                        {section.title}
                      </h4>
                      <ul className="space-y-2 text-sm leading-6 text-foreground/75">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  className="mt-6 h-auto w-fit justify-start px-0 text-primary"
                  onClick={() =>
                    handleFeaturedProjectClick(selectedFeaturedCaseStudy.id)
                  }
                >
                  {isEnglish ? "View full project →" : "Voir la fiche complète →"}
                </Button>
              </Card>
            )}
          </div>
        )}

        {localizedSelectedProject ? (
          <ProjectDetail
            project={localizedSelectedProject}
            categoryLabel={categoryLabels[localizedSelectedProject.category]}
            galleryImages={galleryImages}
            isEnglish={isEnglish}
            isErpCaseStudy={isErpCaseStudy}
            resolveImage={resolveImage}
            prepareDetailedContent={prepareDetailedContent}
            onBack={handleBackToList}
            onOpenGallery={setActiveGalleryIndex}
            detailRef={projectDetailRef}
          />
        ) : (
          <>
            {/* Category Buttons */}
            <div className="mb-4 text-center">
              <p className="text-sm text-muted-foreground">
                {isEnglish
                  ? "A selection of recent work, from frontend to backend."
                  : "Une sélection de mes réalisations récentes, du frontend au backend."}
              </p>
            </div>
            {!isFreelancePage && (
              <div className="mx-auto mb-12 grid w-full max-w-5xl grid-cols-2 gap-3 px-2 lg:grid-cols-4">
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <Button
                    key={key}
                    onClick={() =>
                      handleCategoryClick(key as DisplayProjectCategory)
                    }
                    variant={selectedCategory === key ? "default" : "outline"}
                      className={`w-full px-2 py-3 text-xs transition-colors sm:px-4 sm:text-sm md:px-5 md:py-4 md:text-base lg:px-6 lg:py-5 lg:text-lg ${
                      selectedCategory === key
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary/60 hover:bg-primary/5"
                    }`}
                  >
                    <span className="mr-2 text-lg" aria-hidden="true">
                      {config.emoji}
                    </span>
                    <span>{categoryLabels[key as DisplayProjectCategory]}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* Projects Grid */}
            {selectedCategory && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in duration-500">
                {filteredProjects.map((project) => {
                  const localizedProject = localizeProject(project);

                  return (
                    <Card
                      key={project.id}
                      className="group flex h-full flex-col overflow-hidden border-border bg-card shadow-none transition-colors duration-200 hover:border-primary/60"
                    >
                      {/* Project Image */}
                      <div className="relative h-48 md:h-56 lg:h-52 overflow-hidden bg-secondary flex items-center justify-center">
                        <img
                          src={resolveImage(project.image)}
                          srcSet={getImageSrcSet(project.image, resolveImage)}
                          alt={localizedProject.title}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          width={getImageManifestEntry(project.image)?.width}
                          height={getImageManifestEntry(project.image)?.height}
                          className={shouldContainProjectImage(project)
                            ? "max-h-full max-w-full rounded-[5px] object-contain"
                            : "h-full w-full object-cover"}
                        />
                      </div>

                      {/* Project Info */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <h3 className="text-xl font-bold text-foreground">
                          {localizedProject.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {localizedProject.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground/75"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="space-y-3 pt-2">
                          <div
                            className={`grid gap-3 ${project.github ? "grid-cols-2" : "grid-cols-1"}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full min-w-0 border-border px-2 text-xs text-foreground hover:border-primary hover:text-primary sm:text-sm"
                              onClick={() => handleProjectClick(project)}
                            >
                              {isEnglish ? "Learn more" : "En savoir plus"}
                            </Button>

                            {project.github && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="w-full min-w-0 border-border px-2 text-xs text-foreground hover:border-primary hover:text-primary sm:text-sm"
                              >
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>

                          {project.demo && (
                            <Button
                              asChild
                              size="lg"
                              className="w-full bg-cta text-cta-foreground hover:bg-cta/90"
                            >
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                                {isEnglish ? "View project" : "Voir le projet"}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* CTA - Only show when not in detail view */}
        {!selectedProject && !selectedCategory && (
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a
                href="https://github.com/BastienLopez"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-2" aria-hidden="true" />
                {isEnglish
                  ? "View all projects on GitHub"
                  : "Voir tous les projets sur GitHub"}
              </a>
            </Button>
          </div>
        )}

        {activeGalleryIndex !== null && (
          <ProjectGallery
            galleryImages={galleryImages}
            activeGalleryIndex={activeGalleryIndex}
            projectTitle={localizedSelectedProject?.title}
            isEnglish={isEnglish}
            galleryViewerRef={galleryViewerRef}
            resolveImage={resolveImage}
            onClose={() => setActiveGalleryIndex(null)}
            onPrevious={showPreviousImage}
            onNext={showNextImage}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
