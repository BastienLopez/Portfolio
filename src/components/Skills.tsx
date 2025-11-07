import { Code2, Database, Server, Cloud, GitBranch, Blocks, Brain, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      color: "text-primary",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML5/CSS3"],
    },
    {
      title: "Backend",
      icon: Server,
      color: "text-accent",
      skills: ["Node.js", "Python", "FastAPI", "Express", "REST APIs"],
    },
    {
      title: "Database",
      icon: Database,
      color: "text-cta",
      skills: ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Supabase"],
    },
    {
      title: "IA & Machine Learning",
      icon: Brain,
      color: "text-primary",
      skills: ["Python", "TensorFlow", "PyTorch", "Vector DB", "Mastra Agent Framework"],
    },
    {
      title: "Automatisation",
      icon: Workflow,
      color: "text-accent",
      skills: ["n8n", "Python Scripts", "JavaScript/Node.js", "Workflow Automation", "API Integration"],
    },
    {
      title: "DevOps",
      icon: Cloud,
      color: "text-cta",
      skills: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "AWS"],
    },
    {
      title: "Version Control",
      icon: GitBranch,
      color: "text-primary",
      skills: ["Git", "GitHub", "GitLab", "Code Review", "Branching"],
    },
    {
      title: "Architecture",
      icon: Blocks,
      color: "text-accent",
      skills: ["Microservices", "Web3", "Clean Code", "Design Patterns", "Testing"],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Compétences & Technologies
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un éventail complet de technologies modernes pour construire des solutions performantes
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

          {/* Tools & Technologies badges */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
              Outils & Frameworks
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "VS Code",
                "Postman",
                "Figma",
                "Linux",
                "Nginx",
                "Jest",
                "Playwright",
                "Vite",
                "Webpack",
                "ESLint",
                "Prettier",
                "npm/yarn",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 bg-muted/50 border border-border rounded-full text-sm font-medium hover:border-primary hover:bg-primary/10 transition-all"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
