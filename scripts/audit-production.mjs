import process from "node:process";

const origin = (process.env.AUDIT_ORIGIN ?? "https://bastienlopez.fr").replace(/\/$/, "");
const failures = [];

const fetchManual = async (url) => {
  const response = await fetch(url, { redirect: "manual", cache: "no-store" });
  return {
    status: response.status,
    location: response.headers.get("location") ?? "",
    body: await response.text(),
    url,
  };
};

const fetchFinal = async (url) => {
  const first = await fetchManual(url);
  let final = first;

  if (first.status >= 300 && first.status < 400 && first.location) {
    const finalUrl = new URL(first.location, url).toString();
    const response = await fetch(finalUrl, { redirect: "follow", cache: "no-store" });
    final = {
      status: response.status,
      location: "",
      body: await response.text(),
      url: response.url,
    };
  }

  return { first, final };
};

const titleOf = (html) => html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
const descriptionOf = (html) =>
  html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1]?.trim() ?? "";
const canonicalOf = (html) =>
  html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]?.trim() ?? "";
const jsonLdCount = (html) => (html.match(/type=["']application\/ld\+json["']/gi) ?? []).length;
const h1Count = (html) => (html.match(/<h1\b/gi) ?? []).length;
const absoluteUrls = (text) => text.match(/https:\/\/bastienlopez\.fr\/[^\s)]+/g) ?? [];

const sitemap = await fetchManual(`${origin}/sitemap.xml`);
if (sitemap.status !== 200) failures.push(`sitemap.xml répond HTTP ${sitemap.status}`);

const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const uniqueUrls = new Set(urls);
const expectedRouteCount = 38;
const requiredNewRoutes = [
  `${origin}/notes/creer-site-internet-entreprise-cadrage`,
  `${origin}/notes/automatiser-processus-entreprise-n8n-cadrage`,
];
if (urls.length === 0) failures.push("Le sitemap ne contient aucune URL.");
if (urls.length !== uniqueUrls.size) failures.push("Le sitemap contient des doublons.");
if (urls.some((url) => !url.startsWith(`${origin}/`))) failures.push("Le sitemap contient une URL hors origine.");
if (urls.length !== expectedRouteCount) {
  failures.push(`Le sitemap contient ${urls.length} URLs au lieu des ${expectedRouteCount} attendues.`);
}
for (const requiredRoute of requiredNewRoutes) {
  if (!uniqueUrls.has(requiredRoute)) failures.push(`Le sitemap ne contient pas ${requiredRoute}.`);
}

let redirects = 0;
let finalOk = 0;
for (const url of urls) {
  const route = new URL(url).pathname;
  const expectedCanonical = `${origin}${route === "/" ? "/" : route}`;
  const { first, final } = await fetchFinal(url);
  if (first.status >= 300 && first.status < 400) redirects += 1;
  if (final.status === 200) finalOk += 1;
  else failures.push(`${route} finit en HTTP ${final.status}`);

  const title = titleOf(final.body);
  const description = descriptionOf(final.body);
  const canonical = canonicalOf(final.body);
  if (!title || !description || !canonical || h1Count(final.body) !== 1 || jsonLdCount(final.body) === 0) {
    failures.push(`${route} n'expose pas toutes ses metadata de base.`);
  }
  if (canonical !== expectedCanonical) {
    failures.push(`${route} canonical attendu ${expectedCanonical}, obtenu ${canonical || "absent"}.`);
  }
  if (first.status >= 300 && first.status < 400) {
    failures.push(`${route} nécessite une redirection ${first.status} vers ${first.location}.`);
  }
}

const legal = await fetchManual(`${origin}/mentions-legales`);
if (!titleOf(legal.body).startsWith("Mentions légales —")) {
  failures.push("/mentions-legales ne sert pas son titre légal dans le HTML initial.");
}
if (canonicalOf(legal.body) !== `${origin}/mentions-legales`) {
  failures.push("/mentions-legales ne sert pas son canonical initial.");
}

const robots = await fetchManual(`${origin}/robots.txt`);
if (robots.status !== 200 || !robots.body.includes(`Sitemap: ${origin}/sitemap.xml`)) {
  failures.push("robots.txt ne référence pas le sitemap public.");
}
if (!/User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i.test(robots.body)) {
  failures.push("robots.txt ne laisse pas OAI-SearchBot explorer le site.");
}

for (const file of ["llms.txt", "llms-full.txt"]) {
  const response = await fetchManual(`${origin}/${file}`);
  if (response.status !== 200 || !/Bastien Lopez|Reims|France/i.test(response.body)) {
    failures.push(`${file} est absent ou ne contient pas l'identité publique.`);
  }
}

const llms = await fetchManual(`${origin}/llms.txt`);
const llmsUrls = new Set(absoluteUrls(llms.body));
for (const prefix of ["/services/", "/projets/", "/notes/"]) {
  if (![...llmsUrls].some((url) => url.includes(prefix))) failures.push(`llms.txt ne référence pas ${prefix}.`);
}
for (const requiredRoute of requiredNewRoutes) {
  if (!llmsUrls.has(requiredRoute)) failures.push(`llms.txt ne contient pas ${requiredRoute}.`);
}

console.log(`Production audit: origin=${origin}`);
console.log(`Routes: ${urls.length} dans le sitemap, ${finalOk}/${urls.length} finales en 200, redirections initiales=${redirects}`);
console.log(`GEO: llms.txt identity=${/Bastien Lopez|Reims|France/i.test(llms.body)} urls=${llmsUrls.size}`);

if (failures.length > 0) {
  console.error(`FAIL (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS: production routes, metadata, sitemap, robots and GEO files are coherent.");
}
