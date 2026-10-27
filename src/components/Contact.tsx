import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import "./Contact.css";

const email = "bastien.lopez40@gmail.com";
const phone = "06 52 64 97 13";
type ContactProps = { variant?: "default" | "freelance" };

const normalizeWebsite = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const isHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return (parsed.protocol === "http:" || parsed.protocol === "https:") && Boolean(parsed.hostname);
  } catch {
    return false;
  }
};

const Contact = ({ variant = "default" }: ContactProps) => {
  const { isEnglish } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">("idle");
  const previewRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (draft) previewRef.current?.focus();
  }, [draft]);
  const context = variant === "freelance" ? "freelance-contact" : "contact";
  const BriefHeading = "h2";
  const directMailto = `mailto:${email}?subject=${encodeURIComponent(isEnglish ? "Contact - freelance project" : "Contact - projet freelance")}`;
  const projectTypes = [
    { value: "website", label: isEnglish ? "Professional website / redesign" : "Site professionnel / refonte" },
    { value: "business-tool", label: isEnglish ? "Business tool / automation" : "Outil métier / automatisation" },
    { value: "unsure", label: isEnglish ? "I need help defining the scope" : "J’ai besoin d’aide pour cadrer" },
  ];
  const fields = [
    { name: "projectType", label: isEnglish ? "Project type" : "Type de projet", type: "select", required: true, limit: 100, autoComplete: "off" },
    { name: "activity", label: isEnglish ? "Your business / activity" : "Votre entreprise / activité", type: "text", required: true, limit: 150, autoComplete: "organization" },
    { name: "name", label: isEnglish ? "Your name" : "Votre nom", type: "text", required: true, limit: 100, autoComplete: "name" },
    { name: "email", label: isEnglish ? "Your email" : "Votre email", type: "email", required: true, limit: 254, autoComplete: "email" },
    { name: "need", label: isEnglish ? "Current problem" : "Problème actuel", type: "textarea", required: true, limit: 1000, autoComplete: "off" },
    { name: "outcome", label: isEnglish ? "Expected result" : "Résultat attendu", type: "textarea", required: false, limit: 600, autoComplete: "off" },
    { name: "timeline", label: isEnglish ? "Desired timing" : "Délai souhaité", type: "text", required: false, limit: 150, autoComplete: "off" },
    { name: "budget", label: isEnglish ? "Planned budget (or to be defined)" : "Budget prévu (ou à définir)", type: "text", required: false, limit: 150, autoComplete: "off" },
    { name: "website", label: isEnglish ? "Existing website" : "Lien vers le site existant", type: "url", required: false, limit: 300, autoComplete: "url" },
  ];
  const subject = isEnglish ? "Freelance project brief" : "Brief de projet freelance";
  const brief = draft ? [
    subject,
    `${fields[0].label} : ${projectTypes.find((option) => option.value === draft.projectType)?.label || (isEnglish ? "To be defined" : "À préciser")}`,
    `${draft.name} — ${draft.activity} — ${draft.email}`,
    ...fields.filter((field) => !["projectType", "activity", "name", "email"].includes(field.name)).map((field) => (
      `${field.label} : ${draft[field.name] || (isEnglish ? "To be defined" : "À préciser")}`
    )),
  ].join("\n\n") : "";
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
  // Some mail clients truncate long mailto URIs. Keep the full brief available for copying.
  const canPrefillEmail = mailto.length <= 2000;

  const prepareBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors: Record<string, string> = {};
    const values: Record<string, string> = {};
    for (const field of fields) {
      const control = form.elements.namedItem(field.name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      values[field.name] = field.name === "website" ? normalizeWebsite(control.value) : control.value.trim();
      if (field.required && !values[field.name]) {
        nextErrors[field.name] = isEnglish ? "Please fill in this field." : "Renseignez ce champ.";
      } else if (field.name === "website" && values[field.name] && !isHttpUrl(values[field.name])) {
        nextErrors[field.name] = isEnglish ? "Use an http:// or https:// link." : "Utilisez un lien http:// ou https://.";
      } else if (field.name !== "website" && (!control.checkValidity() || values[field.name].length > field.limit)) {
        nextErrors[field.name] = field.type === "email"
          ? (isEnglish ? "Enter a valid email address." : "Indiquez une adresse email valide.")
          : (isEnglish ? "Check the format or shorten this field." : "Vérifiez le format ou raccourcissez ce champ.");
      }
    }
    setErrors(nextErrors);
    setCopyStatus("idle");
    if (Object.keys(nextErrors).length) {
      setDraft(null);
      (form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLElement)?.focus();
      return;
    }
    setDraft(values);
    trackEvent("brief_prepared", { location: context, project_type: values.projectType });
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus("copied");
    } catch {
      previewRef.current?.focus();
      previewRef.current?.select();
      setCopyStatus("manual");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="contact-section relative section-even">
      <div className="container mx-auto px-4">
        <div className="contact-shell mx-auto">
          <header className="contact-hero text-center">
            <p className="contact-eyebrow">CONTACT</p>
            <BriefHeading id="contact-title">{isEnglish ? "Describe your project" : "Décrivez votre projet"}</BriefHeading>
            <p className="contact-description">{isEnglish ? "A website or a business tool? Describe your situation to prepare the first discussion. Quotation after scoping." : "Un site ou un outil métier ? Décrivez votre situation pour préparer le premier échange. Sur devis après cadrage."}</p>
          </header>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.45fr)]">
            <form action={`mailto:${email}`} method="post" encType="text/plain" noValidate onSubmit={prepareBrief} onChange={() => { setDraft(null); setCopyStatus("idle"); }} aria-describedby="brief-help" aria-label={isEnglish ? "Project brief" : "Brief de projet"}>
              <p id="brief-help" className="mb-6 text-sm leading-6 text-muted-foreground">{isEnglish ? "* Required fields. This form prepares an email: you send it yourself. No information is saved or sent by the site." : "* Champs obligatoires. Ce formulaire prépare un email : vous l’envoyez vous-même. Le site n’enregistre et n’envoie aucune de ces informations."}</p>
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => {
                  const id = `brief-${field.name}`;
                  const props = { id, name: field.name, required: field.required, autoComplete: field.autoComplete, "aria-invalid": Boolean(errors[field.name]), "aria-describedby": errors[field.name] ? `${id}-error` : undefined };
                  return (
                    <div key={field.name} className={field.type === "textarea" || field.type === "url" ? "min-w-0 sm:col-span-2" : "min-w-0"}>
                      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{field.label}{field.required ? " *" : ""}</label>
                      {field.type === "select" ? (
                        <select {...props} defaultValue="" className="brief-select h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          <option value="">{isEnglish ? "Choose a need" : "Choisissez un besoin"}</option>
                          {projectTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      ) : field.type === "textarea" ? (
                        <Textarea {...props} maxLength={field.limit} rows={3} className="text-base md:text-base" />
                      ) : field.type === "url" ? (
                        <div className="flex h-11 min-w-0">
                          <span className="website-input-prefix inline-flex shrink-0 items-center rounded-l-md border border-r-0 border-input bg-background px-3 text-base font-semibold text-foreground">https://</span>
                          <Input
                            {...props}
                            type="text"
                            inputMode="url"
                            maxLength={field.limit}
                            placeholder="siteweb.com"
                            onChange={(event) => {
                              event.currentTarget.value = event.currentTarget.value.replace(/^https?:\/\//i, "");
                            }}
                            className="h-11 min-w-0 flex-1 rounded-l-none text-base md:text-base"
                          />
                        </div>
                      ) : (
                        <Input {...props} type={field.type} maxLength={field.limit} className="h-11 text-base md:text-base" />
                      )}
                      {errors[field.name] && <p id={`${id}-error`} className="mt-2 text-sm text-red-300">{errors[field.name]}</p>}
                    </div>
                  );
                })}
              </div>
              <Button type="submit" size="lg" className="mt-6 h-auto min-h-11 w-full max-w-full whitespace-normal bg-cta py-3 text-cta-foreground hover:bg-cta/90">{isEnglish ? "Prepare my email" : "Préparer mon email"}</Button>
            </form>
            <aside className="min-w-0 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-label={isEnglish ? "What happens next" : "La suite"}>
              <h3 className="text-lg font-semibold">{isEnglish ? "After your email" : "Après votre email"}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{isEnglish ? "We clarify priorities and constraints. Scope, deliverables, quotation and schedule are then defined before commitment." : "Nous clarifions les priorités et les contraintes. Le périmètre, les livrables, le devis et le planning sont ensuite définis avant engagement."}</p>
              <p className="mt-6 text-sm font-semibold">{isEnglish ? "Prefer direct contact?" : "Vous préférez un contact direct ?"}</p>
              <a href={`mailto:${email}`} className="mt-3 flex items-start gap-2 text-sm text-primary underline-offset-4 hover:underline"><Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span className="break-all">{email}</span></a>
              <a href={`tel:${phone.replaceAll(" ", "")}`} className="mt-4 flex items-start gap-2 text-sm text-primary underline-offset-4 hover:underline"><Phone className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span>{phone}</span></a>
              <a href="https://www.linkedin.com/in/bastien-lopez-fullstack/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"><Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn</a>
              <Link to="/mentions-legales" className="mt-6 block text-xs text-muted-foreground underline underline-offset-4">{isEnglish ? "Data and privacy" : "Données et confidentialité"}</Link>
            </aside>
          </div>
          {draft && (
            <div className="mt-8 border-t border-border pt-6" data-brief-preview>
              <p role="status" className="font-semibold">{isEnglish ? "Brief ready. You still need to send the email." : "Brief prêt. Il reste à envoyer votre email."}</p>
              <label htmlFor="brief-preview" className="mt-4 block text-sm">{isEnglish ? "Message to send" : "Message à envoyer"}</label>
              <Textarea ref={previewRef} id="brief-preview" value={brief} readOnly rows={8} className="brief-preview mt-2 text-base" />
              {!canPrefillEmail && <p className="mt-3 text-sm text-muted-foreground">{isEnglish ? "This brief is long. Copy it into an email to avoid truncation by your mail app." : "Ce brief est long. Copiez-le dans un email pour éviter qu’il soit tronqué par votre messagerie."}</p>}
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild className="h-auto min-h-11 max-w-full whitespace-normal bg-cta py-3 text-cta-foreground hover:bg-cta/90"><a href={canPrefillEmail ? mailto : `mailto:${email}`} onClick={() => trackEvent("cta_click", { location: context, cta: "email" })}><Mail aria-hidden="true" />{isEnglish ? "Open my mail app" : "Ouvrir ma messagerie"}</a></Button>
                <Button type="button" variant="outline" onClick={() => void copyBrief()} className="h-auto min-h-11 whitespace-normal py-3"><Copy aria-hidden="true" />{isEnglish ? "Copy the brief" : "Copier le brief"}</Button>
              </div>
              <p role="status" className="mt-3 text-sm text-muted-foreground">{copyStatus === "copied" ? (isEnglish ? "Brief copied. Paste it into your email and send it." : "Brief copié. Collez-le dans votre email, puis envoyez-le.") : copyStatus === "manual" ? (isEnglish ? "Automatic copy is unavailable. The text is selected: copy it manually." : "La copie automatique est indisponible. Le texte est sélectionné : copiez-le manuellement.") : (isEnglish ? "If no mail app opens, copy the brief and send it to the address shown above." : "Si aucune messagerie ne s’ouvre, copiez le brief et envoyez-le à l’adresse indiquée ci-dessus.")}</p>
            </div>
          )}
          {variant === "default" && (
            <nav className="contact-actions" aria-label={isEnglish ? "Contact options" : "Options de contact"}>
              <a href={directMailto} className="contact-action" onClick={() => trackEvent("cta_click", { location: context, cta: "email" })}>
                <span className="contact-action-main"><Mail aria-hidden="true" /><span>{isEnglish ? "Write an email" : "Écrire par email"}</span></span>
                <ArrowRight aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/bastien-lopez-fullstack/" target="_blank" rel="noopener noreferrer" className="contact-action" onClick={() => trackEvent("cta_click", { location: context, cta: "linkedin" })}>
                <span className="contact-action-main"><Linkedin aria-hidden="true" /><span>{isEnglish ? "Contact me on LinkedIn" : "Me contacter sur LinkedIn"}</span></span>
                <ArrowRight aria-hidden="true" />
              </a>
              <a href="https://github.com/BastienLopez" target="_blank" rel="noopener noreferrer" className="contact-action" onClick={() => trackEvent("cta_click", { location: context, cta: "github" })}>
                <span className="contact-action-main"><Github aria-hidden="true" /><span>GitHub</span></span>
                <ArrowRight aria-hidden="true" />
              </a>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
