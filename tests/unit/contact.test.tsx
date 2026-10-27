import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "@/components/Contact";
import { LanguageProvider } from "@/lib/i18n";

afterEach(() => { cleanup(); localStorage.clear(); });

const setup = (variant: "default" | "freelance" = "freelance") => render(<MemoryRouter><LanguageProvider><Contact variant={variant} /></LanguageProvider></MemoryRouter>);
const fill = (name: string, value: string) => fireEvent.change(document.querySelector(`[name="${name}"]`)!, { target: { value } });
const prepare = (need = "Présenter mon activité & simplifier le contact") => {
  fill("projectType", "website");
  fill("activity", "Atelier Étoile");
  fill("name", "Camille");
  fill("email", "camille@example.com");
  fill("need", need);
  fireEvent.click(screen.getByRole("button", { name: "Préparer mon email" }));
};

describe("project brief", () => {
  it("keeps the homepage contact path focused on freelance projects", () => {
    setup("default");
    const briefHeading = screen.getByRole("heading", { name: "Décrivez votre projet" });
    const form = screen.getByRole("form", { name: "Brief de projet" });
    const actions = screen.getByRole("navigation", { name: "Options de contact" });
    expect(form.compareDocumentPosition(actions) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.queryByText("Poste proposé et équipe")).not.toBeInTheDocument();
    expect(screen.queryByText("Parlons d’un poste ou d’une mission")).not.toBeInTheDocument();
    expect([...actions.querySelectorAll("a")].map((link) => link.textContent)).toEqual(["Écrire par email", "Me contacter sur LinkedIn", "GitHub"]);
    expect(screen.getByRole("link", { name: "Écrire par email" })).toHaveAttribute("href", "mailto:bastien.lopez40@gmail.com?subject=Contact%20-%20projet%20freelance");
    expect(screen.getByRole("link", { name: "Me contacter sur LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/bastien-lopez-fullstack/");
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/BastienLopez");
  });

  it("associates errors with fields and focuses the first invalid field", () => {
    setup();
    expect(screen.queryByRole("heading", { name: /Parlons d’un poste/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Options de contact" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Préparer mon email" }));
    expect(screen.getByLabelText(/Type de projet/)).toHaveFocus();
    expect(screen.getByLabelText(/Votre email/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Votre email/)).toHaveAccessibleDescription("Renseignez ce champ.");
    prepare();
    fill("email", "invalid");
    fireEvent.click(screen.getByRole("button", { name: "Préparer mon email" }));
    expect(screen.getByLabelText(/Votre email/)).toHaveAccessibleDescription("Indiquez une adresse email valide.");
    expect(screen.queryByRole("link", { name: "Ouvrir ma messagerie" })).not.toBeInTheDocument();
  });

  it("encodes the brief as one email body without injecting headers or sending data", () => {
    setup();
    const store = vi.spyOn(Storage.prototype, "setItem");
    store.mockClear();
    const need = "Une page <script>test</script> &bcc=intrus@example.com\nBudget : à préciser";
    prepare(need);
    const url = new URL(screen.getByRole("link", { name: "Ouvrir ma messagerie" }).getAttribute("href")!);
    expect(screen.getByRole("form", { name: "Brief de projet" })).toHaveAttribute("action", "mailto:bastien.lopez40@gmail.com");
    expect(url.pathname).toBe("bastien.lopez40@gmail.com");
    expect([...url.searchParams.keys()]).toEqual(["subject", "body"]);
    const body = url.searchParams.get("body")!;
    expect(body).toContain(need);
    expect(body).toContain("Atelier Étoile");
    expect(body).toContain("Site professionnel / refonte");
    expect(body).toContain("Brief de projet freelance\n\nType de projet : Site professionnel / refonte\n\nCamille — Atelier Étoile — camille@example.com");
    expect(body).not.toContain("\n\n\n");
    expect(body).not.toContain("Votre entreprise / activité :");
    expect(body).not.toContain("Votre nom :");
    expect(body).not.toContain("Votre email :");
    expect(document.querySelector("#contact script")).toBeNull();
    expect(store).not.toHaveBeenCalled();
    expect(JSON.stringify(window.dataLayer)).not.toContain("camille@example.com");
    expect(screen.getByText("Brief prêt. Il reste à envoyer votre email.")).toBeInTheDocument();
    expect(screen.getByLabelText("Message à envoyer")).toHaveFocus();
  });

  it("preserves long briefs and uses an explicit copy fallback", () => {
    setup();
    const need = "é".repeat(950) + " FIN";
    prepare(need);
    expect((screen.getByLabelText("Message à envoyer") as HTMLTextAreaElement).value).toContain(need);
    expect(screen.getByRole("link", { name: "Ouvrir ma messagerie" })).toHaveAttribute("href", "mailto:bastien.lopez40@gmail.com");
    expect(screen.getByText(/Ce brief est long/)).toBeInTheDocument();
  });

  it("adds https to a bare existing website domain in the generated brief", () => {
    setup();
    prepare();
    fill("website", "siteweb.com");
    fireEvent.click(screen.getByRole("button", { name: "Préparer mon email" }));
    const body = new URL(screen.getByRole("link", { name: "Ouvrir ma messagerie" }).getAttribute("href")!).searchParams.get("body")!;
    expect(body).toContain("Lien vers le site existant : https://siteweb.com");
    expect(screen.getByLabelText(/Lien vers le site existant/)).toHaveValue("siteweb.com");
  });

  it("offers manual selection if clipboard permission is denied, then supports copying", async () => {
    const writeText = vi.fn().mockRejectedValueOnce(new Error("Denied")).mockResolvedValueOnce(undefined);
    vi.stubGlobal("navigator", Object.assign(Object.create(navigator), { clipboard: { writeText } }));
    setup();
    prepare();
    fireEvent.click(screen.getByRole("button", { name: "Copier le brief" }));
    await screen.findByText(/La copie automatique est indisponible/);
    const preview = screen.getByLabelText("Message à envoyer") as HTMLTextAreaElement;
    expect(preview).toHaveFocus();
    expect(preview.selectionStart).toBe(0);
    expect(preview.selectionEnd).toBe(preview.value.length);
    fireEvent.click(screen.getByRole("button", { name: "Copier le brief" }));
    await waitFor(() => expect(screen.getByText(/Brief copié/)).toBeInTheDocument());
    expect(writeText).toHaveBeenLastCalledWith(preview.value);
    vi.unstubAllGlobals();
  });

  it("invalidates a prepared email when the prospect edits the brief", () => {
    setup();
    prepare();
    fill("need", "Un autre besoin");
    expect(screen.queryByRole("link", { name: "Ouvrir ma messagerie" })).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Votre entreprise/)).toHaveValue("Atelier Étoile");
    fill("website", "javascript:alert(1)");
    fireEvent.click(screen.getByRole("button", { name: "Préparer mon email" }));
    expect(screen.getByLabelText(/Lien vers/)).toHaveAccessibleDescription("Utilisez un lien http:// ou https://.");
  });
});
