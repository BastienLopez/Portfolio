import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";

const root = resolve(".");
const port = Number(process.env.LIGHTHOUSE_PORT ?? 4173);
const origin = "http://127.0.0.1:" + port;
const viteCli = resolve("node_modules/vite/bin/vite.js");
const lighthouseCli = resolve("node_modules/lighthouse/cli/index.js");
const reportDirectory = resolve("artifacts/lighthouse");

if (!existsSync(lighthouseCli) || !existsSync(viteCli)) {
  throw new Error("Lighthouse or Vite is missing. Run npm ci before starting the audit.");
}

mkdirSync(reportDirectory, { recursive: true });

const preview = spawn(
  process.execPath,
  [viteCli, "preview", "--host", "127.0.0.1", "--port", String(port)],
  {
    cwd: root,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let previewOutput = "";
preview.stdout.on("data", (chunk) => {
  previewOutput += chunk.toString();
});
preview.stderr.on("data", (chunk) => {
  previewOutput += chunk.toString();
});

const stopPreview = () => {
  if (!preview.killed) preview.kill("SIGTERM");
};

const waitForPreview = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // Vite preview is still starting.
    }
    await delay(500);
  }

  stopPreview();
  throw new Error("Preview did not become ready on " + origin + ".\n" + previewOutput);
};

const runLighthouse = (route, name) =>
  new Promise((resolvePromise, rejectPromise) => {
    const reportPath = resolve(reportDirectory, name + ".json");
    const chromePath = process.env.CHROME_PATH ?? chromium.executablePath();
    if (!existsSync(chromePath)) {
      rejectPromise(new Error("Chromium executable not found at " + chromePath + ". Install Playwright Chromium first."));
      return;
    }

    const child = spawn(
      process.execPath,
      [
        lighthouseCli,
        origin + route,
        "--output=json",
        "--output-path=" + reportPath,
        "--only-categories=performance,accessibility,best-practices,seo",
        "--chrome-flags=--headless --no-sandbox --disable-gpu",
        "--quiet",
      ],
      {
        cwd: root,
        env: { ...process.env, CHROME_PATH: chromePath },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.on("error", rejectPromise);
    child.on("close", (code) => {
      if (code !== 0) {
        rejectPromise(new Error("Lighthouse failed for " + route + " (exit " + code + ").\n" + output));
        return;
      }

      const report = JSON.parse(readFileSync(reportPath, "utf8"));
      const scores = ["performance", "accessibility", "best-practices", "seo"]
        .map((category) => category + "=" + Math.round((report.categories[category]?.score ?? 0) * 100))
        .join(" ");
      console.log(route + " " + scores + " report=" + reportPath);
      resolvePromise();
    });
  });

try {
  await waitForPreview();
  await runLighthouse("/", "home");
  await runLighthouse("/freelance", "freelance");
} finally {
  stopPreview();
}
