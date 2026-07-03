"use client";

import { useEffect, useRef, useState } from "react";
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
import { MusicPlayer } from "./petal-atelier/MusicPlayer";
import { ThemeProvider, useTheme } from "./petal-atelier/ThemeContext";
import { THEMES } from "./petal-atelier/themes";

interface Props {
  order: DeliveredOrder;
  initialTheme?: string;
  showToolbar?: boolean;
}

function PetalAtelierCardInner({ order, showToolbar }: Props) {
  const { theme } = useTheme();
  const rsvpRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showCover, setShowCover] = useState(true);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, []);

  function handleOpen() {
    // Create and start audio within the user gesture to satisfy autoplay policies
    if (!audioRef.current) {
      const audio = document.createElement("audio");
      audio.src = "/music/nasheed.mp3";
      audio.loop = true;
      audio.volume = 0.4;
      audio.preload = "auto";
      audio.style.display = "none";
      document.body.appendChild(audio);
      audioRef.current = audio;
    }
    const audio = audioRef.current;
    audio
      .play()
      .then(() => console.log("[PetalAtelier] music started"))
      .catch((err) => console.warn("[PetalAtelier] autoplay blocked:", err?.name, err?.message));

    setShowCover(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  function scrollToRSVP() {
    rsvpRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const nikahEvent = {
    icon: "mosque" as const,
    title: order.ceremonyHeadline,
    date: order.primaryEvent.date,
    time: order.primaryEvent.time,
    venue: order.primaryEvent.venue,
  };

  const receptionItem = order.timeline?.find(t => t.event.toLowerCase().includes("reception"));
  const walimaEvent = {
    icon: "floral" as const,
    title: receptionItem?.event ?? "Wedding Reception",
    date: order.primaryEvent.date,
    time: receptionItem?.time ?? "7:00 PM",
    venue: order.primaryEvent.venue,
  };

  const groomFamily =
    order.groomParents?.replace(/^Son of /, "") ?? "";
  const brideFamily =
    order.brideParents?.replace(/^Daughter of /, "") ?? "";

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
              date={order.primaryEvent.date}
              ceremonyHeadline={order.ceremonyHeadline}
              rsvpWhatsApp={order.rsvpWhatsApp}
              showToolbar={showToolbar}
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
        <Timeline steps={order.timeline?.map(t => t.event) ?? []} />

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
            ceremonyHeadline={order.ceremonyHeadline}
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
              {order.groom} &amp; {order.bride}
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
        ceremonyHeadline={order.ceremonyHeadline}
        eventDateIso={order.eventDateIso}
        venue={order.primaryEvent.venue}
        venueAddress={order.primaryEvent.venueAddress}
        onRSVP={scrollToRSVP}
      />
      </motion.div>

      {/* ── Background Music ──────────────────────────────────── */}
      {!showCover && (
        <MusicPlayer
          audioUrl="/music/nasheed.mp3"
          startPlaying
          audioElement={audioRef.current}
        />
      )}
    </div>
  );
}

export function PetalAtelierCard({ order, initialTheme, showToolbar = false }: Props) {
  return (
    <ThemeProvider themes={THEMES} initialThemeId={initialTheme ?? "ivory-blush"}>
      <PetalAtelierCardInner order={order} showToolbar={showToolbar} />
    </ThemeProvider>
  );
}
