"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { RsvpForm } from "@/components/rsvp/RsvpForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Snowflake } from "@/components/cards/nordic/Snowflake";
import { FrostProgress } from "@/components/cards/nordic/FrostProgress";
import { FrostUnion } from "@/components/cards/nordic/FrostUnion";
import { FrostTimeline } from "@/components/cards/nordic/FrostTimeline";

/* ── Reduced-motion preference (SSR-safe, no setState-in-effect) ── */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener?.("change", cb);
      return () => m.removeEventListener?.("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/* ── Deterministic particle data ── computed once, identical on server & client
   (a seeded pseudo-random keeps render pure and avoids hydration mismatch). */
function seeded(n: number) {
  const x = Math.sin(n * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
}
const SNOW = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: seeded(i * 6 + 1) * 100,
  top: seeded(i * 6 + 2) * 100,
  delay: seeded(i * 6 + 3) * 10,
  duration: seeded(i * 6 + 4) * 5 + 8,
  size: seeded(i * 6 + 5) * 3 + 1,
  opacity: seeded(i * 6 + 6) * 0.5 + 0.2,
}));
const HEXES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  col: i % 6,
  row: Math.floor(i / 6),
  delay: seeded(i * 2 + 101) * 0.5,
  size: seeded(i * 2 + 102) * 0.3 + 0.7,
}));

/* ── Snowfall Particles ─────────────────────────────────── */
function Snowfall() {
  const reduced = usePrefersReducedMotion();
  // Fewer, static flakes when motion is reduced; full drifting field otherwise.
  const list = reduced ? SNOW.slice(0, 14) : SNOW;
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {list.map((p) => (
        <div key={p.id} className="absolute rounded-full bg-white"
          style={{ width: p.size, height: p.size, left: `${p.x}%`,
            top: reduced ? `${p.top}%` : "-10px", opacity: p.opacity,
            animation: reduced ? undefined : `snow-fall ${p.duration}s ${p.delay}s linear infinite`, filter: "blur(0.5px)" }} />
      ))}
    </div>
  );
}

/* ── Aurora Background ────────────────────────────────────── */
function Aurora() {
  const reduced = usePrefersReducedMotion();
  const drift = (anim: string) => (reduced ? undefined : anim);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #e8f4f8 0%, #fafafa 30%, #f0f7fa 60%, #e8f4f8 100%)" }} />
      <div className="absolute -left-[30%] top-0 h-[80vh] w-[80vw] opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(ellipse at center, #a8c8d8 0%, transparent 70%)", animation: drift("aurora-shift 20s ease-in-out infinite alternate") }} />
      <div className="absolute -right-[20%] top-[20%] h-[60vh] w-[60vw] opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(ellipse at center, #7a9e7e 0%, transparent 70%)", animation: drift("aurora-shift 15s ease-in-out infinite alternate-reverse") }} />
      <div className="absolute bottom-[10%] left-[20%] h-[50vh] w-[50vw] opacity-20 blur-[90px]"
        style={{ background: "radial-gradient(ellipse at center, #c5b3d4 0%, transparent 70%)", animation: drift("aurora-shift 18s ease-in-out infinite alternate") }} />
    </div>
  );
}

/* ── Frost Glass Card ───────────────────────────────────── */
function FrostCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStyle({ transform: `perspective(1200px) rotateX(${(y-0.5)*-6}deg) rotateY(${(x-0.5)*6}deg)`, transition: "transform 0.15s ease-out" });
  }, []);
  const onLeave = useCallback(() => { setStyle({ transform: "perspective(1200px) rotateX(0) rotateY(0)", transition: "transform 0.5s ease-out" }); }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={style}
      className={`relative overflow-hidden rounded-lg border border-white/60 bg-gradient-to-b from-white/80 to-white/60 p-8 shadow-[0_8px_32px_rgba(168,200,216,0.25)] backdrop-blur-2xl ${className}`}>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/40" />
      {children}
    </div>
  );
}

