import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import tronAresRed from "@/assets/tron-ares-red.jpg";
import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    const audio = new Audio('/tron-startup.mp3');
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Audio autoplay prevented:', err));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${tronAresRed})`,
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
          {/* Name with Tron effect - black text with red outline and glow */}
          <motion.h1 
            className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl mb-6 tracking-wider"
            style={{
              color: "hsl(var(--background))",
              WebkitTextStroke: "2px hsl(var(--primary))",
              textShadow: `
                0 0 20px hsl(var(--primary)),
                0 0 40px hsl(var(--primary)),
                0 0 60px hsl(var(--primary)),
                0 0 80px hsl(var(--primary))
              `
            }}
            animate={{
              textShadow: [
                `0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)), 0 0 60px hsl(var(--primary))`,
                `0 0 30px hsl(var(--primary)), 0 0 60px hsl(var(--primary)), 0 0 100px hsl(var(--primary))`,
                `0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)), 0 0 60px hsl(var(--primary))`,
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
            AI & ML Enthusiast • Project Builder • Deep Learning Explorer • ML Researcher
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
              href="https://www.linkedin.com/in/bhargav-b-j-01ab36285/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-4 border-2 border-primary rounded-lg transition-all duration-300 hover:shadow-neon-strong">
                <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </a>
            <a 
              href="mailto:bjbhargav60@gmail.com"
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
    </section>
  );
};

export default Hero;