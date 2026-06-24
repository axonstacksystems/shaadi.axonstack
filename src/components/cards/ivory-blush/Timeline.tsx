"use client";

import { motion } from "motion/react";
import { Users, Heart, UtensilsCrossed, Camera, Sparkles } from "lucide-react";

const STEPS = [
  { label: "Guest Arrival", Icon: Users },
  { label: "Nikah Ceremony", Icon: Heart },
  { label: "Lunch", Icon: UtensilsCrossed },
  { label: "Photos", Icon: Camera },
  { label: "Walima Reception", Icon: Sparkles },
];

export function Timeline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="px-4 pb-6"
      aria-label="Event timeline"
    >
      <div className="ib-glass p-5">
        <p
          className="text-center mb-5 font-semibold tracking-[0.18em] uppercase text-xs"
          style={{ color: "#85705C" }}
        >
          Timeline
        </p>
        <div className="relative flex items-start justify-between">
          {/* Connecting gold line */}
          <div
            className="absolute top-[18px] left-0 right-0 h-px z-0"
            style={{
              background: "linear-gradient(to right, transparent, #D9B67A 15%, #D9B67A 85%, transparent)",
            }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const isActive = i === 1; // Nikah is highlighted
            const { Icon } = step;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center flex-1"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-2 shadow-sm"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, #E8C6C1, #D8A9A2)",
                          border: "2px solid rgba(255,255,255,0.9)",
                          boxShadow: "0 4px 12px rgba(216,169,162,0.4)",
                        }
                      : {
                          background: "rgba(255,255,255,0.9)",
                          border: "1.5px solid rgba(203,164,106,0.35)",
                        }
                  }
                  aria-hidden="true"
                >
                  <Icon
                    size={15}
                    style={{ color: isActive ? "#fff" : "#CBA46A" }}
                  />
                </div>
                <p
                  className="text-center font-medium leading-tight"
                  style={{
                    fontSize: "9px",
                    color: isActive ? "#D8A9A2" : "#85705C",
                    maxWidth: "52px",
                  }}
                >
                  {step.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
