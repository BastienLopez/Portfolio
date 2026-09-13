import { lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import DeferredSection from "@/components/DeferredSection";
import { useLanguage, usePageMetadata } from "@/lib/i18n";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const DevNotes = lazy(() => import("@/components/DevNotes"));
const Contact = lazy(() => import("@/components/Contact"));

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
        <Hero />
        <DeferredSection sectionId="about" loadingLabel={isEnglish ? "Loading about section..." : "Chargement de la présentation..."}>
          <About />
        </DeferredSection>
        <DeferredSection sectionId="projects" loadingLabel={isEnglish ? "Loading projects..." : "Chargement des projets..."}>
          <Projects />
        </DeferredSection>
        <DeferredSection sectionId="skills" loadingLabel={isEnglish ? "Loading skills..." : "Chargement des compétences..."}>
          <Skills />
        </DeferredSection>
        <DeferredSection sectionId="devnotes" loadingLabel={isEnglish ? "Loading notes..." : "Chargement des notes..."}>
          <DevNotes />
        </DeferredSection>
        <DeferredSection sectionId="contact" loadingLabel={isEnglish ? "Loading contact..." : "Chargement du contact..."}>
          <Contact />
        </DeferredSection>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
