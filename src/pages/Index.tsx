import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import MouseTrail from "@/components/MouseTrail";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MouseTrail />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 border-t border-primary/30">
        <div className="container mx-auto px-4 text-center">
          <p className="font-rajdhani text-foreground/60">
            © 2025 Bhargav B J.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;