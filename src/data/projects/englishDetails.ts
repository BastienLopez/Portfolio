type InlineVisual = {
  src: string;
  alt: string;
  caption: string;
  galleryIndex: number;
};

type CaseStudySection = {
  title: string;
  items: string[];
  description?: string[];
  visuals?: InlineVisual[];
  visualLayout?: "grid";
};

type CaseStudy = {
  title: string;
  context: string[];
  role?: string;
  technologies: string[];
  introVisuals?: InlineVisual[];
  sections: CaseStudySection[];
  results: string[];
};

const toList = (items: string[]) =>
  `<ul class="features-list">${items.map((item) => `<li class="feature-item">${item}</li>`).join("")}</ul>`;

const renderVisuals = (visuals: InlineVisual[] = [], layout?: "grid") => {
  if (visuals.length === 0) return "";

  const content = visuals
    .map(
      ({ src, alt, caption, galleryIndex }) =>
        `<button type="button" class="project-inline-visual" data-gallery-index="${galleryIndex}"><img src="${src}" alt="${alt}" loading="lazy" decoding="async" /><span>${caption}</span></button>`,
    )
    .join("");

  return layout === "grid" ? `<div class="inline-visual-grid">${content}</div>` : content;
};

const renderCaseStudy = (caseStudy: CaseStudy) => `
  <div class="project-detail">
    <h2 class="project-title">${caseStudy.title}</h2>
    <div class="section">
      <h3 class="section-title">Project context</h3>
      ${caseStudy.context.map((paragraph) => `<p class="description">${paragraph}</p>`).join("")}
    </div>
    ${renderVisuals(caseStudy.introVisuals)}
    ${caseStudy.role ? `<div class="section info-box"><h3 class="section-title">My role</h3><p class="description">${caseStudy.role}</p></div>` : ""}
    <div class="section">
      <h3 class="section-title">Technologies</h3>
      <div class="tech-grid">${caseStudy.technologies.map((technology) => `<div class="tech-item"><span class="tech-name">${technology}</span></div>`).join("")}</div>
    </div>
    ${caseStudy.sections.map((section) => `<div class="section"><h3 class="section-title">${section.title}</h3>${section.description?.map((paragraph) => `<p class="description">${paragraph}</p>`).join("") ?? ""}${section.items.length > 0 ? toList(section.items) : ""}${renderVisuals(section.visuals, section.visualLayout)}</div>`).join("")}
    <div class="section results"><h3 class="section-title">Outcome</h3><div class="result-box success">${caseStudy.results.map((result) => `<p class="result-text">${result}</p>`).join("")}</div></div>
  </div>
`;

