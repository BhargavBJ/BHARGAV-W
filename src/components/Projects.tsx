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
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/BhargavBJ/repos?sort=updated&per_page=100');
        const data = await response.json();
        
        // Filter out Test and BhargavBJ repos, focus on ML projects
        const mlKeywords = ['ml', 'machine-learning', 'deep-learning', 'ai', 'neural', 'model', 'data-science', 'tensorflow', 'pytorch', 'keras', 'scikit'];
        const filteredRepos = data
          .filter((repo: Repository) => {
            const repoName = repo.name.toLowerCase();
            const repoDesc = (repo.description || '').toLowerCase();
            const repoTopics = repo.topics.map(t => t.toLowerCase());
            
            // Exclude specific repos
            if (repoName === 'test' || repoName === 'bhargavbj') return false;
            
            // Check if it's ML-related
            return mlKeywords.some(keyword => 
              repoName.includes(keyword) || 
              repoDesc.includes(keyword) ||
              repoTopics.some(topic => topic.includes(keyword))
            );
          })
          .slice(0, 4); // Only show 4 projects
        
        setRepos(filteredRepos);
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
            PROJECTS
          </h2>

          {loading ? (
            <div className="text-center text-foreground/60 font-rajdhani text-xl">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  className="group relative bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 transition-all duration-300 hover:border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
                  whileHover={{ y: -5 }}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-orbitron text-xl font-bold text-primary">
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