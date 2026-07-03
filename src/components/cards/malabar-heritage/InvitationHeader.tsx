"use client";

import { motion } from "motion/react";
import { useTheme } from "./ThemeContext";

function HeritageDivider({ dividerColor, gold }: { dividerColor: string; gold: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-5" aria-hidden="true">
      <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to right, transparent, ${dividerColor})` }} />
      <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2 L26 8 L20 14 L14 8 Z" fill={gold} opacity="0.7"/>
        <circle cx="20" cy="8" r="1.5" fill={dividerColor}/>
        <circle cx="8" cy="8" r="1" fill={gold} opacity="0.4"/>
        <circle cx="32" cy="8" r="1" fill={gold} opacity="0.4"/>
      </svg>
      <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to left, transparent, ${dividerColor})` }} />
    </div>
  );
}

interface InvitationHeaderProps {
  groom: string;
  bride: string;
  eventDate?: string;
}

export function InvitationHeader({ groom, bride, eventDate }: InvitationHeaderProps) {
  const { theme } = useTheme();
  return (
    <header className="relative z-10 text-center pt-16 pb-2 px-6 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-48 opacity-40"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse, ${theme.mosqueTint}0.25) 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-1" aria-hidden="true"
        style={{ background: `linear-gradient(to right, transparent, ${theme.gold}, transparent)` }}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
        <p
          className="invitation-arabic mb-4"
          style={{
            fontSize: "clamp(22px, 5.5vw, 32px)",
            fontWeight: 500,
            color: theme.arabicColor,
            lineHeight: 1.9,
            direction: "rtl",
            textShadow: `0 2px 12px ${theme.mosqueTint}0.3)`,
          }}
          aria-label="Bismillah ir-Rahman ir-Rahim"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond","Bodoni Moda",serif', color: theme.textDark, lineHeight: 1.1, margin: 0 }}>
          <span className="block font-semibold" style={{ fontSize: "clamp(34px, 9.5vw, 52px)" }}>
            {groom}
          </span>
          <span className="block" style={{
            fontSize: "clamp(16px, 3.5vw, 20px)",
            fontWeight: 200,
            fontStyle: "italic",
            color: theme.ampersandColor,
            letterSpacing: "0.18em",
            margin: "4px 0",
            fontFamily: '"Cormorant Garamond",serif',
          }}>
            &amp;
          </span>
          <span className="block font-semibold" style={{ fontSize: "clamp(34px, 9.5vw, 52px)" }}>
            {bride}
          </span>
        </h1>
      </motion.div>

      {eventDate && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 10,
            fontSize: "clamp(9px, 2.2vw, 11px)",
            color: theme.gold,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
            fontWeight: 500,
          }}
        >
          {eventDate}
        </motion.p>
      )}

      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.6 }}>
        <HeritageDivider dividerColor={theme.dividerColor} gold={theme.gold} />
      </motion.div>
    </header>
  );
}
