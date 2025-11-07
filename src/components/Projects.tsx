import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Projects = () => {
  const projects = [
    {
      title: "ERP Micro-Crèches",
      description:
        "ERP multifonctionnel conçu pour la gestion de plusieurs micro-crèches. Permet la centralisation des données et la supervision de plusieurs établissements depuis une seule interface.",
  image: "img_projects/creche.png",
      tech: ["React", "Node.js", "JavaScript", "MongoDB", "Docker", "CI/CD", "TDD"],
      github: "https://github.com/BastienLopez/Creche_Bon_Petit_Bonhomme",
      demo: "#",
    },
    {
      title: "Altme Wallet Platform",
      description:
        "Développement et amélioration d’une plateforme back-end pour la gestion de portefeuilles numériques et de credentials vérifiables. Participation au projet **Discover**, intégrant la gestion des NFTs et des cryptomonnaies via l’API Coingecko.",
  image: "img_projects/Altme_Discover.png",
      tech: ["HTML / CSS", "Python", "Coingecko API"],
      github: "https://github.com/TalaoDAO/DiscoverV2/tree/main",
      demo: "https://apps.apple.com/fr/app/altme-wallet/id1633216869",
    },
    {
      title: "Eloi Sport",
      description:
        "Site vitrine one-page pour un coach sportif et ostéopathe. Présentation des services de remise en forme, de préparation physique et de programmes personnalisés HYRIX, avec design moderne et responsive.",
  image: "img_projects/eloi_sport.png",
      tech: ["React", "Tailwind CSS", "Docker"],
      github: "https://github.com/BastienLopez/Eloi_Coaching",
      demo: "https://bastienlopez.github.io/Eloi_Coaching/",
    },
    {
      title: "Teams Bot & Mastra Agents",
      description:
        "Développement d’un bot Microsoft Teams intégré à Mastra pour agréger des flux RSS, effectuer une synthèse NLP et fournir des insights propulsés par l’IA. Avec un BOT Teams pour suivre votre veille sur votre sujet voulu.",
  image: "img_projects/bot-conversation-ia.png",
      tech: ["TypeScript", "Azure Bot Framework", "Mastra", "OpenAI API"],
      github: "https://github.com/BastienLopez/Agent_VEILLE_RSS/tree/main",
    },
    {
      title: "Berserk Universe",
      description:
        "Plateforme interactive dédiée à l’univers de *Berserk* de Kentarō Miura. Présente des résumés, analyses de personnages et une carte interactive retraçant les lieux emblématiques du manga.",
  image: "img_projects/berserk.png",
      tech: ["HTML", "CSS", "JS"],
      github: "https://github.com/BastienLopez/Berserk",
      demo: "#",
    },
    {
      title: "Pokémon Binder",
      description:
        "Application web pour gérer sa collection de cartes Pokémon TCG. Permet d’ajouter, classer et visualiser les cartes dans un classeur virtuel, avec recherche avancée et statistiques de collection.",
  image: "img_projects/pokemon_binder.png",
      tech: ["React", "JavaScript", "Python", "HTML / CSS"],
      github: "https://github.com/BastienLopez/Pokemon_binder",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Projets Réalisés
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une sélection de mes réalisations récentes, du frontend au backend
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 flex flex-col h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Image: fixed-height box so all cards keep same size; image scaled to fit without cropping */}
                <div className="relative h-48 md:h-56 lg:h-52 overflow-hidden bg-secondary flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>

                    {project.demo && project.demo !== "#" ? (
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    ) : project.title === "ERP Micro-Crèches" || project.title === "Pokémon Binder" ? (
                      // Show a disabled/placeholder button for 'A venir' on specific projects
                      <Button
                        size="sm"
                        disabled
                        className="flex-1 bg-muted/10 text-muted-foreground cursor-not-allowed"
                      >
                        A venir
                      </Button>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a href="https://github.com/BastienLopez" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                Voir tous les projets sur GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
