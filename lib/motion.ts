"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Standard fade-in-up reveal. Returns Framer Motion props.
 * Honors `prefers-reduced-motion`.
 */
export function useReveal() {
  const reduce = useReducedMotion();
  if (reduce) {
    return {
      initial: false as const,
      animate: { opacity: 1 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

/** Stagger delay in seconds for the n-th child. Returns 0 under reduced-motion. */
export function useStagger(index: number, stepMs = 40) {
  const reduce = useReducedMotion();
  return reduce ? 0 : (index * stepMs) / 1000;
}
