import { useState } from 'react';
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allProjects, Project } from '@/data/projects';

type ProjectCategory = Project['category'];
type DisplayProjectCategory = Exclude<ProjectCategory, 'browser'>;
type DisplayProject = Project & { category: DisplayProjectCategory };

const projects = allProjects.filter(
  (project): project is DisplayProject => project.category !== 'browser'
);

const freelanceDisplayOrder = [
  'eloi-coachsteo',
  'ats-filter-resume',
  'luxury-auto-detailing',
  'erp-micro-creches',
  'cledevoute',
];

const freelanceDisplayOrderIndex = new Map(
  freelanceDisplayOrder.map((id, index) => [id, index])
);

const resolveImage = (img?: string | null) => {
  if (!img) return "";
  if (img.startsWith("http") || img.startsWith("data:")) return img;
  const normalized = img.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<DisplayProjectCategory | null>('emploi');
  const [selectedProject, setSelectedProject] = useState<DisplayProject | null>(null);
  const featuredCaseStudies = [
    {
      id: 'erp-micro-creches',
      title: 'ERP Micro-Crèches',
      context: 'Réseau de micro-crèches avec des suivis admin dispersés.',
      need: 'Centraliser les opérations et fiabiliser le pilotage multi-établissements.',
      solution: 'Application métier complète avec back-office, suivi, droits et tableaux de bord.',
      stack: 'React, Node.js, MongoDB, Docker, CI/CD',
      result: 'Process plus lisibles et meilleure maîtrise opérationnelle au quotidien.',
      role: 'Conception, développement full-stack et structuration de la livraison.',
      link: '/Portfolio/cases/erp-micro-creches.html',
    },
    {
      id: 'wallet-provider',
      title: 'Altme Wallet Provider',
      context: "Produit B2B/B2C d'identité numérique conforme eIDAS 2.0.",
      need: 'Garantir interopérabilité, sécurité et standards européens.',
      solution: "Participation à une plateforme wallet avec flux vérifiables et API robustes.",
      stack: 'OIDC4VC, Verifiable Credentials, SSI, APIs',
      result: 'Solution exploitable dans des contextes réglementés et exigeants.',
      role: "Contribution technique sur des briques produit et architecture applicative.",
      link: '/Portfolio/cases/altme-wallet-provider.html',
    },
    {
      id: 'eloi-coachsteo',
      title: 'Eloi CoachSteo',
      context: "Indépendant qui devait clarifier son offre et être visible rapidement.",
      need: "Un site vitrine professionnel, lisible et orienté prise de contact.",
      solution: "Conception d'une one-page moderne, responsive et orientée conversion.",
      stack: 'React, Tailwind CSS',
      result: 'Présence en ligne plus crédible et discours commercial mieux structuré.',
      role: "Design d'interface, intégration front et mise en ligne.",
      link: '/Portfolio/cases/eloi-coachsteo.html',
    },
  ];

  const categoryConfig = {
    emploi: {
      emoji: '💼',
      title: 'PROJETS CLIENTS',
      color: 'from-blue-500 to-cyan-500'
    },
    freelance: {
      emoji: '🚀',
      title: 'MISSIONS FREELANCE',
      color: 'from-purple-500 to-pink-500'
    },
    opensource: {
      emoji: '🌟',
      title: 'OPEN SOURCE',
      color: 'from-green-500 to-emerald-500'
    },
    gaming: {
      emoji: '',
      title: '📱 MOBILE & GAMING 🎮',
      color: 'from-orange-500 to-red-500'
    }
  };

  const filteredProjects = selectedCategory
    ? projects
        .filter(project => project.category === selectedCategory)
        .sort((a, b) => {
          if (selectedCategory !== 'freelance') {
            return 0;
          }

          const aOrder = freelanceDisplayOrderIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER;
          const bOrder = freelanceDisplayOrderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER;
          return aOrder - bOrder;
        })
    : [];

  const handleCategoryClick = (category: DisplayProjectCategory) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedProject(null);
    } else {
      setSelectedCategory(category);
      setSelectedProject(null);
    }
  };

  const handleProjectClick = (project: DisplayProject) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };
  return (
    <section id="projects" className="py-20 px-4 w-full overflow-x-hidden section-even">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12 w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Études de cas et réalisations
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 px-4">
            Projets mis en avant pour illustrer ma façon de résoudre des besoins métier concrets,
            puis accès à l'ensemble des réalisations et explorations.
          </p>
        </div>

        {!selectedProject && (
          <div className="mb-12">
            <div className="mb-5">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">3 projets vitrine pour une mission freelance</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Contexte, besoin, solution et valeur produite, sans chiffres inventés.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredCaseStudies.map((item) => (
                <Card key={item.id} className="p-5 bg-card border-border h-full flex flex-col">
                  <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                  <div className="space-y-2 text-sm text-foreground/80 leading-6 flex-1">
                    <p><span className="text-foreground font-medium">Contexte:</span> {item.context}</p>
                    <p><span className="text-foreground font-medium">Besoin:</span> {item.need}</p>
                    <p><span className="text-foreground font-medium">Solution:</span> {item.solution}</p>
                    <p><span className="text-foreground font-medium">Stack:</span> {item.stack}</p>
                    <p><span className="text-foreground font-medium">Résultat:</span> {item.result}</p>
                    <p><span className="text-foreground font-medium">Mon rôle:</span> {item.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Project Detail View */}
        {selectedProject ? (
          <div className="max-w-4xl mx-auto w-full">
            <Button 
              onClick={handleBackToList}
              variant="outline"
              className="mb-6"
            >
              ← Retour aux projets
            </Button>
            
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {categoryConfig[selectedProject.category].emoji}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {categoryConfig[selectedProject.category].title}
                  </span>
                </div>
                <CardTitle className="text-xl md:text-2xl">{selectedProject.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Project Image */}
                <div className="mb-6">
                  <img
                    src={resolveImage(selectedProject.image)}
                    alt={selectedProject.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 960px"
                    className="w-full rounded-[5px] object-contain max-h-96"
                  />
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Detailed Content */}
                <div 
                  className="prose prose-sm md:prose-lg max-w-none dark:prose-invert
                    prose-headings:font-bold
                    prose-h1:text-3xl prose-h1:mb-6
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
                    prose-p:my-3 prose-p:leading-relaxed
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                    prose-strong:text-primary
                    prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-li:my-0.5 prose-li:list-disc prose-li:ml-6
                    prose-ul:my-3 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-6
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                    [&_ul]:my-3 [&_ul]:space-y-0
                    [&_li]:my-0.5 [&_li]:leading-relaxed">
                  {selectedProject.detailedContent ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedProject.detailedContent }} />
                  ) : (
                    <p className="text-muted-foreground italic">
                      Contenu détaillé du projet à venir...
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  {selectedProject.demo && (
                    <Button
                      asChild
                      size="default"
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Category Buttons */}
            <div className="mb-4 text-center">
              <p className="text-sm text-muted-foreground">
                Une sélection de mes réalisations récentes, du frontend au backend.
              </p>
            </div>
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12 px-2 max-w-5xl mx-auto">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <Button
                  key={key}
                  onClick={() => handleCategoryClick(key as DisplayProjectCategory)}
                  variant={selectedCategory === key ? "default" : "outline"}
                  className={`w-full text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 transition-all ${
                    selectedCategory === key 
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg` 
                      : 'hover:scale-105'
                  }`}
                >
                  <span className="mr-2 text-lg">{config.emoji}</span>
                  <span>{config.title}</span>
                </Button>
              ))}
            </div>

            {/* Projects Grid */}
            {selectedCategory && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in duration-500">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 flex flex-col h-full cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 md:h-56 lg:h-52 overflow-hidden bg-secondary flex items-center justify-center">
                      <img
                        src={resolveImage(project.image)}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="max-w-full max-h-full object-contain rounded-[5px] transition-transform duration-500 group-hover:scale-105"
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
                          variant="outline"
                          size="sm"
                          className="flex-1 border-primary text-primary hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}
                        >
                          En savoir plus
                        </Button>

                        {project.demo && (
                          <Button
                            asChild
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA - Only show when not in detail view */}
        {!selectedProject && !selectedCategory && (
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
        )}
      </div>
    </section>
  );
};

export default Projects;
