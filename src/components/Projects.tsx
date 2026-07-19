import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allProjects, Project } from '@/data/projects';
import { useLanguage } from '@/lib/i18n';

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
  const { isEnglish } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<DisplayProjectCategory | null>('emploi');
  const [selectedProject, setSelectedProject] = useState<DisplayProject | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const projectDetailRef = useRef<HTMLDivElement | null>(null);
  const galleryViewerRef = useRef<HTMLDivElement | null>(null);
  const localizeProject = (project: DisplayProject) => (
    isEnglish && project.translations?.en ? { ...project, ...project.translations.en } : project
  );
  const featuredCaseStudies = isEnglish ? [
    {
      id: 'erp-micro-creches', title: 'Micro-nursery ERP', context: 'A network of micro-nurseries with administration spread across multiple tools.', need: 'Centralise operations and make multi-site management more reliable.', solution: 'A complete business application with back office, tracking, permissions and dashboards.', stack: 'React, Node.js, MongoDB, Docker, CI/CD', result: 'Clearer processes and better day-to-day operational control.', role: 'Full-stack design and development, plus delivery structuring.', link: '/Portfolio/cases/erp-micro-creches.html',
    },
    {
      id: 'teams-bot-mastra', title: 'Teams Bot & Mastra Agents', context: 'Technology monitoring to centralise within the team communication tool.', need: 'Collect sources and make information usable without scattered manual monitoring.', solution: 'RSS workflow → AI/Mastra summaries → Microsoft Teams → targeted alerts.', stack: 'TypeScript, Azure Bot Framework, Mastra, OpenAI API', result: 'Centralised monitoring and faster notifications on tracked topics.', role: 'Workflow design, Teams integration and bot development.',
    },
    {
      id: 'ats-filter-resume', title: 'ATS Filter Resume', context: 'Applications are filtered by ATS systems before human review.', need: 'Make ATS compatibility recommendations understandable and actionable.', solution: 'A full-stack CV analysis application, with or without a job posting.', stack: 'Next.js, TypeScript, Vitest, Playwright, Docker', result: 'An explainable ATS diagnosis, without promising recruitment outcomes.', role: 'Application design and development, analysis logic and testing.',
    },
  ] : [
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
      id: 'teams-bot-mastra',
      title: 'Teams Bot & Mastra Agents',
      context: "Veille à centraliser dans l'outil de communication des équipes.",
      need: "Collecter les sources et rendre l'information exploitable sans veille manuelle dispersée.",
      solution: "Workflow RSS → synthèse IA/Mastra → Microsoft Teams → alertes ciblées.",
      stack: 'TypeScript, Azure Bot Framework, Mastra, OpenAI API',
      result: 'Veille centralisée et notifications plus rapides sur les sujets suivis.',
      role: "Conception du workflow, intégration Teams et développement du bot.",
    },
    {
      id: 'ats-filter-resume',
      title: 'ATS Filter Resume',
      context: 'Candidatures filtrées par des systèmes ATS avant lecture humaine.',
      need: 'Rendre les recommandations de compatibilité ATS compréhensibles et actionnables.',
      solution: "Application full-stack d'analyse de CV, avec ou sans offre d'emploi.",
      stack: 'Next.js, TypeScript, Vitest, Playwright, Docker',
      result: 'Diagnostic ATS explicable, sans promesse de résultat de recrutement.',
      role: "Conception et développement de l'application, de la logique d'analyse et des tests.",
    },
  ];

  const categoryConfig = {
    emploi: {
      emoji: '💼',
      title: isEnglish ? 'CLIENT PROJECTS' : 'PROJETS CLIENTS',
      color: 'from-blue-500 to-cyan-500'
    },
    freelance: {
      emoji: '🚀',
      title: isEnglish ? 'FREELANCE PROJECTS' : 'MISSIONS FREELANCE',
      color: 'from-purple-500 to-pink-500'
    },
    opensource: {
      emoji: '🌟',
      title: 'OPEN SOURCE',
      color: 'from-green-500 to-emerald-500'
    },
    gaming: {
      emoji: '🎮',
      title: 'GAMING / MOBILE',
      color: 'from-orange-500 to-red-500'
    }
  };

  const categoryLabels: Record<DisplayProjectCategory, string> = {
    emploi: isEnglish ? 'CLIENT PROJECTS' : 'PROJETS CLIENTS',
    freelance: isEnglish ? 'FREELANCE PROJECTS' : 'MISSIONS FREELANCE',
    opensource: 'OPEN SOURCE',
    gaming: 'GAMING / MOBILE',
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
    setActiveGalleryIndex(null);
  };

  const localizedSelectedProject = selectedProject ? localizeProject(selectedProject) : null;
  const galleryImages = localizedSelectedProject?.gallery?.filter((image) => image !== localizedSelectedProject.image) ?? [];

  const showPreviousImage = () => {
    setActiveGalleryIndex((index) => index === null ? null : (index - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextImage = () => {
    setActiveGalleryIndex((index) => index === null ? null : (index + 1) % galleryImages.length);
  };

  const isGalleryViewerOpen = activeGalleryIndex !== null;

  useEffect(() => {
    if (!selectedProject) return;

    const scrollTimer = window.setTimeout(() => {
      projectDetailRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 0);

    return () => window.clearTimeout(scrollTimer);
  }, [selectedProject]);

  useEffect(() => {
    if (!isGalleryViewerOpen) return;

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      galleryViewerRef.current?.querySelector<HTMLButtonElement>('[data-gallery-close]')?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveGalleryIndex(null);
      if (event.key === 'ArrowLeft') {
        setActiveGalleryIndex((index) => index === null ? null : (index - 1 + galleryImages.length) % galleryImages.length);
      }
      if (event.key === 'ArrowRight') {
        setActiveGalleryIndex((index) => index === null ? null : (index + 1) % galleryImages.length);
      }
      if (event.key === 'Tab') {
        const focusableElements = galleryViewerRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])');
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isGalleryViewerOpen, galleryImages.length]);

  return (
    <section id="projects" className="py-20 px-4 w-full overflow-x-hidden section-even">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12 w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isEnglish ? 'Case studies & work' : 'Études de cas et réalisations'}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 px-4">
            {isEnglish ? 'Business applications, APIs, AI workflows and automations: a selection of concrete projects, followed by access to all work and explorations.' : "Applications métier, APIs, workflows IA et automatisations : une sélection de projets concrets, puis accès à l'ensemble des réalisations et explorations."}
          </p>
        </div>

        {!selectedProject && (
          <div className="mb-12">
            <div className="mb-5">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{isEnglish ? '3 key projects' : '3 projets clés'}</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {isEnglish ? 'Context, need, role, solution and value delivered — for a role or a client project.' : 'Contexte, besoin, rôle, solution et valeur produite — pour un recrutement comme pour une mission.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredCaseStudies.map((item) => (
                <Card key={item.id} className="p-5 bg-card border-border h-full flex flex-col">
                  <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                  <div className="space-y-2 text-sm text-foreground/80 leading-6 flex-1">
                    <p><span className="text-foreground font-medium">{isEnglish ? 'Context:' : 'Contexte:'}</span> {item.context}</p>
                    <p><span className="text-foreground font-medium">{isEnglish ? 'Need:' : 'Besoin:'}</span> {item.need}</p>
                    <p><span className="text-foreground font-medium">{isEnglish ? 'Solution:' : 'Solution:'}</span> {item.solution}</p>
                    <p><span className="text-foreground font-medium">Stack:</span> {item.stack}</p>
                    <p><span className="text-foreground font-medium">{isEnglish ? 'Result:' : 'Résultat:'}</span> {item.result}</p>
                    <p><span className="text-foreground font-medium">{isEnglish ? 'My role:' : 'Mon rôle:'}</span> {item.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Project Detail View */}
        {localizedSelectedProject ? (
          <div ref={projectDetailRef} className="max-w-4xl mx-auto w-full scroll-mt-28">
            <Button 
              onClick={handleBackToList}
              variant="outline"
              className="mb-6"
            >
              ← {isEnglish ? 'Back to projects' : 'Retour aux projets'}
            </Button>
            
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {categoryConfig[localizedSelectedProject.category].emoji}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {categoryLabels[localizedSelectedProject.category]}
                  </span>
                </div>
              <CardTitle className="text-xl md:text-2xl">{localizedSelectedProject.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Project Image */}
                <div className="mb-6">
                  <img
                    src={resolveImage(localizedSelectedProject.image)}
                    alt={localizedSelectedProject.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 960px"
                    className="w-full rounded-[5px] object-contain max-h-96"
                  />
                </div>

                {galleryImages.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">{isEnglish ? 'Project screenshots' : 'Captures du projet'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {galleryImages.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setActiveGalleryIndex(index)}
                          className="group relative overflow-hidden rounded-[5px] border border-border bg-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={`${isEnglish ? 'Open' : 'Ouvrir'} ${isEnglish ? 'screenshot' : 'la capture'} ${index + 1}`}
                        >
                          <img
                            src={resolveImage(image)}
                            alt={`${localizedSelectedProject.title} — ${isEnglish ? 'screenshot' : 'capture'} ${index + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <span className="absolute inset-x-0 bottom-0 bg-background/80 px-3 py-2 text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                            {isEnglish ? 'Open full screen' : 'Agrandir la capture'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {localizedSelectedProject.tech.map((tech) => (
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
                  {localizedSelectedProject.detailedContent ? (
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(localizedSelectedProject.detailedContent) }} />
                  ) : (
                    <p className="text-muted-foreground italic">
                      {isEnglish ? 'Detailed project content coming soon...' : 'Contenu détaillé du projet à venir...'}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {localizedSelectedProject.github && (
                    <Button asChild size="default" variant="outline" className="flex-1 min-w-40 border-primary text-primary hover:bg-primary/10">
                      <a href={localizedSelectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        {isEnglish ? 'Source code' : 'Code source'}
                      </a>
                    </Button>
                  )}
                  {localizedSelectedProject.demo && (
                    <Button
                      asChild
                      size="default"
                      className="flex-1 min-w-40 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      <a href={localizedSelectedProject.demo} target="_blank" rel="noopener noreferrer">
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
                {isEnglish ? 'A selection of recent work, from frontend to backend.' : 'Une sélection de mes réalisations récentes, du frontend au backend.'}
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
                  <span>{categoryLabels[key as DisplayProjectCategory]}</span>
                </Button>
              ))}
            </div>

            {/* Projects Grid */}
            {selectedCategory && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in duration-500">
                {filteredProjects.map((project) => {
                  const localizedProject = localizeProject(project);

                  return (
                  <Card
                    key={project.id}
                    className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 flex flex-col h-full"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 md:h-56 lg:h-52 overflow-hidden bg-secondary flex items-center justify-center">
                      <img
                        src={resolveImage(project.image)}
                        alt={localizedProject.title}
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
                        {localizedProject.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {localizedProject.description}
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
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 min-w-32 border-primary text-primary hover:bg-primary/10"
                          onClick={() => handleProjectClick(project)}
                        >
                          {isEnglish ? 'Learn more' : 'En savoir plus'}
                        </Button>

                        {project.demo && (
                          <Button
                            asChild
                            size="sm"
                            className="flex-1 min-w-32 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {project.github && (
                          <Button asChild size="sm" variant="outline" className="flex-1 min-w-32 border-primary text-primary hover:bg-primary/10">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                  );
                })}
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
                {isEnglish ? 'View all projects on GitHub' : 'Voir tous les projets sur GitHub'}
              </a>
            </Button>
          </div>
        )}

        {activeGalleryIndex !== null && galleryImages[activeGalleryIndex] && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={isEnglish ? 'Project screenshot viewer' : 'Visionneuse de captures du projet'}
            onClick={() => setActiveGalleryIndex(null)}
          >
            <div ref={galleryViewerRef} className="relative flex h-full w-full max-w-7xl items-center justify-center px-14 sm:px-20" onClick={(event) => event.stopPropagation()}>
              <img
                src={resolveImage(galleryImages[activeGalleryIndex])}
                alt={`${localizedSelectedProject?.title ?? 'Projet'} — ${isEnglish ? 'screenshot' : 'capture'} ${activeGalleryIndex + 1}`}
                className="max-h-[85vh] max-w-full rounded-lg border border-border bg-card object-contain shadow-2xl"
              />
              <button data-gallery-close type="button" onClick={() => setActiveGalleryIndex(null)} className="absolute right-0 top-0 rounded-full border border-border bg-card p-2 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={isEnglish ? 'Close viewer' : 'Fermer la visionneuse'}>
                <X className="h-5 w-5" />
              </button>
              {galleryImages.length > 1 && (
                <>
                  <button type="button" onClick={showPreviousImage} className="absolute left-1 rounded-full border border-border bg-card p-3 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:left-4" aria-label={isEnglish ? 'Previous screenshot' : 'Capture précédente'}>
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button type="button" onClick={showNextImage} className="absolute right-1 rounded-full border border-border bg-card p-3 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-4" aria-label={isEnglish ? 'Next screenshot' : 'Capture suivante'}>
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              <p className="absolute bottom-0 rounded-full bg-card px-3 py-1.5 text-xs text-muted-foreground">
                {activeGalleryIndex + 1} / {galleryImages.length} · {isEnglish ? 'Use ← → or Esc' : 'Utilisez ← → ou Échap'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
