import { FileText, Github, Linkedin, Mail, Clock, CheckCircle, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";

const About = () => {
  const { isEnglish } = useLanguage();
  const stats = isEnglish
    ? [{ label: "Years of experience", value: "5+" }, { label: "Projects and builds", value: "30+" }, { label: "Industries and contexts covered", value: "10+" }]
    : [{ label: "Années d'expérience", value: "5+" }, { label: "Projets et réalisations", value: "30+" }, { label: "Secteurs et contextes traités", value: "10+" }];

  const trustPoints = isEnglish
    ? ["Clear scope", "Incremental delivery with business priorities", "Readable, documented and transferable code", "Straightforward and fluid communication"]
    : ["Cadrage clair", "Livraisons progressives avec priorités métier", "Code lisible, documenté et transmissible", "Communication simple et fluide"];

  return (
    <section id="about" className="py-20 md:py-32 relative section-odd">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {isEnglish ? 'About me' : 'À propos de moi'}
            </h2>
            <div className="mx-auto h-1 w-20 bg-primary"></div>
          </div>

          <div className="grid items-start gap-12 md:grid-cols-2">
            {/* Left: Bio */}
            <div className="space-y-6 animate-slide-in">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isEnglish ? 'I build business applications, APIs and AI/n8n automations for teams that need reliable tools.' : 'Je développe des applications métier, des APIs et des automatisations IA/n8n pour des équipes qui ont besoin d’outils fiables.'}
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {isEnglish ? 'I work with remote product teams and freelance clients, from the first useful version through handover.' : 'J’accompagne des équipes produit en remote et des clients freelance, de la première version utile jusqu’à la passation.'}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isEnglish ? 'I start with the concrete need, keep the scope useful, then improve the tool with the people who use it.' : 'Je pars du besoin concret, je garde un périmètre utile, puis j’améliore l’outil avec les personnes qui l’utilisent.'}
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {isEnglish ? 'My daily tools are React, TypeScript, Node.js, Python/FastAPI, Docker, CI/CD and n8n. The code stays readable and documented so the team can take it over.' : 'Je travaille surtout avec React, TypeScript, Node.js, Python/FastAPI, Docker, CI/CD et n8n. Le code reste lisible et documenté pour que l’équipe puisse le reprendre.'}
              </p>

            </div>

            {/* Right: Stats Cards */}
            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="border-border bg-card p-4 shadow-none transition-colors duration-200 hover:border-primary/60 md:p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-semibold text-primary md:text-4xl">
                        {stat.value}
                      </p>
                    </div>
                    {index === 0 && <Clock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}
                    {index === 1 && <CheckCircle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}
                    {index === 2 && <Code className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}
                  </div>
                </Card>
              ))}

              {/* Contact card */}
              <Card className="border-l-2 border-l-primary border-y-border border-r-border bg-transparent p-4 shadow-none sm:col-span-3 md:col-span-1 md:p-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{isEnglish ? 'Available for' : 'Disponible pour'}</p>
                    <p className="text-lg font-semibold text-foreground">{isEnglish ? 'Remote/full-remote permanent roles or focused freelance projects' : 'CDI remote/full remote ou missions freelance ciblées'}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Card className="mt-8 border-border bg-transparent p-5 shadow-none">
            <p className="mb-3 text-sm font-semibold">{isEnglish ? 'How I work' : 'Ma façon de travailler'}</p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm leading-6 text-foreground/80 sm:grid-cols-2 lg:grid-cols-4">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="grid grid-cols-1 gap-3 pt-8 sm:grid-cols-3">
            <Button asChild variant="outline" className="w-full justify-center border-border text-foreground hover:border-emerald-300 hover:bg-emerald-300/10 hover:text-emerald-300">
              <a href="https://github.com/BastienLopez" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-center border-border text-foreground hover:border-blue-400 hover:bg-blue-400/10 hover:text-blue-400">
              <a href="https://www.linkedin.com/in/bastien-lopez-fullstack/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-center border-muted-foreground hover:border-emerald-300 hover:bg-emerald-300/10 hover:text-emerald-300">
              <a href="/CV_LOPEZ_BASTIEN_FREELANCE.pdf" download>
                <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                {isEnglish ? 'View my résumé' : 'Voir mon CV'}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
