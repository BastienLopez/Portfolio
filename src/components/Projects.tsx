import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allProjects, Project } from "@/data/projects";
import { getEnglishDetailedContent } from "@/data/projects/englishDetails";
import { useLanguage } from "@/lib/i18n";

type ProjectCategory = Project["category"];
type DisplayProjectCategory = Exclude<ProjectCategory, "browser">;
type DisplayProject = Project & { category: DisplayProjectCategory };

const projects = allProjects.filter(
  (project): project is DisplayProject => project.category !== "browser",
);

const freelanceDisplayOrder = [
  "erp-micro-creches",
  "eloi-coachsteo",
  "luxury-auto-detailing",
  "cledevoute",
];

const freelanceDisplayOrderIndex = new Map(
  freelanceDisplayOrder.map((id, index) => [id, index]),
);

const openSourceDisplayOrder = [
  "ia-trading",
  "ats-filter-resume",
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

const featuredProjectConfig: Record<string, { emoji: string; color: string }> =
  {
    "erp-micro-creches": { emoji: "💼", color: "from-blue-500 to-cyan-500" },
    "teams-bot-mastra": { emoji: "🤖", color: "from-purple-500 to-pink-500" },
    "n8n-workflow-automation": {
      emoji: "⚙️",
      color: "from-green-500 to-emerald-500",
    },
    "wallet-provider": { emoji: "🌐", color: "from-orange-500 to-red-500" },
  };

const resolveImage = (img?: string | null) => {
  if (!img) return "";
  if (img.startsWith("http") || img.startsWith("data:")) return img;
  const normalized = img.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
};

const stripDecorativeEmoji = (content: string) =>
  content.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "");

const getSectionMarker = (title: string) => {
  const normalizedTitle = title
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("fr-FR");

  if (/contexte|context|presentation/.test(normalizedTitle)) return true;
  if (/contribution|mon role|ma contribution|role/.test(normalizedTitle))
    return true;
  if (/technologie|standards|outils/.test(normalizedTitle)) return true;
  if (
    /fonctionnalite|cas d.?usage|attestation|partenaire|certification/.test(
      normalizedTitle,
    )
  )
    return true;
  if (/resultat|objectif|suivi/.test(normalizedTitle)) return true;

  return null;
};

const decorateDetailedContent = (content: string) => {
  let markerCount = 0;

  return stripDecorativeEmoji(content).replace(
    /<h3([^>]*)class="([^"]*\bsection-title\b[^"]*)"([^>]*)>([\s\S]*?)<\/h3>/gi,
    (_match, beforeClass, classNames, afterClass, title) => {
      const marker = getSectionMarker(title.replace(/<[^>]+>/g, ""));

      if (!marker || markerCount >= 5) {
        return `<h3${beforeClass}class="${classNames}"${afterClass}>${title}</h3>`;
      }

      markerCount += 1;
      return `<h3${beforeClass}class="${classNames}"${afterClass}><span class="section-marker" aria-hidden="true"></span>${title}</h3>`;
    },
  );
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const formatMarkdownInline = (value: string) =>
  escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const renderProjectMarkdown = (content: string) => {
  const lines = content.trim().split(/\r?\n/);
  const html: string[] = ['<div class="project-detail">'];
  let paragraph: string[] = [];
  let isListOpen = false;
  let isSectionOpen = false;
  let isSubsectionOpen = false;
  let hasTitle = false;
  let hasFirstSection = false;

  const closeList = () => {
    if (isListOpen) {
      html.push("</ul>");
      isListOpen = false;
    }
  };

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      html.push(
        `<p class="description">${formatMarkdownInline(paragraph.join(" "))}</p>`,
      );
      paragraph = [];
    }
  };

  const closeSubsection = () => {
    flushParagraph();
    closeList();
    if (isSubsectionOpen) {
      html.push("</div>");
      isSubsectionOpen = false;
    }
  };

  const closeSection = () => {
    closeSubsection();
    if (isSectionOpen) {
      html.push("</div>");
      isSectionOpen = false;
    }
  };

  const openSection = (title: string) => {
    closeSection();
    html.push(
      `<div class="section"><h3 class="section-title">${formatMarkdownInline(title)}</h3>`,
    );
    isSectionOpen = true;
    hasFirstSection = true;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line === "---") {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      const [, level, title] = heading;

      if (!hasTitle) {
        html.push(
          `<h2 class="project-title">${formatMarkdownInline(title)}</h2>`,
        );
        hasTitle = true;
      } else if (level === "#" || !hasFirstSection) {
        openSection(title);
      } else {
        closeSubsection();
        html.push(
          `<div class="workflow-step"><h4>${formatMarkdownInline(title)}</h4>`,
        );
        isSubsectionOpen = true;
      }
      continue;
    }

    const listItem = /^\*\s+(.+)$/.exec(line);
    if (listItem) {
      flushParagraph();
      if (!isListOpen) {
        html.push('<ul class="features-list">');
        isListOpen = true;
      }
      html.push(
        `<li class="feature-item">${formatMarkdownInline(listItem[1].replace(/;\s*$/, ""))}</li>`,
      );
      continue;
    }

    paragraph.push(line);
  }

  closeSection();
  html.push("</div>");
  return html.join("");
};

