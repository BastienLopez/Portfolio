import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FreelanceServices from "@/components/Freelance";
import { useLanguage, usePageMetadata } from "@/lib/i18n";

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
        ? "Freelance — Websites and business tools | Bastien Lopez"
        : "Développeur web freelance à Reims | Sites et outils métier",
      "description": isEnglish
        ? "Professional websites and business tools or automation for small businesses and service organisations."
        : "Deux offres pour les TPE, PME et structures de services : création ou refonte de site professionnel, et outil métier ou automatisation.",
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
            "Professional website creation or redesign",
            "Business tools and automation",
          ]
        : [
            "Création ou refonte de site professionnel",
            "Outil métier ou automatisation",
          ],
      "areaServed": [
        { "@type": "City", "name": "Reims" },
        { "@type": "Country", "name": "France" },
        { "@type": "Continent", "name": "Europe" },
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": isEnglish
          ? "Small businesses and service organisations"
          : "TPE, PME et structures de services",
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://bastienlopez.fr/freelance",
        "availableLanguage": isEnglish ? "en-US" : "fr-FR",
      },
      "url": "https://bastienlopez.fr/freelance",
    },
    {
      "@type": "ItemList",
      "@id": "https://bastienlopez.fr/freelance#services",
      "name": isEnglish ? "Freelance services" : "Services freelance",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": isEnglish ? "Website creation in Reims" : "Création de sites internet à Reims",
          "url": "https://bastienlopez.fr/creation-site-internet-reims",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isEnglish ? "Business tools and automation" : "Outil métier ou automatisation",
          "url": "https://bastienlopez.fr/services/applications-metier",
        },
      ],
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
          <Suspense fallback={null}>
            <Projects mode="freelance" />
          </Suspense>
          <Suspense fallback={null}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={null}>
            <FreelanceFaq />
          </Suspense>
          <Suspense fallback={null}>
            <Contact variant="freelance" />
          </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Freelance;
