import { Heart, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { isEnglish } = useLanguage();

  const footerLinks = isEnglish
    ? [{ href: "#about", label: "About" }, { href: "#skills", label: "Skills" }, { href: "#projects", label: "Projects" }, { href: "#contact", label: "Contact" }]
    : [{ href: "#about", label: "À propos" }, { href: "#skills", label: "Compétences" }, { href: "#projects", label: "Projets" }, { href: "#contact", label: "Contact" }];

  const socialLinks = [
    { href: "https://github.com/BastienLopez", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/bastien-lopez-fullstack/", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:bastien.lopez40@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container mx-auto w-full px-4 py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl">
          {/* Main Footer Content */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,1fr)] md:gap-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Bastien Lopez
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEnglish ? 'Full-stack AI & automation developer: business applications, internal APIs and maintainable workflows.' : 'Développeur full-stack IA & automatisation : applications métier, APIs internes et workflows maintenables.'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{isEnglish ? 'Navigate' : 'Navigation'}</h4>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-3" aria-label={isEnglish ? 'Footer navigation' : 'Navigation de pied de page'}>
                {footerLinks.map((link) => (
                  <a key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{isEnglish ? 'Follow me' : 'Me suivre'}</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {isEnglish ? 'Available for remote/full-remote permanent roles or focused freelance engagements.' : 'Disponible pour un CDI remote/full remote ou des missions freelance ciblées'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
