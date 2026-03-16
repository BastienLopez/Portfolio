import { FileText, Github, Linkedin, Mail, Clock, CheckCircle, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const About = () => {
  const stats = [
    { label: "Années d'expérience", value: "5+" },
    { label: "Projets orientés métier", value: "30+" },
    { label: "Secteurs et contextes traités", value: "10+" },
  ];

  const trustPoints = [
    "Cadrage clair avant de coder",
    "Livraisons progressives avec priorites metier",
    "Code lisible, documente et transmissible",
    "Communication simple avec interlocuteurs techniques et non techniques",
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative section-odd">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              À propos de moi
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Bio */}
            <div className="space-y-6 animate-slide-in">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Je suis développeur full-stack freelance. J'accompagne des PME/TPE qui veulent structurer
                leurs opérations avec des applications métier, des API et des automatisations utiles.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mon approche est pragmatique : comprendre votre contexte, cibler le périmètre utile,
                livrer rapidement une première version exploitable, puis améliorer par itérations.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Je travaille avec React, TypeScript, Node.js, Python, Docker et CI/CD selon vos besoins.
                L'objectif reste toujours le même : un outil fiable, maintenable, et utile pour l'équipe.
              </p>

              <Card className="p-5 bg-card border-border">
                <p className="text-sm font-semibold mb-3">Ma façon de travailler</p>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/80 leading-6">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <a href="https://github.com/BastienLopez" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  <a href="https://www.linkedin.com/in/bastien-lopez-fullstack/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-muted-foreground hover:border-foreground">
                  <a href="https://BastienLopez.github.io/Portfolio/CV_LOPEZ_BASTIEN_FREELANCE.pdf" download>
                    <FileText className="w-4 h-4 mr-2" />
                    Voir mon CV
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Stats Cards */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        {index === 0 && <Clock className="w-6 h-6 text-primary" />}
                        {index === 1 && <CheckCircle className="w-6 h-6 text-primary" />}
                        {index === 2 && <Code className="w-6 h-6 text-primary" />}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Contact card */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Disponible pour</p>
                    <p className="text-lg font-semibold text-foreground">Nouvelles missions freelance</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
