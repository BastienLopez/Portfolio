import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allProjects, Project, ProjectGalleryItem } from "@/data/projects";
import { getEnglishDetailedContent } from "@/data/projects/englishDetails";
import { getProjectPagePath } from "@/data/site-pages";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { useLanguage } from "@/lib/i18n";
import { getHistoryState, getProjectIdFromHash } from "@/lib/project-navigation";
import {
  decorateDetailedContent,
  renderProjectMarkdown,
} from "@/lib/project-content";
import {
  getImageManifestEntry,
  getImagePrefetchPath,
  getImageSrcSet,
} from "@/lib/image-variants";

type DisplayProjectCategory = Project["category"];
type DisplayProject = Project;

type FeaturedCaseStudySection = {
  title: string;
  items: string[];
};

type FeaturedCaseStudyMetric = {
  value: string;
  label: string;
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
  metrics?: FeaturedCaseStudyMetric[];
};

const portfolioProjects: DisplayProject[] = allProjects;
const freelancePageProjectIds = new Set([
  "ats-filter-resume",
  "erp-micro-creches",
  "n8n-reporting",
  "n8n-video-derush",
  "seo-geo-optimization",
]);
const portfolioFreelanceProjectIds = new Set(["seo-geo-optimization"]);
const freelanceProjects: DisplayProject[] = allProjects.filter(
  (project) =>
    project.category === "freelance" || freelancePageProjectIds.has(project.id),
);

type FreelanceSelectedWorkGroup = {
  key: string;
  projectIds: readonly string[];
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  role: { fr: string; en: string };
  outcome: { fr: string; en: string };
};

const freelanceSelectedWorkGroups: FreelanceSelectedWorkGroup[] = [
  {
    key: "cledevoute",
    projectIds: ["cledevoute"],
    title: {
      fr: "Clé de Voûte",
      en: "Clé de Voûte",
    },
    description: {
      fr: "Site vitrine pour une entreprise de maçonnerie : services, réalisations et prise de contact réunis dans une présentation claire.",
      en: "Showcase website for a masonry company, bringing services, completed work and contact into one clear presentation.",
    },
    role: {
      fr: "Conception et intégration frontend, UI design léger, optimisation des performances et déploiement sur GitHub Pages.",
      en: "Frontend design and integration, light UI design, performance work and GitHub Pages deployment.",
    },
    outcome: {
      fr: "Une vitrine responsive qui présente l’activité et facilite la demande de contact.",
      en: "A responsive showcase that presents the business and makes it easier to get in touch.",
    },
  },
  {
    key: "eloi-coachsteo",
    projectIds: ["eloi-coachsteo"],
    title: {
      fr: "Eloi CoachStéo",
      en: "Eloi CoachStéo",
    },
    description: {
      fr: "Site vitrine one-page pour un coach sportif et ostéopathe, avec ses services de remise en forme, de préparation physique et ses programmes HYROX.",
      en: "One-page showcase website for a sports coach and osteopath, presenting fitness, physical preparation and HYROX programmes.",
    },
    role: {
      fr: "Conception du site, intégration React et Tailwind CSS, mise en page responsive, structuration des contenus et mise en ligne.",
      en: "Website design, React and Tailwind CSS integration, responsive layout, content structure and release.",
    },
    outcome: {
      fr: "Une page unique qui rend les prestations lisibles et donne un accès direct à la prise de contact.",
      en: "A single page that makes the services easy to understand and gives visitors a direct path to contact.",
    },
  },
  {
    key: "n8n-automation",
    projectIds: ["n8n-reporting", "n8n-video-derush"],
    title: {
      fr: "Automatisations n8n — Dérush vidéo & reporting",
      en: "n8n automations — Video editing & reporting",
    },
    description: {
      fr: "Deux workflows complets : un export PDF SocialPilot devient un rapport CM client relisible, tandis que des rushes bruts sont transcrits, sélectionnés et préparés en livrables Instagram/TikTok prêts pour la production.",
      en: "Two complete workflows: a SocialPilot PDF export becomes a reviewable client CM report, while raw footage is transcribed, selected and prepared as Instagram/TikTok deliverables ready for production.",
    },
    role: {
      fr: "Architecture n8n, intégrations, normalisation des données, traitement média, transcription, génération des livrables et contrôles qualité.",
      en: "n8n architecture, integrations, data normalisation, media processing, transcription, deliverable generation and quality checks.",
    },
    outcome: {
      fr: "Le reporting et le pré-montage partent de sources brutes pour aboutir à des livrables structurés, traçables et prêts à relire ou produire.",
      en: "Reporting and pre-editing start from raw sources and end with structured, traceable deliverables ready for review or production.",
    },
  },
];

const freelanceSelectedWorkProjectIds = new Set(
  freelanceSelectedWorkGroups.flatMap((group) => group.projectIds),
);

