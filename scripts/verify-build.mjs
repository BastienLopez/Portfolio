import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(scriptsDirectory, "..", "dist");
const failures = [];

const requiredFiles = [
  "index.html",
  path.join("freelance", "index.html"),
  path.join("creation-site-internet-reims", "index.html"),
  path.join("mentions-legales", "index.html"),
  "404.html",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "site.webmanifest",
  "og-image.png",
  "CV_LOPEZ_BASTIEN_FREELANCE.pdf",
];

const projectRoutes = [
  "altme-wallet-provider",
  "automatisations-n8n-reporting",
  "automatisations-n8n-derush-video",
  "altme-wallet-platform",
  "altme-documentation",
  "teams-bot-mastra",
  "seo-geo-optimization",
  "eloi-coachsteo",
  "erp-micro-creches",
  "luxury-auto-detailing",
  "cledevoute",
  "berserk-universe",
  "codex-limits-usage",
  "pokemon-binder",
  "ia-trading",
  "patripro",
  "ats-filter-resume",
  "novotel-roue-chance",
  "aqualis",
  "nolvus-mod-automation",
  "bloodborne-shadps4",
  "demons-souls-rpcs3",
];
const serviceRoutes = [
  "applications-metier",
  "automatisations-n8n",
];
const localRoutes = ["creation-site-internet-reims"];
const articleRoutes = [
  "pipeline-ci-cd-github-actions",
  "docker-pour-debutants",
  "monitorer-une-application-apres-deploiement",
  "architecture-hexagonale",
  "deploiement-production-checklist",
  "gerer-secrets-cles-api-local",
  "refactoring-sans-tout-casser",
  "estimer-un-projet-freelance",
  "creer-site-internet-entreprise-cadrage",
  "automatiser-processus-entreprise-n8n-cadrage",
];
const editorialClusters = [
  {
    servicePath: "creation-site-internet-reims",
    articleSlugs: ["creer-site-internet-entreprise-cadrage", "deploiement-production-checklist"],
    projectSlugs: ["eloi-coachsteo", "cledevoute"],
  },
  {
    servicePath: "services/applications-metier",
    articleSlugs: ["architecture-hexagonale", "estimer-un-projet-freelance", "docker-pour-debutants"],
    projectSlugs: ["erp-micro-creches"],
  },
  {
    servicePath: "services/automatisations-n8n",
    articleSlugs: ["automatiser-processus-entreprise-n8n-cadrage", "pipeline-ci-cd-github-actions", "monitorer-une-application-apres-deploiement"],
    projectSlugs: ["automatisations-n8n-reporting", "automatisations-n8n-derush-video"],
  },
];

for (const slug of projectRoutes) {
  requiredFiles.push(path.join("projets", slug, "index.html"));
}
for (const slug of serviceRoutes) {
  requiredFiles.push(path.join("services", slug, "index.html"));
}
for (const slug of articleRoutes) {
  requiredFiles.push(path.join("notes", slug, "index.html"));
}

if (!existsSync(distDirectory) || !statSync(distDirectory).isDirectory()) {
  failures.push("dist/ does not exist.");
}

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(distDirectory, relativePath);
  if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
    failures.push(`Missing dist/${relativePath}.`);
  }
}

for (const relativePath of requiredFiles.filter((value) => value.endsWith(".html"))) {
  const absolutePath = path.join(distDirectory, relativePath);
  if (!existsSync(absolutePath)) continue;
  const html = readFileSync(absolutePath, "utf8");
  if (/(?:href|src)="https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/assets\//i.test(html)) {
    failures.push("dist/" + relativePath + " contains a local runtime asset URL.");
  }
}

const assetsDirectory = path.join(distDirectory, "assets");
if (!existsSync(assetsDirectory) || !statSync(assetsDirectory).isDirectory()) {
  failures.push("dist/assets/ does not exist.");
}

const readText = (relativePath) => readFileSync(path.join(distDirectory, relativePath), "utf8");

