import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Database, Code2, Workflow } from "lucide-react";

const skills = [
  {
    icon: Brain,
    name: "AI/ML Frameworks",
    technologies: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "OpenCV", "Hugging Face"]
  },
  {
    icon: Code2,
    name: "ML Libraries",
    technologies: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "NLTK", "SpaCy"]
  },
  {
    icon: Database,
    name: "Databases",
    technologies: ["PostgreSQL", "MongoDB", "MySQL", "Vector DB", "Redis"]
  },
  {
    icon: Workflow,
    name: "APIs & Tools",
    technologies: ["REST APIs", "FastAPI", "Flask", "GraphQL", "MLflow", "Jupyter"]
  }
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
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
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
            SKILLS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  className="group bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 transition-all duration-300 hover:border-primary"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 border-2 border-primary rounded-lg transition-all duration-300">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-orbitron text-lg font-bold text-primary">
                        {skill.name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-rajdhani text-sm px-3 py-1 bg-primary/10 text-foreground/80 border border-primary/30 rounded-full hover:border-primary hover:bg-primary/20 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;