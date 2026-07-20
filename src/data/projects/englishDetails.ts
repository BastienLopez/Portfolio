type CaseStudy = {
  title: string;
  context: string[];
  role?: string;
  technologies: string[];
  sections: Array<{ title: string; items: string[] }>;
  results: string[];
};

const toList = (items: string[]) =>
  `<ul class="features-list">${items.map((item) => `<li class="feature-item">${item}</li>`).join("")}</ul>`;

const renderCaseStudy = (caseStudy: CaseStudy) => `
  <div class="project-detail">
    <h2 class="project-title">${caseStudy.title}</h2>
    <div class="section">
      <h3 class="section-title">Project context</h3>
      ${caseStudy.context.map((paragraph) => `<p class="description">${paragraph}</p>`).join("")}
    </div>
    ${caseStudy.role ? `<div class="section info-box"><h3 class="section-title">My role</h3><p class="description">${caseStudy.role}</p></div>` : ""}
    <div class="section">
      <h3 class="section-title">Technologies</h3>
      <div class="tech-grid">${caseStudy.technologies.map((technology) => `<div class="tech-item"><span class="tech-name">${technology}</span></div>`).join("")}</div>
    </div>
    ${caseStudy.sections.map((section) => `<div class="section"><h3 class="section-title">${section.title}</h3>${toList(section.items)}</div>`).join("")}
    <div class="section results"><h3 class="section-title">Outcome</h3><div class="result-box success">${caseStudy.results.map((result) => `<p class="result-text">${result}</p>`).join("")}</div></div>
  </div>
`;

