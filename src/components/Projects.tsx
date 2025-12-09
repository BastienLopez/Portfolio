import { useState, type ComponentType } from 'react';
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allProjects, Project } from '@/data/projects';

const projects = allProjects;

type ProjectCategory = Project['category'];
type BrowserGameId =
  | 'browser-snake'
  | 'browser-2048'
  | 'browser-flappy'
  | 'browser-memory'
  | 'browser-breakout'
  | 'browser-tetris';
type BrowserGameComponent = ComponentType<Record<string, never>>;
type BrowserGameLoader = () => Promise<{ default: BrowserGameComponent }>;

const browserGameLoaders: Record<BrowserGameId, BrowserGameLoader> = {
  'browser-snake': () => import('@/games/SnakeGame'),
  'browser-2048': () => import('@/games/Game2048'),
  'browser-flappy': () => import('@/games/FlappyGithubGame'),
  'browser-memory': () => import('@/games/MemoryGame'),
  'browser-breakout': () => import('@/games/BreakoutGame'),
  'browser-tetris': () => import('@/games/TetrisGame'),
};

const browserGameGuides: Record<BrowserGameId, { controls: string; goal: string }> = {
  'browser-snake': {
    controls: 'Fleches clavier pour changer la direction. Pause/Rejouer via le bouton sous le canvas.',
    goal: 'Attraper un maximum de pommes sans se mordre ni toucher les murs.',
  },
  'browser-2048': {
    controls: 'Fleches clavier pour glisser la grille. Un mouvement valide ajoute une nouvelle tuile.',
    goal: 'Fusionner les tuiles pour atteindre 2048 et optimiser le score.',
  },
  'browser-flappy': {
    controls: 'Clique gauche ou tap sur le canvas pour faire battre le logo GitHub.',
    goal: 'Eviter les tuyaux Mario et depasser votre high score.',
  },
  'browser-memory': {
    controls: 'Clique sur deux cartes pour reveler une paire. Continue jusqu a tout memoriser.',
    goal: 'Terminer la grille en un minimum de coups.',
  },
  'browser-breakout': {
    controls: 'Utilise les fleches gauche/droite pour deplacer la raquette. Barre espace lance la balle.',
    goal: 'Detruire toutes les briques sans perdre tes trois vies.',
  },
  'browser-tetris': {
    controls: 'Fleches gauche/droite pour bouger, haut pour tourner, bas pour accelerer, espace pour drop.',
    goal: 'Empile les tetrominos et efface un maximum de lignes.',
  },
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>('emploi');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGameProject, setActiveGameProject] = useState<Project | null>(null);
  const [GameComponent, setGameComponent] = useState<BrowserGameComponent | null>(null);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [gameError, setGameError] = useState<string | null>(null);
  const [gameInstance, setGameInstance] = useState(0);
  const [hasLaunchedGame, setHasLaunchedGame] = useState(false);
  const activeGameGuide = activeGameProject
    ? browserGameGuides[activeGameProject.id as BrowserGameId]
    : null;

  const categoryConfig = {
    emploi: {
      emoji: '💼',
      title: 'EMPLOIS',
      color: 'from-blue-500 to-cyan-500'
    },
    freelance: {
      emoji: '🚀',
      title: 'FREELANCE',
      color: 'from-purple-500 to-pink-500'
    },
    opensource: {
      emoji: '🌟',
      title: 'OPENSOURCE',
      color: 'from-green-500 to-emerald-500'
    },
    gaming: {
      emoji: '🎮',
      title: 'GAMING',
      color: 'from-orange-500 to-red-500'
    },
    browser: {
      emoji: '🕹️',
      title: 'JEUX NAVIGATEUR',
      color: 'from-amber-500 to-rose-500'
    }
  };

  const filteredProjects = selectedCategory 
    ? projects.filter(project => project.category === selectedCategory)
    : [];

  const handleCategoryClick = (category: ProjectCategory) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedProject(null);
      setActiveGameProject(null);
      setGameComponent(null);
      setGameError(null);
      setIsGameLoading(false);
      setHasLaunchedGame(false);
    } else {
      setSelectedCategory(category);
      setSelectedProject(null);
      setActiveGameProject(null);
      setGameComponent(null);
      setGameError(null);
      setIsGameLoading(false);
      setHasLaunchedGame(false);
    }
  };

  const handleProjectClick = (project: Project) => {
    if (project.category === 'browser') {
      setActiveGameProject(project);
      setSelectedProject(null);
      setGameComponent(null);
      setGameError(null);
      setIsGameLoading(false);
      setHasLaunchedGame(false);
      setGameInstance((prev) => prev + 1);
      return;
    }
    setActiveGameProject(null);
    setGameComponent(null);
    setHasLaunchedGame(false);
    setSelectedProject(project);
  };

  const loadBrowserGame = async (project: Project) => {
    setGameError(null);
    setIsGameLoading(true);
    setGameComponent(null);
    setGameInstance((prev) => prev + 1);
    setHasLaunchedGame(false);

    const loader = browserGameLoaders[project.id as BrowserGameId];

    if (!loader) {
      setIsGameLoading(false);
      setGameError('Jeu non disponible pour cette carte.');
      return;
    }

    try {
      const module = await loader();
      setGameComponent(() => module.default);
      setHasLaunchedGame(true);
    } catch (err) {
      console.error(err);
      setGameError('Chargement impossible. Veuillez reessayer.');
    } finally {
      setIsGameLoading(false);
    }
  };

  const handleCloseGame = () => {
    setActiveGameProject(null);
    setGameComponent(null);
    setGameError(null);
    setIsGameLoading(false);
    setHasLaunchedGame(false);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const handleLaunchGame = () => {
    if (!activeGameProject) {
      return;
    }
    void loadBrowserGame(activeGameProject);
  };

  return (
    <section id="projects" className="py-20 px-4 w-full overflow-x-hidden">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12 w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projets Réalisés
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 px-4">
            Une sélection de mes réalisations récentes, du frontend au backend
          </p>
          

        </div>

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
                    src={selectedProject.image}
                    alt={selectedProject.title}
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
                  {selectedProject.github && (
                    <Button
                      asChild
                      variant="outline"
                      size="default"
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                    >
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}

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
        ) : activeGameProject ? (
          <div className="max-w-4xl mx-auto w-full">
            <Button
              onClick={handleCloseGame}
              variant="outline"
              className="mb-6"
            >
              ← Retour aux jeux
            </Button>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {categoryConfig.browser.emoji}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {categoryConfig.browser.title}
                  </span>
                </div>
                <CardTitle className="text-xl md:text-2xl">{activeGameProject.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeGameProject.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeGameProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {activeGameGuide && (
                  <div className="mb-6 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-sm">
                    <p className="font-semibold text-foreground mb-2">Comment jouer</p>
                    <p className="text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">Controle :</span> {activeGameGuide.controls}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Objectif :</span> {activeGameGuide.goal}
                    </p>
                  </div>
                )}

                <div className="mb-6 flex flex-col gap-3">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent text-white w-full py-4 text-base"
                    onClick={handleLaunchGame}
                    disabled={isGameLoading || !activeGameProject}
                  >
                    {hasLaunchedGame ? 'Relancer le jeu' : 'Lancer le jeu'}
                  </Button>
                  {hasLaunchedGame && (
                    <span className="text-xs uppercase tracking-wider text-emerald-400">
                      Jeu actif
                    </span>
                  )}
                </div>

                {gameError && (
                  <div className="mb-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {gameError}
                  </div>
                )}

                {isGameLoading && (
                  <div className="mb-4 text-sm text-muted-foreground">
                    Chargement du jeu en cours...
                  </div>
                )}

                {GameComponent && hasLaunchedGame && !isGameLoading && !gameError && (
                  <div className="rounded-lg border bg-background p-2 md:p-4">
                    <GameComponent key={`${activeGameProject.id}-${gameInstance}`} />
                  </div>
                )}

                {!hasLaunchedGame && !isGameLoading && !gameError && (
                  <p className="text-sm text-muted-foreground">
                    Cliquez sur lancer pour charger le jeu choisi.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Category Buttons */}
            <div className="w-full flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-12 px-2">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <Button
                  key={key}
                  onClick={() => handleCategoryClick(key as ProjectCategory)}
                  variant={selectedCategory === key ? "default" : "outline"}
                  className={`w-full sm:w-auto text-sm md:text-base lg:text-lg px-4 md:px-5 lg:px-6 py-4 md:py-4 lg:py-5 transition-all ${
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
                        src={project.image}
                        alt={project.title}
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
                          {project.category === 'browser' ? 'Jouer' : 'En savoir plus'}
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
