import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const DevNotes = lazy(() => import("@/components/DevNotes"));
const Freelance = lazy(() => import("@/components/Freelance"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <a
        href="#main-content"
        className="skip-link"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-sm text-muted-foreground">Chargement des sections...</div>}>
          <Freelance />
          <Projects />
          <About />
          <Skills />
          <DevNotes />
          <Contact />
        </Suspense>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
