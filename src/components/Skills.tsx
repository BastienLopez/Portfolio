import { Code2, Database, Server, Cloud, GitBranch, Blocks, Brain, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";

const Skills = () => {
  const { isEnglish } = useLanguage();
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      color: "text-primary",
      skills: ["React", "TypeScript", "Next.js", "JavaScript", "HTML5 / CSS3", "Webflow"],
    },
    {
      title: "Backend & APIs",
      icon: Server,
      color: "text-accent",
      skills: ["Node.js", "Python", "FastAPI", "Express", "REST APIs"],
    },
    {
      title: isEnglish ? "Databases" : "Bases de données",
      icon: Database,
      color: "text-cta",
      skills: ["MongoDB", "PostgreSQL", "SQL", "MySQL", "Vector DB"],
    },
    {
      title: isEnglish ? "AI & Machine Learning" : "IA & Machine Learning",
      icon: Brain,
      color: "text-primary",
      skills: ["Agents IA / Mastra", "TensorFlow", "PyTorch", "CUDA", "Reinforcement Learning", "NLP"],
    },
    {
      title: isEnglish ? "Automation" : "Automatisation",
      icon: Workflow,
      color: "text-accent",
      skills: ["n8n", "Python Scripts", "JavaScript/Node.js", "Workflow Automation", "API Integration"],
    },
    {
      title: "DevOps",
      icon: Cloud,
      color: "text-cta",
      skills: ["Docker", "CI/CD", "GitHub Actions", "Self Hosting", "GitHub Pages"],
    },
    {
      title: isEnglish ? "Git & documentation" : "Git & documentation",
      icon: GitBranch,
      color: "text-primary",
      skills: ["Git", "GitHub", "Code Review", "Branching", "GitBook", "Docusaurus"],
    },
    {
      title: isEnglish ? "Architecture & quality" : "Architecture & qualité",
      icon: Blocks,
      color: "text-accent",
      skills: ["Microservices", "Clean Code", "Design Patterns", "TDD / Testing"],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative bg-secondary/30 section-even">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {isEnglish ? 'Skills & technologies' : 'Compétences & Technologies'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isEnglish ? 'A focused stack for building robust, maintainable, team-ready business applications, APIs and AI/n8n automations.' : 'Stack ciblée pour construire des applications métier, APIs et automatisations IA/n8n robustes, maintenables et exploitables en équipe.'}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <category.icon className={`w-6 h-6 ${category.color}`} />
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
                      className="text-sm text-muted-foreground flex items-center gap-2 group-hover:text-foreground transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isEnglish ? "Other experience: Web3" : "Autre expérience : Web3"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
