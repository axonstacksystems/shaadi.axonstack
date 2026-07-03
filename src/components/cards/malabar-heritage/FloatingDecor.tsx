"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "./ThemeContext";

interface Mote {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

export function FloatingDecor() {
  const { theme } = useTheme();
  const [motes, setMotes] = useState<Mote[]>([]);

  useEffect(() => {
    const generated: Mote[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 95 + 2}%`,
      size: 2 + Math.random() * 4,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 15,
      drift: Math.random() * 30 - 15,
    }));
    setMotes(generated);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {motes.map((mote) => (
        <motion.div
          key={mote.id}
          className="absolute rounded-full"
          style={{
            left: mote.left,
            width: mote.size,
            height: mote.size,
            background: theme.gold,
          }}
          animate={{
            y: ["-2%", "102%"],
            x: [0, mote.drift, 0],
            opacity: [0, 0.2, 0.15, 0],
          }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
