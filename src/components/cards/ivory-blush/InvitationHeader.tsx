"use client";

import { motion } from "motion/react";
import { useTheme } from "./ThemeContext";

function FloralDivider({ dividerColor, petalPrimary, petalSecondary }: { dividerColor: string; petalPrimary: string; petalSecondary: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-5" aria-hidden="true">
      <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(to right, transparent, ${dividerColor})` }} />
      <svg width="64" height="28" viewBox="0 0 64 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="14" rx="5" ry="7" fill={petalPrimary} opacity="0.9"/>
        <ellipse cx="32" cy="14" rx="3" ry="4.5" fill={petalSecondary} opacity="0.7"/>
        <ellipse cx="18" cy="14" rx="4" ry="5.5" fill={petalPrimary} opacity="0.7" transform="rotate(-20 18 14)"/>
        <ellipse cx="46" cy="14" rx="4" ry="5.5" fill={petalPrimary} opacity="0.7" transform="rotate(20 46 14)"/>
        <ellipse cx="8" cy="16" rx="3" ry="4" fill={dividerColor} opacity="0.5" transform="rotate(-35 8 16)"/>
        <ellipse cx="56" cy="16" rx="3" ry="4" fill={dividerColor} opacity="0.5" transform="rotate(35 56 16)"/>
        <path d="M32 7 Q34 4 32 2 Q30 4 32 7Z" fill={dividerColor} opacity="0.6"/>
        <path d="M32 21 Q34 24 32 26 Q30 24 32 21Z" fill={dividerColor} opacity="0.6"/>
      </svg>
      <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(to left, transparent, ${dividerColor})` }} />
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
      {/* Soft ambient glow top */}
      <div
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-48 opacity-40"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse, ${theme.mosqueTint}0.25) 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      {/* Floral corner accents */}
      <div className="pointer-events-none absolute top-0 left-0 w-32 h-32 opacity-[0.14]" aria-hidden="true">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <ellipse cx="30" cy="30" rx="28" ry="36" fill={theme.petalPrimary}/>
          <ellipse cx="30" cy="30" rx="18" ry="24" fill={theme.petalSecondary}/>
          <ellipse cx="70" cy="15" rx="20" ry="28" fill={theme.petalFill}/>
          <ellipse cx="15" cy="70" rx="14" ry="20" fill={theme.dividerColor} opacity="0.7"/>
        </svg>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 opacity-[0.14]" aria-hidden="true">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <ellipse cx="130" cy="30" rx="28" ry="36" fill={theme.petalPrimary}/>
          <ellipse cx="130" cy="30" rx="18" ry="24" fill={theme.petalSecondary}/>
          <ellipse cx="90" cy="15" rx="20" ry="28" fill={theme.petalFill}/>
          <ellipse cx="145" cy="70" rx="14" ry="20" fill={theme.dividerColor} opacity="0.7"/>
        </svg>
      </div>

      {/* Bismillah */}
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

      {/* Couple Names */}
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

      {/* Event date — appears immediately below names */}
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

      {/* Floral Divider */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.6 }}>
        <FloralDivider dividerColor={theme.dividerColor} petalPrimary={theme.petalPrimary} petalSecondary={theme.petalSecondary} />
      </motion.div>
    </header>
  );
}
