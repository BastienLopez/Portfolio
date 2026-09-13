import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const port = 4179;
const baseUrl = `http://127.0.0.1:${port}`;

const routes = [
  { path: "/", output: "index.html", allowNotFound: false },
  { path: "/freelance", output: path.join("freelance", "index.html"), allowNotFound: false },
  { path: "/mentions-legales", output: path.join("mentions-legales", "index.html"), allowNotFound: false },
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

const waitForStablePage = async (page, routePath) => {
  await page.waitForSelector("main", { state: "attached" });
  await page.evaluate(() => document.fonts?.ready);

  if (routePath === "/") {
    await page.waitForFunction(
      () => document.querySelector("[data-hero-title]")?.getAttribute("data-typing-complete") === "true",
      null,
      { timeout: 10000 },
    );
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(350);
    await page.evaluate(() => window.scrollTo(0, 0));
  }

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

        await waitForStablePage(page, route.path);
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
