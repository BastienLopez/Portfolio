import { expect, test, type Page } from "@playwright/test";

const projectTypes = ["website", "business-tool", "scoping"] as const;
const problemsByProject = {
  website: ["no-site", "old-site", "not-enough-contacts", "other"],
  "business-tool": ["repetitive-tasks", "tools-not-connected", "manual-files", "other"],
  scoping: ["idea-without-start", "technical-choice", "advice-estimate", "other"],
} as const;
const outcomesByProject = {
  website: ["modern-site", "more-contacts", "improve-existing-site", "other"],
  "business-tool": ["automate-tasks", "custom-business-tool", "centralize-tools", "other"],
  scoping: ["define-project", "estimate-budget", "identify-solution", "other"],
} as const;
const budgets = ["under-1000", "1000-3000", "3000-5000", "over-5000", "define-together", "custom"] as const;
const timelines = ["as-soon-as-possible", "within-month", "one-to-three-months", "no-deadline"] as const;
const existingValues = ["yes", "no"] as const;
let flowId = 0;

const choice = (page: Page, group: string, value: string) => page.locator(`[data-choice-group="${group}"][data-choice-value="${value}"]`);

const startFlow = async (page: Page, projectType: string) => {
  flowId += 1;
  await page.goto(`/freelance?e2e-flow=${flowId}#contact`);
  await choice(page, "project-type", projectType).click();
  await page.getByRole("button", { name: "Je n’ai pas encore d’entreprise" }).click();
};

test("covers every project-specific problem and outcome branch", async ({ page }) => {
  test.setTimeout(180_000);

  for (const projectType of projectTypes) {
    for (const problem of problemsByProject[projectType]) {
      for (const outcome of outcomesByProject[projectType]) {
        await startFlow(page, projectType);
        await expect(page.locator('[data-choice-group="problem"]')).toHaveCount(4);
        await choice(page, "problem", problem).click();
        if (problem === "other") {
          await page.locator("#conversation-problem-details").fill(`Problème ${projectType}`);
          await page.getByRole("button", { name: "Suivant", exact: true }).click();
        }
        await expect(page.locator('[data-choice-group="outcome"]')).toHaveCount(4);
        await choice(page, "outcome", outcome).click();
        if (outcome === "other") {
          await page.locator("#conversation-outcome-details").fill(`Objectif ${projectType}`);
          await page.getByRole("button", { name: "Suivant", exact: true }).click();
        }
        await choice(page, "budget", "under-1000").click();
        await choice(page, "timeline", "no-deadline").click();
        await choice(page, "existing", "no").click();
        await expect(page.locator(".conversation-step-label")).toHaveText("Étape 7 sur 7");
      }
    }
  }
});

test("skips the project-type question when the contact is opened from a known context", async ({ page }) => {
  for (const projectType of ["website", "business-tool"] as const) {
    await page.goto(`/freelance?project=${projectType}#contact`);
    await expect(page.locator(".conversation-step-label")).toHaveText("Étape 2 sur 7");
    await expect(page.getByRole("heading", { name: "Quelle est votre entreprise ou votre activité ?" })).toBeVisible();
    await expect(page.locator('[data-choice-group="project-type"]')).toHaveCount(0);

    await page.getByRole("button", { name: "Revenir à la question précédente" }).click();
    await expect(choice(page, "project-type", projectType)).toHaveAttribute("aria-pressed", "true");
  }
});

