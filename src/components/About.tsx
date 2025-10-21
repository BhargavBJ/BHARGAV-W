import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--grid-line)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--grid-line)) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 
            className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-16"
            style={{
              color: "hsl(var(--background))",
              WebkitTextStroke: "2px hsl(var(--primary))",
              filter: "drop-shadow(0 2px 0 hsl(var(--primary)))"
            }}
          >
            ABOUT
          </h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="group bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-8 md:p-12 transition-all duration-300 hover:border-primary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            >
              <p className="font-rajdhani text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                I'm a passionate developer and designer with expertise in creating cutting-edge web applications. 
                My work combines technical excellence with stunning visual design to deliver exceptional user experiences.
              </p>
              <p className="font-rajdhani text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                With a strong foundation in modern web technologies and a keen eye for design, I specialize in 
                building responsive, performant, and visually striking applications that push the boundaries of 
                what's possible on the web.
              </p>
              <p className="font-rajdhani text-lg md:text-xl text-foreground/90 leading-relaxed">
                When I'm not coding, I'm exploring new technologies, contributing to open-source projects, and 
                staying at the forefront of web development trends.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;