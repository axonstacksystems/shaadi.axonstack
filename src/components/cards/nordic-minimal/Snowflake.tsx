"use client";

import { motion } from "motion/react";

interface SnowflakeProps {
  className?: string;
  strokeWidth?: number;
  /** When true the six arms draw themselves in on scroll-into-view. */
  animate?: boolean;
  gradientId?: string;
}

/**
 * A six-fold ice crystal built from one branch path repeated around the centre.
 * Doubles as a static motif (dividers, footer) or a "frost growing" centrepiece
 * when `animate` is set. The frost-growth pauses for reduced-motion users.
 */
export function Snowflake({
  className = "h-12 w-12",
  strokeWidth = 2,
  animate = false,
  gradientId = "frost-ice",
}: SnowflakeProps) {
  const branch = "M50 50 L50 9 M50 21 L41 13 M50 21 L59 13 M50 31 L43 25 M50 31 L57 25";
  const arms = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Ice crystal">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a9eb0" />
          <stop offset="0.5" stopColor="#a8c8d8" />
          <stop offset="1" stopColor="#dbe9f0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {arms.map((a, i) => (
          <motion.path
            key={i}
            d={branch}
            transform={`rotate(${a} 50 50)`}
            {...(animate
              ? {
                  initial: { pathLength: 0, opacity: 0 },
                  whileInView: { pathLength: 1, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 1.1, delay: i * 0.12, ease: "easeInOut" },
                }
              : {})}
          />
        ))}
        <circle cx="50" cy="50" r="2.5" fill={`url(#${gradientId})`} stroke="none" />
      </g>
    </svg>
  );
}
