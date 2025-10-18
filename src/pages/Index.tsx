import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
            © 2025 Bhargav B J. Designed with{" "}
            <span className="text-primary">neon</span> and{" "}
            <span className="text-primary">code</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;