if (existsSync(path.join(distDirectory, "index.html"))) {
  const indexHtml = readText("index.html");

  if (!/<link rel="canonical" href="https:\/\/bastienlopez\.fr\/"\s*\/?\s*>/.test(indexHtml)) {
    failures.push("The canonical URL is not exactly https://bastienlopez.fr/.");
  }

  if (!/<meta property="og:url" content="https:\/\/bastienlopez\.fr\//.test(indexHtml)) {
    failures.push("og:url does not use bastienlopez.fr.");
  }

  if (!/<meta name="twitter:url" content="https:\/\/bastienlopez\.fr\//.test(indexHtml)) {
    failures.push("twitter:url does not use bastienlopez.fr.");
  }

  if (!indexHtml.includes('og:image" content="https://bastienlopez.fr/og-image.png"')) {
    failures.push("The prerendered home page does not reference the PNG Open Graph image.");
  }

  if (!/<h1[^>]*>[\s\S]*Développeur web freelance[\s\S]*<\/h1>/i.test(indexHtml)) {
    failures.push("The prerendered home page does not contain the profession in its H1.");
  }

  if (!/<h2[^>]*>[\s\S]*Sites professionnels et outils métier[\s\S]*<\/h2>/.test(indexHtml)) {
    failures.push("The prerendered home page does not contain the supporting hero line.");
  }

  if (!/Plus de 7 ans d’expérience|Over 7 years of experience/.test(indexHtml)) {
    failures.push("The prerendered home page does not contain the verified 7+ years claim.");
  }

  if (/5\+\s+(?:ans|years)/i.test(indexHtml)) {
    failures.push("The prerendered home page still contains the obsolete 5+ years claim.");
  }

  if (!indexHtml.includes('"@type":"ProfilePage"') && !indexHtml.includes('"@type": "ProfilePage"')) {
    failures.push("The prerendered home page does not contain ProfilePage structured data.");
  }

  if (!indexHtml.includes('"@type":"CollectionPage"') && !indexHtml.includes('"@type": "CollectionPage"')) {
    failures.push("The prerendered home page does not contain the Dev Notes CollectionPage schema.");
  }

  if (!indexHtml.includes('"@type":"ItemList"') && !indexHtml.includes('"@type": "ItemList"')) {
    failures.push("The prerendered home page does not contain the Dev Notes ItemList schema.");
  }

  if (!/"telephone"\s*:\s*"\+33 6 52 64 97 13"/.test(indexHtml)) {
    failures.push("The prerendered home page does not expose the supplied business telephone in structured data.");
  }

  if (!/"image"\s*:\s*"https:\/\/bastienlopez\.fr\/og-image\.png"/.test(indexHtml)) {
    failures.push("The prerendered home page does not expose an absolute business image in structured data.");
  }

  if (!/"@type"\s*:\s*"Continent"/.test(indexHtml) || !indexHtml.includes("Europe")) {
    failures.push("The prerendered home page does not expose Europe in the service area structured data.");
  }

  if (!indexHtml.includes("Reims, en France") || !indexHtml.includes("à distance en Europe")) {
    failures.push("The prerendered home page does not expose the intended Reims / France / Europe positioning.");
  }

  if (!indexHtml.includes("https://bastienlopez.fr/#selected-projects") || !indexHtml.includes("https://bastienlopez.fr/projets/cledevoute")) {
    failures.push("The prerendered home page does not contain the selected-projects ItemList with its current case-study links.");
  }

  if (!indexHtml.includes('"hasOfferCatalog"') || !indexHtml.includes("https://bastienlopez.fr/creation-site-internet-reims") || !indexHtml.includes("https://bastienlopez.fr/services/automatisations-n8n")) {
    failures.push("The prerendered home page does not expose the service offer catalog.");
  }
  if (indexHtml.includes("https://bastienlopez.fr/services/sites-vitrines")) {
    failures.push("The prerendered home page still advertises the legacy sites-vitrines URL.");
  }

  for (const marker of [
    'id="about"',
    'id="projects"',
    'id="skills"',
    'id="devnotes"',
    'id="contact"',
  ]) {
    if (!indexHtml.includes(marker)) {
      failures.push(`The prerendered home page is missing the essential section ${marker}.`);
    }
  }
}

