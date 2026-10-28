import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import ConversationalBrief from "./ConversationalBrief";
import { BRIEF_EMAIL, createGmailComposeUrl } from "./conversationBriefData";
import "./Contact.css";

const phone = "06 52 64 97 13";
type ContactProps = { variant?: "default" | "freelance" };

const Contact = ({ variant = "default" }: ContactProps) => {
  const { isEnglish } = useLanguage();
  const context = variant === "freelance" ? "freelance-contact" : "contact";
  const directGmailUrl = createGmailComposeUrl({
    subject: isEnglish ? "Contact - freelance project" : "Contact - projet freelance",
  });

  return (
    <section id="contact" aria-labelledby="contact-title" className="contact-section relative section-even">
      <div className="container mx-auto px-4">
        <div className="contact-shell mx-auto">
          <header className="contact-hero text-center">
            <p className="contact-eyebrow">CONTACT</p>
            <h2 id="contact-title">{isEnglish ? "Describe your project" : "Décrivez votre projet"}</h2>
            <p className="contact-description">{isEnglish ? "A website or a business tool? Describe your situation to prepare the first discussion. Quotation after scoping." : "Un site ou un outil métier ? Décrivez votre situation pour préparer le premier échange. Sur devis après cadrage."}</p>
          </header>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.45fr)]">
            <ConversationalBrief context={context} />
            <aside className="min-w-0 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-label={isEnglish ? "What happens next" : "La suite"}>
              <h3 className="text-lg font-semibold">{isEnglish ? "After your email" : "Après votre email"}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{isEnglish ? "We clarify priorities and constraints. Scope, deliverables, quotation and schedule are then defined before commitment." : "Nous clarifions les priorités et les contraintes. Le périmètre, les livrables, le devis et le planning sont ensuite définis avant engagement."}</p>
              <p className="mt-6 text-sm font-semibold">{isEnglish ? "Prefer direct contact?" : "Vous préférez un contact direct ?"}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{isEnglish ? "I usually reply within a few business days. The first exchange is used to check the scope, with no commitment." : "Je réponds généralement sous quelques jours ouvrés. Le premier échange sert à vérifier le périmètre, sans engagement."}</p>
              <a href={directGmailUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-start gap-2 text-sm text-primary underline-offset-4 hover:underline"><Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span className="break-all">{BRIEF_EMAIL}</span></a>
              <a href={`tel:${phone.replaceAll(" ", "")}`} className="mt-4 flex items-start gap-2 text-sm text-primary underline-offset-4 hover:underline"><Phone className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span>{phone}</span></a>
              <a href="https://www.linkedin.com/in/bastienlopez-fullstack/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"><Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn</a>
              <Link to="/mentions-legales" className="mt-6 block text-xs text-muted-foreground underline underline-offset-4">{isEnglish ? "Data and privacy" : "Données et confidentialité"}</Link>
            </aside>
          </div>
          {variant === "default" && (
            <nav className="contact-actions" aria-label={isEnglish ? "Contact options" : "Options de contact"}>
              <a href={directGmailUrl} target="_blank" rel="noopener noreferrer" className="contact-action" onClick={() => trackEvent("cta_click", { location: context, cta: "email" })}>
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
