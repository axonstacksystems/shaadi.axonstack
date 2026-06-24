"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

interface Petal {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  animationName: string;
  size: string;
  opacity: number;
}

const ANIMATION_NAMES = ["petal-drift-1", "petal-drift-2", "petal-drift-3"];

export function FloatingPetals() {
  const { theme } = useTheme();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      animationDuration: `${15 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 12}s`,
      animationName: ANIMATION_NAMES[i % 3],
      size: `${14 + Math.random() * 10}px`,
      opacity: 0.3 + Math.random() * 0.4,
    }));
    setPetals(generated);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
            animationName: petal.animationName,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
          dangerouslySetInnerHTML={{
            __html: [
              `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="14" rx="7" ry="9" fill="${theme.petalPrimary}" opacity="0.9"/><ellipse cx="12" cy="10" rx="5" ry="7" fill="${theme.petalSecondary}" opacity="0.7"/></svg>`,
              `<svg viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 2 Q18 8 16 18 Q10 24 4 18 Q2 8 10 2Z" fill="${theme.petalPrimary}" opacity="0.85"/></svg>`,
              `<svg viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg"><path d="M10 2 Q20 10 14 24 Q10 28 6 24 Q0 10 10 2Z" fill="${theme.gold}" opacity="0.6"/></svg>`,
            ][petal.id % 3],
          }}
        />
      ))}
    </div>
  );
}