const prerenderedRoutes = [
  {
    file: "index.html",
    marker: "Bastien Lopez",
    title: "Développeur web freelance à Reims |",
  },
  {
    file: path.join("freelance", "index.html"),
    marker: "Décrivez votre projet",
    title: "Développeur web freelance à Reims | Sites et outils métier",
  },
  {
    file: path.join("creation-site-internet-reims", "index.html"),
    marker: "Création de sites internet à Reims",
    title: "Création de sites internet à Reims |",
  },
  {
    file: path.join("mentions-legales", "index.html"),
    marker: "Mentions légales",
    title: "Mentions légales —",
  },
  {
    file: "404.html",
    marker: "Page introuvable",
    title: "Page introuvable —",
  },
];

for (const route of prerenderedRoutes) {
  const routePath = path.join(distDirectory, route.file);
  if (!existsSync(routePath)) continue;

  const html = readText(route.file);
  if (!html.includes(route.marker)) {
    failures.push(`Prerendered ${route.file} does not contain its expected content.`);
  }
  if (!html.includes(`<title>${route.title}`)) {
    failures.push(`Prerendered ${route.file} does not contain route-specific metadata.`);
  }

  if (route.file === path.join("mentions-legales", "index.html")) {
    if (!html.includes('<link rel="canonical" href="https://bastienlopez.fr/mentions-legales"')) {
      failures.push("Prerendered legal page does not contain its canonical production URL.");
    }
    if (!html.includes("Informations légales, hébergement et mesure d’audience du portfolio de Bastien Lopez.")) {
      failures.push("Prerendered legal page does not contain its route-specific description.");
    }
    if (!html.includes('<meta name="robots" content="index, follow"')) {
      failures.push("Prerendered legal page does not contain its route-specific robots directive.");
    }
  }

  if (route.file === "404.html") {
    if (/<link\s+rel="canonical"/i.test(html)) {
      failures.push("Prerendered 404 page must not contain a canonical link.");
    }
    if (!/<meta name="robots" content="noindex, follow"/i.test(html)) {
      failures.push("Prerendered 404 page must remain noindex, follow.");
    }
  }

  if (route.file === path.join("freelance", "index.html")) {
    if (!html.includes("freelance#service")) {
      failures.push("Prerendered freelance page does not contain its service structured data.");
    }
    if (!html.includes('href="/creation-site-internet-reims"')) {
      failures.push("Prerendered freelance page does not link its local website-creation page.");
    }
  }
}

for (const slug of projectRoutes) {
  const relativePath = path.join("projets", slug, "index.html");
  const routePath = path.join(distDirectory, relativePath);
  if (!existsSync(routePath)) continue;
  const html = readText(relativePath);
  if (!html.includes("Étude de cas") && !html.includes("Case study")) {
    failures.push(`Prerendered ${relativePath} does not contain its case-study heading.`);
  }
  if (!html.includes("data-contextual-cta")) {
    failures.push(`Prerendered ${relativePath} does not contain a contextual CTA.`);
  }
  if (!html.includes('data-back-to-projects')) {
    failures.push(`Prerendered ${relativePath} does not contain the bottom projects return link.`);
  }
  if (!html.includes(`https://bastienlopez.fr/projets/${slug}`)) {
    failures.push(`Prerendered ${relativePath} does not contain its canonical production URL.`);
  }
  if (!html.includes('"mainEntityOfPage":{"@id":"https://bastienlopez.fr/projets/') && !html.includes('"mainEntityOfPage": {"@id": "https://bastienlopez.fr/projets/')) {
    failures.push(`Prerendered ${relativePath} does not link its case study to its canonical page in structured data.`);
  }
  if (!html.includes('"image":["https://bastienlopez.fr/')) {
    failures.push(`Prerendered ${relativePath} does not expose an absolute project image in structured data.`);
  }
  if (["cledevoute", "eloi-coachsteo", "erp-micro-creches", "automatisations-n8n-reporting", "automatisations-n8n-derush-video"].includes(slug) && !html.includes("data-editorial-service-links")) {
    failures.push(`Prerendered ${relativePath} does not expose its editorial service link.`);
  }
}

