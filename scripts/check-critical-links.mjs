import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isApprovedHost,
  isExcludedHost,
  isFirstPartyHost,
  MAX_REDIRECTS,
  isUnknownExternalStatus,
  parseApprovedUrl,
  validatePublicUrl,
} from "./critical-link-policy.mjs";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectories = [path.join(rootDirectory, "src", "data", "projects"), path.join(rootDirectory, "src", "components")];
const urlPattern = /https?:\/\/[^\s"'<>`]+/g;
const failures = [];
const results = [];
const urls = new Set();
const policyReviewUrls = new Map();
const offline = process.argv.includes("--offline");

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
      let rawUrl;
      try {
        rawUrl = new URL(candidate);
      } catch {
        // Ignore template fragments and malformed examples; the build handles local paths.
        continue;
      }

      if (isExcludedHost(rawUrl.hostname) || isFirstPartyHost(rawUrl.hostname)) continue;

      const parsed = parseApprovedUrl(candidate);
      if (!parsed.ok) {
        if (parsed.securityBlocked) policyReviewUrls.set(candidate, parsed.reason);
        continue;
      }

      if (!isApprovedHost(parsed.hostname)) {
        policyReviewUrls.set(candidate, `host ${parsed.hostname} is not in the approved allowlist`);
        continue;
      }

      urls.add(parsed.url.toString());
    }
  }
};

for (const directory of sourceDirectories) collectUrls(directory);

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const requestWithPinnedAddress = (validation, method) =>
  new Promise((resolve, reject) => {
    const parsed = validation.url;
    const transport = parsed.protocol === "https:" ? https : http;
    const request = transport.request(
      {
        hostname: validation.hostname,
        port: parsed.port || undefined,
        path: `${parsed.pathname}${parsed.search}`,
        method,
        headers: { "user-agent": "portfolio-critical-link-check/1.0" },
        lookup: (_hostname, options, callback) => {
          if (options?.all) {
            callback(null, [{ address: validation.resolvedAddress, family: validation.resolvedFamily }]);
            return;
          }
          callback(null, validation.resolvedAddress, validation.resolvedFamily);
        },
        ...(parsed.protocol === "https:" ? { servername: validation.hostname } : {}),
      },
      (response) => {
        const result = {
          status: response.statusCode ?? 0,
          location: response.headers.location ?? null,
        };
        // The checker only needs status and redirect headers. It never stores
        // response bodies, and consuming the stream keeps the request bounded.
        response.resume();
        resolve(result);
      },
    );

    request.setTimeout(10000, () => request.destroy(new Error("request timeout")));
    request.on("error", reject);
    request.end();
  });

const request = async (url, method) => {
  let currentUrl = url;

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    const validation = await validatePublicUrl(currentUrl);
    if (!validation.ok) return validation;

    try {
      const response = await requestWithPinnedAddress(validation, method);
      const location = response.location;

      if (![301, 302, 303, 307, 308].includes(response.status) || !location) {
        return { status: response.status, finalUrl: currentUrl };
      }

      if (redirectCount === MAX_REDIRECTS) {
        return { error: `redirect limit (${MAX_REDIRECTS}) exceeded`, status: response.status, finalUrl: currentUrl };
      }

      try {
        currentUrl = new URL(location, currentUrl).toString();
      } catch {
        return { error: "invalid redirect location", status: response.status, finalUrl: currentUrl };
      }
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) };
    }
  }

  return { error: "redirect validation ended without a response" };
};

for (const [url, reason] of [...policyReviewUrls.entries()].sort(([left], [right]) => left.localeCompare(right))) {
  results.push({ url, status: "unknown", reason });
}

for (const url of [...urls].sort()) {
  if (offline) {
    results.push({ url, status: "unknown", reason: "network check skipped in offline mode" });
    continue;
  }

  let outcome = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const head = await request(url, "HEAD");
    const needsGet = head.error || [403, 405, 429, 999].includes(head.status);
    const response = needsGet ? await request(url, "GET") : head;
    if (response.status >= 200 && response.status < 400) {
      outcome = { url, status: "ok", code: response.status, finalUrl: response.finalUrl };
      break;
    }
    if (response.securityBlocked) {
      outcome = { url, status: "failed", code: response.status ?? null, reason: response.reason };
      break;
    }
    if (isUnknownExternalStatus(response.status) || response.error) {
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
