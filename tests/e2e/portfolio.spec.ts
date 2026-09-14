import { expect, test } from "@playwright/test";

test("defers below-the-fold section chunks on the first render", async ({ page }) => {
  const scriptRequests: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") scriptRequests.push(request.url());
  });

  await page.goto("/");
  await expect(page.locator("#hero")).toBeVisible();
  await page.waitForTimeout(750);

  expect(scriptRequests.some((url) => /Projects-[^/]+\.js/.test(url))).toBe(false);
  expect(scriptRequests.some((url) => /Skills-[^/]+\.js/.test(url))).toBe(false);

  await page.goto("/#projects");
  await expect(page.locator("#projects")).toBeVisible();
  await expect(page.getByRole("button", { name: /GAMING \/ MOBILE/ })).toBeVisible();
});

test("keeps project history, gallery, and language navigation usable", async ({ page }) => {
  await page.goto("/#projects");
  await page.getByRole("button", { name: /GAMING \/ MOBILE/ }).click();
  await page
    .getByRole("link", {
      name: /Voir le cas ERP|Explorer l’automatisation|Découvrir le projet/,
    })
    .first()
    .click();
  await expect(page).toHaveURL(/\/projets\//);
  await expect(page.getByRole("link", { name: "Retour aux projets", exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Retour aux projets", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("button", { name: /GAMING \/ MOBILE/ })).toBeVisible();

  await page.goto("/#project=teams-bot-mastra");
  const galleryButton = page.getByRole("button", { name: /Ouvrir la capture/ }).first();
  await expect(galleryButton).toBeVisible();
  await galleryButton.click();
  await expect(page.getByRole("dialog", { name: /Visionneuse/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /Visionneuse/ })).toBeHidden();

  await page.goto("/#devnotes");
  await expect(page.locator("#devnotes")).toBeVisible();
  await page.getByRole("button", { name: "Choisir la langue" }).click();
  await page.getByRole("option", { name: "EN" }).click();
  await page.getByRole("button", { name: /Culture & methods/ }).click();
  await page.getByRole("button", { name: /Read article/ }).first().click();
  await expect(page.getByText("Understanding the basics of agility: Scrum, Kanban, XP")).toBeVisible();
  await expect(page.getByText(/Agility was born from an overwhelming observation/)).toBeVisible();
});

test("exposes a complete case-study summary for every project", async ({ page }) => {
  const projectIds = [
    "wallet-provider",
    "altme-wallet",
    "altme-documentation",
    "teams-bot-mastra",
    "seo-geo-optimization",
    "n8n-reporting",
    "n8n-video-derush",
    "eloi-coachsteo",
    "erp-micro-creches",
    "luxury-auto-detailing",
    "cledevoute",
    "aqualis",
    "nolvus-mod-automation",
    "bloodborne-shadps4",
    "demons-souls-rpcs3",
    "berserk-universe",
    "codex-limits-usage",
    "pokemon-binder",
    "ia-trading",
    "patripro",
    "ats-filter-resume",
    "novotel-roue-chance",
  ];

  for (const projectId of projectIds) {
    await page.goto(`/#project=${projectId}`);
    const summary = page.locator("[data-project-summary]");
    await expect(summary).toBeVisible();
    await expect(summary.getByRole("heading", { name: "Tâches réalisées", exact: true })).toHaveCount(1);
    await expect(summary.getByRole("heading", { name: "Résultats & gains", exact: true })).toHaveCount(1);
  }

  await page.goto("/#project=altme-wallet");
  const projectWithoutMetrics = page.locator("[data-project-summary]");
  await expect(projectWithoutMetrics.getByRole("heading", { name: "Métriques publiques", exact: true })).toHaveCount(0);
  await expect(projectWithoutMetrics.getByText(/Aucune métrique chiffrée publique/)).toHaveCount(0);

  await page.goto("/#project=cledevoute");
  const projectWithMetrics = page.locator("[data-project-summary]");
  await expect(projectWithMetrics.getByRole("heading", { name: "Métriques publiques", exact: true })).toHaveCount(1);
  await expect(projectWithMetrics.getByText(/\+60/)).toBeVisible();
  await expect(projectWithMetrics.getByText(/\+15/)).toBeVisible();
});

test("keeps the project summary usable across narrow and wide viewports", async ({ page }) => {
  for (const width of [320, 375, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#project=erp-micro-creches");
    await expect(page.locator("[data-project-summary]")).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test("keeps the critical routes and responsive shell stable", async ({ page }) => {
  await page.goto("/");
  const freelanceHeroCta = page.getByRole("link", { name: "Mes services freelance" });
  await expect(freelanceHeroCta).toHaveAttribute("href", "/freelance");
  await freelanceHeroCta.click();
  await expect(page).toHaveURL(/\/freelance$/);

  await page.goto("/__phase5-does-not-exist__");
  await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();

  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#projects");
    await expect(page.locator("#projects")).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test("aligns the freelance portfolio link with the projects section", async ({ page }) => {
  await page.goto("/freelance");
  await page.getByRole("link", { name: "Voir le portfolio complet", exact: true }).click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeVisible();
  await page.waitForTimeout(250);

  const top = await page.locator("#projects").evaluate((element) =>
    element.getBoundingClientRect().top,
  );
  expect(top).toBeGreaterThanOrEqual(0);
  expect(top).toBeLessThan(180);
});

test("keeps route metadata, FAQ schema and freelance translations aligned", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Bastien Lopez — Développeur Full-Stack IA & Automatisation/);
  const homeDescription = await page.locator('meta[name="description"]').getAttribute("content");
  expect(homeDescription).toContain("applications métier");
  await expect(page.locator("#freelance-faq-schema")).toHaveCount(0);

  await page.goto("/freelance");
  await expect(page).toHaveTitle(/Freelance — Développement web, IA et automatisation/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Sites internet/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://bastienlopez.fr/freelance");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://bastienlopez.fr/freelance");
  expect(await page.locator('meta[name="description"]').getAttribute("content")).not.toBe(homeDescription);
  await expect(page.getByRole("heading", { name: "Clé de Voûte", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Eloi CoachStéo", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Automatisations n8n — Dérush vidéo & reporting", exact: true })).toBeVisible();
  await expect(page.locator("#freelance-faq-schema")).toHaveCount(1);
  const faqSchema = await page.locator("#freelance-faq-schema").evaluate((element) => JSON.parse(element.textContent ?? "{}"));
  expect(faqSchema["@type"]).toBe("FAQPage");
  expect(faqSchema.mainEntity).toHaveLength(6);
  await expect(page.locator("#testimonials [data-testimonial-slide]")).toHaveCount(3);
  const testimonialSizes = await page.locator("#testimonials [data-testimonial-slide]").evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { width: Math.round(rect.width), height: Math.round(rect.height) };
    }),
  );
  expect(new Set(testimonialSizes.map(({ width }) => width)).size).toBe(1);
  expect(new Set(testimonialSizes.map(({ height }) => height)).size).toBe(1);

  await page.goto("/#projects");
  await expect(page.locator("#featured-case-study")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "4 projets clés" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Altme Wallet Provider", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Automatisations n8n.*Reporting/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Automatisations n8n.*Dérush vidéo/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Altme Wallet Platform", exact: true })).toBeVisible();
  const featuredProjectButton = page.getByRole("button", { name: /Altme Wallet Provider/ });
  await featuredProjectButton.click();
  await expect(page.locator("#featured-case-study")).toBeVisible();
  await expect(page.getByText("Tâches réalisées")).toBeVisible();
  await expect(page.getByText("Gains / valeur produite")).toBeVisible();
  await featuredProjectButton.click();
  await expect(page.locator("#featured-case-study")).toHaveCount(0);

  await page.goto("/freelance");
  await page.getByRole("button", { name: "Choisir la langue" }).click();
  await page.getByRole("option", { name: "EN" }).click();
  await expect(page).toHaveTitle(/Freelance — Web development, AI and automation/);
  await expect(page.getByRole("heading", { name: "Clé de Voûte", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Eloi CoachStéo", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "n8n automations — Video editing & reporting", exact: true })).toBeVisible();
  await expect(page.getByText("Showcase website & SEO optimisation").first()).toBeVisible();
  await expect(page.getByText(/The website matches the need exactly/).first()).toBeVisible();

  await page.goto("/mentions-legales");
  await expect(page).toHaveTitle(/Legal notice — Bastien Lopez/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Legal, hosting/);

  await page.goto("/__metadata-does-not-exist__");
  await expect(page).toHaveTitle(/Page not found — Bastien Lopez/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
});

test("publishes crawlable project and service pages without changing the three hero CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-hero-title]")).toHaveAttribute(
    "aria-label",
    /Développeur Full-Stack IA & Automatisation/,
  );
  const hero = page.locator("#hero");
  await expect(hero.getByRole("link", { name: "Voir mes projets clés", exact: true })).toHaveCount(1);
  await expect(hero.getByRole("link", { name: "Me contacter", exact: true })).toHaveCount(1);
  await expect(hero.getByRole("link", { name: "Mes services freelance", exact: true })).toHaveCount(1);

  const projectRoutes = [
    "/projets/altme-wallet-provider",
    "/projets/automatisations-n8n-reporting",
    "/projets/automatisations-n8n-derush-video",
    "/projets/altme-wallet-platform",
    "/projets/altme-documentation",
    "/projets/teams-bot-mastra",
    "/projets/seo-geo-optimization",
    "/projets/eloi-coachsteo",
    "/projets/erp-micro-creches",
    "/projets/luxury-auto-detailing",
    "/projets/cledevoute",
    "/projets/berserk-universe",
    "/projets/codex-limits-usage",
    "/projets/pokemon-binder",
    "/projets/ia-trading",
    "/projets/patripro",
    "/projets/ats-filter-resume",
    "/projets/novotel-roue-chance",
    "/projets/aqualis",
    "/projets/nolvus-mod-automation",
    "/projets/bloodborne-shadps4",
    "/projets/demons-souls-rpcs3",
  ] as const;

  for (const route of projectRoutes) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://bastienlopez.fr${route}`);
    await expect(page.locator("[data-contextual-cta]")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Retour aux projets", exact: true })).toHaveCount(1);
    await expect(page.locator("[data-back-to-projects]")).toHaveAttribute("href", "/#projects");
    const projectSchemaTypes = await page.locator('script[type="application/ld+json"]').evaluateAll((elements) =>
      elements.flatMap((element) => {
        try {
          const value = JSON.parse(element.textContent ?? "{}");
          return value["@graph"]?.map((entry: { "@type"?: string }) => entry["@type"]) ?? [value["@type"]];
        } catch {
          return [];
        }
      }),
    );
    expect(projectSchemaTypes).toContain("CreativeWork");
  }

  await page.goto(projectRoutes[0]);
  await page.getByRole("link", { name: "Retour aux projets", exact: true }).click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeVisible();

  const serviceRoutes = [
    ["/services/sites-vitrines", "Sites vitrines et présence en ligne"],
    ["/services/applications-metier", "Applications métier sur mesure"],
    ["/services/automatisations-n8n", "Automatisations n8n et workflows IA"],
  ] as const;

  for (const [route, heading] of serviceRoutes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://bastienlopez.fr${route}`);
    const serviceSchemaTypes = await page.locator('script[type="application/ld+json"]').evaluateAll((elements) =>
      elements.flatMap((element) => {
        try {
          const value = JSON.parse(element.textContent ?? "{}");
          return value["@graph"]?.map((entry: { "@type"?: string }) => entry["@type"]) ?? [value["@type"]];
        } catch {
          return [];
        }
      }),
    );
    expect(serviceSchemaTypes).toContain("FAQPage");
    await expect(page.getByText(/Reims/).first()).toBeVisible();
  }

  await page.goto("/freelance");
  await expect(page.getByRole("link", { name: /Sites vitrines & présence en ligne/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Applications métier/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Automatisations & intégrations/ })).toBeVisible();

  await page.goto("/#projects");
  await expect(page.getByRole("link", { name: "Ouvrir l’étude de cas dédiée", exact: true })).toHaveCount(4);
});

test("keeps project pills aligned inside cards", async ({ page }) => {
  await page.goto("/#projects");
  const cards = page.locator("#projects [data-project-card]");
  await expect(cards.first()).toBeVisible();

  const measurements = await cards.evaluateAll((elements) =>
    elements.map((element) => {
      const card = element.getBoundingClientRect();
      const tech = element.querySelector("[data-project-tech]")?.getBoundingClientRect();
      return {
        techHeight: tech ? Math.round(tech.height) : 0,
        techOffset: tech ? Math.round(tech.top - card.top) : 0,
      };
    }),
  );

  expect(measurements.every(({ techHeight }) => techHeight > 0)).toBe(true);
  expect(new Set(measurements.map(({ techHeight }) => techHeight)).size).toBe(1);
  expect(Math.max(...measurements.map(({ techOffset }) => techOffset)) - Math.min(...measurements.map(({ techOffset }) => techOffset))).toBeLessThanOrEqual(1);
});

test("returns to the freelance projects section from a freelance project page", async ({ page }) => {
  await page.goto("/freelance");
  const projectLink = page.locator('a[href^="/projets/"]').first();
  await expect(projectLink).toBeVisible();
  await expect(projectLink).toHaveAttribute("href", /\?from=freelance$/);
  await projectLink.click();

  await expect(page).toHaveURL(/\/projets\/[^?]+\?from=freelance$/);
  await expect(page.locator("[data-back-to-projects]")).toHaveAttribute("href", "/freelance#projects");
  await page.getByRole("button", { name: "Retour aux projets", exact: true }).click();
  await expect(page).toHaveURL(/\/freelance#projects$/);
  await expect(page.locator("#projects")).toBeVisible();
});