const caseStudyEvidence = {
  cledevoute: ["+60 %", "+17 %", "rapportées par le client"],
  "eloi-coachsteo": ["+45 %", "rapportés par le client"],
  "erp-micro-creches": ["+15 %", "rapporté par le client"],
};

for (const [slug, markers] of Object.entries(caseStudyEvidence)) {
  const relativePath = path.join("projets", slug, "index.html");
  const routePath = path.join(distDirectory, relativePath);
  if (!existsSync(routePath)) continue;
  const html = readText(relativePath);
  for (const marker of markers) {
    if (!html.includes(marker)) {
      failures.push(`Prerendered ${relativePath} does not contain the declared case-study evidence marker: ${marker}.`);
    }
  }
}

for (const slug of serviceRoutes) {
  const relativePath = path.join("services", slug, "index.html");
  const routePath = path.join(distDirectory, relativePath);
  if (!existsSync(routePath)) continue;
  const html = readText(relativePath);
  if (!html.includes("Freelance service") && !html.includes("Service freelance")) {
    failures.push(`Prerendered ${relativePath} does not contain its service heading.`);
  }
  if (!html.includes("FAQPage")) {
    failures.push(`Prerendered ${relativePath} does not contain its FAQ structured data.`);
  }
  if (!html.includes('"subjectOf"') || !html.includes("https://bastienlopez.fr/notes/")) {
    failures.push(`Prerendered ${relativePath} does not contain its related Dev Notes links.`);
  }
  if (!html.includes(`https://bastienlopez.fr/services/${slug}`)) {
    failures.push(`Prerendered ${relativePath} does not contain its canonical production URL.`);
  }
}

for (const slug of localRoutes) {
  const relativePath = path.join(slug, "index.html");
  const routePath = path.join(distDirectory, relativePath);
  if (!existsSync(routePath)) continue;
  const html = readText(relativePath);
  if (!html.includes("FAQPage")) {
    failures.push(`Prerendered ${relativePath} does not contain its local FAQ structured data.`);
  }
  if (!html.includes(`https://bastienlopez.fr/${slug}`)) {
    failures.push(`Prerendered ${relativePath} does not contain its canonical production URL.`);
  }
  if (html.includes("/services/sites-vitrines")) {
    failures.push(`Prerendered ${relativePath} still contains a visible legacy sites-vitrines link.`);
  }
  if (!html.includes('href="/notes/creer-site-internet-entreprise-cadrage"') || !html.includes('href="/notes/deploiement-production-checklist"')) {
    failures.push(`Prerendered ${relativePath} does not expose the complete website editorial cluster.`);
  }
}

for (const slug of articleRoutes) {
  const relativePath = path.join("notes", slug, "index.html");
  const routePath = path.join(distDirectory, relativePath);
  if (!existsSync(routePath)) continue;
  const html = readText(relativePath);
  if (!html.includes('"@type":"TechArticle"') && !html.includes('"@type": "TechArticle"')) {
    failures.push(`Prerendered ${relativePath} does not contain TechArticle structured data.`);
  }
  if (!html.includes('meta name="keywords"') || !html.includes('property="article:section"')) {
    failures.push(`Prerendered ${relativePath} does not contain article keyword and section metadata.`);
  }
  if (!html.includes(`https://bastienlopez.fr/notes/${slug}`)) {
    failures.push(`Prerendered ${relativePath} does not contain its canonical production URL.`);
  }
}

