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
  await page.getByRole("button", { name: "En savoir plus" }).first().click();
  await expect(page).toHaveURL(/#project=/);
  await expect(page.getByRole("button", { name: /Retour aux projets/ })).toBeVisible();

  await page.goBack();
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
    "n8n-workflow-automation",
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
  await expect(page.locator("#freelance-faq-schema")).toHaveCount(1);
  const faqSchema = await page.locator("#freelance-faq-schema").evaluate((element) => JSON.parse(element.textContent ?? "{}"));
  expect(faqSchema["@type"]).toBe("FAQPage");
  expect(faqSchema.mainEntity).toHaveLength(6);
  await expect(page.locator("#testimonials .testimonial-slide")).toHaveCount(10);
  await expect(page.locator("#testimonials [data-testimonial-slide]")).toHaveCount(5);
  const testimonialSizes = await page.locator("#testimonials .testimonial-slide").evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { width: Math.round(rect.width), height: Math.round(rect.height) };
    }),
  );
  expect(new Set(testimonialSizes.map(({ width }) => width)).size).toBe(1);
  expect(new Set(testimonialSizes.map(({ height }) => height)).size).toBe(1);
  const pauseTestimonialsButton = page.getByRole("button", { name: "Mettre en pause le défilement des témoignages" });
  await expect(pauseTestimonialsButton).toBeVisible();
  const ticker = page.locator("#testimonials .ticker");
  const initialTickerTransform = await ticker.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(750);
  const movingTickerTransform = await ticker.evaluate((element) => getComputedStyle(element).transform);
  expect(movingTickerTransform).not.toBe(initialTickerTransform);
  await pauseTestimonialsButton.click();
  await expect(page.getByRole("button", { name: "Reprendre le défilement des témoignages" })).toBeVisible();

  await page.goto("/#projects");
  await expect(page.locator("#featured-case-study")).toHaveCount(0);
  const featuredProjectButton = page.getByRole("button", { name: /ERP Micro-Crèches/ });
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
  await expect(page.getByText("Showcase website & SEO optimisation").first()).toBeVisible();
  await expect(page.getByText(/The website matches the need exactly/).first()).toBeVisible();

  await page.goto("/mentions-legales");
  await expect(page).toHaveTitle(/Legal notice — Bastien Lopez/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Legal, hosting/);

  await page.goto("/__metadata-does-not-exist__");
  await expect(page).toHaveTitle(/Page not found — Bastien Lopez/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
});