const englishCaseStudies: Record<string, CaseStudy> = {
  "eloi-coachsteo": {
    title: "Eloi CoachStéo",
    context: [
      "Showcase one-page website created for a sports coach and osteopath. The brief was to make the offer understandable on arrival and guide visitors towards the right service and a direct contact.",
      "The page brings together fitness, physical preparation and tailored HYROX programmes in one continuous journey, so the information remains easy to scan on a phone as well as on a large screen.",
    ],
    role: "I handled the site design, content hierarchy, React and Tailwind CSS integration, responsive layout and deployment. I turned the service information into short, readable sections with a clear next action.",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    sections: [
      {
        title: "Page journey",
        items: [
          "Position the combined coaching and osteopathy offer",
          "Present fitness, physical preparation and HYROX programmes",
          "Use visuals and the testimonials section for reassurance",
          "Keep the contact and appointment path visible throughout the page",
        ],
      },
      {
        title: "Value delivered",
        description: [
          "The site gives a professional showcase to an activity that combines several areas of expertise. Its hierarchy helps visitors understand the offer, distinguish the types of support and reach contact when they are ready.",
          "The gain is qualitative: services, visuals and contact are grouped in a responsive one-page experience. No appointment volume or conversion rate is claimed without published tracking data.",
        ],
        items: [],
      },
    ],
    results: [
      "Public website deployed to present the coaching and osteopathy offer with a clear reading order.",
      "Responsive journey makes services and contact options identifiable across the main screen sizes.",
    ],
  },
  "erp-micro-creches": {
    title: "Multi-Nursery ERP & Digital Ecosystem",
    context: [
      "Business ERP designed to centralise the operation of a network of five micro-nurseries, alongside a family portal and a public-facing website.",
      "The platform brings together children, families, staff, attendance, planning, records, documents, dashboards and multi-site administration in one environment.",
      "It was designed for multi-site use: data is separated by nursery and access is restricted according to each user profile.",
    ],
    role: "I designed and developed the full-stack solution: functional architecture, React interfaces, Node.js APIs, MongoDB data model, role-based access, tests, Docker-based environments, CI/CD preparation, documentation and operational readiness. I also integrated eight years of historical data to preserve continuity with existing records. Functional details remain partly anonymised for confidentiality.",
    technologies: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "Mongoose", "JWT / RBAC", "Docker", "CI/CD", "TDD"],
    introVisuals: [{ src: "img_projects/erp-micro-creches-vue-multisite.png", alt: "Consolidated children view with nursery selection", caption: "Multi-nursery view and active context", galleryIndex: 1 }],
    sections: [
      {
        title: "Business modules",
        items: ["Multi-nursery management and consolidated dashboards", "Children, parent and staff records", "Attendance, staff attendance, planning and daily handovers", "Documents, reporting and operational indicators", "Family portal with role-based access, alongside differentiated administrator and professional areas"],
        visuals: [
          { src: "img_projects/erp-micro-creches-gestion-enfants.png", alt: "Micro-nursery child-management interface", caption: "Child management", galleryIndex: 0 },
          { src: "img_projects/erp-micro-creches-presences-du-jour.png", alt: "Daily attendance, absence and late-arrival monitoring", caption: "Daily attendance", galleryIndex: 2 },
          { src: "img_projects/erp-micro-creches-planning-hebdomadaire.png", alt: "Weekly attendance planning calendar", caption: "Weekly planning", galleryIndex: 3 },
          { src: "img_projects/erp-micro-creches-suivi-heures-realisees.png", alt: "Weekly and monthly completed-hours summary", caption: "Completed-hours tracking", galleryIndex: 4 },
          { src: "img_projects/erp-micro-creches-portail-parent-accueil.png", alt: "Family dashboard", caption: "Family portal dashboard", galleryIndex: 5 },
          { src: "img_projects/erp-micro-creches-portail-parent-transmissions.png", alt: "Child record and daily handovers available to parents", caption: "Family portal handovers", galleryIndex: 6 },
        ],
        visualLayout: "grid",
      },
      {
        title: "Public metrics",
        items: ["5 micro-nurseries managed from one platform", "4 main access profiles", "8 years of historical data migrated"],
      },
      { title: "Multi-site architecture and access", items: ["A nursery context and a dedicated identifier scope the main business resources", "The backend verifies authorised sites and roles before serving data", "Global administrators can supervise the network while local users only access their assigned sites", "Because children, parents and staff data are sensitive, access control, confidentiality and traceability were treated as core concerns"] },
      {
        title: "Family account and record administration",
        description: ["Administrators can create and manage parent accounts, link children to the appropriate families and centralise administrative documents in one place."],
        items: [],
        visuals: [{ src: "img_projects/erp-micro-creches-gestion-comptes-parents.png", alt: "Parent accounts, linked children and document management", caption: "Family account and record administration", galleryIndex: 7 }],
      },
      {
        title: "Sensitive data and security",
        description: ["The application handles information about children, parents and staff. Authentication, role-based access, backend controls and nursery isolation govern access; no formal legal compliance is claimed."],
        items: [],
        visuals: [{ src: "img_projects/erp-micro-creches-roles-permissions.png", alt: "ERP roles, access scopes and RBAC controls", caption: "Roles, permissions and access scopes", galleryIndex: 8 }],
      },
      {
        title: "Technical architecture",
        description: ["The ERP uses a React SPA connected to an Express API, with backend access controls, MongoDB for business data and automated tests around selected critical journeys."],
        items: [],
        visuals: [{ src: "img_projects/erp-micro-creches-architecture-technique.png", alt: "React, Express, MongoDB, testing and Docker architecture", caption: "ERP technical architecture", galleryIndex: 9 }],
      },
      { title: "Quality and delivery", items: ["Automated Jest suites cover the backend and selected critical flows", "API documentation prepared around Swagger/OpenAPI", "Reproducible Docker environment and configured CI workflows", "A deployment workflow is prepared; current production use is not asserted here"] },
    ],
    results: ["Five micro-nurseries can be supervised from one interface, with business modules and differentiated access by role.", "The project covers requirements, UX/UI, full-stack development, data, tests, delivery preparation, documentation and maintenance."],
  },
  "luxury-auto-detailing": {
    title: "Luxury Auto Detailing",
    context: [
      "Premium showcase website for a car-detailing workshop. The project explains services that go beyond a simple wash: decontamination, polishing, ceramic protection and interior restoration.",
      "The interface puts the expected visual result, the difference between services and the appointment request in the same guided journey. The gallery and calls to action support the explanation without making the page heavy.",
    ],
    role: "I handled the frontend design and integration with React and Tailwind CSS, responsive adaptation, service hierarchy, gallery, contact journey and deployment. The work translated a technical service offer into a visual path that a future customer can understand.",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    sections: [
      {
        title: "Visitor journey",
        items: [
          "Establish a premium visual identity from the first screen",
          "Distinguish cleaning, polishing, ceramic protection and interior work",
          "Use before-and-after visuals to make the expected finish concrete",
          "Keep direct contact and appointment requests easy to reach",
        ],
      },
      {
        title: "Value delivered",
        description: [
          "The site turns a list of services into a guided presentation: visitors understand what is offered, see the level of finish expected and know how to get in touch. The structure explains technical interventions without losing the visual nature of detailing.",
          "The gain is qualitative: a coherent, responsive showcase centred on completed work and direct contact. Commercial performance is not quantified here because no tracking data is published.",
        ],
        items: [],
      },
    ],
    results: [
      "Public website deployed to present services, examples of finish and contact options clearly.",
      "Responsive journey connects service discovery to an appointment request without a break.",
    ],
  },
  "wallet-provider": {
    title: "Altme Wallet Provider",
    context: ["Digital identity wallet product for organisations and individuals, designed around verifiable credentials and interoperability standards."],
    role: "Contribution to the product and its technical ecosystem within the team.",
    technologies: ["Identity Wallet", "eIDAS 2.0", "Verifiable Credentials", "OIDC4VC", "EBSI", "SSI"],
    sections: [{ title: "Contribution scope", items: ["Digital identity wallet product", "Verifiable-credential management", "Interoperability with the European EUDI Wallet ecosystem"] }],
    results: ["Contribution to the technical product ecosystem for a digital identity wallet."],
  },
  cledevoute: {
    title: "Cle De Voute — Masonry",
    context: [
      "Showcase website for a masonry company that wanted a clearer public presence focused on services, completed work and a straightforward route to contact.",
      "The page is structured as a simple local-discovery journey: understand the activity, browse the portfolio and find the contact action. The hierarchy remains readable on mobile, where many local searches begin.",
    ],
    role: "I handled frontend design and integration, interface structure, image optimisation, calls to action, responsive behaviour and GitHub Pages deployment. The work turns a local-visibility need into a public page that can be used immediately.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Vite", "GitHub Pages"],
    sections: [
      {
        title: "Page structure",
        items: [
          "Introduce the activity before the detailed services",
          "Make completed work visible through the portfolio",
          "Keep contact calls to action present without interrupting the reading flow",
          "Preserve the same hierarchy on phone, tablet and desktop",
        ],
      },
      {
        title: "Implementation and performance",
        items: [
          "Mobile-first reusable React and Tailwind components",
          "WebP/AVIF image optimisation and lazy loading to reduce initial weight",
          "Simple contact form and clear calls to action",
          "GitHub Pages deployment for a simple, reliable distribution path",
        ],
      },
      {
        title: "Value delivered",
        description: [
          "The site gives the company a public support that explains its activity in a few steps and puts completed work at the centre of the decision. Reusable components make content updates easier, while optimised images preserve the portfolio's visual quality.",
          "The observable gain is a clearer presentation and a more accessible contact path on mobile. Exact weight or loading-time reduction is not quantified in this case study.",
        ],
        items: [],
      },
    ],
    results: [
      "Public website deployed on GitHub Pages with responsive navigation and contact actions suited to mobile use.",
      "Initial loading is kept lighter while the visual quality of the portfolio is preserved through image optimisation.",
    ],
  },
  "berserk-universe": {
    title: "Berserk Universe",
    context: ["Interactive platform dedicated to Kentarō Miura’s Berserk universe, bringing together summaries, character analysis and an interactive map."],
    role: "Design and development of the website, its content structure and interactive navigation.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "GitHub Pages"],
    sections: [{ title: "Features", items: ["Character profiles and detailed summaries", "Interactive map of key places", "Chronological timeline", "Responsive dark interface"] }],
    results: ["Open-source exploration project combining structured content and interactive navigation."],
  },
  "codex-limits-usage": {
  title: "Codex Limits Usage — Windows",
  context: [
    "Codex displays the remaining usage percentage, but that value alone does not show whether the limit will last until the next reset.",
    "Codex Limits Usage is a local, open-source Windows application that compares current consumption with a configurable work schedule and estimates when the remaining limit may reach 0%.",
  ],
  role:
    "Full application design and development: WPF interface, Codex App Server integration, forecasting engine, local history, system-tray background operation, standalone executable packaging and CI/CD.",
  technologies: [
    "C#",
    ".NET 8",
    "WPF",
    "Codex App Server",
    "JSON-RPC",
    "PowerShell",
    "GitHub Actions",
  ],
  sections: [
    {
      title: "Main features",
      items: [
        "Remaining and consumed usage percentages",
        "Target, actual, projected and historical usage chart",
        "Estimated day and time when the remaining limit may reach 0%",
        "Configurable working days, hours and refresh interval",
        "Daily usage allowance calculated against the target",
        "Configurable safety buffer",
        "Local history retained for up to 90 days",
        "French and English interface",
        "System-tray background operation",
      ],
    },
    {
      title: "Local architecture and privacy",
      items: [
        "Local communication with codex app-server through JSON-RPC",
        "No access to prompts, conversations or working files",
        "No telemetry, advertising or remote analytics",
        "Settings and usage samples remain stored locally",
      ],
    },
    {
      title: "Quality and distribution",
      items: [
        "Smoke tests covering scheduling, forecasting and chart calculations",
        "Automated build and test pipeline with GitHub Actions",
        "Self-contained Windows x64 executable with the .NET 8 runtime included",
        "SHA-256 checksums generated for distributed files",
        "Codex CLI installation is offered only when no local executable is found",
      ],
    },
  ],
  results: [
    "A native Windows utility for visualising and anticipating Codex usage.",
    "End users only need to download and launch one executable; the repository and .NET SDK are not required.",
    "The project is open source, MIT-licensed and documented for privacy, security and third-party attribution.",
  ],
},
  "pokemon-binder": {
    title: "Pokémon Binder",
    context: ["Web application for searching, organising, importing and tracking a Pokémon TCG card collection in a virtual binder."],
    role: "React application design and development, collection logic, Pokémon TCG data integration, search, statistics and import/export.",
    technologies: ["React", "JavaScript", "Python", "HTML / CSS", "Pokémon TCG API"],
    sections: [{ title: "Features", items: ["Card management and virtual binder", "Search by name, type and rarity", "Collection statistics and value tracking", "Import and export of collections"] }],
    results: ["Search, statistics and collection tracking are grouped in one application."],
  },
  "ia-trading": {
    title: "AI Stock Trading Bot",
    context: ["Experimental project for data collection, backtesting and market-signal analysis using AI. It is not financial advice and does not make performance claims."],
    role: "Design and development of the experiment: data collection, backtesting, model integration and signal visualisation.",
    technologies: ["Python", "PyTorch", "CUDA", "Reinforcement Learning", "Machine Learning", "NLP"],
    sections: [{ title: "Research scope", items: ["Multi-source market and sentiment collection", "DQN, SAC and PPO experimentation", "Technical indicators and risk-management signals", "Backtesting and parameter exploration"] }],
    results: ["Technical R&D project combining data collection, AI models, risk-management concepts and backtesting.", "This project is neither investment advice nor a promise of financial performance."],
  },
  patripro: {
    title: "PatriPro",
    context: ["Application for centralising accounts, investments, budgets and loans in a single dashboard."],
    role: "Application design and development, dashboard structure, wealth-management logic, financial-data tracking and visualisations.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Chart.js", "GitHub Pages"],
    sections: [{ title: "Features", items: ["Accounts, savings, investments and loans", "Budget and monthly cash-flow tracking", "Asset allocation and wealth-evolution charts", "Calendar, watchlist and financial insights"] }],
    results: ["A single dashboard centralises the tracking of accounts, investments, budgets and loans.", "Visualisations support the monitoring of wealth, asset allocation and monthly flows."],
  },
  "ats-filter-resume": {
    title: "ATS Filter Resume — Explainable CV Analysis",
    context: ["Many applications are automatically filtered before human review. This project provides a clear, educational and actionable CV diagnosis based on realistic ATS criteria, without promising an interview or hire."],
    role: "Application design and development, explainable ATS analysis logic, validation journeys and testing/deployment pipeline.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Vitest", "Playwright", "GitHub Actions", "Docker"],
    sections: [{ title: "Features", items: ["PDF and DOCX CV import", "Analysis with or without a job description", "Critical-section and keyword extraction", "Detailed scores for ATS fit, readability, matching, structure and completeness", "Prioritised recommendations and an explainable dashboard", "End-to-end desktop and mobile test coverage"] }, { title: "Score interpretation", items: ["The score supports optimisation through transparent analysis rules", "Different ATS use different rules and technologies; no score can guarantee that a CV will be accepted or sent to a recruiter"] }],
    results: ["Quality pipeline covering linting, type checks, unit, integration, UI and end-to-end tests.", "Static GitHub Pages build and CI/CD workflow prepared for publication."],
  },
  "novotel-roue-chance": {
    title: "Novotel Restaurant — QR Prize Wheel",
    context: ["A real web experience created for the NOVOTEL Reims Tinqueux restaurant. QR codes on table coasters led guests to a mobile journey around a Google review and a prize wheel, with the opportunity to win a reward."],
    role: "Web-experience design, frontend development, wheel logic, QR journey integration, form handling and automated deployment.",
    technologies: ["JavaScript", "D3.js", "HTML5", "CSS3", "GitHub Actions"],
    sections: [{ title: "Guest journey", items: ["Scan a QR code from the restaurant coaster", "Open the mobile web experience", "Follow the Google-review journey", "Play the prize wheel and manage the reward flow"] }],
    results: ["A mobile-first, QR-accessible journey built specifically for this restaurant context."],
  },
  aqualis: {
    title: "Aqualis",
    context: ["Gamified aquarium application for staying motivated during focus sessions for work, study or sport. Sessions earn gold and XP which can be used to collect rare fish, manage aquariums and launch breeding."],
    role: "Game concept, mobile interface and interaction implementation.",
    technologies: ["React Native", "Expo", "TypeScript", "Context API"],
    sections: [{ title: "Scope", items: ["Focus sessions for work, study or sport", "Gold and XP progression", "Fish collection, aquarium management and breeding", "Touch-first mobile experience"] }],
    results: ["Mobile project retained in the Gaming / Mobile portfolio category."],
  },
  "nolvus-mod-automation": {
    title: "Nolvus Mod Automation",
    context: ["AutoHotkey script that automates a large part of the repetitive clicks needed to download Nolvus files without a premium account."],
    role: "Automation design, AutoHotkey scripting and OCR-assisted interaction workflow.",
    technologies: ["AutoHotkey", "Automation", "OCR"],
    sections: [{ title: "Scope", items: ["Repetitive download-click automation", "OCR-assisted screen interaction", "Workflow intended to make a non-premium setup less repetitive"] }],
    results: ["Automation project focused on repeatable handling of the download process."],
  },
  "bloodborne-shadps4": {
    title: "Bloodborne — shadPS4 Guide",
    context: ["Installation and configuration guide for playing Bloodborne through the shadPS4 emulator, with community fixes and configuration notes."],
    role: "Guide structure, technical documentation and configuration testing.",
    technologies: ["shadPS4", "Emulation", "Modding", "Documentation"],
    sections: [{ title: "Guide content", items: ["Emulator installation", "Configuration guidance", "Community fixes and visual options", "Troubleshooting notes"] }],
    results: ["Structured technical guide for a community-driven emulation setup."],
  },
  "demons-souls-rpcs3": {
    title: "Demon’s Souls — RPCS3 Installation Guide",
    context: ["Installation guide for running Demon’s Souls on PC through RPCS3, including firmware setup, graphical options and community patches."],
    role: "Technical guide structure, configuration documentation and community-patch curation.",
    technologies: ["RPCS3", "PS3 Firmware", "Modding", "Emulation"],
    sections: [{ title: "Guide content", items: ["RPCS3 and firmware installation", "Game and graphical-mod configuration", "HD textures, camera options and community patches", "60 FPS patches according to the chosen configuration"] }],
    results: ["Documented configuration combining improved resolution, HD textures, 60 FPS patches and community fixes."],
  },
  "altme-wallet": {
    title: "Altme Wallet Platform",
    context: [
      "Contribution to Altme's Discover platform for digital wallets and verifiable credentials. The module brings several types of digital assets and identity data into one user journey.",
      "The public scope includes NFTs and cryptocurrency data supplied through the CoinGecko API, alongside elements related to decentralised identity. Internal implementation details remain confidential.",
    ],
    role: "I contributed within the product team to Discover components, HTML/CSS interfaces, Python processing, CoinGecko data integration and verifiable-credential flows. The scope described here reflects the part of the work that can be shared publicly.",
    technologies: ["HTML / CSS", "Python", "CoinGecko API", "Verifiable Credentials"],
    sections: [
      {
        title: "Contribution scope",
        items: [
          "Organise wallet and associated data in a readable Discover interface",
          "Connect CoinGecko market data to the product module",
          "Present NFTs and verifiable credentials in the same discovery space",
          "Integrate the work into an existing product with the team",
        ],
      },
      {
        title: "Value delivered",
        description: [
          "The contribution helps make Discover more coherent for end users by grouping data from different sources into one identifiable journey. CoinGecko provides updated crypto information, while verifiable credentials give digital-identity use cases a visible place in the product.",
          "The gain is qualitative: a more consistent experience and building blocks that can evolve within the product team's conventions. No usage or performance metric is claimed for this contribution.",
        ],
        items: [],
      },
    ],
    results: [
      "Discover components were developed or improved to bring wallets, NFTs, crypto data and verifiable credentials together.",
      "CoinGecko data integrations and interface elements were consolidated as part of the product-team work.",
    ],
  },
  "altme-documentation": {
    title: "Altme Documentation",
    context: [
      "Creation and maintenance of technical documentation for Altme Wallet Provider. The documentation is the entry point for developers before they install, call an API or follow an integration example.",
      "Two versions were worked on: an initial GitBook base followed by a modern Docusaurus version. The migration keeps useful content while providing a structure that is easier to maintain and extend.",
    ],
    role: "I structured and maintained Markdown content, organised integration journeys, contributed to the GitBook-to-Docusaurus migration and worked on the React/TypeScript presentation layer. The scope includes API references, step-by-step guides, code examples, navigation, search and international-facing pages.",
    technologies: ["GitBook", "Docusaurus", "Markdown", "React", "TypeScript"],
    sections: [
      {
        title: "Documentation journey",
        items: [
          "Introduce Wallet Provider and the concepts needed before coding",
          "Guide integration step by step with reusable examples",
          "Provide searchable API references for precise questions",
          "Keep content and navigation maintainable during the GitBook-to-Docusaurus migration",
        ],
      },
      {
        title: "Value delivered",
        description: [
          "The main gain is a clearer onboarding path: a developer can move from general context to guides and then to API reference without changing the reading logic. Links between sections and examples keep the documentation from becoming a disconnected list of endpoints.",
          "Docusaurus provides a more structured base for future updates. Published information still needs to be reviewed and kept in sync with the versions that are actually available.",
        ],
        items: [],
      },
    ],
    results: [
      "Structured documentation supports discovery, integration and information lookup for Altme Wallet Provider.",
      "The GitBook-to-Docusaurus migration provides clearer navigation, more predictable maintenance and an extensible base.",
    ],
  },
  "teams-bot-mastra": {
    title: "Teams Bot & Mastra Agents",
    context: ["Microsoft Teams bot designed to centralise technology monitoring. It collects RSS sources, produces AI-assisted summaries and sends targeted alerts to the team workspace."],
    role: "Monitoring-workflow design, TypeScript bot development, Teams integration, Mastra orchestration and alert configuration.",
    technologies: ["TypeScript", "Azure Bot Framework", "Mastra", "OpenAI API"],
    sections: [{ title: "Workflow", items: ["Selected RSS-source collection", "AI-assisted summaries and prioritisation", "Microsoft Teams delivery and targeted alerts", "Configurable sources and alert rules", "Monitoring sources connected to the aggregation and analysis system"] }],
    results: ["Monitoring, summaries and alerts are centralised in the team workspace."],
  },
  "seo-geo-optimization": {
    title: "SEO & Local Search Visibility",
    context: ["SEO and local-search work for business websites: audit, structured data, content, technical structure and follow-up indicators. GEO is treated as an editorial and structural approach for generative engines, not as a synonym for local SEO."],
    role: "Audit, metadata and content optimisation, technical structure and implementation of SEO and local-monitoring foundations.",
    technologies: ["SEO", "Google Analytics", "Google Search Console", "Schema.org", "Local SEO", "Structured data"],
    sections: [{ title: "Scope", items: ["On-page, off-page and technical SEO", "Structured data and URL structure", "Image optimisation and mobile-first implementation", "Local presence and Search Console / Analytics monitoring"] }],
    results: ["Tracking foundations are configured through Search Console and Analytics. No traffic, ranking or conversion gains are claimed without source data."],
  },
  "n8n-reporting": {
    title: "n8n Automations — Reporting",
    context: ["A complete n8n reporting pipeline starts with SocialPilot PDF exports and turns them into structured client-facing community-management reports. The workflow links intake, KPI processing, analysis, PDF generation and quality checks while keeping the original source traceable."],
    role: "Reporting-process analysis, n8n workflow architecture, Gmail and Drive integrations, KPI normalisation, report generation and content/visual QA.",
    technologies: ["n8n", "SocialPilot", "Gmail API", "Google Drive", "JSON / PDF", "OCR", "Discord"],
    sections: [
      { title: "Intake and archive", items: ["Receive SocialPilot exports by email or Drive and validate the expected PDF", "Reject duplicates, archive the source and track the reporting period", "Keep processing status and delivery notifications visible to the CM team"] },
      { title: "KPI analysis and client report", items: ["Extract, normalise and cross-check KPIs by social network", "Use targeted OCR only when a value is available in a visual", "Turn raw metrics into highlights, analysis and recommendations", "Generate the client PDF with tables, charts and selected visuals"] },
      { title: "QA and delivery", items: ["Check figures, labels and missing sections before delivery", "Run a visual pass on page breaks, charts and readable typography", "Deliver the report with its source and processing trace for human review"] },
    ],
    results: ["A raw SocialPilot export becomes a homogeneous CM reporting base that the team can review and send to the client.", "The workflow removes repeated preparation steps while preserving editorial validation and source traceability.", "No percentage or traffic gain is claimed without a publishable source."],
  },
  "n8n-video-derush": {
    title: "n8n Automations — Video Derush",
    context: ["A complete n8n video pipeline starts with raw footage and prepares a documented pre-edit package for Instagram and TikTok production. It combines media processing, transcription, editorial selection and production-file generation."],
    role: "Pipeline architecture, Drive intake, FFmpeg and Whisper processing, AI-assisted editorial analysis, EDL/subtitle generation and final QA.",
    technologies: ["n8n", "Google Drive API", "FFmpeg", "Whisper", "EDL", "SRT / ASS", "JavaScript"],
    sections: [
      { title: "Ingestion and transcription", items: ["Prepare a traceable Drive workspace and check incoming rushes", "Extract audio and produce timestamped Whisper transcripts", "Track processing status and isolate failures for review"] },
      { title: "Editorial selection", items: ["Identify hooks, questions, answers and useful sequences", "Score and group excerpts against the intended social format", "Keep timestamps and source references visible for the editor"] },
      { title: "Production package", items: ["Generate EDL-oriented timelines, SRT/ASS subtitles and previews", "Check naming, durations, readability and source linkage", "Deliver organised, edit-ready material for the final Instagram/TikTok production"] },
    ],
    results: ["Unsorted rushes become a documented selection that can be reviewed before the final edit.", "Transcripts, timestamps, EDL and subtitle files reduce repeated pre-edit handling while leaving the final editorial decision to the editor.", "No performance percentage is claimed without a publishable source."],
  },
};

export const getEnglishDetailedContent = (projectId: string) =>
  englishCaseStudies[projectId] ? renderCaseStudy(englishCaseStudies[projectId]) : undefined;