const englishCaseStudies: Record<string, CaseStudy> = {
  "eloi-coachsteo": {
    title: "Eloi CoachSteo",
    context: ["Website created for an osteopathy practice to present services, make contact straightforward and offer a responsive experience."],
    role: "Frontend design and implementation, page structure, responsive integration, contact journey and deployment.",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    sections: [{ title: "Scope", items: ["Service presentation", "Contact and appointment journey", "Responsive layout"] }],
    results: ["Public website designed to make the practice and contact options clear."],
  },
  "erp-micro-creches": {
    title: "Multi-Nursery ERP & Digital Ecosystem",
    context: [
      "Business ERP designed to centralise the operation of a network of five micro-nurseries, alongside a family portal and a public-facing website.",
      "The platform brings together children, families, staff, attendance, planning, records, documents, invoicing, dashboards and multi-site administration in one environment.",
      "It was designed for multi-site use: data is separated by nursery and access is restricted according to each user profile.",
    ],
    role: "I designed and developed the full-stack solution: functional architecture, React interfaces, Node.js APIs, MongoDB data model, role-based access, tests, Docker-based environments, CI/CD preparation, documentation and operational readiness. Functional details remain partly anonymised for confidentiality.",
    technologies: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "Mongoose", "JWT / RBAC", "Docker", "CI/CD", "TDD", "Swagger / OpenAPI"],
    sections: [
      { title: "Business modules", items: ["Multi-nursery management and consolidated dashboards", "Children, parent and staff records", "Attendance, staff attendance, planning and daily handovers", "Documents, contracts, invoicing, reporting and CSV/PDF exports", "Secure family portal and differentiated administrator, professional and parent areas"] },
      { title: "Multi-site architecture and access", items: ["A nursery context and a dedicated identifier scope the main business resources", "The backend verifies authorised sites and roles before serving data", "Global administrators can supervise the network while local users only access their assigned sites", "Because children, parents and staff data are sensitive, access control, confidentiality and traceability were treated as core concerns"] },
      { title: "Quality and operations", items: ["Unit, integration, end-to-end and load-test approach", "Documented REST API with Swagger/OpenAPI export", "Containerised environment, CI/CD preparation, health checks, backups, monitoring and operational runbooks", "Architecture designed so new sites and modules can be added without replacing the existing foundation"] },
    ],
    results: ["Five micro-nurseries can be supervised from one interface, with business modules and differentiated access by role.", "The project covers the full lifecycle of a business application: requirements, UX/UI, full-stack development, data, tests, deployment preparation, documentation and maintenance."],
  },
  "luxury-auto-detailing": {
    title: "Luxury Auto Detailing",
    context: ["Showcase website for a premium car-detailing workshop: cleaning, polishing, ceramic protection and interior restoration."],
    role: "Frontend design and integration with React and Tailwind CSS, responsive adaptation, service presentation, gallery, contact journey and deployment.",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    sections: [{ title: "Delivered features", items: ["Service presentation", "Before/after gallery", "Appointment and direct-contact journey", "Responsive navigation"] }],
    results: ["Public website designed to present the services clearly and support contact requests."],
  },
  cledevoute: {
    title: "Cle De Voute — Masonry",
    context: ["Showcase website for a masonry company, created to present its services and completed work."],
    role: "Frontend design and integration, lightweight UI design, performance work and GitHub Pages deployment.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Vite", "GitHub Pages"],
    sections: [{ title: "Implementation", items: ["Service and portfolio presentation", "Mobile-first reusable components", "Image optimisation and lazy loading", "Clear calls to action and contact form"] }],
    results: ["Deployed public website with responsive navigation and contact actions suited to mobile use."],
  },
  "berserk-universe": {
    title: "Berserk Universe",
    context: ["Interactive platform dedicated to Kentarō Miura’s Berserk universe, bringing together summaries, character analysis and an interactive map."],
    role: "Design and development of the website, its content structure and interactive navigation.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "GitHub Pages"],
    sections: [{ title: "Features", items: ["Character profiles and detailed summaries", "Interactive map of key places", "Chronological timeline", "Responsive dark interface"] }],
    results: ["Open-source exploration project combining structured content and interactive navigation."],
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
    technologies: ["React", "JavaScript", "Tailwind CSS", "GitHub Pages"],
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
    context: ["Contribution to the Discover platform for digital wallets and verifiable credentials, including crypto and NFT data integrations."],
    role: "Contribution within the product team to Discover components and the data integrations presented in this case study.",
    technologies: ["HTML / CSS", "Python", "CoinGecko API", "Verifiable Credentials"],
    sections: [{ title: "Contribution scope", items: ["Discover product components", "Crypto and NFT data integrations", "Work performed within a product team"] }],
    results: ["Contribution to the development and improvement of Discover components and data integrations within the product team."],
  },
  "altme-documentation": {
    title: "Altme Documentation",
    context: ["Creation and maintenance of technical documentation for Altme Wallet Provider, with a GitBook version followed by a Docusaurus version to support developer onboarding."],
    role: "Documentation content and developer journeys, including migration work from GitBook to Docusaurus.",
    technologies: ["GitBook", "Docusaurus", "Markdown", "React", "TypeScript"],
    sections: [{ title: "Documentation work", items: ["API reference and integration guides", "Interactive code examples and search", "GitBook-to-Docusaurus migration", "50+ documentation pages and sections migrated or maintained"] }],
    results: ["A more structured, maintainable documentation base for developers."],
  },
  "teams-bot-mastra": {
    title: "Teams Bot & Mastra Agents",
    context: ["Microsoft Teams bot designed to centralise technology monitoring. It collects RSS sources, produces AI-assisted summaries and sends targeted alerts to the team workspace."],
    role: "Monitoring-workflow design, TypeScript bot development, Teams integration, Mastra orchestration and alert configuration.",
    technologies: ["TypeScript", "Azure Bot Framework", "Mastra", "OpenAI API"],
    sections: [{ title: "Workflow", items: ["Selected RSS-source collection", "AI-assisted summaries and prioritisation", "Microsoft Teams delivery and targeted alerts", "Configurable sources and alert rules", "500+ monitoring sources connected to the aggregation and analysis system"] }],
    results: ["Monitoring, summaries and alerts are centralised in the team workspace."],
  },
  "seo-geo-optimization": {
    title: "SEO & Local Search Visibility",
    context: ["SEO and local-search work for business websites: audit, structured data, content, technical structure and follow-up indicators. GEO is treated as an editorial and structural approach for generative engines, not as a synonym for local SEO."],
    role: "Audit, metadata and content optimisation, technical structure and implementation of SEO and local-monitoring foundations.",
    technologies: ["SEO", "Google Analytics", "Google Search Console", "Schema.org", "Local SEO", "Structured data"],
    sections: [{ title: "Scope", items: ["On-page, off-page and technical SEO", "Structured data and URL structure", "Image optimisation and mobile-first implementation", "Local presence and Search Console / Analytics monitoring"] }, { title: "Follow-up", items: ["Positioning, organic traffic and qualified leads should be measured from source data", "An anonymised Analytics or Search Console capture can complete the case study"] }],
    results: ["Technical and editorial foundations are strengthened; traffic and ranking gains remain to be documented with source data."],
  },
  "n8n-workflow-automation": {
    title: "n8n Automations — Reporting, Video Derush & Prospecting",
    context: ["n8n workflows automate recurring social-media reporting, raw-video preparation and prospecting tasks. They connect existing tools, make processing traceable and produce reusable client deliverables."],
    role: "Process analysis, workflow architecture, API and third-party integrations, data transformation, error handling and continuous scenario improvement.",
    technologies: ["n8n", "REST APIs & Webhooks", "JSON & PDF", "SocialPilot", "Google Drive", "Whisper", "FFmpeg", "EDL / SRT / ASS"],
    sections: [
      { title: "SocialPilot reporting workflow", items: ["Scheduled email intake, attachment checks and Google Drive archive", "KPI extraction, normalisation and validation by social network", "Targeted OCR when information is only available in visuals", "Performance analysis, client-PDF generation, content and visual QA, delivery and Discord supervision"] },
      { title: "AI-assisted video derush workflow", items: ["Raw-video intake, workspace preparation and duplicate checks", "Audio extraction, Whisper transcription and timestamped content", "Editorial analysis of useful sequences, questions and answers", "EDL generation for Premiere-oriented pre-editing, subtitles, preview and organised deliverables for social formats"] },
      { title: "Prospecting workflow", items: ["Google Maps collection and structured prospect-list preparation", "Checks around available information and the expected commercial output"] },
      { title: "Confirmed figures", items: ["15+ reports generated", "200+ hours of raw footage processed", "10+ automated tasks"] },
    ],
    results: ["Centralised workflows reduce manual handoffs and make deliverables more reproducible.", "Client data, exact settings and unconfirmed results remain confidential."],
  },
};

export const getEnglishDetailedContent = (projectId: string) =>
  englishCaseStudies[projectId] ? renderCaseStudy(englishCaseStudies[projectId]) : undefined;
