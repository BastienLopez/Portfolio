import { lazy } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage, usePageMetadata } from "@/lib/i18n";

const FreelanceServices = lazy(() => import("@/components/Freelance"));
const Projects = lazy(() => import("@/components/Projects"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FreelanceFaq = lazy(() => import("@/components/FreelanceFaq"));
const Contact = lazy(() => import("@/components/Contact"));

const freelanceSchema = (isEnglish: boolean) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://bastienlopez.fr/freelance#webpage",
      "url": "https://bastienlopez.fr/freelance",
      "name": isEnglish
        ? "Freelance — Web development, AI and automation | Bastien Lopez"
        : "Freelance — Développement web, IA et automatisation | Bastien Lopez",
      "description": isEnglish
        ? "Websites, business applications, internal APIs, AI workflows and n8n automation for focused freelance engagements."
        : "Sites internet, applications métier, APIs internes, workflows IA et automatisations n8n pour des missions freelance ciblées.",
      "inLanguage": isEnglish ? "en-US" : "fr-FR",
      "isPartOf": { "@id": "https://bastienlopez.fr/#website" },
      "about": { "@id": "https://bastienlopez.fr/#person" },
      "mainEntity": { "@id": "https://bastienlopez.fr/freelance#service" },
    },
    {
      "@type": "Service",
      "@id": "https://bastienlopez.fr/freelance#service",
      "name": isEnglish ? "Bastien Lopez freelance services" : "Services freelance de Bastien Lopez",
      "provider": { "@id": "https://bastienlopez.fr/#person" },
      "serviceType": isEnglish
        ? [
            "Showcase websites",
            "Tailored web applications",
            "Business applications",
            "Internal APIs and integrations",
            "AI and n8n automation",
            "MVP delivery",
            "Tailored ERP",
          ]
        : [
            "Sites vitrines",
            "Applications web sur mesure",
            "Applications métier",
            "APIs internes et intégrations",
            "Automatisations IA et n8n",
            "Livraison de MVP",
            "ERP sur mesure",
          ],
      "areaServed": [
        { "@type": "City", "name": "Reims" },
        { "@type": "Country", "name": "France" },
        { "@type": "AdministrativeArea", "name": "Europe" },
      ],
      "url": "https://bastienlopez.fr/freelance",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://bastienlopez.fr/freelance#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Bastien Lopez",
          "item": "https://bastienlopez.fr/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isEnglish ? "Freelance" : "Freelance",
          "item": "https://bastienlopez.fr/freelance",
        },
      ],
    },
  ],
});

const Freelance = () => {
  const { isEnglish } = useLanguage();
  usePageMetadata('freelance');

  return (
    <div className="min-h-screen w-full">
      <a href="#main-content" className="skip-link">
        {isEnglish ? "Skip to main content" : "Aller au contenu principal"}
      </a>
      <Navbar />
      <main id="main-content">
          <script type="application/ld+json">
            {JSON.stringify(freelanceSchema(isEnglish))}
          </script>
          <FreelanceServices />
          <Projects mode="freelance" />
          <Testimonials />
          <FreelanceFaq />
          <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Freelance;
