import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import DevNotes from "@/components/DevNotes";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useLanguage, usePageMetadata } from "@/lib/i18n";

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
        <About />
        <Projects />
        <Skills />
        <DevNotes />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
