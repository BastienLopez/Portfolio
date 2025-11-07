import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Plateforme complète avec panier, paiements Stripe, gestion des stocks et dashboard admin. Architecture microservices avec cache Redis.",
      image: "/placeholder.svg",
      tech: ["React", "Node.js", "MongoDB", "Docker", "Stripe"],
      github: "https://github.com/BastienLopez",
      demo: "#",
    },
    {
      title: "Task Management App",
      description: "Application de gestion de tâches collaborative avec real-time updates, authentification JWT et notifications push.",
      image: "/placeholder.svg",
      tech: ["TypeScript", "FastAPI", "PostgreSQL", "WebSocket"],
      github: "https://github.com/BastienLopez",
      demo: "#",
    },
    {
      title: "AI Content Generator",
      description: "Générateur de contenu IA utilisant GPT-4 avec interface intuitive, historique des générations et export multi-formats.",
      image: "/placeholder.svg",
      tech: ["Next.js", "Python", "OpenAI", "Tailwind"],
      github: "https://github.com/BastienLopez",
      demo: "#",
    },
    {
      title: "Web3 NFT Marketplace",
      description: "Marketplace décentralisée pour NFTs avec smart contracts Solidity, wallet integration et système d'enchères.",
      image: "/placeholder.svg",
      tech: ["React", "Solidity", "Ethers.js", "IPFS"],
      github: "https://github.com/BastienLopez",
      demo: "#",
    },
    {
      title: "DevOps Dashboard",
      description: "Tableau de bord de monitoring avec métriques temps réel, alertes automatiques et visualisation de logs distribuées.",
      image: "/placeholder.svg",
      tech: ["Vue.js", "Go", "Prometheus", "Grafana"],
      github: "https://github.com/BastienLopez",
      demo: "#",
    },
    {
      title: "Social Media Analytics",
      description: "Outil d'analyse de réseaux sociaux avec scraping éthique, traitement big data et rapports détaillés.",
      image: "/placeholder.svg",
      tech: ["Python", "Pandas", "React", "D3.js"],
      github: "https://github.com/BastienLopez",
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
                className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
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
