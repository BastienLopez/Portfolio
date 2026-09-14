import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  Film,
  Gamepad2,
  Github,
  Rocket,
  ShieldCheck,
  Star,
  WalletCards,
  Workflow,
  type LucideIcon,
} from "lucide-react";
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

const featuredProjectConfig: Record<string, { icon: LucideIcon }> = {
  "wallet-provider": { icon: ShieldCheck },
  "n8n-reporting": { icon: Workflow },
  "n8n-video-derush": { icon: Film },
  "altme-wallet": { icon: WalletCards },
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
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const galleryViewerRef = useRef<HTMLDivElement>(null);
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

  const categoryDefinitions = {
    emploi: {
      icon: Briefcase,
      title: isEnglish ? "PROFESSIONAL PROJECTS" : "PROJETS PRO",
    },
    freelance: {
      icon: Rocket,
      title: isEnglish ? "FREELANCE PROJECTS" : "MISSIONS FREELANCE",
    },
    opensource: {
      icon: Star,
      title: "OPEN SOURCE",
    },
    gaming: {
      icon: Gamepad2,
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
        : projectsForView.filter((project) => project.category === selectedCategory))]
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

  const handleFeaturedProjectClick = (projectId: string) => {
    const project = projectsForView.find((entry) => entry.id === projectId);
    if (!project) return;
    handleProjectClick(project);
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
              ? (isEnglish ? "Selected freelance work" : "Réalisations freelance sélectionnées")
              : (isEnglish ? "Case studies & work" : "Études de cas et réalisations")}
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-primary"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 px-4">
            {isFreelancePage
              ? (isEnglish
                ? "Three representative projects, with the role, deliverables and value made explicit."
                : "Trois réalisations représentatives, avec le rôle, les livrables et la valeur produite.")
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
                  ? "Context, need, role, solution and value delivered. Select a project to open its case study."
                  : "Contexte, besoin, rôle, solution et valeur produite. Sélectionnez un projet pour ouvrir son étude de cas."}
              </p>
            </div>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {visibleFeaturedCaseStudies.map((item) => {
                const config = featuredProjectConfig[item.id];
                const isSelected = selectedFeaturedProjectId === item.id;
                const splitTitle =
                  item.id === "n8n-reporting" || item.id === "n8n-video-derush"
                    ? item.title.split(" — ")
                    : null;

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
                    <config.icon className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
                    <span
                      className={
                        splitTitle
                          ? "flex flex-col text-center leading-6"
                          : undefined
                      }
                    >
                      {splitTitle ? (
                        <>
                          <span>{splitTitle[0]}</span>
                          <span>— {splitTitle.slice(1).join(" — ")}</span>
                        </>
                      ) : (
                        item.title
                      )}
                    </span>
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

                {selectedFeaturedCaseStudy.metrics?.length ? (
                  <div className="mt-6 grid gap-3 border-y border-border py-5 sm:grid-cols-3">
                    {selectedFeaturedCaseStudy.metrics.map((metric) => (
                      <div key={`${metric.value}-${metric.label}`} className="min-w-0">
                        <p className="truncate text-xl font-semibold text-primary md:text-2xl">
                          {metric.value}
                        </p>
                        <p className="text-xs text-muted-foreground md:text-sm">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

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
                  className="mt-6 h-auto w-fit justify-start gap-2 px-0 text-primary"
                  onClick={() =>
                    handleFeaturedProjectClick(selectedFeaturedCaseStudy.id)
                  }
                >
                  {isEnglish ? "View full project" : "Voir la fiche complète"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Card>
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
              <div className="mb-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {isEnglish
                    ? "A selection of recent work, from frontend to backend."
                    : "Une sélection de mes réalisations récentes, du frontend au backend."}
                </p>
              </div>
            )}
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
                    <config.icon className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
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
                          project.image === "img_projects/n8n.png" ? "bg-[#17060a]" : ""
                        }`}
                      >
                        <img
                          src={resolveImage(project.image)}
                          srcSet={getImageSrcSet(project.image, resolveImage)}
                          alt={title}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 55vw"
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
                    <a href="/#projects">
                      {isEnglish ? "View the full portfolio" : "Voir le portfolio complet"}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {selectedCategory && !isFreelancePage && (
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {filteredProjects.map((project) => {
                  const localizedProject = localizeProject(project);

                  return (
                    <Card
                      key={project.id}
                      className="group flex h-full flex-col overflow-hidden border-border bg-card shadow-none transition-colors duration-200 hover:border-primary/60"
                    >
                      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-secondary md:h-56 lg:h-52">
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
                      <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                        <h3 className="text-xl font-bold text-foreground">
                          {localizedProject.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {localizedProject.description}
                        </p>
                        <div className="flex min-w-0 flex-nowrap gap-2 overflow-hidden">
                          {getProjectTechHighlights(project).map((tech) => (
                            <span
                              key={tech}
                              title={tech}
                              className="min-w-0 flex-1 truncate rounded-full border border-border/80 bg-secondary/70 px-3 py-1.5 text-center text-xs font-medium leading-5 text-foreground/75 transition-colors hover:border-primary/60 sm:text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="space-y-3 pt-2">
                          <div className={`grid gap-3 ${project.github ? "grid-cols-2" : "grid-cols-1"}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full min-w-0 border-border px-2 text-xs text-foreground hover:border-primary hover:text-primary sm:text-sm"
                              onClick={() => handleProjectClick(project)}
                            >
                              {getProjectDetailCta(project, isEnglish)}
                            </Button>
                            {project.github && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="w-full min-w-0 border-border px-2 text-xs text-foreground hover:border-primary hover:text-primary sm:text-sm"
                              >
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                          {project.demo && (
                            <Button asChild size="lg" className="w-full bg-cta text-cta-foreground hover:bg-cta/90">
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
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
