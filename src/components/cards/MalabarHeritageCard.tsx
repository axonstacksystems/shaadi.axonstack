"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { FloatingDecor } from "./malabar-heritage/FloatingDecor";
import { InvitationHeader } from "./malabar-heritage/InvitationHeader";
import { CountdownCard } from "./malabar-heritage/CountdownCard";
import { EventCards } from "./malabar-heritage/EventCards";
import { Timeline } from "./malabar-heritage/Timeline";
import { VenueCard } from "./malabar-heritage/VenueCard";
import { FamilyCard } from "./malabar-heritage/FamilyCard";
import { RSVPCard } from "./malabar-heritage/RSVPCard";
import { ActionBar } from "./malabar-heritage/ActionBar";
import { CoverScreen } from "./malabar-heritage/CoverScreen";
import { MusicPlayer } from "./malabar-heritage/MusicPlayer";
import { ThemeProvider, useTheme } from "./malabar-heritage/ThemeContext";
import { THEMES } from "./malabar-heritage/themes";

interface Props {
  order: DeliveredOrder;
  initialTheme?: string;
  showToolbar?: boolean;
}

function MalabarHeritageCardInner({ order, showToolbar }: Props) {
  const { theme } = useTheme();
  const rsvpRef = useRef<HTMLDivElement>(null);
  const [showCover, setShowCover] = useState(true);

  function handleOpen() {
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

  const groomFamily = order.groomParents?.replace(/^Son of /, "") ?? "";
  const brideFamily = order.brideParents?.replace(/^Daughter of /, "") ?? "";

  return (
    <div
      className="relative"
      style={{
        fontFamily: "var(--font-invitation-sans), system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        "--ib-glass-shadow": theme.glassShadow,
      } as React.CSSProperties}
    >
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

      <motion.div
        initial={false}
        animate={showCover ? { opacity: 0, scale: 0.97 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: showCover ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="relative min-h-screen"
        style={{ background: theme.pageBg, transition: "background 0.6s ease" }}
      >
        <FloatingDecor />

        <div
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] invitation-paper-grain"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[420px] relative z-10 pb-28">

          <InvitationHeader
            groom={order.groom}
            bride={order.bride}
            eventDate={new Date(order.eventDateIso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }).replace(/ /g, " · ")}
          />

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.75 }}
          >
            <CountdownCard targetDateIso={order.eventDateIso} />
          </motion.div>

          <EventCards nikah={nikahEvent} walima={walimaEvent} />

          <Timeline steps={order.timeline?.map(t => t.event) ?? []} />

          <VenueCard
            venueName={order.primaryEvent.venue}
            venueAddress={order.primaryEvent.venueAddress}
            mapsUrl={order.primaryEvent.mapsUrl}
          />

          <FamilyCard groomFamily={groomFamily} brideFamily={brideFamily} />

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

          <div ref={rsvpRef}>
            <RSVPCard
              groom={order.groom}
              bride={order.bride}
              ceremonyHeadline={order.ceremonyHeadline}
              rsvpWhatsApp={order.rsvpWhatsApp}
            />
          </div>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="px-4 pb-6"
            aria-label="Closing dua"
          >
            <div className="text-center py-4">
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

      {!showCover && (
        <MusicPlayer
          audioUrl="/music/nasheed.mp3"
          startPlaying
        />
      )}
    </div>
  );
}

export function MalabarHeritageCard({ order, initialTheme, showToolbar = false }: Props) {
  return (
    <ThemeProvider themes={THEMES} initialThemeId={initialTheme ?? "emerald-gold"}>
      <MalabarHeritageCardInner order={order} showToolbar={showToolbar} />
    </ThemeProvider>
  );
}
