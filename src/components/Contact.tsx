import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

const Contact = () => {
  const email = "bastien.lopez40@gmail.com";
  const linkedin = "https://www.linkedin.com/in/bastien-lopez-fullstack/";
  const github = "https://github.com/BastienLopez";
  const mailtoLink = `mailto:${email}?subject=Projet%20web%20-%20prise%20de%20contact`;

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-secondary/30 section-even">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Parlons de votre besoin metier</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Decrivez votre contexte, vos contraintes et votre objectif.
              Je vous reponds avec une approche concrete et adaptee.
            </p>
          </div>

          <Card className="p-8 bg-card border-border space-y-6">
            <div className="space-y-5">
              <p className="text-sm text-foreground/80 leading-6">
                Vous pouvez m'envoyer un message avec:
              </p>
              <ul className="text-sm text-foreground/75 leading-6 space-y-1">
                <li>Votre activite et le contexte actuel</li>
                <li>Le probleme a resoudre en priorite</li>
                <li>Le delai vise et vos contraintes principales</li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-cta hover:bg-cta/90 text-cta-foreground">
                  <a href={mailtoLink} onClick={() => trackEvent("cta_click", { location: "contact", cta: "email" })}>
                    <Mail className="w-4 h-4 mr-2" />
                    Ecrire par email
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent("cta_click", { location: "contact", cta: "linkedin" })}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Me contacter sur LinkedIn
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-1">
                <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {email}
                </a>
                <a href={github} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
