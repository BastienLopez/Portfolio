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
  const mailtoLink = `mailto:${email}?subject=${isEnglish ? 'Web%20project%20-%20contact' : 'Projet%20web%20-%20prise%20de%20contact'}`;

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-secondary/30 section-even">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{isEnglish ? 'Let’s discuss your business needs' : 'Parlons de votre besoin métier'}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isEnglish ? 'Describe your context, constraints and objective. I will get back to you with a concrete, tailored approach.' : 'Décrivez votre contexte, vos contraintes et votre objectif. Je vous réponds avec une approche concrète et adaptée.'}
            </p>
          </div>

          <Card className="p-8 bg-card border-border space-y-6">
            <div className="space-y-5">
              <p className="text-sm text-foreground/80 leading-6">
                {isEnglish ? 'You can send me a message with:' : "Vous pouvez m'envoyer un message avec:"}
              </p>
              <ul className="text-sm text-foreground/75 leading-6 space-y-1">
                <li>{isEnglish ? 'Your activity and current context' : 'Votre activité et le contexte actuel'}</li>
                <li>{isEnglish ? 'The problem to address first' : 'Le problème à résoudre en priorité'}</li>
                <li>{isEnglish ? 'Your target timeline and main constraints' : 'Le délai visé et vos contraintes principales'}</li>
              </ul>

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
