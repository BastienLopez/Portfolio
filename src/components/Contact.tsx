import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const Contact = () => {
  const { isEnglish } = useLanguage();
  const email = "bastien.lopez40@gmail.com";
  const linkedin = "https://www.linkedin.com/in/bastien-lopez-fullstack/";
  const github = "https://github.com/BastienLopez";
  const mailtoLink = `mailto:${email}?subject=${isEnglish ? 'Contact%20-%20role%20or%20project' : 'Contact%20-%20poste%20ou%20mission'}`;

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-secondary/30 section-even">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{isEnglish ? 'Let’s discuss a role or project' : 'Parlons d’un poste ou d’une mission'}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isEnglish ? 'Whether you are recruiting or need focused delivery, share your context and I will get back to you with a concrete, tailored approach.' : 'Que vous recrutiez ou ayez un besoin de réalisation ciblé, partagez votre contexte : je vous réponds avec une approche concrète et adaptée.'}
            </p>
          </div>

          <Card className="p-8 bg-card border-border space-y-6">
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
