"use client";

import { motion, type HTMLMotionProps, MotionConfig } from "framer-motion";
import { type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: FadeInProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
