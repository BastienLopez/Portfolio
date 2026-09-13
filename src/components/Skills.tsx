import { Code2, Database, Server, Cloud, GitBranch, Blocks, Brain, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";

const Skills = () => {
  const { isEnglish } = useLanguage();
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["React", "TypeScript", "Next.js", "JavaScript", "HTML5 / CSS3", "Webflow"],
    },
    {
      title: "Backend & APIs",
      icon: Server,
      skills: ["Node.js", "Python", "FastAPI", "Express", "REST APIs", "Web3"],
    },
    {
      title: isEnglish ? "Databases" : "Bases de données",
      icon: Database,
      skills: ["MongoDB", "PostgreSQL", "SQL", "MySQL", "Vector DB"],
    },
    {
      title: isEnglish ? "AI & Machine Learning" : "IA & Machine Learning",
      icon: Brain,
      skills: [isEnglish ? "AI agents / Mastra" : "Agents IA / Mastra", "TensorFlow", "PyTorch", "CUDA", "Reinforcement Learning", "NLP"],
    },
    {
      title: isEnglish ? "Automation" : "Automatisation",
      icon: Workflow,
      skills: ["n8n", "Python Scripts", "JavaScript/Node.js", "Workflow Automation", "API Integration"],
    },
    {
      title: "DevOps",
      icon: Cloud,
      skills: ["Docker", "CI/CD", "GitHub Actions", isEnglish ? "Self-hosting" : "Auto-hébergement", isEnglish ? "Static VPS hosting" : "Hébergement statique sur VPS"],
    },
    {
      title: isEnglish ? "Git & documentation" : "Git & documentation",
      icon: GitBranch,
      skills: ["Git", "GitHub", "Code Review", "Branching", "GitBook"],
    },
    {
      title: isEnglish ? "Architecture & quality" : "Architecture & qualité",
      icon: Blocks,
      skills: ["Microservices", "Clean Code", "Design Patterns", isEnglish ? "TDD / Testing" : "TDD / tests"],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative section-odd">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {isEnglish ? 'Skills & technologies' : 'Compétences & Technologies'}
            </h2>
            <div className="mx-auto mb-6 h-1 w-20 bg-primary"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isEnglish ? 'A focused stack for building robust, maintainable, team-ready business applications, APIs and AI/n8n automations.' : 'Stack ciblée pour construire des applications métier, APIs et automatisations IA/n8n robustes, maintenables et exploitables en équipe.'}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <Card
                key={category.title}
                className="border-border bg-transparent p-5 shadow-none transition-colors duration-200 hover:border-primary/60 md:p-6"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/50">
                    <category.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {category.title}
                    </h3>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-cta" aria-hidden="true"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
