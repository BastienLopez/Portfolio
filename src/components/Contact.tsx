import { ArrowRight, CircleCheck, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import "./Contact.css";

type ContactProps = {
  variant?: "default" | "freelance";
};

const Contact = ({ variant = "default" }: ContactProps) => {
  const { isEnglish } = useLanguage();
  const email = "bastien.lopez40@gmail.com";
  const linkedin = "https://www.linkedin.com/in/bastien-lopez-fullstack/";
  const github = "https://github.com/BastienLopez";
  const mailtoLink = `mailto:${email}?subject=${isEnglish ? 'Contact%20-%20role%20or%20project' : 'Contact%20-%20poste%20ou%20mission'}`;

  if (variant === "freelance") {
    return (
      <section id="contact" className="relative bg-secondary/30 section-even py-20 md:py-28">
        <div className="container mx-auto w-full px-4">
          <div className="mx-auto max-w-7xl border-y border-border py-10 md:flex md:items-end md:justify-between md:gap-12 md:py-14">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {isEnglish ? "Next step" : "Prochaine étape"}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                {isEnglish ? "Tell me what needs to move forward." : "Parlons de ce qui doit avancer."}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                {isEnglish
                  ? "Share the current situation, the useful scope and the expected timing. I will reply with the next concrete step."
                  : "Partagez le contexte actuel, le périmètre utile et le délai souhaité. Je vous répondrai avec une prochaine étape concrète."}
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col items-start gap-4 md:mt-0 md:items-end">
              <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
                <a
                  href={mailtoLink}
                  onClick={() => trackEvent("cta_click", { location: "freelance-contact", cta: "email" })}
                >
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  {isEnglish ? "Start a conversation" : "Démarrer la conversation"}
                </a>
              </Button>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <a href={`mailto:${email}`} className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                  {email}
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
                  onClick={() => trackEvent("cta_click", { location: "freelance-contact", cta: "linkedin" })}
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="contact-section relative section-even">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="contact-shell mx-auto w-full text-center">
          <header className="contact-hero">
            <p className="contact-eyebrow">CONTACT</p>
            <h2 id="contact-title">
              {isEnglish ? 'Let’s discuss a role or project' : 'Parlons d’un poste ou d’une mission'}<span className="contact-title-dot" aria-hidden="true">.</span>
            </h2>
            <p className="contact-description">
              {isEnglish ? 'Whether you are recruiting or need focused delivery, share your context: I will reply with a concrete, tailored approach.' : 'Que vous recrutiez ou ayez un besoin de réalisation ciblé, partagez votre contexte : je vous réponds avec une approche concrète et adaptée.'}
            </p>
          </header>

          <div className="contact-intent-grid" aria-label={isEnglish ? 'Information to share' : 'Informations à partager'}>
            <div className="contact-intent-group">
              <h3>{isEnglish ? 'FOR A ROLE' : 'POUR UN POSTE'}</h3>
              <ul>
                <li><CircleCheck aria-hidden="true" /><span>{isEnglish ? 'Role and team' : 'Poste proposé et équipe'}</span></li>
                <li><CircleCheck aria-hidden="true" /><span>{isEnglish ? 'Stack and environment' : 'Stack et environnement'}</span></li>
                <li><CircleCheck aria-hidden="true" /><span>{isEnglish ? 'Remote or hybrid setup' : 'Organisation remote ou hybride'}</span></li>
              </ul>
            </div>
            <div className="contact-intent-group">
              <h3>{isEnglish ? 'FOR A PROJECT' : 'POUR UNE MISSION'}</h3>
              <ul>
                <li><CircleCheck aria-hidden="true" /><span>{isEnglish ? 'Need and scope' : 'Besoin et périmètre'}</span></li>
                <li><CircleCheck aria-hidden="true" /><span>{isEnglish ? 'Technical constraints' : 'Contraintes techniques'}</span></li>
                <li><CircleCheck aria-hidden="true" /><span>{isEnglish ? 'Desired timeline' : 'Délai souhaité'}</span></li>
              </ul>
            </div>
          </div>

          <nav className="contact-actions" aria-label={isEnglish ? 'Contact options' : 'Options de contact'}>
            <a
              href={mailtoLink}
              className="contact-action"
              onClick={() => trackEvent("cta_click", { location: "contact", cta: "email" })}
            >
              <span className="contact-action-main"><Mail aria-hidden="true" /><span>{isEnglish ? 'Write an email' : 'Écrire par email'}</span></span>
              <ArrowRight aria-hidden="true" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action"
              onClick={() => trackEvent("cta_click", { location: "contact", cta: "linkedin" })}
            >
              <span className="contact-action-main"><Linkedin aria-hidden="true" /><span>{isEnglish ? 'Contact me on LinkedIn' : 'Me contacter sur LinkedIn'}</span></span>
              <ArrowRight aria-hidden="true" />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action"
              onClick={() => trackEvent("cta_click", { location: "contact", cta: "github" })}
            >
              <span className="contact-action-main"><Github aria-hidden="true" /><span>GitHub</span></span>
              <ArrowRight aria-hidden="true" />
            </a>
          </nav>

          <footer className="contact-footer">
            <a href={`mailto:${email}`} className="contact-email">{email}</a>
            <span className="contact-footer-rule" aria-hidden="true" />
            <p>{isEnglish ? 'AVAILABLE FOR REMOTE/FULL-REMOTE PERMANENT ROLES OR FOCUSED FREELANCE ENGAGEMENTS' : 'DISPONIBLE POUR CDI REMOTE/FULL REMOTE OU MISSIONS FREELANCE CIBLÉES'}</p>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Contact;
