import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroGrid from "@/assets/hero-grid.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroGrid})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20 animate-grid-flow">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--grid-line)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--grid-line)) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Name with neon glow */}
          <motion.h1 
            className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl mb-6 tracking-wider"
            style={{
              color: "hsl(var(--primary))",
              textShadow: `
                0 0 10px hsl(var(--primary)),
                0 0 20px hsl(var(--primary)),
                0 0 40px hsl(var(--primary)),
                0 0 80px hsl(var(--primary))
              `
            }}
            animate={{
              textShadow: [
                `0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))`,
                `0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)), 0 0 80px hsl(var(--primary))`,
                `0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))`,
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            BHARGAV B J
          </motion.h1>

          <motion.p 
            className="font-rajdhani text-xl md:text-2xl lg:text-3xl mb-8 text-foreground/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Developer & Designer
          </motion.p>

          {/* Neon divider line */}
          <motion.div 
            className="w-64 h-0.5 mx-auto mb-12 bg-primary"
            style={{
              boxShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))"
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* Social links with neon effect */}
          <motion.div 
            className="flex gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <a 
              href="https://github.com/BhargavBJ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-4 border-2 border-primary rounded-lg transition-all duration-300 hover:shadow-neon-strong">
                <Github className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </a>
            <a 
              href="https://www.linkedin.com/in/bhargav-bj/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-4 border-2 border-primary rounded-lg transition-all duration-300 hover:shadow-neon-strong">
                <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </a>
            <a 
              href="mailto:bhargav@example.com"
              className="group"
            >
              <div className="p-4 border-2 border-primary rounded-lg transition-all duration-300 hover:shadow-neon-strong">
                <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </a>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button 
              size="lg"
              className="font-rajdhani text-lg px-8 py-6 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-neon hover:shadow-neon-strong"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW PROJECTS
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;