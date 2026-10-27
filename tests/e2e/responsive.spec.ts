import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

for (const language of ["fr", "en"] as const) {
  test.describe(`responsive ${language}`, () => {
    test.beforeEach(async ({ page }) => {
      if (language === "en") {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto("/");
        await page.getByRole("button", { name: "Choisir la langue" }).click();
        await page.getByRole("option", { name: "EN", exact: true }).click();
        await expect(page.locator("[data-hero-title]")).toHaveAttribute("data-typing-complete", "true");
      }
    });

    test("shows all three compact hero actions on desktop and short screens", async ({ page }) => {
      for (const viewport of [
        { width: 1920, height: 1080 },
        { width: 1920, height: 842 },
        { width: 1536, height: 864 },
        { width: 1536, height: 674 },
        { width: 1280, height: 720 },
        { width: 1280, height: 600 },
        { width: 1024, height: 600 },
      ]) {
        await page.setViewportSize(viewport);
        await page.goto("/");
        await expect(page.locator("[data-hero-title]")).toHaveAttribute("data-typing-complete", "true");
        await page.evaluate(() => document.fonts.ready);
        const badges = await page.locator("[data-hero-badges]").boundingBox();
        const buttons = page.locator("[data-hero-actions] a");
        await expect(buttons).toHaveCount(3);
        for (const button of await buttons.all()) {
          const box = (await button.boundingBox())!;
          expect(box.y, JSON.stringify(viewport)).toBeGreaterThanOrEqual(badges!.y + badges!.height);
          expect(box.y + box.height, JSON.stringify(viewport)).toBeLessThanOrEqual(viewport.height);
          expect(box.height).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeLessThanOrEqual(48);
          await expect(button).toBeInViewport({ ratio: 1 });
        }
        const heading = (await page.locator("#hero h1").boundingBox())!;
        const navbar = (await page.locator("nav").first().boundingBox())!;
        expect(heading.y).toBeGreaterThanOrEqual(navbar.y + navbar.height);
      }
    });

    test("fills the form width and keeps the three direct contacts on one row", async ({ page }) => {
      for (const width of [320, 375, 640, 768, 1024, 1280, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of ["/", "/freelance"]) {
          await page.goto(route);
          const form = page.locator("#contact form");
          await expect(form).toBeVisible();
          await page.evaluate(() => document.fonts.ready);
          const formBox = (await form.boundingBox())!;
          const submitBox = (await form.locator('button[type="submit"]').boundingBox())!;
          expect(Math.abs(submitBox.x - formBox.x), `${route} at ${width}px`).toBeLessThan(1);
          expect(Math.abs(submitBox.width - formBox.width), `${route} at ${width}px`).toBeLessThan(1);
          if (route !== "/") continue;
          const contacts = page.locator(".contact-actions a");
          await expect(contacts).toHaveCount(3);
          const row = (await page.locator(".contact-actions").boundingBox())!;
          const boxes = await Promise.all((await contacts.all()).map((link) => link.boundingBox()));
          for (let index = 0; index < boxes.length; index += 1) {
            const box = boxes[index]!;
            expect(Math.abs(box.y - row.y), `${width}px`).toBeLessThan(1);
            expect(Math.abs(box.width - boxes[0]!.width), `${width}px`).toBeLessThan(1);
            if (width >= 768) expect(box.height, `${route} at ${width}px`).toBe(44);
            if (index > 0) expect(box.x).toBeGreaterThan(boxes[index - 1]!.x + boxes[index - 1]!.width);
          }
          expect(Math.abs(boxes[0]!.x - formBox.x)).toBeLessThan(1);
          expect(Math.abs(boxes[2]!.x + boxes[2]!.width - row.x - row.width)).toBeLessThan(1);
          const clippedLabels = await contacts.locator(".contact-action-main > span").evaluateAll((labels) => labels.filter((label) => {
            const text = document.createRange();
            text.selectNodeContents(label);
            const bounds = label.closest("a")!.getBoundingClientRect();
            return Array.from(text.getClientRects()).some((rect) => rect.left < bounds.left || rect.right > bounds.right || rect.top < bounds.top || rect.bottom > bounds.bottom);
          }).map((label) => label.textContent));
          expect(clippedLabels, `${width}px`).toEqual([]);
        }
      }
    });

    test("keeps the screenshot viewer close button above navigation at every screen size", async ({ page }) => {
      for (const width of [320, 375, 768, 1280, 1920]) {
        await page.setViewportSize({ width, height: width < 768 ? 667 : 900 });
        for (const route of ["/#project=teams-bot-mastra", "/projets/teams-bot-mastra"]) {
          await page.goto(route);
          await page.getByRole("button", { name: /Ouvrir la capture|Open screenshot/ }).first().click();
          const dialog = page.getByRole("dialog", { name: /Visionneuse|Project screenshot viewer/ });
          await expect(dialog).toBeVisible();
          await expect.poll(() => dialog.locator("img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
          const close = dialog.getByRole("button", { name: /Fermer la visionneuse|Close viewer/ });
          const unobstructed = await close.evaluate((button) => {
            const box = button.getBoundingClientRect();
            const receiver = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
            return receiver === button || button.contains(receiver);
          });
          expect(unobstructed, `${route} at ${width}px`).toBe(true);
          await close.click();
          await expect(dialog).toBeHidden();
        }
      }
    });

    test("keeps categories, long project titles and contextual buttons inside their columns", async ({ page }) => {
      test.setTimeout(60_000);
      const routes = [
        "/",
        "/projets/altme-wallet-provider",
        "/projets/automatisations-n8n-reporting",
        "/projets/automatisations-n8n-derush-video",
        "/projets/altme-documentation",
        "/projets/seo-geo-optimization",
        "/projets/cledevoute",
        "/projets/nolvus-mod-automation",
      ];
      for (const width of [320, 375, 768, 1024, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of routes) {
          await page.goto(route);
          await expect(page.locator("h1").first()).toBeVisible();
          await page.evaluate(() => document.fonts.ready);
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
          expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
          const elements = page.locator("#projects-list button, .project-detail-hero h1, [data-contextual-cta] a");
          await expect(elements.first(), route).toBeAttached();
          expect(await elements.count(), route).toBeGreaterThan(0);
          const clipped = await elements.evaluateAll((items) => items.filter((item) => item.scrollWidth > item.clientWidth + 1).map((item) => item.textContent));
          expect(clipped, `${route} at ${width}px`).toEqual([]);
        }
      }
    });
  });
}
