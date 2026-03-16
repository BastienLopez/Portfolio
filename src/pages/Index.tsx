import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import DevNotes from "@/components/DevNotes";
import Freelance from "@/components/Freelance";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <DevNotes />
      <Freelance />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
