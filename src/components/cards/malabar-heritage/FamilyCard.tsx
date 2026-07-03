"use client";

import { motion } from "motion/react";
import { useTheme } from "./ThemeContext";

interface FamilyCardProps {
  groomFamily: string;
  brideFamily: string;
}

function CenterOrnament({ petalPrimary, gold, dividerColor }: { petalPrimary: string; gold: string; dividerColor: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-3" aria-hidden="true">
      <svg width="32" height="80" viewBox="0 0 32 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="0" x2="16" y2="28" stroke={dividerColor} strokeWidth="1" opacity="0.5"/>
        <circle cx="16" cy="16" r="3" fill={dividerColor} opacity="0.6"/>
        <path d="M16 34 Q22 38 20 46 Q16 50 12 46 Q10 38 16 34Z" fill={petalPrimary} opacity="0.8"/>
        <circle cx="16" cy="42" r="2.5" fill={gold} opacity="0.9"/>
        <circle cx="16" cy="42" r="1.2" fill={dividerColor}/>
        <line x1="16" y1="52" x2="16" y2="80" stroke={dividerColor} strokeWidth="1" opacity="0.5"/>
        <circle cx="16" cy="64" r="3" fill={dividerColor} opacity="0.6"/>
      </svg>
    </div>
  );
}

export function FamilyCard({ groomFamily, brideFamily }: FamilyCardProps) {
  const { theme } = useTheme();
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="px-4 pb-6"
      aria-label="Family blessings"
    >
      <div className="ib-glass p-5">
        <p
          className="text-center mb-5 font-semibold tracking-[0.15em] uppercase"
          style={{ fontSize: "9px", color: theme.textLight }}
        >
          With The Blessings Of Our Families
        </p>
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-1 text-center"
          >
            <p
              className="font-semibold leading-snug"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(13px, 3.8vw, 16px)",
                color: theme.textDark,
              }}
            >
              {groomFamily}
            </p>
            <p
              className="mt-1 italic"
              style={{ fontSize: "11px", color: theme.textLight }}
            >
              &amp; Family
            </p>
          </motion.div>

          <CenterOrnament petalPrimary={theme.petalPrimary} gold={theme.gold} dividerColor={theme.dividerColor} />

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 text-center"
          >
            <p
              className="font-semibold leading-snug"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(13px, 3.8vw, 16px)",
                color: theme.textDark,
              }}
            >
              {brideFamily}
            </p>
            <p
              className="mt-1 italic"
              style={{ fontSize: "11px", color: theme.textLight }}
            >
              &amp; Family
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
