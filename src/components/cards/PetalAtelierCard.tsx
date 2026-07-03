"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { FloatingPetals } from "./petal-atelier/FloatingPetals";
import { InvitationHeader } from "./petal-atelier/InvitationHeader";
import { CountdownCard } from "./petal-atelier/CountdownCard";
import { EventCards } from "./petal-atelier/EventCards";
import { Timeline } from "./petal-atelier/Timeline";
import { VenueCard } from "./petal-atelier/VenueCard";
import { FamilyCard } from "./petal-atelier/FamilyCard";
import { RSVPCard } from "./petal-atelier/RSVPCard";
import { ActionBar } from "./petal-atelier/ActionBar";
import { CoverScreen } from "./petal-atelier/CoverScreen";
import { ThemeProvider, useTheme } from "./petal-atelier/ThemeContext";
import { THEMES } from "./petal-atelier/themes";

interface Props {
  order: DeliveredOrder;
  initialTheme?: string;
}

function PetalAtelierCardInner({ order }: Props) {
  const { theme } = useTheme();
  const rsvpRef = useRef<HTMLDivElement>(null);
  const [showCover, setShowCover] = useState(true);

  function handleOpen() {
    setShowCover(false);
  }

  function scrollToRSVP() {
    rsvpRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const nikahEvent = {
    icon: "mosque" as const,
    title: "Nikah Ceremony",
    date: "15 December 2026",
    time: "11:00 AM",
    venue: order.primaryEvent.venue,
  };

  const walimaEvent = {
    icon: "floral" as const,
    title: "Walima Reception",
    date: "16 December 2026",
    time: "7:00 PM",
    venue: order.primaryEvent.venue,
  };

  const groomFamily =
    order.groomParents?.replace(/^Son of /, "") ?? `Mr. Abdul Rahman`;
  const brideFamily =
    order.brideParents?.replace(/^Daughter of /, "") ?? `Mr. Ibrahim Kutty`;

  return (
    <div
      className="relative"
      style={{
        fontFamily: "var(--font-invitation-sans), system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        "--ib-glass-shadow": theme.glassShadow,
      } as React.CSSProperties}
    >
      {/* ── Cover Screen ── AnimatePresence gives it an exit animation */}
      <AnimatePresence>
        {showCover && (
          <motion.div
            key="cover"
            className="fixed inset-0 z-[100]"
            exit={{ opacity: 0, y: "-8%", scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <CoverScreen
              groom={order.groom}
              bride={order.bride}
              onOpen={handleOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Details Page — always rendered underneath ── */}
      <motion.div
        initial={false}
        animate={showCover ? { opacity: 0, scale: 0.97 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: showCover ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="relative min-h-screen"
        style={{ background: theme.pageBg, transition:"background 0.6s ease" }}
      >
      {/* Floating petals */}
      <FloatingPetals />

      {/* Paper grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] invitation-paper-grain"
        aria-hidden="true"
      />

      {/* Phone frame wrapper — centers on desktop */}
      <div className="mx-auto max-w-[480px] relative z-10 pb-28">

        {/* ── Header ─────────────────────────────────────────── */}
        <InvitationHeader
          groom={order.groom}
          bride={order.bride}
          eventDate={new Date(order.eventDateIso).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" }).replace(/ /g, " · ")}
        />

        {/* Invitation tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.6 }}
          className="text-center px-8 pb-6"
          style={{
            fontSize: "clamp(13px,3.5vw,15px)",
            color: theme.textMid,
            fontStyle: "italic",
            lineHeight: 1.7,
            fontFamily: '"Cormorant Garamond",serif',
          }}
        >
          {order.invitationLine}
        </motion.p>

        {/* ── Countdown ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.75 }}
        >
          <CountdownCard targetDateIso={order.eventDateIso} />
        </motion.div>

        {/* ── Event Cards ────────────────────────────────────── */}
        <EventCards nikah={nikahEvent} walima={walimaEvent} />

        {/* ── Timeline ───────────────────────────────────────── */}
        <Timeline />

        {/* ── Venue ──────────────────────────────────────────── */}
        <VenueCard
          venueName={order.primaryEvent.venue}
          venueAddress={order.primaryEvent.venueAddress}
          mapsUrl={order.primaryEvent.mapsUrl}
        />

        {/* ── Family Blessings ───────────────────────────────── */}
        <FamilyCard groomFamily={groomFamily} brideFamily={brideFamily} />

        {/* ── Quranic Verse ──────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-4 pb-6"
          aria-label="Quranic verse"
        >
          <div
            className="rounded-[28px] p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.mosqueTint}0.18), ${theme.mosqueTint}0.12))`,
              border: `1px solid ${theme.mosqueTint}0.35)`,
            }}
          >
            <p
              className="invitation-arabic mb-3"
              style={{ fontSize: "clamp(17px, 4.5vw, 22px)", color: theme.goldMuted, lineHeight: 2, direction: "rtl" }}
            >
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            </p>
            <p
              className="italic leading-relaxed"
              style={{ fontSize: "12px", color: theme.textLight }}
            >
              &ldquo;And among His signs is that He created for you mates from among yourselves,
              that you may dwell in tranquillity with them.&rdquo;
            </p>
            <p
              className="mt-2 tracking-widest font-semibold"
              style={{ fontSize: "9px", color: theme.gold }}
            >
              — SURAH AR-RUM 30:21
            </p>
          </div>
        </motion.section>

        {/* ── RSVP ───────────────────────────────────────────── */}
        <div ref={rsvpRef}>
          <RSVPCard
            groom={order.groom}
            bride={order.bride}
            webhookUrl={order.rsvp?.webhookUrl}
            rsvpWhatsApp={order.rsvpWhatsApp}
            deadline={order.rsvp?.deadline}
          />
        </div>

        {/* ── Closing Dua ────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-4 pb-6"
          aria-label="Closing dua"
        >
          <div className="text-center py-4">
            {/* Ornamental divider */}
            <div className="flex items-center justify-center gap-3 mb-5" aria-hidden="true">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${theme.mosqueTint}0.4))` }} />
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" fill={theme.dividerColor} opacity="0.6"/>
                <circle cx="10" cy="10" r="1.5" fill={theme.gold}/>
              </svg>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${theme.mosqueTint}0.4))` }} />
            </div>
            <p
              className="invitation-arabic mb-3"
              style={{ fontSize: "clamp(16px, 4vw, 20px)", color: theme.goldMuted, lineHeight: 2, direction: "rtl" }}
            >
              {order.closingDuaArabic ?? "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ"}
            </p>
            <p
              className="italic"
              style={{ fontSize: "12px", color: theme.textLight }}
            >
              {order.closingDua ?? "May Allah bless you both and unite you in goodness."}
            </p>
            <p className="mt-4" style={{ fontSize: "11px", color: theme.textLight }}>
              With duas and love,
            </p>
            <p
              className="mt-1 font-semibold"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "15px",
                color: theme.textDark,
              }}
            >
              The families of {order.groom} &amp; {order.bride}
            </p>
          </div>
        </motion.section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="text-center px-4 pb-4 pt-2">
          <div
            className="h-px mb-5"
            style={{ background: `linear-gradient(to right, transparent, ${theme.mosqueTint}0.3), transparent)` }}
            aria-hidden="true"
          />
          <p style={{ fontSize: "11px", color: theme.textLight }}>
            Crafted with love by{" "}
            <a
              href="https://shaadi.axonstack.in/"
              style={{ color: theme.gold, textDecoration: "none" }}
            >
              axonstack — Shaadi Cards
            </a>
          </p>
        </footer>
      </div>

      {/* ── Sticky Action Bar ──────────────────────────────────── */}
      <ActionBar
        mapsUrl={order.primaryEvent.mapsUrl}
        groom={order.groom}
        bride={order.bride}
        eventDateIso={order.eventDateIso}
        venue={order.primaryEvent.venue}
        venueAddress={order.primaryEvent.venueAddress}
        onRSVP={scrollToRSVP}
      />
      </motion.div>
    </div>
  );
}

export function PetalAtelierCard({ order, initialTheme }: Props) {
  return (
    <ThemeProvider themes={THEMES} initialThemeId={initialTheme ?? "ivory-blush"}>
      <PetalAtelierCardInner order={order} />
    </ThemeProvider>
  );
}