for (const cluster of editorialClusters) {
  const serviceHtml = readText(path.join("dist", cluster.servicePath, "index.html").replace(/^dist[\\/]/, ""));
  for (const articleSlug of cluster.articleSlugs) {
    const articlePath = path.join("notes", articleSlug, "index.html");
    const articleHtml = readText(articlePath);
    if (!articleHtml.includes(`href="/${cluster.servicePath}"`)) {
      failures.push(`Prerendered ${articlePath} does not link its service cluster ${cluster.servicePath}.`);
    }
    if (!articleHtml.includes("href=\"/freelance#contact\"")) {
      failures.push(`Prerendered ${articlePath} does not expose the project contact path.`);
    }
    if (!cluster.projectSlugs.some((projectSlug) => articleHtml.includes(`href="/projets/${projectSlug}"`))) {
      failures.push(`Prerendered ${articlePath} does not link a proof project in its editorial cluster.`);
    }
  }
  for (const projectSlug of cluster.projectSlugs) {
    const projectHtml = readText(path.join("projets", projectSlug, "index.html"));
    if (!projectHtml.includes("data-editorial-service-links")) {
      failures.push(`Prerendered projets/${projectSlug}/index.html does not link back to its service cluster.`);
    }
  }
  if (!serviceHtml.includes("subjectOf") && !serviceHtml.includes("data-editorial-cluster")) {
    failures.push(`Editorial service page ${cluster.servicePath} does not expose its related content graph.`);
  }
}

if (existsSync(path.join(distDirectory, "robots.txt"))) {
  const robots = readText("robots.txt");
  if (!robots.includes("Sitemap: https://bastienlopez.fr/sitemap.xml")) {
    failures.push("robots.txt does not reference the production sitemap.");
  }
  if (!/User-agent:\s*OAI-SearchBot[\s\S]*Allow:\s*\//i.test(robots)) {
    failures.push("robots.txt does not explicitly allow OAI-SearchBot.");
  }
}

if (existsSync(path.join(distDirectory, "sitemap.xml"))) {
  const sitemap = readText("sitemap.xml");
  if (!sitemap.includes("https://bastienlopez.fr/")) {
    failures.push("sitemap.xml does not contain the production URL.");
  }
  if (!sitemap.includes("https://bastienlopez.fr/freelance")) {
    failures.push("sitemap.xml does not contain the public freelance route.");
  }
  for (const slug of [
    ...localRoutes.map((value) => value),
    ...projectRoutes.map((value) => `projets/${value}`),
    ...serviceRoutes.map((value) => `services/${value}`),
    ...articleRoutes.map((value) => `notes/${value}`),
  ]) {
    if (!sitemap.includes(`https://bastienlopez.fr/${slug}`)) {
      failures.push(`sitemap.xml does not contain https://bastienlopez.fr/${slug}.`);
    }
  }
  if (sitemap.includes("https://bastienlopez.fr/services/sites-vitrines")) {
    failures.push("sitemap.xml still lists the legacy sites-vitrines URL.");
  }
}

const caddyFile = path.join(process.cwd(), "deploy", "Caddyfile.example");
if (existsSync(caddyFile)) {
  const caddy = readFileSync(caddyFile, "utf8");
  if (!caddy.includes("@legacySitesVitrines") || !caddy.includes("redir @legacySitesVitrines https://bastienlopez.fr/creation-site-internet-reims 301")) {
    failures.push("deploy/Caddyfile.example does not redirect the legacy sites-vitrines URL to the Reims landing page.");
  }
  for (const route of [
    "/freelance",
    ...localRoutes.map((value) => `/${value}`),
    "/mentions-legales",
    ...projectRoutes.map((value) => `/projets/${value}`),
    ...serviceRoutes.map((value) => `/services/${value}`),
    ...articleRoutes.map((value) => `/notes/${value}`),
  ]) {
    if (!caddy.includes(` ${route} `) || !caddy.includes(` ${route}/`)) {
      failures.push(`deploy/Caddyfile.example does not list both forms of ${route}.`);
    }
  }
}

