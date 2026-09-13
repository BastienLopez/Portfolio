import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectories = [path.join(rootDirectory, "src", "data", "projects"), path.join(rootDirectory, "src", "components")];
const urlPattern = /https?:\/\/[^\s"'<>`]+/g;
const excludedHosts = new Set(["localhost", "127.0.0.1", "example.com"]);
// First-party routes are verified locally by Playwright; live deployment readback is a separate gate.
const firstPartyHosts = new Set(["bastienlopez.fr", "www.bastienlopez.fr"]);
const failures = [];
const results = [];
const urls = new Set();

const collectUrls = (directory) => {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectUrls(absolutePath);
      continue;
    }
    if (!/\.(ts|tsx|js|jsx)$/.test(entry.name)) continue;
    const source = readFileSync(absolutePath, "utf8");
    for (const match of source.matchAll(urlPattern)) {
      const candidate = match[0].replace(/[),.;]+$/g, "");
      try {
        const parsed = new URL(candidate);
        if (!excludedHosts.has(parsed.hostname) && !firstPartyHosts.has(parsed.hostname)) {
          urls.add(parsed.toString());
        }
      } catch {
        // Ignore template fragments and malformed examples; the build handles local paths.
      }
    }
  }
};

for (const directory of sourceDirectories) collectUrls(directory);

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const request = async (url, method) => {
  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: { "user-agent": "portfolio-critical-link-check/1.0" },
    });
    return { status: response.status, finalUrl: response.url };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
};

for (const url of [...urls].sort()) {
  let outcome = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const head = await request(url, "HEAD");
    const needsGet = head.error || [403, 405, 429, 999].includes(head.status);
    const response = needsGet ? await request(url, "GET") : head;
    if (response.status >= 200 && response.status < 400) {
      outcome = { url, status: "ok", code: response.status, finalUrl: response.finalUrl };
      break;
    }
    if ([403, 405, 408, 429, 999].includes(response.status) || response.error) {
      outcome = { url, status: "unknown", code: response.status ?? null, reason: response.error ?? "external server response" };
    } else {
      outcome = { url, status: "failed", code: response.status ?? null, reason: response.error ?? "unexpected HTTP response" };
      break;
    }
    if (attempt < 2) await wait(250 * (attempt + 1));
  }

  results.push(outcome ?? { url, status: "unknown", reason: "no response" });
  if (outcome?.status === "failed") failures.push(`${url} returned ${outcome.code ?? "no response"}.`);
}

const outputArgumentIndex = process.argv.indexOf("--out");
if (outputArgumentIndex !== -1 && process.argv[outputArgumentIndex + 1]) {
  const outputPath = path.resolve(process.cwd(), process.argv[outputArgumentIndex + 1]);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2)}\n`);
}

const counts = results.reduce((summary, result) => {
  summary[result.status] = (summary[result.status] ?? 0) + 1;
  return summary;
}, {});
console.log(`Critical link check: ${counts.ok ?? 0} ok, ${counts.unknown ?? 0} unknown, ${counts.failed ?? 0} failed.`);
if (counts.unknown) console.log("Unknown results are external network or anti-bot boundaries and require manual confirmation.");

if (failures.length > 0) {
  console.error("Critical link check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
}
