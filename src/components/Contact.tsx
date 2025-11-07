import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Contact = () => {
  const email = "bastien.lopez40@gmail.com";
  const linkedin = "https://www.linkedin.com/in/bastien-lopez-fullstack/";
  const github = "https://github.com/BastienLopez";

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Contactez-moi</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pour me contacter, envoyez un email ou utilisez LinkedIn / GitHub.
            </p>
          </div>

          <Card className="p-8 bg-card border-border space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  {email}
                </a>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <Button size="sm" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                </a>

                <a href={github} target="_blank" rel="noreferrer">
                  <Button size="sm" className="flex items-center gap-2">
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
