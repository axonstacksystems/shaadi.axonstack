"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * A thin "thaw line" progress meter fixed to the top of the viewport that
 * fills as the guest scrolls. Driven by real scroll position via useScroll
 * with a spring for smoothness. Tinted to the frost palette.
 */
export function FrostProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gradient-to-r from-[#7a9e7e] via-[#a8c8d8] to-[#dbe9f0] shadow-[0_0_12px_rgba(168,200,216,0.7)]"
    />
  );
}
