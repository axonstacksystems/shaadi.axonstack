"use client";

import { motion } from "motion/react";
import { useTheme } from "./ThemeContext";

interface EventInfo {
  icon: "mosque" | "floral";
  title: string;
  date: string;
  time: string;
  venue: string;
}

interface EventCardsProps {
  nikah: EventInfo;
  walima: EventInfo;
}

function MosqueIcon({ gold, goldLight }: { gold: string; goldLight: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 3C11.5 3 9.5 5 9.5 7.5C9.5 9.5 10.7 11.2 12.4 11.8V14H15.6V11.8C17.3 11.2 18.5 9.5 18.5 7.5C18.5 5 16.5 3 14 3Z" fill={gold}/>
      <rect x="5" y="14" width="18" height="1.5" rx="0.75" fill={gold}/>
      <rect x="6.5" y="15.5" width="15" height="9.5" rx="1" fill={goldLight} opacity="0.4"/>
      <rect x="11" y="18" width="6" height="7" rx="1" fill={gold} opacity="0.8"/>
      <path d="M2 14.5 Q5 11 5 14.5" stroke={gold} strokeWidth="1.2" fill="none"/>
      <path d="M26 14.5 Q23 11 23 14.5" stroke={gold} strokeWidth="1.2" fill="none"/>
      <circle cx="14" cy="2" r="1" fill={goldLight}/>
    </svg>
  );
}

function FloralIcon({ petalPrimary, petalSecondary, gold, goldLight }: { petalPrimary: string; petalSecondary: string; gold: string; goldLight: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 4 Q20 8 18 16 Q14 22 10 16 Q8 8 14 4Z" fill={petalPrimary} opacity="0.8"/>
      <path d="M14 6 Q18 10 17 15 Q14 19 11 15 Q10 10 14 6Z" fill={petalSecondary} opacity="0.6"/>
      <circle cx="14" cy="14" r="3" fill={gold}/>
      <circle cx="14" cy="14" r="1.5" fill={goldLight}/>
    </svg>
  );
}

function EventCard({ event, delay }: { event: EventInfo; delay: number }) {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="ib-glass p-4 flex-1 min-w-0 flex flex-col items-center text-center"
      role="article"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
        style={{ background: `${theme.mosqueTint}0.15)` }}
      >
        {event.icon === "mosque"
          ? <MosqueIcon gold={theme.gold} goldLight={theme.goldLight} />
          : <FloralIcon petalPrimary={theme.petalPrimary} petalSecondary={theme.petalSecondary} gold={theme.gold} goldLight={theme.goldLight} />}
      </div>
      <p
        className="font-semibold mb-1"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: "clamp(13px, 4vw, 16px)",
          color: theme.textDark,
          lineHeight: 1.3,
        }}
      >
        {event.title}
      </p>
      <p style={{ fontSize: "11px", color: theme.textLight, fontWeight: 500 }}>
        {event.date}
      </p>
      <p
        className="font-semibold my-1"
        style={{ fontSize: "13px", color: theme.gold }}
      >
        {event.time}
      </p>
      <div
        className="h-px w-8 my-2"
        style={{ background: `${theme.mosqueTint}0.3)` }}
        aria-hidden="true"
      />
      <p style={{ fontSize: "11px", color: theme.textLight, lineHeight: 1.4 }}>
        {event.venue}
      </p>
    </motion.div>
  );
}

export function EventCards({ nikah, walima }: EventCardsProps) {
  const { theme } = useTheme();
  return (
    <section className="px-4 pb-6" aria-label="Event details">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-3 font-semibold tracking-[0.18em] uppercase text-xs"
        style={{ color: theme.textLight }}
      >
        Event Details
      </motion.p>
      <div className="flex gap-3">
        <EventCard event={nikah} delay={0.1} />
        <EventCard event={walima} delay={0.2} />
      </div>
    </section>
  );
}
