import { useState, useEffect } from "react";
import { ChevronDown, Languages, Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const LanguageSelector = () => {
  const { locale, setLocale, isEnglish } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const selectLanguage = (language: 'fr' | 'en') => {
    setLocale(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 min-w-[92px] items-center justify-between gap-2 rounded-xl border border-primary bg-card px-3 text-sm font-bold text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={isEnglish ? 'Choose language' : 'Choisir la langue'}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>{locale.toUpperCase()}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-[60] mt-2 min-w-full overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xl" role="listbox" aria-label={isEnglish ? 'Available languages' : 'Langues disponibles'}>
          {(['fr', 'en'] as const).filter((language) => language !== locale).map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => selectLanguage(language)}
              className={`flex h-9 w-full items-center justify-center rounded-lg px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              role="option"
              aria-selected={false}
            >
              {language.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isEnglish } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: isEnglish ? "About" : "À propos" },
    { href: "#projects", label: isEnglish ? "Projects" : "Projets" },
    { href: "#skills", label: "Stack" },
    { href: "#freelance", label: isEnglish ? "Services" : "Services" },
    { href: "#devnotes", label: "Dev Notes" },
    { href: "#contact", label: isEnglish ? "Contact" : "Contact" },
  ];

  const socialLinks = [
    { href: "https://github.com/BastienLopez", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/bastien-lopez-fullstack/", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:bastien.lopez40@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Bastien Lopez
          </a>

          {/* Desktop Navigation (centered) */}
          <div className="hidden md:flex items-center gap-8 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
            <Button asChild className="bg-cta hover:bg-cta/90 text-cta-foreground ml-2">
              <a href="#contact">{isEnglish ? 'Contact me' : 'Me contacter'}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? (isEnglish ? "Close menu" : "Fermer le menu") : (isEnglish ? "Open menu" : "Ouvrir le menu")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden py-6 border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col gap-4 px-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors text-center py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                <LanguageSelector />
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <Button asChild className="bg-cta hover:bg-cta/90 text-cta-foreground w-full mt-4">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {isEnglish ? 'Contact me' : 'Me contacter'}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
