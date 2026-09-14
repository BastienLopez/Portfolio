import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const port = 4179;
const baseUrl = `http://127.0.0.1:${port}`;

// Keep this list aligned with src/data/site-pages.ts. The prerenderer is a
// plain Node script and cannot import the TypeScript data module directly.
const projectSlugs = [
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
const serviceSlugs = [
  "sites-vitrines",
  "applications-metier",
  "automatisations-n8n",
];
const articleSlugs = [
  "pipeline-ci-cd-github-actions",
  "docker-pour-debutants",
  "monitorer-une-application-apres-deploiement",
  "architecture-hexagonale",
  "deploiement-production-checklist",
  "gerer-secrets-cles-api-local",
  "refactoring-sans-tout-casser",
  "estimer-un-projet-freelance",
];

const routes = [
  { path: "/", output: "index.html", allowNotFound: false },
  { path: "/freelance", output: path.join("freelance", "index.html"), allowNotFound: false },
  { path: "/mentions-legales", output: path.join("mentions-legales", "index.html"), allowNotFound: false },
  ...projectSlugs.map((slug) => ({
    path: `/projets/${slug}`,
    output: path.join("projets", slug, "index.html"),
    allowNotFound: false,
  })),
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    output: path.join("services", slug, "index.html"),
    allowNotFound: false,
  })),
  ...articleSlugs.map((slug) => ({
    path: `/notes/${slug}`,
    output: path.join("notes", slug, "index.html"),
    allowNotFound: false,
  })),
  { path: "/__prerender-not-found__", output: "404.html", allowNotFound: true },
];

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const waitForPreview = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/`);
      if (response.status < 500) return;
    } catch {
      // The preview process may need a few moments to bind its port.
    }

    await sleep(250);
  }

  throw new Error(`Preview server did not start on ${baseUrl}`);
};

const waitForStablePage = async (page) => {
  await page.waitForSelector("main", { state: "attached" });
  await page.evaluate(() => document.fonts?.ready);

  await sleep(250);
};

const stripPrerenderRuntimePreloads = (html) =>
  html.replace(
    /<link\s+rel="modulepreload"[^>]+href="http:\/\/127\.0\.0\.1:4179\/[^"]+"\s*\/?>(?:<\/link>)?/gi,
    "",
  );

const prerender = async () => {
  const viteBin = path.join(projectRoot, "node_modules", "vite", "bin", "vite.js");
  const preview = spawn(process.execPath, [viteBin, "preview", "--host", "127.0.0.1", "--port", String(port)], {
    cwd: projectRoot,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let previewOutput = "";
  preview.stdout.on("data", (chunk) => {
    previewOutput += chunk.toString();
  });
  preview.stderr.on("data", (chunk) => {
    previewOutput += chunk.toString();
  });

  try {
    await waitForPreview();
    const browser = await chromium.launch({ headless: true });

    try {
      const page = await browser.newPage();

      for (const route of routes) {
        const response = await page.goto(`${baseUrl}${route.path}`, {
          waitUntil: "domcontentloaded",
        });

        if (!route.allowNotFound && (!response || !response.ok())) {
          throw new Error(`Could not render ${route.path}: HTTP ${response?.status() ?? "unknown"}`);
        }

        await waitForStablePage(page);
        const outputPath = path.join(distRoot, route.output);
        await mkdir(path.dirname(outputPath), { recursive: true });
        const renderedHtml = stripPrerenderRuntimePreloads(await page.content());
        await writeFile(outputPath, renderedHtml, "utf8");
        console.log(`Prerendered ${route.path} -> ${path.relative(projectRoot, outputPath)}`);
      }
    } finally {
      await browser.close();
    }
  } catch (error) {
    const details = previewOutput.trim();
    throw new Error(`${error instanceof Error ? error.message : String(error)}${details ? `\n${details}` : ""}`);
  } finally {
    preview.kill("SIGTERM");
  }
};

await readFile(path.join(distRoot, "index.html"), "utf8");
await prerender();
