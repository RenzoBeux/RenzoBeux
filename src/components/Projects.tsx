import { motion, useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";
import { PROJECTS } from "../lib/constants";
import { ExternalLink } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const container = shouldReduceMotion ? {} : staggerContainer;
  const item = shouldReduceMotion ? {} : fadeUp;

  return (
    <section
      id="projects"
      className="border-t border-border bg-bg-alt py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          <motion.h2
            variants={item}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
          >
            Projects
          </motion.h2>
          <motion.h3
            variants={item}
            className="mb-12 text-3xl font-bold tracking-tight text-text-primary md:text-4xl"
          >
            Things I've built
          </motion.h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.title}
                variants={item}
                className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-lg hover:shadow-accent-glow/50"
              >
                <h4 className="mb-2 text-lg font-semibold text-text-primary">
                  {project.title}
                </h4>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-accent-subtle px-2 py-0.5 text-xs font-medium text-accent-hover"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors duration-150 hover:text-text-primary"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <GithubIcon className="h-4 w-4" />
                      Source
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors duration-150 hover:text-text-primary"
                      aria-label={`Visit ${project.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
