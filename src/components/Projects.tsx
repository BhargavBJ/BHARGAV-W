import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/BhargavBJ/repos?sort=updated&per_page=6');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10 animate-grid-flow">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--grid-line)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--grid-line)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
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
              PROJECTS
            </span>
          </h2>

          {loading ? (
            <div className="text-center text-foreground/60 font-rajdhani text-xl">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  className="group relative bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-neon"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-orbitron text-xl font-bold text-primary group-hover:text-neon-cyan transition-colors">
                        {repo.name}
                      </h3>
                      {repo.language && (
                        <span className="text-xs font-rajdhani px-2 py-1 bg-primary/20 text-primary border border-primary/50 rounded">
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <p className="font-rajdhani text-foreground/80 mb-4 line-clamp-3">
                      {repo.description || "No description available"}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span className="font-rajdhani">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span className="font-rajdhani">{repo.forks_count}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-neon-cyan transition-colors font-rajdhani"
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-neon-cyan transition-colors font-rajdhani"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;