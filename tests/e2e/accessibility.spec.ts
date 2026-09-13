import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has no serious or critical accessibility violations on the projects view", async ({ page }) => {
  await page.goto("/#projects");
  await expect(page.locator("#projects")).toBeVisible();

  const results = await new AxeBuilder({ page })
    .include("#main-content")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  const blockingViolations = results.violations.filter((violation) =>
    violation.impact === "critical" || violation.impact === "serious",
  );

  expect(blockingViolations, JSON.stringify(blockingViolations, null, 2)).toEqual([]);
});

test("supports keyboard access for the language menu and gallery", async ({ page }) => {
  await page.goto("/#project=teams-bot-mastra");
  const languageButton = page.getByRole("button", { name: "Choisir la langue" });
  await expect(languageButton).toBeVisible();
  await languageButton.focus();
  await languageButton.press("Enter");
  await expect(page.getByRole("option", { name: "FR" })).toBeVisible();
  await expect(page.getByRole("option", { name: "FR" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("option", { name: "EN" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(languageButton).toBeFocused();

  await page.getByRole("button", { name: /Ouvrir la capture/ }).first().click();
  await expect(page.getByRole("dialog", { name: /Visionneuse/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /Visionneuse/ })).toBeHidden();
});

test("keeps Dev Notes subheadings readable on the dark article surface", async ({ page }) => {
  await page.goto("/#devnotes");
  await expect(page.locator("#devnotes")).toBeVisible();
  await page.getByRole("button", { name: /Architecture & Bonnes pratiques/ }).click();
  await page.getByRole("button", { name: /Lire l'article/ }).first().click();

  const headingColors = await page.locator(".devnotes-content h3, .devnotes-content h4").evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).color),
  );
  expect(headingColors.length).toBeGreaterThan(0);
  expect(headingColors.every((color) => color !== "rgb(17, 24, 39)")).toBe(true);
});
