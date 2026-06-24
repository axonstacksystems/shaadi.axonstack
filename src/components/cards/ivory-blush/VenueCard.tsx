"use client";

import { motion } from "motion/react";
import { ChevronRight, MapPin } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface VenueCardProps {
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
}

function VenueIllustration({ petalPrimary, petalSecondary, petalFill, gold, goldLight, goldMuted }: {
  petalPrimary: string; petalSecondary: string; petalFill: string;
  gold: string; goldLight: string; goldMuted: string;
}) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Sky background */}
      <rect width="100" height="120" fill={petalFill}/>
      {/* Ground */}
      <rect y="95" width="100" height="25" fill={petalPrimary} opacity="0.4" rx="2"/>
      {/* Main building */}
      <rect x="20" y="50" width="60" height="50" fill={petalPrimary} rx="2"/>
      {/* Facade lines */}
      <rect x="20" y="50" width="60" height="4" fill={petalSecondary}/>
      {/* Central dome */}
      <ellipse cx="50" cy="48" rx="18" ry="14" fill={goldLight} opacity="0.8"/>
      <ellipse cx="50" cy="48" rx="13" ry="10" fill={gold} opacity="0.9"/>
      {/* Finial */}
      <line x1="50" y1="34" x2="50" y2="28" stroke={gold} strokeWidth="2"/>
      <circle cx="50" cy="27" r="2.5" fill={gold}/>
      {/* Side minarets */}
      <rect x="18" y="38" width="8" height="28" fill={petalSecondary} rx="1"/>
      <ellipse cx="22" cy="37" rx="4" ry="6" fill={gold} opacity="0.8"/>
      <rect x="74" y="38" width="8" height="28" fill={petalSecondary} rx="1"/>
      <ellipse cx="78" cy="37" rx="4" ry="6" fill={gold} opacity="0.8"/>
      {/* Arched windows */}
      <path d="M34 70 Q34 64 39 64 Q44 64 44 70 L44 80 L34 80Z" fill={gold} opacity="0.5"/>
      <path d="M56 70 Q56 64 61 64 Q66 64 66 70 L66 80 L56 80Z" fill={gold} opacity="0.5"/>
      {/* Main entrance arch */}
      <path d="M42 100 Q42 86 50 86 Q58 86 58 100 L58 100 L42 100Z" fill={goldMuted} opacity="0.7"/>
      {/* Decorative lattice */}
      <line x1="20" y1="65" x2="80" y2="65" stroke={petalSecondary} strokeWidth="0.5" opacity="0.7"/>
      <line x1="20" y1="75" x2="80" y2="75" stroke={petalSecondary} strokeWidth="0.5" opacity="0.7"/>
      {/* Trees */}
      <ellipse cx="10" cy="88" rx="7" ry="10" fill={petalPrimary} opacity="0.6"/>
      <rect x="9" y="96" width="2" height="8" fill={petalSecondary} opacity="0.5"/>
      <ellipse cx="90" cy="88" rx="7" ry="10" fill={petalPrimary} opacity="0.6"/>
      <rect x="89" y="96" width="2" height="8" fill={petalSecondary} opacity="0.5"/>
    </svg>
  );
}

export function VenueCard({ venueName, venueAddress, mapsUrl }: VenueCardProps) {
  const { theme } = useTheme();
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="px-4 pb-6"
      aria-label="Venue information"
    >
      <motion.a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
        className="ib-glass flex items-center gap-4 p-4 no-underline block"
        aria-label={`View ${venueName} on maps`}
      >
        {/* Illustration */}
        <div
          className="shrink-0 rounded-2xl overflow-hidden"
          style={{
            width: 88,
            height: 100,
            background: theme.petalFill,
            border: `1px solid ${theme.mosqueTint}0.2)`,
          }}
        >
          <VenueIllustration
            petalPrimary={theme.petalPrimary}
            petalSecondary={theme.petalSecondary}
            petalFill={theme.petalFill}
            gold={theme.gold}
            goldLight={theme.goldLight}
            goldMuted={theme.goldMuted}
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold tracking-[0.14em] uppercase mb-1"
            style={{ fontSize: "9px", color: theme.gold }}
          >
            <MapPin size={9} className="inline mr-1" aria-hidden="true" />
            Venue
          </p>
          <p
            className="font-semibold leading-snug"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "clamp(15px, 4.5vw, 18px)",
              color: theme.textDark,
            }}
          >
            {venueName}
          </p>
          <p
            className="mt-1 leading-snug"
            style={{ fontSize: "11px", color: theme.textLight }}
          >
            {venueAddress}
          </p>
          <p
            className="mt-2 text-[10px] italic"
            style={{ color: theme.goldMuted }}
          >
            A premium destination for your beautiful moments.
          </p>
        </div>

        {/* Arrow */}
        <div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: `${theme.mosqueTint}0.15)` }}
          aria-hidden="true"
        >
          <ChevronRight size={14} style={{ color: theme.gold }} />
        </div>
      </motion.a>
    </motion.section>
  );
}