const prepareDetailedContent = (content: string) => {
  const renderedContent = content.trimStart().startsWith("# ")
    ? renderProjectMarkdown(content)
    : content;

  return DOMPurify.sanitize(
    decorateDetailedContent(renderedContent),
  );
};

const Projects = () => {
  const { isEnglish } = useLanguage();
  const [selectedCategory, setSelectedCategory] =
    useState<DisplayProjectCategory | null>("emploi");
  const [selectedProject, setSelectedProject] = useState<DisplayProject | null>(
    null,
  );
  const [selectedFeaturedProjectId, setSelectedFeaturedProjectId] =
    useState("erp-micro-creches");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(
    null,
  );
  const projectDetailRef = useRef<HTMLDivElement | null>(null);
  const galleryViewerRef = useRef<HTMLDivElement | null>(null);
  const localizeProject = (project: DisplayProject) => {
    const englishDetailedContent = getEnglishDetailedContent(project.id);

    return isEnglish
      ? {
          ...project,
          ...project.translations?.en,
          ...englishProjectSummaries[project.id],
          ...(englishDetailedContent ? { detailedContent: englishDetailedContent } : {}),
        }
      : project;
  };
  const featuredCaseStudies = isEnglish
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
          link: "/Portfolio/cases/erp-micro-creches.html",
          sections: [
            {
              title: "Functional scope",
              items: [
                "Centralised multi-site management from one interface.",
                "Records, registrations, attendance, planning and invoicing.",
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
          link: "/Portfolio/cases/erp-micro-creches.html",
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
  const selectedFeaturedCaseStudy =
    featuredCaseStudies.find((item) => item.id === selectedFeaturedProjectId) ??
    featuredCaseStudies[0];

  const categoryConfig = {
    emploi: {
      emoji: "💼",
      title: isEnglish ? "PROFESSIONAL PROJECTS" : "PROJETS PRO",
      color: "from-blue-500 to-cyan-500",
    },
    freelance: {
      emoji: "🚀",
      title: isEnglish ? "FREELANCE PROJECTS" : "MISSIONS FREELANCE",
      color: "from-purple-500 to-pink-500",
    },
    opensource: {
      emoji: "🌟",
      title: "OPEN SOURCE",
      color: "from-green-500 to-emerald-500",
    },
    gaming: {
      emoji: "🎮",
      title: "GAMING / MOBILE",
      color: "from-orange-500 to-red-500",
    },
  };

  const categoryLabels: Record<DisplayProjectCategory, string> = {
    emploi: isEnglish ? "PROFESSIONAL PROJECTS" : "PROJETS PRO",
    freelance: isEnglish ? "FREELANCE PROJECTS" : "MISSIONS FREELANCE",
    opensource: "OPEN SOURCE",
    gaming: "GAMING / MOBILE",
  };

  const filteredProjects = selectedCategory
    ? projects
        .filter((project) => project.category === selectedCategory)
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
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedProject(null);
    } else {
      setSelectedCategory(category);
      setSelectedProject(null);
    }
  };

  const handleProjectClick = (project: DisplayProject) => {
    setSelectedProject(project);
    window.history.replaceState(null, "", `#project=${project.id}`);
  };

  const handleFeaturedProjectClick = (projectId: string) => {
    const project = projects.find((entry) => entry.id === projectId);
    if (!project) return;
    setSelectedCategory(project.category);
    setSelectedProject(project);
    window.history.replaceState(null, "", `#project=${project.id}`);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
    setActiveGalleryIndex(null);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  };

  useEffect(() => {
    const projectId = window.location.hash.replace(/^#project=/, "");
    const project = projects.find((entry) => entry.id === projectId);

    if (project) {
      setSelectedCategory(project.category);
      setSelectedProject(project);
    }
  }, []);

  const localizedSelectedProject = selectedProject
    ? localizeProject(selectedProject)
    : null;
  const hasEnglishCaseStudy = Boolean(
    selectedProject &&
      (getEnglishDetailedContent(selectedProject.id) ||
        selectedProject.translations?.en?.detailedContent),
  );
  const galleryImages =
    localizedSelectedProject?.gallery?.filter(
      (image) => image !== localizedSelectedProject.image,
    ) ?? [];

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
      className="py-20 px-4 w-full overflow-x-hidden section-even"
    >
      <div className="container mx-auto max-w-7xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12 w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isEnglish
              ? "Case studies & work"
              : "Études de cas et réalisations"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 px-4">
            {isEnglish
              ? "Business applications, APIs, AI workflows and automations: a selection of concrete projects, followed by access to all work and explorations."
              : "Applications métier, APIs, workflows IA et automatisations : une sélection de projets concrets, puis accès à l'ensemble des réalisations et explorations."}
          </p>
        </div>

        {!selectedProject && (
          <div className="mb-12">
            <div className="mb-5">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {isEnglish ? "4 key projects" : "4 projets clés"}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {isEnglish
                  ? "Context, need, role, solution and value delivered — for a role or a client project."
                  : "Contexte, besoin, rôle, solution et valeur produite — pour un recrutement comme pour une mission."}
              </p>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {featuredCaseStudies.map((item) => {
                const config = featuredProjectConfig[item.id];
                const isSelected = selectedFeaturedCaseStudy.id === item.id;

                return (
                  <Button
                    key={item.id}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setSelectedFeaturedProjectId(item.id)}
                    aria-pressed={isSelected}
                    className={`h-auto min-h-20 whitespace-normal px-3 py-4 text-center text-xs sm:text-sm md:text-base transition-all ${
                      isSelected
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
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

            <Card className="mx-auto flex w-full max-w-none flex-col border-border bg-card p-6 md:p-8">
              <h4 className="mb-5 text-2xl font-semibold">
                {selectedFeaturedCaseStudy.title}
              </h4>
              <div className="grid flex-1 gap-x-10 gap-y-4 text-sm leading-7 text-foreground/80 md:grid-cols-2 md:text-base">
                <p>
                  <span className="text-foreground font-medium">
                    {isEnglish ? "Context:" : "Contexte:"}
                  </span>{" "}
                  {selectedFeaturedCaseStudy.context}
                </p>
                <p>
                  <span className="text-foreground font-medium">
                    {isEnglish ? "Need:" : "Besoin:"}
                  </span>{" "}
                  {selectedFeaturedCaseStudy.need}
                </p>
                <p>
                  <span className="text-foreground font-medium">
                    {isEnglish ? "Solution:" : "Solution:"}
                  </span>{" "}
                  {selectedFeaturedCaseStudy.solution}
                </p>
                <p>
                  <span className="text-foreground font-medium">Stack:</span>{" "}
                  {selectedFeaturedCaseStudy.stack}
                </p>
                <p>
                  <span className="text-foreground font-medium">
                    {isEnglish ? "Result:" : "Résultat:"}
                  </span>{" "}
                  {selectedFeaturedCaseStudy.result}
                </p>
                <p>
                  <span className="text-foreground font-medium">
                    {isEnglish ? "My role:" : "Mon rôle:"}
                  </span>{" "}
                  {selectedFeaturedCaseStudy.role}
                </p>
              </div>
              <div className="mt-8 grid gap-4 border-t border-border pt-6 md:grid-cols-3">
                {selectedFeaturedCaseStudy.sections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-lg border border-border bg-secondary/20 p-4"
                  >
                    <h5 className="mb-3 font-semibold text-foreground">
                      {section.title}
                    </h5>
                    <ul className="space-y-2 text-sm leading-6 text-foreground/75">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
                {isEnglish ? "View project →" : "Voir le projet →"}
              </Button>
            </Card>
          </div>
        )}

        {/* Project Detail View */}
        {localizedSelectedProject ? (
          <div
            ref={projectDetailRef}
            className="mx-auto w-full max-w-5xl scroll-mt-28"
          >
            <Button
              onClick={handleBackToList}
              variant="outline"
              className="mb-6 border-border text-foreground hover:border-primary hover:bg-secondary"
            >
              ← {isEnglish ? "Back to projects" : "Retour aux projets"}
            </Button>

            <Card className="overflow-hidden rounded-md border border-border bg-card shadow-none">
              <CardHeader className="border-b border-border px-6 py-6 md:px-8">
                <div className="mb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {categoryLabels[localizedSelectedProject.category]}
                  </span>
                </div>
                <CardTitle className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {localizedSelectedProject.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-8 pt-6 md:px-8 md:pt-8">
                {/* Project Image */}
                <div className="mb-6">
                  <img
                    src={resolveImage(localizedSelectedProject.image)}
                    alt={localizedSelectedProject.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 960px"
                    className="max-h-96 w-full rounded-md border border-border bg-secondary/30 object-contain"
                  />
                </div>

                {galleryImages.length > 0 && (
                  <div className="mb-8">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {isEnglish ? "Project screenshots" : "Captures du projet"}
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {galleryImages.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setActiveGalleryIndex(index)}
                          className="group relative overflow-hidden rounded-md border border-border bg-secondary/30 text-left transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={`${isEnglish ? "Open" : "Ouvrir"} ${isEnglish ? "screenshot" : "la capture"} ${index + 1}`}
                        >
                          <img
                            src={resolveImage(image)}
                            alt={`${localizedSelectedProject.title} — ${isEnglish ? "screenshot" : "capture"} ${index + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <span className="absolute inset-x-0 bottom-0 bg-background/80 px-3 py-2 text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                            {isEnglish
                              ? "Open full screen"
                              : "Agrandir la capture"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-8 flex flex-wrap gap-2 border-y border-border py-4">
                  {localizedSelectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-border bg-secondary/30 px-2.5 py-1 text-xs font-medium text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Detailed Content */}
                <div className="project-detail-content">
                  {isEnglish && !hasEnglishCaseStudy ? (
                    <div className="border-l-2 border-primary/60 py-1 pl-4 text-foreground">
                      <h3 className="mt-0 text-lg font-semibold">
                        Detailed case study currently available in French.
                      </h3>
                      <p className="mb-0 text-muted-foreground">
                        The project summary, role and stack remain available in
                        English. A complete English case study will be added
                        when the source content is translated.
                      </p>
                    </div>
                  ) : localizedSelectedProject.detailedContent ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: prepareDetailedContent(
                          localizedSelectedProject.detailedContent,
                        ),
                      }}
                    />
                  ) : (
                    <p className="text-muted-foreground italic">
                      {isEnglish
                        ? "Detailed project content coming soon..."
                        : "Contenu détaillé du projet à venir..."}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
                  {localizedSelectedProject.github && (
                    <Button
                      asChild
                      size="default"
                      variant="outline"
                      className="min-w-40 flex-1 rounded-md border-border text-foreground hover:border-primary hover:bg-secondary"
                    >
                      <a
                        href={localizedSelectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        {isEnglish ? "Source code" : "Code source"}
                      </a>
                    </Button>
                  )}
                  {localizedSelectedProject.demo && (
                    <Button
                      asChild
                      size="default"
                      className="min-w-40 flex-1 rounded-md bg-primary text-primary-foreground shadow-none hover:bg-primary/90"
                    >
                      <a
                        href={localizedSelectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
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
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12 px-2 max-w-5xl mx-auto">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <Button
                  key={key}
                  onClick={() =>
                    handleCategoryClick(key as DisplayProjectCategory)
                  }
                  variant={selectedCategory === key ? "default" : "outline"}
                  className={`w-full text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 transition-all ${
                    selectedCategory === key
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                      : "hover:scale-105"
                  }`}
                >
                  <span className="mr-2 text-lg">{config.emoji}</span>
                  <span>{categoryLabels[key as DisplayProjectCategory]}</span>
                </Button>
              ))}
            </div>

            {/* Projects Grid */}
            {selectedCategory && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in duration-500">
                {filteredProjects.map((project) => {
                  const localizedProject = localizeProject(project);

                  return (
                    <Card
                      key={project.id}
                      className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 flex flex-col h-full"
                    >
                      {/* Project Image */}
                      <div className="relative h-48 md:h-56 lg:h-52 overflow-hidden bg-secondary flex items-center justify-center">
                        <img
                          src={resolveImage(project.image)}
                          alt={localizedProject.title}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="max-w-full max-h-full object-contain rounded-[5px] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
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
                              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 min-w-32 border-primary text-primary hover:bg-primary/10"
                            onClick={() => handleProjectClick(project)}
                          >
                            {isEnglish ? "Learn more" : "En savoir plus"}
                          </Button>

                          {project.demo && (
                            <Button
                              asChild
                              size="sm"
                              className="flex-1 min-w-32 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                            >
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Demo
                              </a>
                            </Button>
                          )}
                          {project.github && (
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="flex-1 min-w-32 border-primary text-primary hover:bg-primary/10"
                            >
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4 mr-2" />
                                Code
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
                <Github className="w-5 h-5 mr-2" />
                {isEnglish
                  ? "View all projects on GitHub"
                  : "Voir tous les projets sur GitHub"}
              </a>
            </Button>
          </div>
        )}

        {activeGalleryIndex !== null && galleryImages[activeGalleryIndex] && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={
              isEnglish
                ? "Project screenshot viewer"
                : "Visionneuse de captures du projet"
            }
            onClick={() => setActiveGalleryIndex(null)}
          >
            <div
              ref={galleryViewerRef}
              className="relative flex h-full w-full max-w-7xl items-center justify-center px-14 sm:px-20"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={resolveImage(galleryImages[activeGalleryIndex])}
                alt={`${localizedSelectedProject?.title ?? "Projet"} — ${isEnglish ? "screenshot" : "capture"} ${activeGalleryIndex + 1}`}
                className="max-h-[85vh] max-w-full rounded-md border border-border bg-card object-contain shadow-lg"
              />
              <button
                data-gallery-close
                type="button"
                onClick={() => setActiveGalleryIndex(null)}
                className="absolute right-0 top-0 rounded-md border border-border bg-card p-2 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={
                  isEnglish ? "Close viewer" : "Fermer la visionneuse"
                }
              >
                <X className="h-5 w-5" />
              </button>
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-1 rounded-md border border-border bg-card p-3 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:left-4"
                    aria-label={
                      isEnglish ? "Previous screenshot" : "Capture précédente"
                    }
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-1 rounded-md border border-border bg-card p-3 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-4"
                    aria-label={
                      isEnglish ? "Next screenshot" : "Capture suivante"
                    }
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              <p className="absolute bottom-0 rounded-sm border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                {activeGalleryIndex + 1} / {galleryImages.length} ·{" "}
                {isEnglish ? "Use ← → or Esc" : "Utilisez ← → ou Échap"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