test("covers every budget, timeline and existing-site choice in the UI", async ({ page }) => {
  test.setTimeout(180_000);

  for (const budget of budgets) {
    for (const timeline of timelines) {
      for (const existing of existingValues) {
        await startFlow(page, "business-tool");
        await choice(page, "problem", "repetitive-tasks").click();
        await choice(page, "outcome", "automate-tasks").click();
        if (budget === "custom") {
          await page.getByLabel("Ou précisez un budget (facultatif)").fill("Sur devis après cadrage");
          await page.getByRole("button", { name: "Passer au délai" }).click();
        } else {
          await choice(page, "budget", budget).click();
        }
        await choice(page, "timeline", timeline).click();
        await choice(page, "existing", existing).click();
        if (existing === "yes") {
          await page.getByLabel("Lien vers le site ou l’outil (facultatif)").fill("siteweb.com");
          await page.getByRole("button", { name: "Suivant", exact: true }).click();
        }
        await expect(page.locator(".conversation-step-label")).toHaveText("Étape 7 sur 7");
        await page.getByLabel("Votre nom").fill("Camille Test");
        await page.getByLabel("Votre adresse email").fill("camille@example.com");
        await page.getByRole("button", { name: "Voir mon récapitulatif" }).click();
        await expect(page.locator("[data-conversation-summary]")).toBeVisible();
      }
    }
  }
});

test("preserves the detailed flow, normalizes the URL and opens a prefilled Gmail compose window", async ({ page }) => {
  await startFlow(page, "scoping");
  await choice(page, "problem", "other").click();
  await page.locator("#conversation-problem-details").fill("Besoin de cadrer le périmètre");
  await page.getByRole("button", { name: "Suivant", exact: true }).click();
  await choice(page, "outcome", "other").click();
  await page.locator("#conversation-outcome-details").fill("Obtenir une feuille de route");
  await page.getByRole("button", { name: "Suivant", exact: true }).click();
  await page.getByLabel("Ou précisez un budget (facultatif)").fill("Sur devis après cadrage");
  await page.getByRole("button", { name: "Passer au délai" }).click();
  await choice(page, "timeline", "one-to-three-months").click();
  await choice(page, "existing", "yes").click();
  await page.getByLabel("Lien vers le site ou l’outil (facultatif)").fill("siteweb.com");
  await page.getByRole("button", { name: "Suivant", exact: true }).click();
  await page.getByLabel("Votre nom").fill("Alex");
  await page.getByLabel("Votre adresse email").fill("alex@example.com");
  await page.getByRole("button", { name: "Voir mon récapitulatif" }).click();

  const emailLink = page.getByRole("link", { name: "Préparer mon email" });
  const emailHref = await emailLink.getAttribute("href");
  const gmailUrl = new URL(emailHref ?? "");
  expect(emailHref).toMatch(/^https:\/\/mail\.google\.com\/mail\/u\/0\/\?/);
  expect(gmailUrl.searchParams.get("to")).toBe("bastien.lopez40@gmail.com");
  expect(gmailUrl.searchParams.get("su")).toContain("Nouvelle demande de projet");
  expect(gmailUrl.searchParams.get("body")).toContain("https://siteweb.com");
  expect(await emailLink.getAttribute("target")).toBe("_blank");
  expect(await page.locator("#conversation-preview").inputValue()).toContain("Obtenir une feuille de route");
  await expect(page.getByRole("button", { name: "Copier mon message" })).toBeVisible();
  await expect(page.getByText("Gmail s’ouvre dans un nouvel onglet avec le destinataire, l’objet et le brief préremplis. Rien n’est envoyé automatiquement.")).toBeVisible();
  await page.getByRole("button", { name: "Modifier mes réponses" }).click();
  await expect(page.locator('input[value="Alex"]')).toBeVisible();
  await expect(page.locator('input[value="alex@example.com"]')).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Votre demande a été envoyée");
  const storage = await page.evaluate(() => JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } }));
  expect(storage).not.toContain("alex@example.com");
});

test("supports keyboard selection on the first question", async ({ page }) => {
  await page.goto("/freelance#contact");
  const firstChoice = choice(page, "project-type", "website");
  await firstChoice.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".conversation-step-label")).toHaveText("Étape 2 sur 7");
  await expect(page.getByRole("heading", { name: "Quelle est votre entreprise ou votre activité ?" })).toBeFocused();
});
