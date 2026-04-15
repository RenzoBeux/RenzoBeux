import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "../lib/animations";
import type { Variants } from "motion/react";

interface Props {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
}

export default function AnimatedSection({
  children,
  className,
  variants = fadeUp,
  stagger = false,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={stagger ? staggerContainer : variants}
    >
      {children}
    </motion.div>
  );
}
