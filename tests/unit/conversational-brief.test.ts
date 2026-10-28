import { describe, expect, it } from "vitest";
import {
  BUDGET_OPTIONS,
  EXISTING_OPTIONS,
  PROJECT_TYPES,
  TIMELINE_OPTIONS,
  createBriefEmail,
  BRIEF_EMAIL,
  createEmptyAnswers,
  getChoiceLabel,
  getContextualProjectType,
  getOutcomeOptions,
  getProblemOptions,
  isHttpUrl,
  normalizeWebsite,
  type ProjectType,
} from "@/components/conversationBriefData";

describe("conversational brief data", () => {
  it("maps service and campaign context to the correct project branch", () => {
    expect(getContextualProjectType("/freelance", "?project=website")).toBe("website");
    expect(getContextualProjectType("/freelance", "?project=business-tool")).toBe("business-tool");
    expect(getContextualProjectType("/creation-site-internet-reims", "")).toBe("website");
    expect(getContextualProjectType("/services/applications-metier", "")).toBe("business-tool");
    expect(getContextualProjectType("/freelance", "?project=unknown")).toBe("");
    expect(getContextualProjectType("/freelance", "")).toBe("");
  });

  it("covers every normal conditional path and produces an encoded email", () => {
    const paths = PROJECT_TYPES.flatMap(({ value: projectType }) =>
      getProblemOptions(projectType).flatMap((problem) =>
        getOutcomeOptions(projectType).flatMap((outcome) =>
          BUDGET_OPTIONS.flatMap((budget) =>
            TIMELINE_OPTIONS.flatMap((timeline) =>
              EXISTING_OPTIONS.map((existing) => ({ projectType, problem, outcome, budget, timeline, existing })),
            ),
          ),
        ),
      ),
    );

    expect(paths).toHaveLength(1_920);

    for (const { projectType, problem, outcome, budget, timeline, existing } of paths) {
      const answers = {
        ...createEmptyAnswers(),
        projectType,
        activity: "Atelier test",
        problem: problem.value,
        problemDetails: problem.value === "other" ? "Un problème à préciser" : "",
        outcome: outcome.value,
        outcomeDetails: outcome.value === "other" ? "Un objectif à préciser" : "",
        budget: budget.value,
        timeline: timeline.value,
        existing: existing.value,
        website: existing.value === "yes" ? "siteweb.com" : "",
        name: "Camille Test",
        email: "camille@example.com",
      };
      const email = createBriefEmail(answers);

      const gmailUrl = new URL(email.gmailUrl);
      expect(email.gmailUrl).toMatch(/^https:\/\/mail\.google\.com\/mail\/u\/0\/\?/);
      expect(gmailUrl.searchParams.get("to")).toBe(BRIEF_EMAIL);
      expect(gmailUrl.searchParams.get("body")).toContain("Atelier test");
      expect(email.subject).toContain(getChoiceLabel(PROJECT_TYPES, projectType, "fr"));
      expect(email.body).toContain("Atelier test");
      expect(email.body).toContain(problem.value === "other" ? "Un problème à préciser" : problem.fr);
      expect(email.body).toContain(outcome.value === "other" ? "Un objectif à préciser" : outcome.fr);
      expect(email.body).toContain(budget.fr);
      expect(email.body).toContain(timeline.fr);
      expect(email.body).toContain(existing.value === "yes" ? "https://siteweb.com" : "Non");
      expect(email.body).not.toContain("\n\n\n");
    }
  });

  it("supports the optional custom budget and the URL normalization boundary", () => {
    const answers = {
      ...createEmptyAnswers(),
      projectType: "scoping" as ProjectType,
      activity: "Projet personnel",
      problem: "other" as const,
      problemDetails: "Je veux valider le périmètre avant de développer.",
      outcome: "other" as const,
      outcomeDetails: "Obtenir une feuille de route claire.",
      budget: "custom" as const,
      budgetCustom: "Sur devis après cadrage",
      timeline: "no-deadline" as const,
      existing: "yes" as const,
      website: "https://siteweb.com",
      name: "Alex",
      email: "alex@example.com",
    };
    const email = createBriefEmail(answers);

    expect(email.values.budget).toBe("Sur devis après cadrage");
    expect(email.values.website).toBe("https://siteweb.com");
    expect(new URL(email.gmailUrl).searchParams.get("body")).toContain("Sur devis après cadrage");
    expect(normalizeWebsite("siteweb.com")).toBe("https://siteweb.com");
    expect(normalizeWebsite("https://siteweb.com")).toBe("https://siteweb.com");
    expect(isHttpUrl("https://siteweb.com/path")).toBe(true);
    expect(isHttpUrl("http://localhost:4175")).toBe(true);
    expect(isHttpUrl("javascript:alert(1)")).toBe(false);
    expect(isHttpUrl("not a url")).toBe(false);
  });
});
