"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * A thin "orbit trail" progress meter fixed to the top of the viewport that
 * fills as the guest travels through the invitation. Driven by the real
 * scroll position via Framer Motion's useScroll + a spring for smoothness.
 */
export function OrbitProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gradient-to-r from-[#b76e79] via-[#f4e4b8] to-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
    />
  );
}
