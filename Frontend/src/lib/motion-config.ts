/**
 * Motion configuration that respects prefers-reduced-motion
 * Use this in framer-motion components to automatically disable animations
 * when the user has reduced motion preferences enabled
 */

export const motionConfig = {
  // Respect prefers-reduced-motion media query
  respectReducedMotion: true,
};

// Shared animation variants
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
