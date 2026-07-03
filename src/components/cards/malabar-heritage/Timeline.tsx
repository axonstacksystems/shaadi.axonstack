"use client";

import { motion } from "motion/react";
import { Users, Heart, UtensilsCrossed, Camera, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeContext";

const ICON_MAP: Record<string, typeof Users> = {
  "Guest Arrival": Users,
  "Nikah Ceremony": Heart,
  "Nikah": Heart,
  "Lunch": UtensilsCrossed,
  "Photos": Camera,
  "Wedding Reception": Sparkles,
  "Reception": Sparkles,
  "Wedding Ceremony": Heart,
  "Wedding Lunch": UtensilsCrossed,
};

const DEFAULT_ICON = Sparkles;

export function Timeline({ steps = [] }: { steps?: string[] }) {
  const { theme } = useTheme();
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
          style={{ color: theme.textLight }}
        >
          Timeline
        </p>
        <div className="relative flex items-start justify-between">
          <div
            className="absolute top-[18px] left-0 right-0 h-px z-0"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.dividerColor} 15%, ${theme.dividerColor} 85%, transparent)`,
            }}
            aria-hidden="true"
          />

          {steps.map((label, i) => {
            const isActive = i === 1;
            const Icon = ICON_MAP[label] ?? DEFAULT_ICON;
            return (
              <motion.div
                key={label}
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
                          background: `linear-gradient(135deg, ${theme.petalPrimary}, ${theme.petalSecondary})`,
                          border: "2px solid rgba(255,255,255,0.9)",
                          boxShadow: `0 4px 12px ${theme.mosqueTint}0.35)`,
                        }
                      : {
                          background: "rgba(255,255,255,0.9)",
                          border: `1.5px solid ${theme.mosqueTint}0.35)`,
                        }
                  }
                  aria-hidden="true"
                >
                  <Icon
                    size={15}
                    style={{ color: isActive ? "#fff" : theme.gold }}
                  />
                </div>
                  <p
                    className="text-center font-medium leading-tight"
                    style={{
                      fontSize: "9px",
                      color: isActive ? theme.petalSecondary : theme.textLight,
                      maxWidth: "52px",
                    }}
                  >
                    {label}
                  </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
