"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 20,
  as: Component = motion.div,
  ...rest
}) {
  return (
    <Component
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function FadeInStagger({ children, className = "", stagger = 0.08 }) {
  return (
    <motion.div
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-40px 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({ children, className = "" }) {
  return (
    <motion.div
      initial={false}
      variants={{
        hidden: {},
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