if (existsSync(path.join(distDirectory, "llms.txt"))) {
  const llms = readText("llms.txt");
  if (llms.includes("https://bastienlopez.fr/services/sites-vitrines")) {
    failures.push("llms.txt still advertises the legacy sites-vitrines URL.");
  }
  for (const slug of projectRoutes) {
    if (!llms.includes(`https://bastienlopez.fr/projets/${slug}`)) {
      failures.push(`llms.txt does not contain https://bastienlopez.fr/projets/${slug}.`);
    }
  }
  for (const slug of articleRoutes) {
    if (!llms.includes(`https://bastienlopez.fr/notes/${slug}`)) {
      failures.push(`llms.txt does not contain https://bastienlopez.fr/notes/${slug}.`);
    }
  }
  for (const slug of localRoutes) {
    if (!llms.includes(`https://bastienlopez.fr/${slug}`)) {
      failures.push(`llms.txt does not contain https://bastienlopez.fr/${slug}.`);
    }
  }
}

if (existsSync(path.join(distDirectory, "llms-full.txt"))) {
  const llmsFull = readText("llms-full.txt");
  for (const marker of [
    "Réponse à une demande de création de site",
    "Réponse à une recherche de développeur web freelance à Reims",
    "https://bastienlopez.fr/creation-site-internet-reims",
    "https://www.malt.fr/profile/bastienlopez",
    "https://www.societe.com/societe/monsieur-bastien-lopez-994557593.html",
    "## Index des études de cas",
    "## Index des Dev Notes",
  ]) {
    if (!llmsFull.includes(marker)) {
      failures.push("llms-full.txt does not contain " + marker + ".");
    }
  }
  if (llmsFull.includes("https://bastienlopez.fr/services/sites-vitrines")) {
    failures.push("llms-full.txt still advertises the legacy sites-vitrines URL.");
  }
  for (const slug of projectRoutes) {
    if (!llmsFull.includes(`https://bastienlopez.fr/projets/${slug}`)) {
      failures.push(`llms-full.txt does not contain https://bastienlopez.fr/projets/${slug}.`);
    }
  }
  for (const slug of articleRoutes) {
    if (!llmsFull.includes(`https://bastienlopez.fr/notes/${slug}`)) {
      failures.push(`llms-full.txt does not contain https://bastienlopez.fr/notes/${slug}.`);
    }
  }
  for (const slug of localRoutes) {
    if (!llmsFull.includes(`https://bastienlopez.fr/${slug}`)) {
      failures.push(`llms-full.txt does not contain https://bastienlopez.fr/${slug}.`);
    }
  }
}

if (existsSync(path.join(distDirectory, "site.webmanifest"))) {
  try {
    const manifest = JSON.parse(readText("site.webmanifest"));
    if (manifest.start_url !== "/") {
      failures.push('site.webmanifest start_url must be "/".');
    }
    if (manifest.scope !== "/") {
      failures.push('site.webmanifest scope must be "/".');
    }
  } catch {
    failures.push("site.webmanifest is not valid JSON.");
  }
}

const obsoletePortfolioUrlPattern = /https?:\/\/bastienlopez\.github\.io\/Portfolio(?:[\/\s"'<>)]|$)/i;
const filesToScan = [];
const collectFiles = (directory) => {
  if (!existsSync(directory)) return;

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectFiles(absolutePath);
    } else {
      filesToScan.push(absolutePath);
    }
  }
};

collectFiles(distDirectory);
for (const filePath of filesToScan) {
  if (obsoletePortfolioUrlPattern.test(readFileSync(filePath, "utf8"))) {
    failures.push(`Obsolete GitHub Pages portfolio URL found in ${path.relative(distDirectory, filePath)}.`);
  }
}

if (failures.length > 0) {
  console.error("Build verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("Build verification passed: dist/ contains the expected files and production URLs.");
}
