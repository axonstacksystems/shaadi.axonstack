"use client";

import { useEffect, useState, useId } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeContext";
import { THEMES, THEME_ORDER } from "./themes";
import { PreviewToolbar } from "../petal-atelier/PreviewToolbar";

interface CoverScreenProps {
  groom: string;
  bride: string;
  date: string;
  ceremonyHeadline: string;
  rsvpWhatsApp: string;
  showToolbar?: boolean;
  onOpen: () => void;
}

/* ─────────────────────────────────────────────────────────────
   Kerala gable roof silhouette — signature architecture
───────────────────────────────────────────────────────────── */
function KeralaGable({ gold, goldLight, petalFill }: { gold: string; goldLight: string; petalFill: string }) {
  return (
    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <path d="M150 10 L50 90 L250 90 Z" stroke={gold} strokeWidth="1.5" fill={petalFill} opacity="0.08"/>
      <path d="M150 10 L60 85 L240 85 Z" stroke={goldLight} strokeWidth="0.8" fill="none" opacity="0.15"/>
      <line x1="150" y1="10" x2="80" y2="85" stroke={gold} strokeWidth="0.5" opacity="0.2"/>
      <line x1="150" y1="10" x2="120" y2="85" stroke={gold} strokeWidth="0.5" opacity="0.2"/>
      <line x1="150" y1="10" x2="180" y2="85" stroke={gold} strokeWidth="0.5" opacity="0.2"/>
      <line x1="150" y1="10" x2="220" y2="85" stroke={gold} strokeWidth="0.5" opacity="0.2"/>
      <circle cx="150" cy="10" r="3" fill={gold} opacity="0.6"/>
      <line x1="150" y1="3" x2="150" y2="10" stroke={gold} strokeWidth="1" opacity="0.5"/>
      <line x1="40" y1="90" x2="260" y2="90" stroke={gold} strokeWidth="0.5" opacity="0.15"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Vertical palm frond border — runs full height on sides
───────────────────────────────────────────────────────────── */
function PalmFrondBorder({ side, gold, petalPrimary, petalSecondary }: { side: "left" | "right"; gold: string; petalPrimary: string; petalSecondary: string }) {
  return (
    <svg viewBox="0 0 60 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", transform: side === "right" ? "scaleX(-1)" : undefined, transformOrigin: "center" }}
      aria-hidden="true">
      <line x1="30" y1="0" x2="30" y2="800" stroke={gold} strokeWidth="0.8" opacity="0.25"/>
      {[40, 120, 200, 280, 360, 440, 520, 600, 680, 760].map((y, i) => (
        <g key={y}>
          <path d={`M30 ${y} Q15 ${y - 20} 8 ${y - 35} Q12 ${y - 25} 30 ${y}`} fill={petalPrimary} opacity={0.15 + (i % 3) * 0.05} />
          <path d={`M30 ${y + 20} Q45 ${y} 52 ${y - 15} Q48 ${y - 5} 30 ${y + 20}`} fill={petalSecondary} opacity={0.12 + (i % 3) * 0.04} />
          <circle cx="30" cy={y} r="1.5" fill={gold} opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Kerala gold border strip — horizontal decorative band
───────────────────────────────────────────────────────────── */
function GoldBorderStrip({ gold, goldLight }: { gold: string; goldLight: string }) {
  return (
    <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <line x1="0" y1="10" x2="300" y2="10" stroke={gold} strokeWidth="0.5" opacity="0.4"/>
      {[20, 60, 100, 140, 180, 220, 260].map((x) => (
        <g key={x}>
          <path d={`M${x} 10 L${x + 4} 6 L${x + 8} 10 L${x + 4} 14 Z`} fill={gold} opacity="0.5"/>
          <circle cx={x + 4} cy="10" r="1" fill={goldLight} opacity="0.7"/>
        </g>
      ))}
      {[40, 80, 120, 160, 200, 240].map((x) => (
        <circle key={x} cx={x} cy="10" r="0.8" fill={gold} opacity="0.3"/>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Gold dust particles — subtle falling motes
───────────────────────────────────────────────────────────── */
interface Mote { id: number; left: number; delay: number; duration: number; size: number; }

function useGoldDust(n: number): Mote[] {
  const [list, setList] = useState<Mote[]>([]);
  useEffect(() => {
    setList(Array.from({ length: n }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 10,
      size: 2 + Math.random() * 4,
    })));
  }, [n]);
  return list;
}

function GoldDust({ motes, gold }: { motes: Mote[]; gold: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[9]" aria-hidden="true">
      {motes.map((mote) => (
        <motion.div
          key={mote.id}
          className="absolute rounded-full"
          style={{ left: `${mote.left}%`, width: mote.size, height: mote.size, background: gold, opacity: 0.15 + Math.random() * 0.15 }}
          animate={{ y: ["-5%", "105%"], x: [0, Math.random() * 20 - 10, 0], opacity: [0, 0.25, 0] }}
          transition={{ duration: mote.duration, delay: mote.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export function CoverScreen({
  groom,
  bride,
  date,
  ceremonyHeadline,
  rsvpWhatsApp,
  showToolbar,
  onOpen,
}: CoverScreenProps) {
  const { theme, themeId } = useTheme();
  const router = useRouter();
  const uid = useId();
  const dust = useGoldDust(24);

  const nextThemeId = THEME_ORDER[(THEME_ORDER.indexOf(themeId) + 1) % THEME_ORDER.length];
  const nextTheme = THEMES[nextThemeId];

  function handleThemeSwitch() {
    router.push(`/designs/malabar-heritage/${nextThemeId}`);
  }

  // Swipe-up + scroll-down gesture to open invitation
  useEffect(() => {
    let startY = 0;
    let startTime = 0;
    function onTouchStart(e: TouchEvent) {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    }
    function onTouchEnd(e: TouchEvent) {
      const deltaY = startY - e.changedTouches[0].clientY;
      if (deltaY > 50 && Date.now() - startTime < 800) onOpen();
    }
    function onWheel(e: WheelEvent) {
      if (e.deltaY > 30) onOpen();
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("wheel", onWheel);
    };
  }, [onOpen]);

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{ height: "100dvh", width: "100%", background: theme.coverBg, transition: "background 0.6s ease", touchAction: "pan-y" }}
    >
      {/* ═══ LAYER 0 — ambient radial glow ═══ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          background: [
            `radial-gradient(ellipse 50% 50% at 50% 25%, ${theme.ambientTop} 0%, transparent 60%)`,
            `radial-gradient(ellipse 70% 35% at 50% 95%, ${theme.ambientBottom} 0%, transparent 55%)`,
          ].join(","),
          transition: "background 0.6s ease",
        }}
      />

      {/* ═══ LAYER 1 — Kerala paddy-field pattern (horizontal lines) ═══ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 18px, ${theme.mosqueTint}0.04) 18px, ${theme.mosqueTint}0.04) 19px)`,
          maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* ═══ LAYER 2 — Palm frond borders (full height, both sides) ═══ */}
      <div className="pointer-events-none absolute top-0 left-0 bottom-0 z-[6]" aria-hidden="true"
        style={{ width: "clamp(40px, 12vw, 60px)" }}>
        <PalmFrondBorder side="left" gold={theme.gold} petalPrimary={theme.petalPrimary} petalSecondary={theme.petalSecondary} />
      </div>
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-[6]" aria-hidden="true"
        style={{ width: "clamp(40px, 12vw, 60px)" }}>
        <PalmFrondBorder side="right" gold={theme.gold} petalPrimary={theme.petalPrimary} petalSecondary={theme.petalSecondary} />
      </div>

      {/* ═══ LAYER 3 — Kerala gable roof at top center ═══ */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-[5]"
        style={{ width: "clamp(200px, 60vw, 320px)", height: "clamp(100px, 20vh, 160px)", opacity: 0.5 }}
        aria-hidden="true">
        <KeralaGable gold={theme.gold} goldLight={theme.goldLight} petalFill={theme.petalFill} />
      </div>

      {/* ═══ LAYER 4 — Gold dust particles ═══ */}
      <GoldDust motes={dust} gold={theme.gold} />

      {/* ═══ LAYER 5 — Content ═══ */}
      <div
        className="absolute inset-0 z-[10] flex flex-col items-center justify-between"
        style={{ paddingTop: "clamp(20px, 6dvh, 40px)", paddingBottom: "clamp(80px, 18dvh, 130px)", paddingLeft: "clamp(50px, 14vw, 72px)", paddingRight: "clamp(50px, 14vw, 72px)" }}
      >
        {/* ── TOP: Bismillah ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-center"
        >
          <p
            className="invitation-arabic"
            style={{
              fontSize: "clamp(15px, 3.8vw, 22px)",
              fontWeight: 500,
              color: theme.arabicColor,
              lineHeight: 2,
              direction: "rtl",
              textShadow: `0 2px 12px ${theme.mosqueTint}0.5)`,
            }}
            aria-label="Bismillah ir-Rahman ir-Rahim"
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </motion.div>

        {/* ── CENTER: Names + gold border strip ── */}
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55 }}
            className="text-center"
          >
            <h1
              style={{ fontFamily: '"Cormorant Garamond","Bodoni Moda",serif', margin: 0, lineHeight: 1.1 }}
            >
              <span style={{ fontSize: "clamp(32px, 8.5vw, 52px)", fontWeight: 600, color: "#FAF8F3", letterSpacing: "-0.01em" }}>
                {groom}
              </span>
              <span style={{ fontSize: "clamp(20px, 5vw, 32px)", fontWeight: 200, fontStyle: "italic", color: theme.goldLight, margin: "0 0.3em", letterSpacing: "0.1em", fontFamily: '"Cormorant Garamond",serif', verticalAlign: "middle" }}>
                &amp;
              </span>
              <span style={{ fontSize: "clamp(32px, 8.5vw, 52px)", fontWeight: 600, color: "#FAF8F3", letterSpacing: "-0.01em" }}>
                {bride}
              </span>
            </h1>
          </motion.div>

          {/* Gold border strip — full width */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="w-full mt-6"
            style={{ height: 20 }}
            aria-hidden="true"
          >
            <GoldBorderStrip gold={theme.gold} goldLight={theme.goldLight} />
          </motion.div>

          {/* Ceremony headline + date */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="text-center mt-4"
            style={{
              fontSize: "clamp(11px, 2.8vw, 14px)",
              color: "rgba(250,248,243,0.65)",
              fontFamily: '"Cormorant Garamond",serif',
              fontStyle: "italic",
              lineHeight: 1.65,
            }}
          >
            Together with their families,<br/>
            request the honor of your presence<br/>
            at their <strong style={{ fontStyle: "normal", color: theme.goldLight }}>{ceremonyHeadline}</strong>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-3"
            style={{
              fontSize: "clamp(9px, 2.2vw, 11px)",
              color: theme.gold,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
              fontWeight: 500,
            }}
          >
            {date}
          </motion.p>
        </div>

        {/* ── BOTTOM: CTA ── */}
        <div className="flex flex-col items-center w-full">
          <motion.button
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            aria-label="Open invitation"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              height: 56,
              width: "min(280px, 85%)",
              background: theme.petalSecondary,
              border: `1.5px solid ${theme.gold}`,
              borderRadius: 12,
              cursor: "pointer",
              boxShadow: [`0 8px 28px ${theme.mosqueTint}0.3)`, `inset 0 1px 0 rgba(255,255,255,0.1)`].join(","),
              transition: "background 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            <span style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: "clamp(15px, 4vw, 18px)", fontWeight: 600, color: theme.goldLight, letterSpacing: "0.05em" }}>
              Open Invitation
            </span>
            <ChevronRight size={20} color={theme.goldLight} strokeWidth={2} />
          </motion.button>

          {/* Gold line draw animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="mt-5"
            style={{ width: "min(200px, 60%)", height: 1, background: `linear-gradient(to right, transparent, ${theme.gold}, transparent)`, transformOrigin: "center" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {showToolbar && (
        <PreviewToolbar
          accentColor={theme.gold}
          nextThemeSwatch={nextTheme.swatch}
          nextThemeLabel={nextTheme.label}
          nextThemeAriaLabel={`Switch to ${nextTheme.label} theme`}
          mrp="₹2,000"
          salePrice="₹999"
          discountLabel="50% OFF"
          whatsappHref={`https://wa.me/${rsvpWhatsApp}?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(theme.label)}%20wedding%20invitation%20%E2%80%94%20please%20share%20details!`}
          onThemeSwitch={handleThemeSwitch}
        />
      )}
    </div>
  );
}
