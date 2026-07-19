import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const DevNotes = lazy(() => import("@/components/DevNotes"));
const Freelance = lazy(() => import("@/components/Freelance"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  const { isEnglish } = useLanguage();

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
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-sm text-muted-foreground">{isEnglish ? 'Loading sections...' : 'Chargement des sections...'}</div>}>
          <About />
          <Projects />
          <Skills />
          <Freelance />
          <DevNotes />
          <Contact />
        </Suspense>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
