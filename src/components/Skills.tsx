import { Brain, Cloud, Code2, Database, Server, Workflow } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import "./Skills.css";

const Skills = () => {
  const { isEnglish } = useLanguage();
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["React", "TypeScript", "Next.js", "JavaScript", "HTML/CSS"],
    },
    {
      title: "Backend & APIs",
      icon: Server,
      skills: ["Node.js", "Python", "FastAPI", "Express", "REST APIs"],
    },
    {
      title: isEnglish ? "Databases" : "Bases de données",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "SQL", "MySQL", "Vector DB"],
    },
    {
      title: isEnglish ? "Automation" : "Automatisation",
      icon: Workflow,
      skills: ["n8n", "Python Scripts", "Workflow Automation", "API Integration"],
    },
    {
      title: isEnglish ? "AI & Machine Learning" : "IA & Machine Learning",
      icon: Brain,
      skills: [
        isEnglish ? "AI agents / Mastra" : "Agents IA / Mastra",
        "PyTorch",
        "TensorFlow",
        "NLP",
        "Reinforcement Learning",
        "CUDA",
      ],
    },
    {
      title: "DevOps & Engineering",
      icon: Cloud,
      skills: ["Docker", "CI/CD", "GitHub Actions", "Git", "Tests / TDD", "Self-hosting / VPS"],
    },
  ];

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 md:py-24 relative section-odd">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 id="skills-title" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
              {isEnglish ? 'Skills & technologies' : 'Compétences & Technologies'}
            </h2>
            <div className="mx-auto mb-7 h-1 w-24 bg-primary" aria-hidden="true"></div>
            <p className="text-base leading-relaxed md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {isEnglish ? 'A focused stack for building robust, maintainable, team-ready business applications, APIs and AI/n8n automations.' : 'Stack ciblée pour construire des applications métier, APIs et automatisations IA/n8n robustes, maintenables et exploitables en équipe.'}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="skills-category"
              >
                <div className="mb-7 flex min-h-10 items-center gap-5">
                  <div className="shrink-0 border-r border-muted-foreground/70 pr-5">
                    <category.icon className="h-8 w-8 text-primary" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-bold leading-tight text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <ul className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-baseline gap-4 text-base leading-relaxed xl:text-lg text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cta" aria-hidden="true"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