/* ── Hex Crystal Grid ───────────────────────────────────── */
function HexCrystal({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {HEXES.map((h) => {
        const x = 10 + h.col * 15 + (h.row % 2) * 7.5;
        const y = 10 + h.row * 20;
        const visible = progress > h.delay && progress < h.delay + 0.8;
        const opacity = visible ? Math.min(1, (progress - h.delay) / 0.3) * 0.15 : 0;
        return (
          <div key={h.id} className="absolute" style={{ left: `${x}%`, top: `${y}%`, width: `${40 * h.size}px`, height: `${46 * h.size}px`, opacity, transform: `scale(${h.size})`, transition: "opacity 0.8s ease-out" }}>
            <svg viewBox="0 0 40 46" className="h-full w-full">
              <path d="M20 0 L40 11.5 L40 34.5 L20 46 L0 34.5 L0 11.5 Z" fill="none" stroke="rgba(168,200,216,0.5)" strokeWidth="0.5" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

/* ── Countdown ──────────────────────────────────────────── */
function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate);
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const ms = target.getTime() - Date.now();
      if (ms <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({ days: Math.floor(ms / 86400000), hours: Math.floor((ms % 86400000) / 3600000), minutes: Math.floor((ms % 3600000) / 60000), seconds: Math.floor((ms % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [targetDate]);
  const units = [{ label: "Days", value: t.days }, { label: "Hours", value: t.hours }, { label: "Minutes", value: t.minutes }, { label: "Seconds", value: t.seconds }];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {units.map((u) => (
        <FrostCard key={u.label} className="text-center">
          <div className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#2d4a3e] sm:text-4xl">{String(u.value).padStart(2, "0")}</div>
          <div className="mt-1 text-xs tracking-widest text-[#5c7a8c] uppercase">{u.label}</div>
        </FrostCard>
      ))}
    </div>
  );
}

interface Props { order: DeliveredOrder; }

/* ── Main Component ───────────────────────────────────────── */
export function NordicFrostCard({ order }: Props) {
  const [opened, setOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { if (opened) { const t = setTimeout(() => setShowContent(true), 800); return () => clearTimeout(t); } }, [opened]);

  useEffect(() => {
    // rAF-throttle so we update scroll progress at most once per frame
    // instead of on every scroll event (which re-rendered the hex grid).
    let ticking = false;
    const update = () => {
      ticking = false;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? Math.min(1, window.scrollY / scrollHeight) : 0);
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const yesMsg = encodeURIComponent(`Alhamdulillah, I will attend the Nikah of ${order.groom} & ${order.bride}.`);
  const noMsg = encodeURIComponent(`With regret, I am unable to attend the Nikah ceremony of ${order.groom} & ${order.bride}.`);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fafafa] text-[#1a1a1a]">
      <Aurora />
      <Snowfall />
      <HexCrystal progress={scrollProgress * 3} />
      {opened && <FrostProgress />}

      <style jsx>{`
        @keyframes snow-fall { 0% { transform: translateY(0) translateX(0); } 25% { transform: translateY(25vh) translateX(5px); } 50% { transform: translateY(50vh) translateX(-3px); } 75% { transform: translateY(75vh) translateX(4px); } 100% { transform: translateY(110vh) translateX(0); } }
        @keyframes aurora-shift { 0% { transform: translateX(-10%) translateY(-5%) scale(1); } 100% { transform: translateX(10%) translateY(5%) scale(1.1); } }
      `}</style>

      {/* Opening Screen */}
      {!opened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#fafafa]/95 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="relative z-10 px-6 text-center">
            <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-lg border border-[#a8c8d8]/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(168,200,216,0.15)]">
              <Snowflake className="absolute h-28 w-28 opacity-30" strokeWidth={1} />
              <span className="relative font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#2d4a3e]">{order.groom[0]}&{order.bride[0]}</span>
            </div>
            <p className="mb-2 font-[family-name:var(--font-invitation-script)] text-lg text-[#5c7a8c]">The Nikah of</p>
            <p className="mb-8 font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#1a1a1a]">{order.groom} <span className="text-[#7a9e7e]">&amp;</span> {order.bride}</p>
            <button onClick={() => setOpened(true)} className="rounded-lg border border-[#2d4a3e]/30 bg-gradient-to-r from-[#2d4a3e]/10 via-[#2d4a3e]/5 to-[#2d4a3e]/10 px-10 py-3 text-sm font-semibold tracking-widest text-[#2d4a3e] uppercase backdrop-blur-sm transition-all duration-300 hover:border-[#2d4a3e]/50 hover:from-[#2d4a3e]/20 hover:shadow-[0_0_30px_rgba(45,74,62,0.15)]">Open Invitation</button>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}>
            <p dir="rtl" lang="ar" className="mb-6 text-3xl leading-loose tracking-wide text-[#2d4a3e] sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-invitation-arabic), serif" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}>
            <div className="mx-auto mb-6 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#a8c8d8]" />
              <Snowflake className="h-7 w-7" strokeWidth={2} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#a8c8d8]" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}>
            <p className="mb-8 font-[family-name:var(--font-invitation-script)] text-xl text-[#5c7a8c] sm:text-2xl">{order.invitationLine}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1.2, type: "spring", stiffness: 60 }}>
            <FrostCard className="mx-auto max-w-2xl">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
                style={{ background: "radial-gradient(circle, rgba(168,200,216,0.35) 0%, rgba(122,158,126,0.12) 40%, transparent 70%)" }} />
              <h1 className="relative font-[family-name:var(--font-invitation-serif)] font-bold leading-tight" style={{ textWrap: "balance" }}>
                <motion.span className="block text-[#1a1a1a]" style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
                  initial={{ opacity: 0, y: 12, filter: "blur(18px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }}>{order.groom}</motion.span>
                <motion.span className="my-2 block font-[family-name:var(--font-invitation-script)] text-5xl text-[#7a9e7e]"
                  initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.0, duration: 0.8, type: "spring", stiffness: 120 }}>&amp;</motion.span>
                <motion.span className="block text-[#1a1a1a]" style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
                  initial={{ opacity: 0, y: 12, filter: "blur(18px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 1.05, duration: 1.1, ease: "easeOut" }}>{order.bride}</motion.span>
              </h1>
            </FrostCard>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }}>
            <p className="mt-8 text-lg text-[#5c7a8c]">We request the honour of your presence at our {order.ceremonyHeadline}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }}>
            <FrostCard className="mx-auto mt-10 max-w-lg">
              <Badge variant="outline" className="mb-3 border-[#2d4a3e]/30 bg-[#2d4a3e]/5 tracking-[0.3em] text-[#2d4a3e]">{order.primaryEvent.label}</Badge>
              <div className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#1a1a1a]">{order.primaryEvent.date}</div>
              {order.primaryEvent.hijriDate && (
                <div className="mt-1 text-sm text-[#2d4a3e]/70">{order.primaryEvent.hijriDate}</div>
              )}
              <div className="mt-1 text-[#5c7a8c]">{order.primaryEvent.time}</div>
              <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-[#a8c8d8] to-transparent" />
              <div className="text-[#5c7a8c]">
                <div className="font-semibold text-[#1a1a1a]">{order.primaryEvent.venue}</div>
                <div className="text-sm">{order.primaryEvent.venueAddress}</div>
              </div>
            </FrostCard>
          </motion.div>
        </section>

        {/* Ayah */}
        <section className="relative px-4 py-28 text-center">
          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <div className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-[#a8c8d8] to-transparent" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 1 }}>
              <p dir="rtl" lang="ar" className="mb-6 text-xl leading-loose text-[#2d4a3e]/80 sm:text-2xl" style={{ fontFamily: "var(--font-invitation-arabic), serif" }}>
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1 }}>
              <p className="font-[family-name:var(--font-invitation-script)] text-lg italic leading-relaxed text-[#5c7a8c] sm:text-xl">
                &ldquo;And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity, and He has placed between you affection and mercy.&rdquo;
              </p>
              <p className="mt-4 text-sm tracking-widest text-[#2d4a3e]/60">— SURAH AR-RUM 30:21</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1 }}>
              <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#a8c8d8] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Countdown */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#2d4a3e]/60">COUNTING THE DAYS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="mb-14 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#1a1a1a] sm:text-4xl">Until We Say Qabool</motion.h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <Countdown targetDate={order.eventDateIso} />
            </motion.div>
          </div>
        </section>

        {/* Union — forming crystals */}
        <FrostUnion order={order} />

        {/* Timeline — frost meridian */}
        <FrostTimeline items={order.timeline} />

        {/* Venue */}
        <section className="relative px-4 py-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#1a1a1a] sm:text-4xl">Venue</motion.h2>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <FrostCard className="p-10">
                <div className="mx-auto mb-5 flex h-8 w-8 items-center justify-center"><div className="h-2.5 w-2.5 rotate-45 bg-[#a8c8d8]" /></div>
                <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#1a1a1a]">{order.primaryEvent.venue}</h3>
                <p className="mt-3 text-[#5c7a8c]">{order.primaryEvent.venueAddress}</p>
                <Button asChild variant="ghost" className="mt-6 h-auto rounded-lg bg-gradient-to-r from-[#2d4a3e] to-[#3d5a4e] px-8 py-3 font-semibold text-white hover:from-[#3d5a4e] hover:to-[#4d6a5e] hover:text-white hover:shadow-[0_0_30px_rgba(45,74,62,0.2)]">
                  <a href={order.primaryEvent.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Maps</a>
                </Button>
              </FrostCard>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/40">
              {(() => { const lat = order.primaryEvent.lat; const lng = order.primaryEvent.lng; const hasCoords = typeof lat === "number" && typeof lng === "number"; const delta = 0.005; const bbox = hasCoords ? `${lng-delta}%2C${lat-delta}%2C${lng+delta}%2C${lat+delta}` : "75.859%2C11.173%2C75.869%2C11.183"; const marker = hasCoords ? `${lat}%2C${lng}` : "11.178%2C75.864"; return <iframe title={`Map of ${order.primaryEvent.venue}`} src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />; })()}
            </motion.div>
          </div>
        </section>

        {/* RSVP */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-xl text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><div className="mx-auto mb-5 flex h-8 w-8 items-center justify-center"><div className="h-2.5 w-2.5 rotate-45 bg-[#a8c8d8]" /></div></motion.div>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#1a1a1a] sm:text-4xl">Kindly Respond</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mb-8 text-[#5c7a8c]">
              Your presence would honour us.{" "}
              {order.rsvp?.deadline ? (
                <>Please confirm by <Badge variant="outline" className="border-[#7a9e7e]/40 bg-[#7a9e7e]/10 align-middle text-[#2d4a3e]">{order.rsvp.deadline}</Badge>.</>
              ) : (
                "Please let us know if you can make it."
              )}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              {order.rsvp?.webhookUrl ? <RsvpForm order={order} /> : (
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button asChild variant="ghost" className="h-auto rounded-lg bg-gradient-to-r from-[#2d4a3e] to-[#3d5a4e] px-8 py-4 text-base font-semibold text-white hover:text-white hover:shadow-[0_0_30px_rgba(45,74,62,0.2)]">
                    <a href={`https://wa.me/${order.rsvpWhatsApp}?text=${yesMsg}`} target="_blank" rel="noopener noreferrer">Yes, I will attend</a>
                  </Button>
                  <Button asChild variant="ghost" className="h-auto rounded-lg border border-[#a8c8d8]/40 bg-white/40 px-8 py-4 text-base font-semibold text-[#2d4a3e] backdrop-blur-sm hover:bg-white/60 hover:text-[#2d4a3e]">
                    <a href={`https://wa.me/${order.rsvpWhatsApp}?text=${noMsg}`} target="_blank" rel="noopener noreferrer">Regretfully decline</a>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Closing Dua */}
        {(order.closingDuaArabic || order.closingDua) && (
          <section className="relative px-4 pt-8 pb-4 text-center">
            <div className="relative z-10 mx-auto max-w-2xl">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-[#a8c8d8] to-transparent" />
                {order.closingDuaArabic && (
                  <p dir="rtl" lang="ar" className="mb-4 text-xl leading-loose text-[#2d4a3e]/85 sm:text-2xl" style={{ fontFamily: "var(--font-invitation-arabic), serif" }}>
                    {order.closingDuaArabic}
                  </p>
                )}
                {order.closingDua && (
                  <p className="font-[family-name:var(--font-invitation-script)] text-lg italic text-[#5c7a8c] sm:text-xl">&ldquo;{order.closingDua}&rdquo;</p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="relative px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center"><Snowflake className="h-8 w-8" strokeWidth={2} /></div>
          <p className="font-[family-name:var(--font-invitation-script)] text-lg text-[#5c7a8c]">With love, {order.groom} &amp; {order.bride}</p>
          <p className="mt-2 font-[family-name:var(--font-invitation-serif)] text-lg font-bold text-[#2d4a3e]">The families of {order.groom} &amp; {order.bride}</p>
          <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[#a8c8d8]/30 to-transparent" />
          <p className="mt-6 text-xs tracking-widest text-[#1a1a1a]/55">
            Crafted by <a href="https://axonstack.in/apps/shaadi-cards" target="_blank" rel="noopener noreferrer" className="text-[#2d4a3e]/80 transition-colors hover:text-[#2d4a3e]">axonstack</a> — Shaadi Cards
          </p>
        </footer>
      </div>
    </main>
  );
}

