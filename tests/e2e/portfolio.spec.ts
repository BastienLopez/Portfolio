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

test("keeps the critical routes and responsive shell stable", async ({ page }) => {
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
