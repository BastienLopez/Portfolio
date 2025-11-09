import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const About = () => {
  const stats = [
    { label: "Années d'expérience", value: "5+" },
    { label: "Projets complétés", value: "30+" },
    { label: "Technologies maîtrisées", value: "15+" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              À propos de moi
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Bio */}
            <div className="space-y-6 animate-slide-in">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Développeur full stack passionné, je transforme des idées en applications web robustes et élégantes.
                Avec une expertise approfondie en <span className="text-primary font-semibold">Python</span> et{" "}
                <span className="text-accent font-semibold">JavaScript</span>, je maîtrise l'ensemble du cycle de développement.
                Travaillant en <strong>full remote</strong>,<strong>bilingue en anglais</strong> et collabore
                avec des équipes internationales.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mon expérience couvre le développement frontend moderne avec <span className="text-primary font-semibold">React</span>, les architectures backend
                avec <span className="text-accent font-semibold">Node.js</span> et <span className="text-accent font-semibold">FastAPI</span>, ainsi que le déploiement avec{" "}
                <span className="text-primary font-semibold">Docker</span>. Adepte des pratiques DevOps et de l'intégration
                continue, je construis des solutions scalables et maintenables.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Passionné par l'<span className="text-primary font-semibold">IA et le Machine Learning</span> (TensorFlow, PyTorch, Vector DB), 
                je développe également des solutions d'<strong>automatisation</strong> avec <span className="text-accent font-semibold">n8n</span> et <span className="text-primary font-semibold">Python</span>.
                Curieux des technologies émergentes comme le <span className="text-accent font-semibold">Web3</span>, mon approche combine rigueur technique 
                et créativité pour livrer des produits exceptionnels.
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <a href="https://github.com/BastienLopez" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  <a href="https://www.linkedin.com/in/bastien-lopez-fullstack/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-muted-foreground hover:border-foreground">
                  <a href="https://BastienLopez.github.io/Portfolio/CV_LOPEZ_BASTIEN_FREELANCE.pdf" download>
                    <FileText className="w-4 h-4 mr-2" />
                    Voir mon CV
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Stats Cards */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Contact card */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Disponible pour</p>
                    <p className="text-lg font-semibold text-foreground">Nouveaux projets freelance 🚀</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
