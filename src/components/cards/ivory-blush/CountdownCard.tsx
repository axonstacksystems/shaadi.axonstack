"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1000),
  };
}

interface CountdownCardProps {
  targetDateIso: string;
}

export function CountdownCard({ targetDateIso }: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDateIso);
    setTimeLeft(calcTimeLeft(target));
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDateIso]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="px-4 pb-6"
      aria-label="Countdown to the wedding"
    >
      <div className="ib-glass p-5">
        <p
          className="text-center mb-4 font-semibold tracking-[0.18em] uppercase text-xs"
          style={{ color: "#85705C" }}
        >
          Counting Down To
        </p>
        <div className="grid grid-cols-4 gap-2">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <div
                className="font-semibold tabular-nums leading-none"
                style={{
                  fontSize: "clamp(28px, 8vw, 42px)",
                  color: "#4B3A2A",
                  fontFamily: '"Cormorant Garamond", "Bodoni Moda", serif',
                }}
                aria-label={`${unit.value} ${unit.label.toLowerCase()}`}
              >
                {String(unit.value).padStart(2, "0")}
              </div>
              <div
                className="mt-1 tracking-[0.15em] uppercase font-medium"
                style={{ fontSize: "9px", color: "#85705C" }}
              >
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
