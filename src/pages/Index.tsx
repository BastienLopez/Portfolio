import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SITE_ORIGIN, useLanguage, usePageMetadata } from "@/lib/i18n";

// The complete project catalogue contains long case-study content and gallery
// metadata. Keep it out of the initial home chunk while preserving the same
// rendered section and its crawlable prerendered HTML.
const Projects = lazy(() => import("@/components/Projects"));
const DevNotes = lazy(() => import("@/components/DevNotes"));

const DeferredProjects = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Keep the above-the-fold render focused on the hero and the first trust
    // signals. The prerenderer waits for the featured cards before serialising
    // the page, so the crawlable HTML remains complete.
    const timer = window.setTimeout(() => setShouldLoad(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <Projects as="div" />
    </Suspense>
  );
};

const DeferredDevNotes = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Keep the technical catalogue out of the initial JavaScript parse. The
    // prerenderer waits for #devnotes so the crawlable HTML remains complete.
    const timer = window.setTimeout(() => setShouldLoad(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <DevNotes />
    </Suspense>
  );
};

const homeFeaturedProjects = [
  {
    name: "Altme Wallet Provider",
    url: `${SITE_ORIGIN}/projets/altme-wallet-provider`,
  },
  {
    name: "Clé de Voûte",
    url: `${SITE_ORIGIN}/projets/cledevoute`,
  },
  {
    name: "Automatisations n8n — Dérush vidéo",
    url: `${SITE_ORIGIN}/projets/automatisations-n8n-derush-video`,
  },
  {
    name: "Eloi CoachStéo — Sport Trainer",
    url: `${SITE_ORIGIN}/projets/eloi-coachsteo`,
  },
] as const;

const homeStructuredData = (isEnglish: boolean) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/#webpage`,
      url: `${SITE_ORIGIN}/`,
      name: isEnglish
        ? "Bastien Lopez — Freelance web developer in Reims"
        : "Développeur web freelance à Reims | Sites et outils métier — Bastien Lopez",
      description: isEnglish
        ? "Professional websites, business applications and automation for small businesses and service organisations. Based in Reims, France, working remotely across Europe."
        : "Sites professionnels, applications métier et automatisations pour les TPE, PME et structures de services. Bastien Lopez, développeur web basé à Reims, en France, et disponible à distance en Europe.",
      inLanguage: isEnglish ? "en" : "fr-FR",
      about: { "@id": `${SITE_ORIGIN}/#person` },
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_ORIGIN}/#profile`,
      url: `${SITE_ORIGIN}/`,
      name: isEnglish
        ? "Bastien Lopez — Freelance web developer profile"
        : "Profil de Bastien Lopez — Développeur web freelance à Reims",
      inLanguage: isEnglish ? "en" : "fr-FR",
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      mainEntity: { "@id": `${SITE_ORIGIN}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_ORIGIN}/#selected-projects`,
      name: isEnglish ? "Selected case studies" : "Études de cas sélectionnées",
      url: `${SITE_ORIGIN}/#projects`,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: homeFeaturedProjects.length,
      itemListElement: homeFeaturedProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: isEnglish
          ? project.name
              .replace("Automatisations n8n — Dérush vidéo", "n8n Automations — Video Derush")
              .replace("Eloi CoachStéo — Sport Trainer", "Eloi CoachStéo — Sport Trainer")
          : project.name,
        url: project.url,
      })),
    },
  ],
});

const Index = () => {
  const { isEnglish } = useLanguage();
  usePageMetadata('home');

  return (
    <div className="min-h-screen w-full">
      <a
        href="#main-content"
        className="skip-link"
      >
        {isEnglish ? 'Skip to main content' : 'Aller au contenu principal'}
      </a>
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json">
          {JSON.stringify(homeStructuredData(isEnglish))}
        </script>
        <Hero />
        <About />
        <section
          id="projects"
          className="project-list-section px-4 w-full overflow-x-hidden section-even py-14 md:py-16"
        >
          <DeferredProjects />
        </section>
        <Skills />
        <DeferredDevNotes />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
