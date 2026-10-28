import { expect, test } from "@playwright/test";

test("preserves the portfolio order and replaces only the second featured project", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#devnotes")).toBeAttached();
  const sectionOrder = await page.locator("main > section[id]").evaluateAll((elements) => elements.map((element) => element.id));
  expect(sectionOrder).toEqual(["hero", "about", "projects", "skills", "devnotes", "contact"]);
  await expect(page.locator("#about a")).toHaveCount(0);
  await expect(page.locator("#hero")).not.toContainText(/CDI|poste ou mission|permanent roles/i);
  await expect(page.locator("#about")).not.toContainText(/CDI|poste ou mission|permanent roles/i);
  await expect(page.locator("#contact h2")).toHaveText("Décrivez votre projet");
  await expect(page.locator("#contact .contact-intent-grid")).toHaveCount(0);
  await expect(page.locator("#contact .contact-actions a")).toHaveText(["Écrire par email", "Me contacter sur LinkedIn", "GitHub"]);
  await expect(page.locator("#about")).toContainText("7+");
  await expect(page.locator("#about")).toContainText("30+");
  await expect(page.locator("footer a[aria-label='GitHub']")).toBeVisible();
  await expect(page.locator("footer a[aria-label='LinkedIn']")).toBeVisible();
  await expect(page.locator("footer")).not.toContainText("Parcours / CV");
  const featuredTitles = page.locator(".project-featured-title");
  await expect(featuredTitles).toHaveText(["Altme Wallet Provider", "Clé de Voûte", "Automatisations n8n — Dérush vidéo", "Eloi CoachStéo — Sport Trainer"]);
  await featuredTitles.nth(1).click();
  await expect(page.locator("#featured-case-study")).toContainText("mission freelance");
  await expect(page.locator("#featured-case-study")).toContainText("maçonnerie");
  await expect(page.getByRole("button", { name: "PROJETS PRO", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "MISSIONS FREELANCE", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "OPEN SOURCE", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "GAMING / MOBILE", exact: true })).toBeVisible();
});

test("presents two offers, three contextualised client quotes and consistent English content", async ({ page }) => {
  await page.goto("/freelance");
  await expect(page.locator("#contact .contact-intent-grid")).toHaveCount(0);
  await expect(page.locator("#contact h2")).toHaveText("Décrivez votre projet");
  await expect(page.locator("#freelance-services > ol > li")).toHaveCount(2);
  await expect(page.locator("[data-service-conditions]")).toHaveCount(2);
  await expect(page.locator("#freelance-services")).toContainText("Sur devis après cadrage");
  await expect(page.locator("#freelance [data-freelance-actions] a")).toHaveText(["Décrire mon projet", "Voir les réalisations", "Création de sites internet à Reims"]);
  await expect(page.locator("#freelance [data-freelance-actions] a").nth(0)).toHaveAttribute("href", "#contact");
  await expect(page.locator("#freelance [data-freelance-actions] a").nth(1)).toHaveAttribute("href", "#projects");
  await expect(page.locator("#freelance [data-freelance-actions] a").nth(2)).toHaveAttribute("href", "/creation-site-internet-reims");
  await expect(page.locator("#testimonials [data-testimonial-context]")).toHaveCount(3);
  await expect(page.locator("#testimonials blockquote")).toHaveCount(3);
  await expect(page.locator("#testimonials")).toContainText("45 %");
  await expect(page.locator("#testimonials")).toContainText("15 %");
  await expect(page.locator("#testimonials")).toContainText("60 %");
  await expect(page.locator("#testimonials")).toContainText("17 %");
  await expect(page.locator("#projects")).toContainText("Gain chiffrable");
  await expect(page.locator("#projects")).toContainText("+60 %");
  await expect(page.locator("#projects")).toContainText("+17 %");
  await expect(page.locator("#projects")).toContainText("45 %");
  await expect(page.locator("#projects")).toContainText("35 %");
  await expect(page.locator("#testimonials strong")).toHaveText(["45 %", "15 %", "+60 %", "+17 %"]);
  await expect(page.locator("#freelance-faq-title")).toHaveText("Des questions ? ");
  await expect(page.locator("#projects")).toContainText("expérience professionnelle");
  await page.getByRole("button", { name: "Choisir la langue" }).click();
  await page.getByRole("option", { name: "EN" }).click();
  await expect(page.locator("#freelance-services > ol > li")).toHaveCount(2);
  await expect(page.locator("#contact")).toContainText("Quotation after scoping");
  await expect(page.locator("#testimonials [data-testimonial-context]")).toHaveCount(3);
});

test("starts the conversational brief without exposing every field at once", async ({ page }) => {
  await page.goto("/freelance#contact");
  const form = page.getByRole("form", { name: "Parlons de votre projet" });
  await expect(form).toBeVisible();
  await expect(form.getByRole("heading", { name: "Quel type de projet avez-vous en tête ?" })).toBeVisible();
  await expect(form.locator('[data-choice-group="project-type"]')).toHaveCount(3);
  await expect(form.getByLabel("Votre nom")).not.toBeAttached();
  await expect(form.getByLabel("Votre adresse email")).not.toBeAttached();
});

test("keeps landing actions inside their visible container at mobile and tablet breakpoints", async ({ page }) => {
  for (const width of [320, 375, 640, 646, 768, 1280]) {
    for (const route of ["/", "/freelance"]) {
      await page.setViewportSize({ width, height: width <= 375 ? 667 : 900 });
      await page.goto(route);
      const selector = route === "/" ? "#hero a" : "#freelance header a";
      await expect(page.locator(selector).first()).toBeVisible();
      if (route === "/") await expect(page.locator("[data-hero-title]")).toHaveAttribute("data-typing-complete", "true");
      const clipped = await page.locator(selector).evaluateAll((elements) => elements.flatMap((element) => {
        const rect = element.getBoundingClientRect();
        let left = 0;
        let right = document.documentElement.clientWidth;
        for (let parent = element.parentElement; parent; parent = parent.parentElement) {
          if (/(hidden|clip|auto|scroll)/.test(getComputedStyle(parent).overflowX)) {
            const box = parent.getBoundingClientRect();
            left = Math.max(left, box.left);
            right = Math.min(right, box.right);
          }
        }
        return rect.left < left - 1 || rect.right > right + 1 || element.scrollWidth > element.clientWidth + 1
          ? [{ text: element.textContent, left: rect.left, right: rect.right, limit: right }]
          : [];
      }));
      expect(clipped, `${route} at ${width}px`).toEqual([]);
      if (route === "/") {
        const badges = await page.locator("[data-hero-badges]").boundingBox();
        const actions = page.locator("[data-hero-actions]");
        const actionsBox = await actions.boundingBox();
        expect(actionsBox!.y).toBeGreaterThanOrEqual(badges!.y + badges!.height);
        await expect(actions.locator("a")).toHaveText(["Voir mes projets clés", "Décrire mon projet", "Mes services freelance"]);
        await actions.scrollIntoViewIfNeeded();
        await expect(actions.getByRole("link", { name: "Décrire mon projet", exact: true })).toBeInViewport();
      }
    }
  }
});

test("keeps diagram layout engines out of the initial portfolio load", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const resources = await page.evaluate(() => performance.getEntriesByType("resource")
    .map((entry) => entry.name.split("/").pop() ?? ""));
  expect(resources.filter((name) => /^(elk-|mermaid[.-]|cytoscape\.)/.test(name))).toEqual([]);
});
