import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { isEnglish } = useLanguage();

  const socialLinks = [
    { href: "https://github.com/BastienLopez", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/bastien-lopez-fullstack/", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:bastien.lopez40@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container mx-auto w-full px-2 py-4 lg:py-5">
        <div className="mx-auto w-full max-w-6xl">
          {/* Main Footer Content */}
          <div className="grid gap-4 lg:grid-cols-3 lg:items-center lg:gap-0">
            {/* Brand */}
            <div className="min-w-0 text-center lg:pr-12 lg:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Bastien Lopez
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEnglish ? (
                  'Websites, business applications, internal APIs and maintainable workflows.'
                ) : (
                  <>
                    <span className="block">Site internet, applications métier,</span>
                    <span className="block">APIs internes et workflows.</span>
                  </>
                )}
              </p>
            </div>
            {/* Social */}
            <div className="min-w-0 text-center lg:border-x lg:border-border lg:px-12">
              <h4 className="font-semibold text-foreground mb-4">{isEnglish ? 'Follow me' : 'Me suivre'}</h4>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            {/* Availability */}
            <div className="min-w-0 text-center lg:pl-12 lg:text-left">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {isEnglish ? 'Available for remote/full-remote permanent roles or focused freelance engagements.' : 'Disponible pour un CDI remote/full remote ou des missions freelance ciblées'}
              </p>
              <Link
                to="/mentions-legales"
                className="mt-2 inline-block text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {isEnglish ? "Legal notice" : "Mentions légales"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
