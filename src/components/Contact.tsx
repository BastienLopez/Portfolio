import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

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
    <section id="contact" className="py-20 md:py-32 relative bg-secondary/30 section-even">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{isEnglish ? 'Let’s discuss a role or project' : 'Parlons d’un poste ou d’une mission'}</h2>
            <div className="mx-auto mb-6 h-1 w-20 bg-primary"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isEnglish ? 'Whether you are recruiting or need focused delivery, share your context and I will get back to you with a concrete, tailored approach.' : 'Que vous recrutiez ou ayez un besoin de réalisation ciblé, partagez votre contexte : je vous réponds avec une approche concrète et adaptée.'}
            </p>
          </div>

          <Card className="space-y-6 border-border bg-transparent p-8 shadow-none">
            <div className="space-y-5">
              <div className="grid gap-3 text-center sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-secondary/25 p-4">
                  <h3 className="mb-2 font-semibold text-foreground">{isEnglish ? 'For a role' : 'Pour un poste'}</h3>
                  <ul className="space-y-1 text-sm leading-6 text-foreground/75">
                    <li>{isEnglish ? 'Role and team' : 'Poste proposé et équipe'}</li>
                    <li>{isEnglish ? 'Stack and environment' : 'Stack et environnement'}</li>
                    <li>{isEnglish ? 'Remote or hybrid setup' : 'Organisation remote ou hybride'}</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-secondary/25 p-4">
                  <h3 className="mb-2 font-semibold text-foreground">{isEnglish ? 'For a project' : 'Pour une mission'}</h3>
                  <ul className="space-y-1 text-sm leading-6 text-foreground/75">
                    <li>{isEnglish ? 'Need and scope' : 'Besoin et périmètre'}</li>
                    <li>{isEnglish ? 'Technical constraints' : 'Contraintes techniques'}</li>
                    <li>{isEnglish ? 'Desired timeline' : 'Délai souhaité'}</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-cta hover:bg-cta/90 text-cta-foreground">
                  <a href={mailtoLink} onClick={() => trackEvent("cta_click", { location: "contact", cta: "email" })}>
                    <Mail className="w-4 h-4 mr-2" />
                    {isEnglish ? 'Write an email' : 'Écrire par email'}
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("cta_click", { location: "contact", cta: "linkedin" })}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    {isEnglish ? 'Contact me on LinkedIn' : 'Me contacter sur LinkedIn'}
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-1">
                <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {email}
                </a>
                <Button asChild size="sm" variant="outline" className="flex items-center gap-2">
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
