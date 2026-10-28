import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Contact from "@/components/Contact";
import { LanguageProvider } from "@/lib/i18n";

const renderContact = (initialEntry = "/freelance#contact") => render(
  <MemoryRouter initialEntries={[initialEntry]}>
    <LanguageProvider>
      <Contact variant="freelance" />
    </LanguageProvider>
  </MemoryRouter>,
);

const choose = (group: string, value: string) => {
  const element = document.querySelector<HTMLButtonElement>(`[data-choice-group="${group}"][data-choice-value="${value}"]`);
  if (!element) throw new Error(`Choice not found: ${group}/${value}`);
  fireEvent.click(element);
};

const advanceToStepSeven = () => {
  choose("project-type", "business-tool");
  fireEvent.change(screen.getByLabelText("Votre entreprise ou votre activité"), { target: { value: "Atelier test" } });
  fireEvent.click(screen.getByRole("button", { name: "Suivant" }));
  choose("problem", "repetitive-tasks");
  choose("outcome", "automate-tasks");
  choose("budget", "3000-5000");
  choose("timeline", "within-month");
  choose("existing", "no");
};

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  window.sessionStorage.clear();
});

describe("ConversationalBrief", () => {
  it("shows one question at a time and exposes the three project types", () => {
    renderContact();

    expect(screen.getByRole("form", { name: "Parlons de votre projet" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Quel type de projet avez-vous en tête ?" })).toBeVisible();
    expect(document.querySelectorAll('[data-choice-group="project-type"]')).toHaveLength(3);
    expect(screen.queryByLabelText("Votre nom")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Votre adresse email")).not.toBeInTheDocument();
    expect(screen.getByText("Je réponds généralement sous quelques jours ouvrés. Le premier échange sert à vérifier le périmètre, sans engagement.")).toBeVisible();
  });

  it("skips the known project type when arriving from a contextual link", () => {
    renderContact("/freelance?project=website#contact");

    expect(screen.getByText("Étape 2 sur 7")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Quelle est votre entreprise ou votre activité ?" })).toBeVisible();
    expect(document.querySelectorAll('[data-choice-group="project-type"]')).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: "Revenir à la question précédente" }));
    expect(document.querySelector('[data-choice-group="project-type"][data-choice-value="website"]')).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps answers, creates the summary and prepares Gmail without storing prospect data", () => {
    renderContact();
    advanceToStepSeven();

    fireEvent.change(screen.getByLabelText(/^Votre nom/), { target: { value: "Camille" } });
    fireEvent.change(screen.getByLabelText(/^Votre adresse email/), { target: { value: "camille@example.com" } });
    fireEvent.submit(screen.getByRole("form", { name: "Parlons de votre projet" }));

    expect(screen.getByRole("heading", { name: "Votre projet est prêt à être partagé !" })).toBeVisible();
    expect(screen.getByText("Atelier test")).toBeVisible();
    expect(screen.getByText("Outil métier / automatisation")).toBeVisible();
    expect(screen.getByText("Camille")).toBeVisible();

    const email = screen.getByRole("link", { name: "Préparer mon email" });
    const href = email.getAttribute("href") ?? "";
    const gmailUrl = new URL(href);
    const body = gmailUrl.searchParams.get("body") ?? "";
    expect(href).toMatch(/^https:\/\/mail\.google\.com\/mail\/u\/0\/\?/);
    expect(gmailUrl.searchParams.get("to")).toBe("bastien.lopez40@gmail.com");
    expect(body).toContain("Atelier test");
    expect(body).toContain("Camille");
    expect(body).toContain("Dans le mois");
    expect(body).not.toContain("\n\n\n");
    expect(JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } })).not.toContain("camille@example.com");
  });

  it("supports the other branches, optional URL, custom budget and going back", () => {
    renderContact();
    choose("project-type", "scoping");
    fireEvent.click(screen.getByRole("button", { name: "Je n’ai pas encore d’entreprise" }));
    choose("problem", "other");
    fireEvent.change(screen.getByLabelText("Décrivez le problème"), { target: { value: "Un besoin spécifique" } });
    fireEvent.click(screen.getByRole("button", { name: "Suivant" }));
    choose("outcome", "other");
    fireEvent.change(screen.getByLabelText("Décrivez l’objectif attendu"), { target: { value: "Un objectif précis" } });
    fireEvent.click(screen.getByRole("button", { name: "Suivant" }));
    fireEvent.change(screen.getByLabelText("Ou précisez un budget (facultatif)"), { target: { value: "Sur devis" } });
    fireEvent.click(screen.getByRole("button", { name: "Passer au délai" }));
    choose("timeline", "no-deadline");
    choose("existing", "yes");
    fireEvent.change(screen.getByLabelText("Lien vers le site ou l’outil (facultatif)"), { target: { value: "siteweb.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Suivant" }));
    fireEvent.change(screen.getByLabelText(/^Votre nom/), { target: { value: "Alex" } });
    fireEvent.change(screen.getByLabelText(/^Votre adresse email/), { target: { value: "alex@example.com" } });
    fireEvent.submit(screen.getByRole("form", { name: "Parlons de votre projet" }));

    expect(screen.getByText("https://siteweb.com")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Modifier mes réponses" }));
    expect(screen.getByDisplayValue("Alex")).toBeVisible();
    expect(screen.getByDisplayValue("alex@example.com")).toBeVisible();
  });

  it("validates the required name and email fields", () => {
    renderContact();
    advanceToStepSeven();
    fireEvent.submit(screen.getByRole("form", { name: "Parlons de votre projet" }));
    expect(screen.getByLabelText(/^Votre nom/)).toHaveFocus();
    expect(screen.getByLabelText(/^Votre nom/)).toHaveAttribute("aria-invalid", "true");

    fireEvent.change(screen.getByLabelText(/^Votre nom/), { target: { value: "Camille" } });
    fireEvent.change(screen.getByLabelText(/^Votre adresse email/), { target: { value: "invalid" } });
    fireEvent.submit(screen.getByRole("form", { name: "Parlons de votre projet" }));
    expect(screen.getByLabelText(/^Votre adresse email/)).toHaveFocus();
    expect(screen.getByLabelText(/^Votre adresse email/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Indiquez une adresse email valide.")).toBeVisible();
  });
});
