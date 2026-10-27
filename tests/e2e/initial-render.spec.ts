import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "#hero h1" },
  { path: "/freelance", heading: "#freelance h1" },
] as const;

for (const route of routes) {
  test(`${route.path} affiche le contenu prerendu sans loader visible`, async ({ page }) => {
    await page.addInitScript(() => {
      (window as Window & { __portfolioLoadingSeen?: boolean }).__portfolioLoadingSeen = false;

      new MutationObserver(() => {
        const bodyText = document.body?.textContent ?? "";
        if (/\b(?:Chargement|Loading)\b/i.test(bodyText)) {
          (window as Window & { __portfolioLoadingSeen?: boolean }).__portfolioLoadingSeen = true;
        }
      }).observe(document.documentElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });

    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    await expect(page.locator(route.heading)).toBeVisible();
    await page.waitForTimeout(1200);

    expect(
      await page.evaluate(
        () => (window as Window & { __portfolioLoadingSeen?: boolean }).__portfolioLoadingSeen,
      ),
    ).toBe(false);
  });
}