const freelanceDisplayOrder = [
  "cledevoute",
  "eloi-coachsteo",
  "luxury-auto-detailing",
  "ats-filter-resume",
  "erp-micro-creches",
  "n8n-reporting",
  "n8n-video-derush",
  "seo-geo-optimization",
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
      "Contribution to Altme's Discover platform, bringing wallets, verifiable credentials, NFTs and CoinGecko cryptocurrency data into one product journey.",
  },
  "altme-documentation": {
    title: "Altme Documentation",
    description:
      "Technical documentation for Altme Wallet Provider, structured and maintained across GitBook and Docusaurus to make developer onboarding clearer and more autonomous.",
  },
  "seo-geo-optimization": {
    title: "SEO & Local Search Visibility",
    description:
      "SEO and local-search work for business websites: audit, structured data, content and performance monitoring.",
  },
  "n8n-reporting": {
    title: "n8n Automations — Reporting",
    description:
      "n8n workflow that turns SocialPilot PDF exports into structured client reports for community-management follow-up.",
  },
  "n8n-video-derush": {
    title: "n8n Automations — Video Derush",
    description:
      "n8n pipeline that turns raw footage into selected sequences, subtitles, previews and edit-ready deliverables for Instagram and TikTok.",
  },
  "eloi-coachsteo": {
    title: "Eloi CoachStéo — Sport Trainer",
    description:
      "One-page showcase website for a sports coach and osteopath, presenting fitness, physical preparation, tailored HYROX programmes and a direct contact journey.",
  },
  "luxury-auto-detailing": {
    title: "Luxury Auto Detailing",
    description:
      "Premium showcase website for car-detailing services, with a clear presentation of cleaning, polishing, ceramic protection, interior restoration and appointment contact.",
  },
  cledevoute: {
    title: "Cle De Voute — Masonry",
    description:
      "Masonry showcase website presenting services and completed work, with an accessible contact path and responsive portfolio presentation.",
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

const projectTechHighlights: Record<string, string[]> = {
  "wallet-provider": ["Identity Wallet", "eIDAS 2.0", "OIDC4VC"],
  "n8n-reporting": ["n8n", "SocialPilot", "PDF"],
  "n8n-video-derush": ["n8n", "FFmpeg", "Whisper"],
  "altme-wallet": ["HTML / CSS", "Python", "Coingecko API"],
  "erp-micro-creches": ["React", "Node.js", "MongoDB"],
  "teams-bot-mastra": ["TypeScript", "Azure Bot Framework", "Mastra"],
  "altme-documentation": ["GitBook", "Docusaurus", "Markdown"],
  "ats-filter-resume": ["Next.js", "React", "TypeScript"],
};

const getProjectTechHighlights = (project: DisplayProject) =>
  projectTechHighlights[project.id] ?? project.tech.slice(0, 3);

const getProjectDetailCta = (project: DisplayProject, isEnglish: boolean) => {
  const projectContext = `${project.id} ${project.title}`.toLowerCase();

  if (project.id === "nolvus-mod-automation") {
    return isEnglish ? "Discover the project →" : "Découvrir le projet →";
  }

  if (
    projectContext.includes("erp") ||
    projectContext.includes("micro-creche")
  ) {
    return isEnglish ? "View the ERP case →" : "Voir le cas ERP →";
  }

  if (
    projectContext.includes("n8n") ||
    projectContext.includes("automation") ||
    projectContext.includes("automatisation")
  ) {
    return isEnglish ? "Explore the automation →" : "Explorer l’automatisation →";
  }

  return isEnglish ? "Discover the project →" : "Découvrir le projet →";
};

const getProjectCardLabel = (project: DisplayProject, isEnglish: boolean) =>
  getProjectDetailCta(project, isEnglish).replace(/\s*→\s*$/, "");

const getProjectLink = (projectId: string, fromFreelance = false) => {
  const path = getProjectPagePath(projectId);
  if (!path) return undefined;
  return fromFreelance ? `${path}?from=freelance` : path;
};

const resolveImage = (img?: string | null) => {
  if (!img) return "";
  if (img.startsWith("http") || img.startsWith("data:")) return img;
  const normalized = img.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
};

const shouldStretchProjectImage = (project: DisplayProject) => {
  const entry = getImageManifestEntry(project.image);
  if (!entry) return false;

  const aspectRatio = entry.width / entry.height;

  // Wide banners only need a very small horizontal stretch to fill the
  // shared card frame without cropping their top or bottom edges.
  return (
    (aspectRatio >= 2 && aspectRatio <= 2.6) ||
    project.id === "aqualis" ||
    project.id === "seo-geo-optimization"
  );
};

const prepareDetailedContent = (content: string) => {
  const renderedContent = content.trimStart().startsWith("# ")
    ? renderProjectMarkdown(content)
    : content;

  // The sanitizer is loaded only when a visitor opens a project detail. This
  // keeps the large Mermaid/DOMPurify dependency out of the initial page.
  return decorateDetailedContent(renderedContent);
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
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const galleryViewerRef = useRef<HTMLDivElement>(null);
  const hadProjectSelectionRef = useRef(false);

  useEffect(() => {
    const projectImages = Array.from(
      new Set(
        projectsForView
          .map((project) => project.image)
          .filter((image): image is string => Boolean(image)),
      ),
    );

    const prefetchProjectImages = () => {
      const preferredWidth = window.innerWidth >= 1500 ? 960 : 480;

      projectImages.forEach((image) => {
        const prefetchPath = getImagePrefetchPath(image, preferredWidth);
        if (!prefetchPath) return;

        const href = resolveImage(prefetchPath);
        const alreadyPrefetched = Array.from(
          document.head.querySelectorAll<HTMLLinkElement>(
            "link[data-project-image-prefetch]",
          ),
        ).some((link) => link.href === href);
        if (alreadyPrefetched) return;

        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = href;
        link.dataset.projectImagePrefetch = "true";
        document.head.appendChild(link);
      });
    };

    const prefetchTimer = window.setTimeout(prefetchProjectImages, 300);
    return () => window.clearTimeout(prefetchTimer);
  }, [projectsForView]);

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
          id: "wallet-provider",
          title: "Altme Wallet Provider",
          context:
            "A digital-identity wallet product for organisations and end users, built around verifiable data and European interoperability.",
          need:
            "Support secure wallet journeys, verifiable credentials and a developer-facing ecosystem without exposing confidential implementation details.",
          solution:
            "Product-team contribution across wallet topics, verifiable-credential journeys, standards and the associated developer ecosystem.",
          stack: "Identity Wallet, eIDAS 2.0, Verifiable Credentials, OIDC4VC",
          result:
            "A structured product foundation aligned with European wallet and credential interoperability.",
          role:
            "Product-team contribution on wallet topics, identity standards, user journeys and technical documentation.",
          tasks: [
            "Work on wallet use cases involving credentials, identity and interoperability.",
            "Document user and developer journeys around verifiable data and secure sharing.",
            "Keep the public case study precise while protecting confidential implementation details.",
          ],
          gains: [
            "The product is positioned for eIDAS 2.0 and EUDI Wallet interoperability.",
            "Verifiable credentials give organisations and users a reusable way to prove information.",
            "The standards context makes the wallet ecosystem easier for developers to understand.",
          ],
          metrics: [
            { value: "2.0", label: "eIDAS" },
            { value: "OIDC4VC", label: "protocol" },
            { value: "EUDI", label: "wallet context" },
          ],
          sections: [
            {
              title: "Product scope",
              items: [
                "Digital identity wallet for organisations and individuals.",
                "Management, sharing and verification of verifiable credentials.",
                "Secure use cases around identity, business data and attestations.",
              ],
            },
            {
              title: "Standards",
              items: [
                "eIDAS 2.0 and EUDI Wallet interoperability context.",
                "Verifiable Credentials, OIDC4VC and SSI.",
                "European ecosystem and developer-facing integration topics.",
              ],
            },
            {
              title: "Contribution",
              items: [
                "Wallet-product topics and user journeys.",
                "Technical content and developer guidance.",
                "Implementation details deliberately limited for confidentiality.",
              ],
            },
          ],
        },
        {
          id: "n8n-reporting",
          title: "n8n Automations — Reporting",
          context:
            "A complete n8n reporting pipeline that starts with SocialPilot PDF exports and turns them into structured client-facing community-management reports.",
          need:
            "Move from a technical social-media export to a consistent CM deliverable while keeping sources, KPI checks and visual QA traceable.",
          solution:
            "Email and Drive intake, deduplication, KPI extraction and normalisation, targeted OCR, bounded analysis, client-PDF generation, QA and delivery notifications.",
          stack: "n8n, SocialPilot, Gmail API, Google Drive, JSON/PDF, OCR, Discord",
          result:
            "A repeatable reporting chain that gives the CM team a clear report to review and send to the client.",
          role:
            "Process analysis, workflow architecture, API integrations, JSON transformation, report generation and quality controls.",
          tasks: [
            "Receive SocialPilot exports, verify the expected attachment and archive the source in Google Drive.",
            "Detect duplicates and keep each reporting period linked to its source file and processing status.",
            "Extract and normalise KPIs by social network, with targeted OCR when a value is only available in a visual.",
            "Prepare the analysis, highlights and recommendations that turn raw metrics into a CM client narrative.",
            "Generate the client PDF with tables, charts and selected visuals, then run content and layout checks.",
            "Notify the delivery channel and preserve the traceability needed for a manual final review.",
          ],
          gains: [
            "A raw SocialPilot export becomes a homogeneous client-reporting base for the CM team.",
            "Sources, KPI transformations and generated files remain linked and easier to audit.",
            "The workflow removes repeated preparation steps while keeping the final editorial review in human hands.",
            "No percentage or traffic gain is claimed here without a source that can be published.",
          ],
          metrics: [
            { value: "PDF", label: "SocialPilot input/output" },
            { value: "KPI", label: "normalised per network" },
            { value: "QA", label: "content and visual checks" },
          ],
          sections: [
            {
              title: "Intake & archive",
              items: [
                "Receive and validate the SocialPilot PDF by email or Drive.",
                "Archive the source, reject duplicates and track the reporting period.",
                "Keep processing status and delivery notifications visible to the team.",
              ],
            },
            {
              title: "Analysis & report generation",
              items: [
                "Extract, normalise and cross-check KPIs for each social network.",
                "Use OCR only for values that are not available as selectable text.",
                "Generate the client PDF with analysis, recommendations, tables and visuals.",
              ],
            },
            {
              title: "QA & delivery",
              items: [
                "Check figures, labels, missing sections and report consistency.",
                "Run a visual pass on page breaks, charts and readable typography.",
                "Deliver the report with its source and processing trace available for review.",
              ],
            },
          ],
        },
        {
          id: "n8n-video-derush",
          title: "n8n Automations — Video Derush",
          context:
            "A complete n8n video pipeline that starts with raw footage and prepares short-form deliverables for Instagram and TikTok production.",
          need:
            "Turn long, unstructured rushes into selected, timestamped and technically organised material that a video team can take into production.",
          solution:
            "Drive intake and duplicate checks, FFmpeg and Whisper processing, editorial scoring, Q&A detection, EDL/subtitle/preview generation and organised delivery.",
          stack: "n8n, Google Drive API, FFmpeg, Whisper, EDL, SRT/ASS, JavaScript",
          result:
            "Raw footage becomes a documented pre-edit package ready to be reviewed and taken into final production.",
          role:
            "Pipeline architecture, media processing, AI-assisted editorial analysis, timeline/subtitle generation and QA.",
          tasks: [
            "Receive the raw rushes, check duplicates and prepare a traceable working folder for each production.",
            "Extract audio and create timestamped transcripts with FFmpeg and Whisper.",
            "Identify useful hooks, sequences, questions and answers, then score them against the editorial brief.",
            "Keep timestamps and source references attached to every selected excerpt for a reliable handoff.",
            "Generate an EDL-oriented timeline, subtitles and preview exports for the social formats under review.",
            "Organise the pre-edit package so the editor can review, adjust and continue production without hunting through raw files.",
          ],
          gains: [
            "Unsorted rushes become a documented selection that can be reviewed before the final edit.",
            "Timestamps, transcript, EDL and subtitle files reduce repeated pre-edit handling.",
            "Instagram and TikTok deliverables start from the same traceable source material.",
            "The editor keeps the final editorial decision; no performance percentage is claimed without published evidence.",
          ],
          metrics: [
            { value: "Rush", label: "raw video input" },
            { value: "EDL", label: "edit-ready timeline" },
            { value: "SRT/ASS", label: "subtitle outputs" },
          ],
          sections: [
            {
              title: "Ingestion & transcription",
              items: [
                "Prepare the Drive workspace and validate the incoming rushes.",
                "Extract audio, transcribe with timestamps and preserve source references.",
                "Record processing status and isolate failures for review.",
              ],
            },
            {
              title: "Editorial selection",
              items: [
                "Detect hooks, questions, answers and usable sequences.",
                "Score and group excerpts against the intended social format.",
                "Keep the rationale and timestamps visible for the editor.",
              ],
            },
            {
              title: "Production package",
              items: [
                "Generate EDL-oriented timelines, SRT/ASS subtitles and previews.",
                "Check file naming, durations, readability and source linkage.",
                "Deliver an organised package ready for the final Instagram/TikTok edit.",
              ],
            },
          ],
        },
        {
          id: "altme-wallet",
          title: "Altme Wallet Platform",
          context:
            "A Discover platform combining wallet data, verifiable credentials, NFTs and cryptocurrency information.",
          need:
            "Improve the product building blocks and connect user-facing views to reliable data sources.",
          solution:
            "Contribution to Discover interfaces and backend integrations, including CoinGecko data and responsive wallet journeys.",
          stack: "HTML / CSS, Python, CoinGecko API, Verifiable Credentials",
          result:
            "A clearer platform experience for managing wallet information and exploring connected digital-asset data.",
          role:
            "Team contribution on interface, backend and data-integration work within the Discover product.",
          tasks: [
            "Develop and improve product views for wallet and credential-related journeys.",
            "Connect CoinGecko data to display cryptocurrency information.",
            "Support NFT and crypto views while keeping the interface responsive across devices.",
          ],
          gains: [
            "Two product domains are brought together: NFTs and cryptocurrencies.",
            "CoinGecko provides a dedicated source for live crypto information.",
            "Responsive views make the same product journeys usable on different screen sizes.",
          ],
          metrics: [
            { value: "2", label: "domains: NFTs + crypto" },
            { value: "API", label: "CoinGecko data" },
            { value: "DID", label: "credential context" },
          ],
          sections: [
            {
              title: "Platform scope",
              items: [
                "Wallet management and digital-asset discovery.",
                "NFT collections, cryptocurrency information and credentials.",
                "Responsive views for the Discover experience.",
              ],
            },
            {
              title: "Integrations",
              items: [
                "Python backend contribution.",
                "CoinGecko API for cryptocurrency data.",
                "Verifiable credentials and decentralised-identity context.",
              ],
            },
            {
              title: "Contribution",
              items: [
                "Interface improvements and product integration work.",
                "Data display and connected user journeys.",
                "Delivery completed as part of a wider product team.",
              ],
            },
          ],
        },
      ]
    : [
        {
          id: "wallet-provider",
          title: "Altme Wallet Provider",
          context:
            "Produit de wallet d’identité numérique pour organisations et particuliers, fondé sur les données vérifiables et l’interopérabilité européenne.",
          need:
            "Soutenir des parcours wallet sécurisés, des credentials vérifiables et un écosystème développeur sans exposer les détails confidentiels.",
          solution:
            "Contribution au sein de l’équipe produit sur les sujets wallet, les parcours de credentials, les standards et l’écosystème développeur associé.",
          stack: "Identity Wallet, eIDAS 2.0, Verifiable Credentials, OIDC4VC",
          result:
            "Une base produit structurée, alignée avec l’interopérabilité européenne des wallets et credentials.",
          role:
            "Contribution produit sur les sujets wallet, les standards d’identité, les parcours utilisateurs et la documentation technique.",
          tasks: [
            "Contribuer aux cas d’usage wallet liés aux credentials, à l’identité et à l’interopérabilité.",
            "Documenter les parcours utilisateurs et développeurs autour des données vérifiables.",
            "Rester précis dans le cas public tout en protégeant les détails d’implémentation confidentiels.",
          ],
          gains: [
            "Le produit s’inscrit dans le contexte eIDAS 2.0 et de l’interopérabilité EUDI Wallet.",
            "Les credentials vérifiables offrent aux organisations et aux utilisateurs un moyen réutilisable de prouver une information.",
            "Le contexte des standards facilite la compréhension de l’écosystème par les développeurs.",
          ],
          metrics: [
            { value: "2.0", label: "eIDAS" },
            { value: "OIDC4VC", label: "protocole" },
            { value: "EUDI", label: "contexte wallet" },
          ],
          sections: [
            {
              title: "Périmètre produit",
              items: [
                "Wallet d’identité numérique pour organisations et particuliers.",
                "Gestion, partage et vérification de credentials vérifiables.",
                "Cas d’usage sécurisés autour de l’identité, des données métier et des attestations.",
              ],
            },
            {
              title: "Standards",
              items: [
                "Contexte eIDAS 2.0 et interopérabilité EUDI Wallet.",
                "Verifiable Credentials, OIDC4VC et SSI.",
                "Écosystème européen et sujets d’intégration développeur.",
              ],
            },
            {
              title: "Contribution",
              items: [
                "Sujets produit et parcours wallet.",
                "Contenus techniques et guides développeurs.",
                "Détails d’implémentation volontairement limités pour confidentialité.",
              ],
            },
          ],
        },
        {
          id: "n8n-reporting",
          title: "Automatisations n8n — Reporting",
          context:
            "Workflow n8n complet qui part des rapports PDF exportés par SocialPilot et les transforme en reportings CM clients structurés, analysés, contrôlés et prêts à livrer.",
          need:
            "Passer d’un export technique à un support de suivi client homogène, tout en gardant les sources, contrôles KPI et QA visuelle traçables.",
          solution:
            "Réception email/Drive, anti-doublon, extraction et normalisation des KPI, OCR ciblé, analyse bornée, génération PDF client, QA et notifications.",
          stack: "n8n, SocialPilot, Gmail API, Google Drive, JSON/PDF, OCR, Discord",
          result:
            "Une chaîne reproductible qui donne à l’équipe CM un rapport clair à relire puis transmettre au client.",
          role:
            "Analyse des processus, architecture des workflows, intégrations API, transformations JSON, génération du rapport et contrôles qualité.",
          tasks: [
            "Recevoir les exports SocialPilot, vérifier la pièce jointe attendue et archiver la source dans Google Drive.",
            "Détecter les doublons et relier chaque période de reporting à son fichier source et à son statut de traitement.",
            "Extraire et normaliser les KPI par réseau, avec OCR ciblé lorsqu’une valeur n’est disponible que dans un visuel.",
            "Préparer l’analyse, les faits marquants et les recommandations qui transforment les métriques brutes en récit CM client.",
            "Générer le PDF client avec tableaux, graphiques et visuels sélectionnés, puis contrôler le contenu et la mise en page.",
            "Notifier le canal de livraison et conserver la traçabilité nécessaire à la relecture humaine finale.",
          ],
          gains: [
            "Un export SocialPilot brut devient une base homogène de reporting client pour l’équipe CM.",
            "Les sources, transformations KPI et fichiers générés restent liés et plus faciles à contrôler.",
            "Le workflow supprime les préparations répétitives tout en laissant la validation éditoriale finale à l’humain.",
            "Aucun pourcentage de hausse n’est annoncé sans source publiable dans cette fiche.",
          ],
          metrics: [
            { value: "PDF", label: "entrée/sortie SocialPilot" },
            { value: "KPI", label: "normalisés par réseau" },
            { value: "QA", label: "contrôles contenu et visuels" },
          ],
          sections: [
            {
              title: "Réception et archivage",
              items: [
                "Recevoir et valider le PDF SocialPilot par email ou Drive.",
                "Archiver la source, rejeter les doublons et suivre la période de reporting.",
                "Garder le statut de traitement et les notifications de livraison visibles pour l’équipe.",
              ],
            },
            {
              title: "Analyse et génération du rapport",
              items: [
                "Extraire, normaliser et recouper les KPI de chaque réseau social.",
                "Utiliser l’OCR uniquement pour les valeurs non disponibles en texte sélectionnable.",
                "Générer le PDF client avec analyse, recommandations, tableaux et visuels.",
              ],
            },
            {
              title: "Contrôle qualité et livraison",
              items: [
                "Vérifier les chiffres, libellés, sections manquantes et cohérence du rapport.",
                "Relire la mise en page : sauts de page, graphiques et lisibilité des textes.",
                "Livrer le rapport avec sa source et sa trace de traitement disponibles pour relecture.",
              ],
            },
          ],
        },
        {
          id: "n8n-video-derush",
          title: "Automatisations n8n — Dérush vidéo",
          context:
            "Pipeline n8n complet qui part de rushes bruts et prépare des livrables courts pour la production Instagram et TikTok.",
          need:
            "Transformer une matière longue et non triée en séquences sélectionnées, horodatées et organisées pour le montage.",
          solution:
            "Ingestion Drive et anti-doublon, traitement FFmpeg/Whisper, analyse éditoriale, détection Q/R, génération EDL/sous-titres/preview et livraison organisée.",
          stack: "n8n, Google Drive API, FFmpeg, Whisper, EDL, SRT/ASS, JavaScript",
          result:
            "Les rushes deviennent un package de pré-montage documenté, prêt à être relu puis repris en production.",
          role:
            "Architecture du pipeline, traitement média, analyse éditoriale assistée par IA, génération de timelines/sous-titres et QA.",
          tasks: [
            "Recevoir les rushes bruts, vérifier les doublons et préparer un dossier de travail traçable par production.",
            "Extraire l’audio et produire des transcriptions horodatées avec FFmpeg et Whisper.",
            "Repérer les accroches, séquences, questions et réponses utiles, puis les scorer selon le brief éditorial.",
            "Conserver les timecodes et références source de chaque extrait sélectionné pour fiabiliser le passage au montage.",
            "Générer une timeline orientée EDL, les sous-titres et des previews pour les formats sociaux examinés.",
            "Organiser le package de pré-montage afin que le monteur puisse relire, ajuster et poursuivre la production sans rechercher dans les rushes.",
          ],
          gains: [
            "Les rushes non triés deviennent une sélection documentée, relisible avant le montage final.",
            "Les timecodes, transcriptions, fichiers EDL et sous-titres réduisent les manipulations de pré-montage.",
            "Les livrables Instagram et TikTok partent d’une même matière source traçable.",
            "Le monteur garde la décision éditoriale finale ; aucun pourcentage de performance n’est annoncé sans preuve publiable.",
          ],
          metrics: [
            { value: "Rush", label: "entrée vidéo brute" },
            { value: "EDL", label: "timeline prête au montage" },
            { value: "SRT/ASS", label: "sorties sous-titres" },
          ],
          sections: [
            {
              title: "Ingestion et transcription",
              items: [
                "Préparer l’espace Drive et valider les rushes entrants.",
                "Extraire l’audio, transcrire avec timecodes et conserver les références source.",
                "Tracer le statut de traitement et isoler les erreurs pour relecture.",
              ],
            },
            {
              title: "Sélection éditoriale",
              items: [
                "Détecter les accroches, questions, réponses et séquences exploitables.",
                "Scorer et regrouper les extraits selon le format social visé.",
                "Garder le raisonnement et les timecodes visibles pour le monteur.",
              ],
            },
            {
              title: "Package de production",
              items: [
                "Générer des timelines orientées EDL, des sous-titres SRT/ASS et des previews.",
                "Contrôler les noms de fichiers, durées, lisibilité et liens vers les sources.",
                "Livrer un package organisé, prêt pour le montage Instagram/TikTok final.",
              ],
            },
          ],
        },
        {
          id: "altme-wallet",
          title: "Altme Wallet Platform",
          context:
            "Plateforme Discover réunissant données wallet, credentials vérifiables, NFTs et informations liées aux cryptomonnaies.",
          need:
            "Améliorer les briques produit et relier les vues utilisateur à des sources de données fiables.",
          solution:
            "Contribution aux interfaces et intégrations backend de Discover, dont les données CoinGecko et les parcours wallet responsive.",
          stack: "HTML / CSS, Python, API CoinGecko, Verifiable Credentials",
          result:
            "Une expérience plus lisible pour gérer les informations wallet et explorer les données d’actifs numériques connectées.",
          role:
            "Contribution en équipe sur l’interface, le backend et les intégrations de données du produit Discover.",
          tasks: [
            "Développer et améliorer les vues produit pour les parcours wallet et credentials.",
            "Connecter les données CoinGecko pour afficher les informations liées aux cryptomonnaies.",
            "Accompagner les vues NFTs et crypto tout en gardant une interface responsive.",
          ],
          gains: [
            "Deux domaines produit sont réunis : NFTs et cryptomonnaies.",
            "CoinGecko fournit une source dédiée aux informations crypto en temps réel.",
            "Les vues responsive rendent les parcours utilisables sur différentes tailles d’écran.",
          ],
          metrics: [
            { value: "2", label: "domaines : NFTs + crypto" },
            { value: "API", label: "données CoinGecko" },
            { value: "DID", label: "contexte credentials" },
          ],
          sections: [
            {
              title: "Périmètre plateforme",
              items: [
                "Gestion de wallet et découverte d’actifs numériques.",
                "Collections NFT, informations crypto et credentials.",
                "Vues responsive pour l’expérience Discover.",
              ],
            },
            {
              title: "Intégrations",
              items: [
                "Contribution backend Python.",
                "API CoinGecko pour les données de cryptomonnaies.",
                "Credentials vérifiables et contexte d’identité décentralisée.",
              ],
            },
            {
              title: "Contribution",
              items: [
                "Améliorations d’interface et intégration produit.",
                "Affichage des données et parcours connectés.",
                "Livraison réalisée au sein d’une équipe produit plus large.",
              ],
            },
          ],
        },
      ];
  const visibleFeaturedCaseStudies = featuredCaseStudies;
  const selectedFeaturedCaseStudy = visibleFeaturedCaseStudies.find(
    (item) => item.id === selectedFeaturedProjectId,
  );
  const selectedFeaturedCaseStudyIndex = selectedFeaturedProjectId
    ? visibleFeaturedCaseStudies.findIndex((item) => item.id === selectedFeaturedProjectId)
    : -1;

  const categoryDefinitions = {
    emploi: {
      title: isEnglish ? "PROFESSIONAL PROJECTS" : "PROJETS PRO",
    },
    freelance: {
      title: isEnglish ? "FREELANCE PROJECTS" : "MISSIONS FREELANCE",
    },
    opensource: {
      title: "OPEN SOURCE",
    },
    gaming: {
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
    ? [...(isFreelancePage
        ? projectsForView.filter((project) =>
            freelanceSelectedWorkProjectIds.has(project.id),
          )
        : projectsForView.filter((project) =>
            selectedCategory === "freelance"
              ? project.category === selectedCategory ||
                portfolioFreelanceProjectIds.has(project.id)
              : project.category === selectedCategory,
          ))]
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

  const selectedFreelanceWorkGroups = isFreelancePage
    ? freelanceSelectedWorkGroups
        .map((group) => ({
          ...group,
          projects: group.projectIds
            .map((projectId) =>
              filteredProjects.find((project) => project.id === projectId),
            )
            .filter((project): project is DisplayProject => Boolean(project)),
        }))
        .filter((group) => group.projects.length > 0)
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

  const handleBackToList = () => {
    const historyState = getHistoryState();
    const hashProjectId = getProjectIdFromHash(window.location.hash);

    if (
      hashProjectId &&
      historyState.portfolioProjectId === hashProjectId &&
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
      className={`project-list-section px-4 w-full overflow-x-hidden section-even ${
        isFreelancePage
          ? "pb-20 pt-8 md:pb-20 md:pt-12"
          : "py-20"
      }`}
    >
      <div className="project-list-container container mx-auto max-w-7xl w-full">
        {/* Section Header */}
      <div className="project-section-header mb-12 w-full">
        <div>
        <h2
            ref={projectsHeadingRef}
            tabIndex={-1}
            className="project-section-title focus-visible:outline-none"
          >
            {isFreelancePage
              ? (isEnglish ? "Selected freelance work." : "Réalisations freelance sélectionnées.")
              : (isEnglish ? "Selected projects." : "Projets sélectionnés.")}
          </h2>
          <p className="project-section-description">
            {isFreelancePage
              ? (isEnglish
                ? "Three representative projects, with the role, deliverables and value made explicit."
                : "Trois réalisations représentatives, avec le rôle, les livrables et la valeur produite.")
              : (isEnglish
                ? "Context, role, solution and value delivered through selected professional work."
                : "Contexte, rôle, solution et valeur produite à travers une sélection de réalisations professionnelles.")}
          </p>
        </div>
          {!isFreelancePage ? (
            <a className="project-section-all-link" href="#projects-list">
              {isEnglish ? "View all projects" : "Voir tous les projets"}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          ) : null}
        </div>

        {!selectedProject && !isFreelancePage && (
          <div className="project-featured-section mb-12">
            <div className="sr-only">
              <h3>
                {isEnglish
                  ? `${visibleFeaturedCaseStudies.length} key projects`
                  : `${visibleFeaturedCaseStudies.length} projets clés`}
              </h3>
              <p>
                {isEnglish
                  ? "Context, need, role, solution and value delivered. Select a project to open its case study."
                  : "Contexte, besoin, rôle, solution et valeur produite. Sélectionnez un projet pour ouvrir son étude de cas."}
              </p>
            </div>
            <div className="project-featured-grid mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {visibleFeaturedCaseStudies.map((item, index) => {
                const isSelected = selectedFeaturedProjectId === item.id;
                const projectPath = getProjectLink(item.id, isFreelancePage);

                return (
                  <div key={item.id} className="project-featured-item flex min-w-0 flex-col gap-1">
                    <p className="project-featured-eyebrow">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="project-featured-eyebrow-line" aria-hidden="true" />
                      <span>{isEnglish ? "PROJECT" : "PROJET PRO"}</span>
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setSelectedFeaturedProjectId((currentId) =>
                          currentId === item.id ? null : item.id,
                        )
                      }
                      aria-expanded={isSelected}
                      aria-controls="featured-case-study"
                      className={`project-featured-title h-auto min-h-0 whitespace-normal px-0 py-1 text-left text-base transition-colors md:text-lg ${
                        isSelected
                          ? "text-primary"
                          : "text-foreground hover:bg-transparent hover:text-primary"
                      }`}
                    >
                      {item.title}
                    </Button>
                    {projectPath ? (
                      <Link
                        to={projectPath}
                        aria-label={isEnglish ? "Open dedicated case study" : "Ouvrir l’étude de cas dédiée"}
                        className="project-featured-link"
                      >
                        {isEnglish ? "Open the case study" : "Ouvrir l’étude de cas"}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {selectedFeaturedCaseStudy && (
              <article
                id="featured-case-study"
                className="mx-auto w-full border-y border-border bg-transparent py-6 md:py-8"
              >
                <header className="border-b border-border pb-6 md:pb-8">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                      <span>
                        {String(selectedFeaturedCaseStudyIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-8 bg-primary" aria-hidden="true" />
                      <span>{isEnglish ? "Project" : "Projet"}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFeaturedProjectId(null)}
                      aria-label={isEnglish ? "Close case study" : "Fermer l’étude de cas"}
                      className="h-auto rounded-none px-0 text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground"
                    >
                      <span className="mr-2 h-px w-8 bg-primary" aria-hidden="true" />
                      {isEnglish ? "Close" : "Fermer"}
                    </Button>
                  </div>
                  <h3 className="mt-4 max-w-5xl text-2xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    {selectedFeaturedCaseStudy.title}
                  </h3>
                  <div className="mt-4 flex max-w-4xl items-start gap-4">
                    <span className="mt-2.5 h-px w-8 shrink-0 bg-primary" aria-hidden="true" />
                    <p className="text-sm leading-6 text-foreground/80 md:text-base md:leading-7">
                      {selectedFeaturedCaseStudy.context}
                    </p>
                  </div>
                </header>

                <div className="grid border-b border-border md:grid-cols-2">
                  {[
                    {
                      label: isEnglish ? "Context" : "Contexte",
                      value: selectedFeaturedCaseStudy.context,
                    },
                    {
                      label: isEnglish ? "Need" : "Besoin",
                      value: selectedFeaturedCaseStudy.need,
                    },
                    {
                      label: isEnglish ? "Solution" : "Solution",
                      value: selectedFeaturedCaseStudy.solution,
                    },
                    {
                      label: "Stack",
                      value: selectedFeaturedCaseStudy.stack,
                    },
                    {
                      label: isEnglish ? "Result" : "Résultat",
                      value: selectedFeaturedCaseStudy.result,
                    },
                    {
                      label: isEnglish ? "My role" : "Mon rôle",
                      value: selectedFeaturedCaseStudy.role,
                    },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={[
                        "py-4 md:py-5",
                        index % 2 === 0 ? "md:pr-10" : "md:border-l md:border-border md:pl-10",
                        index > 0 ? "border-t border-border md:border-t-0" : "",
                        index > 1 ? "md:border-t md:border-border" : "",
                      ].join(" ")}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        {item.label}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-foreground/80 md:text-sm md:leading-7">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {selectedFeaturedCaseStudy.metrics?.length ? (
                  <div className="grid border-b border-border py-3 sm:grid-cols-3">
                    {selectedFeaturedCaseStudy.metrics.map((metric, index) => (
                      <div
                        key={`${metric.value}-${metric.label}`}
                        className={[
                          "py-3 sm:py-2",
                          index > 0 ? "border-t border-border sm:border-l sm:border-t-0 sm:pl-8" : "",
                        ].join(" ")}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="grid border-b border-border md:grid-cols-3">
                  {[
                    {
                      title: isEnglish ? "Tasks delivered" : "Tâches réalisées",
                      items: selectedFeaturedCaseStudy.tasks,
                    },
                    {
                      title: isEnglish ? "Value delivered" : "Gains / valeur produite",
                      items: selectedFeaturedCaseStudy.gains,
                    },
                    ...selectedFeaturedCaseStudy.sections,
                  ].map((section, index) => (
                    <section
                      key={section.title}
                      className={[
                        "py-5 md:py-6 md:pr-8",
                        index % 3 !== 0 ? "md:border-l md:border-border md:pl-8" : "",
                        index >= 3 ? "border-t border-border" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-semibold tracking-[0.18em] text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          {section.title}
                        </h4>
                      </div>
                      <div className="mt-4 space-y-2">
                        {section.items.map((item) => (
                          <p key={item} className="text-xs leading-6 text-foreground/80 md:text-sm md:leading-7">
                            {item}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="flex justify-end pt-5 md:pt-6">
                  <Button
                    variant="link"
                    className="h-auto gap-3 rounded-none px-0 text-primary"
                    asChild={Boolean(getProjectLink(selectedFeaturedCaseStudy.id, isFreelancePage))}
                  >
                    {getProjectLink(selectedFeaturedCaseStudy.id, isFreelancePage) ? (
                      <a href={getProjectLink(selectedFeaturedCaseStudy.id, isFreelancePage)}>
                        {isEnglish ? "View full project" : "Voir la fiche complète"}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <>
                        {isEnglish ? "View full project" : "Voir la fiche complète"}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
              </article>
            )}
          </div>
        )}

        {localizedSelectedProject ? (
          <ProjectDetail
            project={localizedSelectedProject}
            techHighlights={getProjectTechHighlights(localizedSelectedProject)}
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
            {!isFreelancePage && (
              <div id="projects-list" className="project-category-tabs mx-auto mb-12 grid w-full grid-cols-2 gap-3 px-2 lg:grid-cols-4">
                {Object.entries(categoryConfig).map(([key]) => (
                  <Button
                    key={key}
                    onClick={() =>
                      handleCategoryClick(key as DisplayProjectCategory)
                    }
                    variant="ghost"
                    className={`project-category-tab w-full px-2 py-3 text-xs transition-colors sm:px-4 sm:text-sm md:px-5 md:py-4 md:text-base lg:px-6 lg:py-5 lg:text-lg ${
                      selectedCategory === key
                        ? "is-active text-primary"
                        : "text-foreground/80 hover:bg-transparent hover:text-primary"
                    }`}
                  >
                    <span>{categoryLabels[key as DisplayProjectCategory]}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* Projects Grid */}
            {selectedCategory && isFreelancePage && (
              <div className="space-y-10 md:space-y-14">
                {selectedFreelanceWorkGroups.map((group, index) => {
                  const project = group.projects[0];
                  if (!project) return null;

                  const title = isEnglish ? group.title.en : group.title.fr;
                  const description = isEnglish
                    ? group.description.en
                    : group.description.fr;
                  const stack = Array.from(
                    new Set(
                      group.projects.flatMap((entry) =>
                        getProjectTechHighlights(entry),
                      ),
                    ),
                  ).slice(0, 5);

                  return (
                    <article
                      key={group.key}
                      className="grid gap-8 border-y border-border py-8 md:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] md:gap-12 md:py-10 lg:gap-16"
                    >
                      <div
                        className={`relative aspect-video w-full self-center overflow-hidden ${
                          project.image.startsWith("img_projects/n8n_") ? "bg-[#17060a]" : ""
                        }`}
                      >
                        <img
                          src={resolveImage(project.image)}
                          srcSet={getImageSrcSet(project.image, resolveImage)}
                          alt={title}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 360px, (max-width: 1200px) 480px, 640px"
                          width={getImageManifestEntry(project.image)?.width}
                          height={getImageManifestEntry(project.image)?.height}
                          className="relative block h-full w-full rounded-none object-contain"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <p className="text-sm font-semibold tracking-[0.18em] text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                          {title}
                        </h3>
                        <p className="mt-4 text-base leading-7 text-foreground/85">
                          {description}
                        </p>
                        <dl className="mt-6 space-y-4 border-y border-border py-5 text-sm leading-6">
                          <div>
                            <dt className="font-semibold text-foreground">
                              {isEnglish ? "Intervention" : "Intervention"}
                            </dt>
                            <dd className="mt-1 text-muted-foreground">
                              {isEnglish ? group.role.en : group.role.fr}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-foreground">
                              {isEnglish ? "Value delivered" : "Valeur produite"}
                            </dt>
                            <dd className="mt-1 text-muted-foreground">
                              {isEnglish ? group.outcome.en : group.outcome.fr}
                            </dd>
                          </div>
                        </dl>
                        <p className="mt-5 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">Stack :</span>{" "}
                          {stack.join(" · ")}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                          {group.projects.map((detailProject) => (
                            getProjectLink(detailProject.id, isFreelancePage) ? (
                              <Button key={detailProject.id} asChild variant="outline">
                                <Link to={getProjectLink(detailProject.id, isFreelancePage)}>
                                  {group.projects.length > 1
                                    ? detailProject.id === "n8n-reporting"
                                      ? isEnglish
                                        ? "Explore reporting →"
                                        : "Explorer le reporting →"
                                      : isEnglish
                                        ? "Explore video editing →"
                                        : "Explorer le dérush →"
                                    : getProjectDetailCta(detailProject, isEnglish)}
                                </Link>
                              </Button>
                            ) : (
                              <Button
                                key={detailProject.id}
                                variant="outline"
                                onClick={() => handleProjectClick(detailProject)}
                              >
                                {group.projects.length > 1
                                  ? detailProject.id === "n8n-reporting"
                                    ? isEnglish
                                      ? "Explore reporting →"
                                      : "Explorer le reporting →"
                                    : isEnglish
                                      ? "Explore video editing →"
                                      : "Explorer le dérush →"
                                  : getProjectDetailCta(detailProject, isEnglish)}
                              </Button>
                            )
                          ))}
                          {project.github && (
                            <Button
                              asChild
                              variant="outline"
                              className="border-border text-foreground/85 hover:border-primary hover:bg-primary/5 hover:text-primary"
                            >
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                                {isEnglish ? "Source code" : "Code source"}
                              </a>
                            </Button>
                          )}
                          {project.demo && (
                            <Button
                              asChild
                              variant="outline"
                              className="border-border text-foreground/85 hover:border-primary hover:bg-primary/5 hover:text-primary"
                            >
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                                {isEnglish ? "Open the live site" : "Voir le site en production"}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    {isEnglish
                      ? "Other project fiches and explorations are available from the full portfolio."
                      : "Les autres fiches et explorations restent accessibles dans le portfolio complet."}
                  </p>
                  <Button asChild variant="link" className="h-auto gap-2 px-0 text-primary">
                    <Link to="/#projects">
                      {isEnglish ? "View the full portfolio" : "Voir le portfolio complet"}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {selectedCategory && !isFreelancePage && (
              <div className="project-cards-grid grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {filteredProjects.map((project) => {
                  const localizedProject = localizeProject(project);
                  const projectPath = getProjectLink(project.id, isFreelancePage);

                  return (
                    <Card
                      key={project.id}
                      data-project-card={project.id}
                      className="project-card-editorial group flex h-full flex-col overflow-hidden rounded-none border-border bg-card shadow-none transition-colors duration-200 hover:border-primary/60"
                    >
                      <div
                        className={`project-card-media relative flex aspect-[16/7] w-full items-center justify-center overflow-hidden ${
                          project.image === "img_projects/wallet_provider-phones.png"
                            ? "bg-white"
                            : "bg-card"
                        }`}
                      >
                        <img
                          src={resolveImage(project.image)}
                          srcSet={getImageSrcSet(project.image, resolveImage)}
                          alt={localizedProject.title}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 360px, (max-width: 1200px) 320px, 320px"
                          width={getImageManifestEntry(project.image)?.width}
                          height={getImageManifestEntry(project.image)?.height}
                          className={shouldStretchProjectImage(project)
                            ? "block h-full w-full object-fill"
                            : "block h-full w-full object-contain"}
                        />
                      </div>
                      <div className="project-card-content flex flex-1 flex-col p-4 md:p-5">
                        <h3 className="min-h-[3rem] text-lg font-semibold leading-6 text-foreground md:text-xl md:leading-6">
                          {localizedProject.title}
                        </h3>
                        <p className="project-card-description mt-2 min-h-[6rem] text-sm leading-6 text-muted-foreground">
                          {localizedProject.description}
                        </p>
                        <div
                          data-project-tech
                          className="project-card-tech mt-0 grid min-h-12 min-w-0 grid-cols-3 items-stretch text-center text-xs font-semibold leading-5 text-foreground/75 md:text-sm"
                        >
                          {getProjectTechHighlights(project).map((tech, index) => (
                            <span
                              key={tech}
                              className="relative flex min-h-12 min-w-0 items-center justify-center break-words whitespace-normal px-1"
                            >
                              {index > 0 ? (
                                <span
                                  className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/70"
                                  aria-hidden="true"
                                >
                                  |
                                </span>
                              ) : null}
                              <span title={tech}>{tech}</span>
                            </span>
                          ))}
                        </div>
                        <div className="project-card-actions mt-auto space-y-3 pt-5">
                          <div
                            className={`project-card-action-row grid gap-3 ${
                              project.github ? "grid-cols-2" : "grid-cols-1"
                            }`}
                          >
                            {projectPath ? (
                              <Link className="project-card-link" to={projectPath}>
                                {getProjectCardLabel(project, isEnglish)}
                                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                              </Link>
                            ) : (
                              <button
                                type="button"
                                className="project-card-link"
                                onClick={() => handleProjectClick(project)}
                              >
                                {getProjectCardLabel(project, isEnglish)}
                                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                              </button>
                            )}
                            {project.github && (
                              <a
                                className="project-card-link"
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
                                {isEnglish ? "Source code" : "Code"}
                              </a>
                            )}
                          </div>
                          {project.demo && (
                            <a
                              className="project-card-link project-card-demo"
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {isEnglish ? "View project" : "Voir le projet"}
                              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </a>
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
