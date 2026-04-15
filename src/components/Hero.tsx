import { motion, useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";
import { ArrowDown, BookOpen } from "lucide-react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? {} : fadeUp;
  const container = shouldReduceMotion ? {} : staggerContainer;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-gradient-shift absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="animate-gradient-shift-delayed absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg)_70%)]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Greeting chip */}
        <motion.div variants={variants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-sm text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={variants}
          className="mb-6 text-5xl font-bold tracking-tight text-text-primary sm:text-6xl md:text-7xl"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
            Renzo Beux
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={variants}
          className="mx-auto mb-10 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          Software Engineer passionate about building things, self-hosting, open
          source, and sharing what I learn along the way.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={variants}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-glow"
          >
            View Projects
            <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>
          <a
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-6 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-border-hover hover:bg-surface"
          >
            <BookOpen className="h-4 w-4" />
            Read Blog
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 text-text-tertiary" />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
        }
        .animate-gradient-shift-delayed {
          animation: gradient-shift 18s ease-in-out infinite reverse;
        }
      `}</style>
    </section>
  );
}
