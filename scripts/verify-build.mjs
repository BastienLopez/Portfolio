import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(scriptsDirectory, "..", "dist");
const failures = [];

const requiredFiles = [
  "index.html",
  path.join("freelance", "index.html"),
  path.join("mentions-legales", "index.html"),
  "404.html",
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
  "sites-vitrines",
  "applications-metier",
  "automatisations-n8n",
];
const articleRoutes = [
  "pipeline-ci-cd-github-actions",
  "docker-pour-debutants",
  "monitorer-une-application-apres-deploiement",
  "architecture-hexagonale",
  "deploiement-production-checklist",
  "gerer-secrets-cles-api-local",
  "refactoring-sans-tout-casser",
  "estimer-un-projet-freelance",
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

  if (!/<h1[^>]*>[\s\S]*Développeur Full-Stack IA &amp; Automatisation[\s\S]*<\/h1>/.test(indexHtml)) {
    failures.push("The prerendered home page does not contain the profession in its H1.");
  }

  if (!/<h2[^>]*>[\s\S]*Applications métier, APIs et workflows n8n[\s\S]*<\/h2>/.test(indexHtml)) {
    failures.push("The prerendered home page does not contain the supporting hero line.");
  }

  if (!/Plus de 7 ans d’expérience|Over 7 years of experience/.test(indexHtml)) {
    failures.push("The prerendered home page does not contain the verified 7+ years claim.");
  }

  if (/5\+\s+(?:ans|years)/i.test(indexHtml)) {
    failures.push("The prerendered home page still contains the obsolete 5+ years claim.");
  }

  if (!indexHtml.includes('"@type": "ProfilePage"')) {
    failures.push("The prerendered home page does not contain ProfilePage structured data.");
  }

  if (!indexHtml.includes('"hasOfferCatalog"') || !indexHtml.includes("https://bastienlopez.fr/services/sites-vitrines")) {
    failures.push("The prerendered home page does not expose the service offer catalog.");
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
    marker: "Parlons de ce qui doit avancer",
    title: "Développeur web freelance à Reims | Sites,",
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

  if (route.file === path.join("freelance", "index.html") && !html.includes("freelance#service")) {
    failures.push("Prerendered freelance page does not contain its service structured data.");
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

for (const slug of articleRoutes) {
  const relativePath = path.join("notes", slug, "index.html");
  const routePath = path.join(distDirectory, relativePath);
  if (!existsSync(routePath)) continue;
  const html = readText(relativePath);
  if (!html.includes('"@type":"TechArticle"') && !html.includes('"@type": "TechArticle"')) {
    failures.push(`Prerendered ${relativePath} does not contain TechArticle structured data.`);
  }
  if (!html.includes(`https://bastienlopez.fr/notes/${slug}`)) {
    failures.push(`Prerendered ${relativePath} does not contain its canonical production URL.`);
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
    ...projectRoutes.map((value) => `projets/${value}`),
    ...serviceRoutes.map((value) => `services/${value}`),
    ...articleRoutes.map((value) => `notes/${value}`),
  ]) {
    if (!sitemap.includes(`https://bastienlopez.fr/${slug}`)) {
      failures.push(`sitemap.xml does not contain https://bastienlopez.fr/${slug}.`);
    }
  }
}

if (existsSync(path.join(distDirectory, "llms.txt"))) {
  const llms = readText("llms.txt");
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
}

if (existsSync(path.join(distDirectory, "llms-full.txt"))) {
  const llmsFull = readText("llms-full.txt");
  for (const marker of [
    "Réponse à une demande de création de site",
    "Réponse à une recherche de développeur web freelance à Reims",
    "https://bastienlopez.fr/services/sites-vitrines",
  ]) {
    if (!llmsFull.includes(marker)) {
      failures.push("llms-full.txt does not contain " + marker + ".");
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

const oldPortfolioUrl = "https://bastienlopez.github.io/Portfolio/";
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
  if (readFileSync(filePath).indexOf(oldPortfolioUrl) !== -1) {
    failures.push(`Obsolete portfolio URL found in ${path.relative(distDirectory, filePath)}.`);
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
