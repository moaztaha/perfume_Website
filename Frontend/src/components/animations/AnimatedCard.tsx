"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export function AnimatedCard({
  children,
  className,
  hoverScale = 1.02,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ scale: hoverScale, y: -4 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
