import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Database, Cloud, Smartphone, Cpu } from "lucide-react";

const skills = [
  {
    icon: Code2,
    name: "Frontend Development",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
  },
  {
    icon: Database,
    name: "Backend & Database",
    technologies: ["Node.js", "PostgreSQL", "MongoDB", "REST APIs"]
  },
  {
    icon: Palette,
    name: "UI/UX Design",
    technologies: ["Figma", "Adobe XD", "Responsive Design", "Animation"]
  },
  {
    icon: Cloud,
    name: "Cloud & DevOps",
    technologies: ["AWS", "Docker", "CI/CD", "Vercel"]
  },
  {
    icon: Smartphone,
    name: "Mobile Development",
    technologies: ["React Native", "Progressive Web Apps", "Responsive Design"]
  },
  {
    icon: Cpu,
    name: "Tools & Technologies",
    technologies: ["Git", "VS Code", "Linux", "Agile"]
  }
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-16 text-primary">
            <span className="inline-block" style={{
              textShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))"
            }}>
              SKILLS
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  className="group relative bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-neon"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 border-2 border-primary rounded-lg group-hover:shadow-neon transition-all duration-300">
                        <Icon className="w-8 h-8 text-primary group-hover:animate-glow-pulse" />
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