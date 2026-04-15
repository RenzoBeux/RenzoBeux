import { motion, useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";
import { SKILLS } from "../lib/constants";

const CATEGORY_ORDER = ["Languages", "Frontend", "Backend", "DevOps"];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const container = shouldReduceMotion ? {} : staggerContainer;
  const item = shouldReduceMotion ? {} : fadeUp;

  const categories = CATEGORY_ORDER.map((cat) => ({
    name: cat,
    skills: SKILLS.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="border-t border-border py-20 md:py-28">
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
            Skills
          </motion.h2>
          <motion.h3
            variants={item}
            className="mb-12 text-3xl font-bold tracking-tight text-text-primary md:text-4xl"
          >
            Technologies I work with
          </motion.h3>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={item}>
                <h4 className="mb-4 text-sm font-medium text-text-tertiary">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary transition-all duration-200 hover:border-accent/30 hover:bg-accent-subtle hover:text-text-primary"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
