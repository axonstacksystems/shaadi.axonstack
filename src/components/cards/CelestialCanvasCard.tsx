"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { RsvpForm } from "@/components/rsvp/RsvpForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Khatam } from "@/components/cards/shared/Khatam";
import { Nebula } from "@/components/cards/celestial/Nebula";
import { OrbitProgress } from "@/components/cards/celestial/OrbitProgress";
import { OrbitalUnion } from "@/components/cards/celestial/OrbitalUnion";
import { ConstellationTimeline } from "@/components/cards/celestial/ConstellationTimeline";

interface Props {
  order: DeliveredOrder;
}

/* ── Starfield Canvas Background ──────────────────────────── */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Array<{
    x: number; y: number; size: number; opacity: number;
    speed: number; twinkleSpeed: number; twinklePhase: number;
    layer: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Scale the starfield density to the device so low-end phones stay smooth.
    const area = window.innerWidth * window.innerHeight;
    const isSmall = window.innerWidth < 640;
    const count = isSmall ? 120 : Math.min(250, Math.round(area / 9000));

    const stars: typeof starsRef.current = [];
    for (let i = 0; i < count; i++) {
      const layer = i < count * 0.4 ? 0 : i < count * 0.72 ? 1 : 2;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (layer === 2 ? 2.5 : 1.5) + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        speed: layer === 0 ? 0.02 : layer === 1 ? 0.05 : 0.12,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        layer,
      });
    }
    starsRef.current = stars;

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // No mouse parallax when motion is reduced (and it is desktop-only anyway).
      const mx = reduceMotion ? 0 : mouseRef.current.x * 0.3;
      const my = reduceMotion ? 0 : mouseRef.current.y * 0.3;
      stars.forEach((star) => {
        const twinkle = reduceMotion ? 1 : Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const parallaxX = star.layer === 0 ? mx * 0.2 : star.layer === 1 ? mx * 0.5 : mx * 1;
        const parallaxY = star.layer === 0 ? my * 0.2 : star.layer === 1 ? my * 0.5 : my * 1;
        const px = (star.x + parallaxX) % canvas.width;
        const py = (star.y + parallaxY) % canvas.height;
        const fx = px < 0 ? px + canvas.width : px;
        const fy = py < 0 ? py + canvas.height : py;
        ctx.beginPath();
        ctx.arc(fx, fy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 228, 184, ${star.opacity * twinkle})`;
        ctx.fill();
        if (star.size > 1.8) {
          ctx.beginPath();
          ctx.arc(fx, fy, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 228, 184, ${star.opacity * twinkle * 0.08})`;
          ctx.fill();
        }
      });
    };

    let animId = 0;
    const loop = (time: number) => {
      drawFrame(time);
      animId = requestAnimationFrame(loop);
    };

    // Static render for reduced-motion users; animated loop otherwise.
    if (reduceMotion) {
      drawFrame(0);
    } else {
      animId = requestAnimationFrame(loop);
    }

    // Pause the loop when the tab/card is not visible to save battery.
    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        if (animId) { cancelAnimationFrame(animId); animId = 0; }
      } else if (!animId) {
        animId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 };
  }, []);

  return (
    <canvas ref={canvasRef} onMouseMove={onMouseMove} className="pointer-events-auto fixed inset-0 z-0"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0d1b2a 40%, #050508 100%)" }} />
  );
}

/* ── 3D Tilt Glass Card ────────────────────────────────────── */
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -10;
    const ry = (x - 0.5) * 10;
    setStyle({ transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01,1.01,1.01)`, transition: "transform 0.1s ease-out" });
  }, []);
  const onLeave = useCallback(() => {
    setStyle({ transform: "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)", transition: "transform 0.4s ease-out" });
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={style}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl ${className}`}>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
      {children}
    </div>
  );
}

/* ── Countdown Timer ──────────────────────────────────────── */
function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate);
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const ms = target.getTime() - Date.now();
      if (ms <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({ days: Math.floor(ms / 86400000), hours: Math.floor((ms % 86400000) / 3600000), minutes: Math.floor((ms % 3600000) / 60000), seconds: Math.floor((ms % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  const units = [
    { label: "Days", value: t.days }, { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes }, { label: "Seconds", value: t.seconds },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {units.map((u) => (
        <GlassCard key={u.label} className="text-center">
          <div className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#f4e4b8] sm:text-4xl">{String(u.value).padStart(2, "0")}</div>
          <div className="mt-1 text-xs tracking-widest text-white/40 uppercase">{u.label}</div>
        </GlassCard>
      ))}
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
export function CelestialCanvasCard({ order }: Props) {
  const [opened, setOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => { if (opened) { const t = setTimeout(() => setShowContent(true), 800); return () => clearTimeout(t); } }, [opened]);
  const yesMsg = encodeURIComponent(`Alhamdulillah, I will attend the Nikah of ${order.groom} & ${order.bride}.`);
  const noMsg = encodeURIComponent(`With regret, I am unable to attend the Nikah ceremony of ${order.groom} & ${order.bride}.`);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050508] text-white">
      <Starfield />
      <Nebula />
      {opened && <OrbitProgress />}
      <div className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(26,10,46,0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(13,27,42,0.3) 0%, transparent 50%)" }} />

      {/* ── Shooting Star Curtain ────────────────────────── */}
      {!opened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#050508]/95" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ top: `${20 + i * 12}%`, left: `${-10 + i * 15}%`, transform: "rotate(-35deg)", animation: `shoot-star 1.5s ${0.3 + i * 0.2}s ease-out forwards`, opacity: 0 }} />
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative z-10 px-6 text-center">
            <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-[#f4e4b8]/20 bg-white/5 backdrop-blur-md">
              <Khatam className="absolute h-24 w-24 opacity-30" strokeWidth={1} />
              <span className="bg-gradient-to-br from-[#d4af37] to-[#f4e4b8] bg-clip-text text-3xl font-bold text-transparent">{order.groom[0]}&{order.bride[0]}</span>
            </div>
            <p className="mb-2 font-[family-name:var(--font-invitation-script)] text-lg text-white/50">The Nikah of</p>
            <p className="mb-8 font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-white">{order.groom} <span className="text-[#b76e79]">&amp;</span> {order.bride}</p>
            <button onClick={() => setOpened(true)}
              className="rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/10 to-[#d4af37]/20 px-10 py-3 text-sm font-semibold tracking-widest text-[#f4e4b8] uppercase backdrop-blur-sm transition-all duration-300 hover:border-[#d4af37] hover:from-[#d4af37]/30"
              style={{ animation: "pulse-glow 3s ease-in-out infinite" }}>
              Open Invitation
            </button>
          </motion.div>
        </div>
      )}

      {/* Top-level styles for keyframes */}
      <style jsx>{`
        @keyframes shoot-star {
          0% { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(120vw) translateY(-40vh) rotate(-35deg); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.15); }
          50% { box-shadow: 0 0 40px rgba(212,175,55,0.3); }
        }
      `}</style>

      {/* ── Content ────────────────────────────────────────── */}
      <div className={`relative z-10 transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}>
            <p dir="rtl" lang="ar" className="mb-6 text-3xl leading-loose tracking-wide text-[#f4e4b8] sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-invitation-arabic), serif", textShadow: "0 0 24px rgba(212,175,55,0.25)" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}>
            <div className="mx-auto mb-6 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
              <Khatam className="h-7 w-7" strokeWidth={2} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}>
            <p className="mb-8 font-[family-name:var(--font-invitation-script)] text-xl text-white/60 sm:text-2xl">{order.invitationLine}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1.2, type: "spring", stiffness: 60 }}>
            <GlassCard className="mx-auto max-w-2xl">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
                style={{ background: "radial-gradient(circle, rgba(183,110,121,0.16) 0%, rgba(212,175,55,0.10) 35%, transparent 70%)" }} />
              <h1 className="relative font-[family-name:var(--font-invitation-serif)] font-bold leading-tight" style={{ textWrap: "balance" }}>
                <motion.span className="block text-white" style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
                  initial={{ opacity: 0, y: 12, filter: "blur(18px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }}>{order.groom}</motion.span>
                <motion.span className="my-2 block font-[family-name:var(--font-invitation-script)] text-5xl text-[#b76e79]"
                  initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.0, duration: 0.8, type: "spring", stiffness: 120 }}>&amp;</motion.span>
                <motion.span className="block text-white" style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
                  initial={{ opacity: 0, y: 12, filter: "blur(18px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 1.05, duration: 1.1, ease: "easeOut" }}>{order.bride}</motion.span>
              </h1>
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <motion.path d="M 50 100 Q 200 50 350 100" stroke="rgba(212,175,55,0.2)" strokeWidth="1" fill="none"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 2, ease: "easeInOut" }} />
              </svg>
            </GlassCard>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }}>
            <p className="mt-8 text-lg text-white/70">We request the honour of your presence at our {order.ceremonyHeadline}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }}>
            <GlassCard className="mx-auto mt-10 max-w-lg">
              <Badge variant="outline" className="mb-3 border-[#d4af37]/40 bg-[#d4af37]/10 tracking-[0.3em] text-[#f4e4b8]">{order.primaryEvent.label}</Badge>
              <div className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-white">{order.primaryEvent.date}</div>
              {order.primaryEvent.hijriDate && (
                <div className="mt-1 text-sm text-[#d4af37]/70">{order.primaryEvent.hijriDate}</div>
              )}
              <div className="mt-1 text-white/60">{order.primaryEvent.time}</div>
              <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
              <div className="text-white/80">
                <div className="font-semibold text-white">{order.primaryEvent.venue}</div>
                <div className="text-sm text-white/60">{order.primaryEvent.venueAddress}</div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Ayah */}
        <section className="relative px-4 py-28 text-center">
          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <div className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-[#b76e79] to-transparent" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 1 }}>
              <p dir="rtl" lang="ar" className="mb-6 text-xl leading-loose text-[#f4e4b8]/90 sm:text-2xl" style={{ fontFamily: "var(--font-invitation-arabic), serif" }}>
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1 }}>
              <p className="font-[family-name:var(--font-invitation-script)] text-lg italic leading-relaxed text-white/70 sm:text-xl">
                &ldquo;And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity, and He has placed between you affection and mercy.&rdquo;
              </p>
              <p className="mt-4 text-sm tracking-widest text-[#d4af37]/60">— SURAH AR-RUM 30:21</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1 }}>
              <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#b76e79] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Countdown */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#d4af37]/80">COUNTING THE DAYS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mb-14 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-white sm:text-4xl">Until We Say Qabool</motion.h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}><Countdown targetDate={order.eventDateIso} /></motion.div>
          </div>
        </section>

        {/* Union — orbital system */}
        <OrbitalUnion order={order} />

        {/* Timeline — constellation map */}
        <ConstellationTimeline items={order.timeline} />

        {/* Venue */}
        <section className="relative px-4 py-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-white sm:text-4xl">Venue</motion.h2>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <GlassCard className="p-10">
                <div className="mx-auto mb-5 flex h-8 w-8 items-center justify-center"><div className="h-2.5 w-2.5 rotate-45 bg-[#d4af37]/50" /></div>
                <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-white">{order.primaryEvent.venue}</h3>
                <p className="mt-3 text-white/60">{order.primaryEvent.venueAddress}</p>
                <Button asChild variant="ghost" className="mt-6 h-auto rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] px-8 py-3 font-semibold text-[#050508] hover:from-[#f4e4b8] hover:to-[#d4af37] hover:text-[#050508]">
                  <a href={order.primaryEvent.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Maps</a>
                </Button>
              </GlassCard>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10">
              {(() => {
                const lat = order.primaryEvent.lat; const lng = order.primaryEvent.lng;
                const hasCoords = typeof lat === "number" && typeof lng === "number";
                const delta = 0.005;
                const bbox = hasCoords ? `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}` : "75.859%2C11.173%2C75.869%2C11.183";
                const marker = hasCoords ? `${lat}%2C${lng}` : "11.178%2C75.864";
                return <iframe title={`Map of ${order.primaryEvent.venue}`} src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />;
              })()}
            </motion.div>
          </div>
        </section>

        {/* RSVP */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-xl text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><div className="mx-auto mb-5 flex h-8 w-8 items-center justify-center"><div className="h-2.5 w-2.5 rotate-45 bg-[#d4af37]/50" /></div></motion.div>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-white sm:text-4xl">Kindly Respond</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mb-8 text-white/60">
              Your presence would honour us.{" "}
              {order.rsvp?.deadline ? (
                <>Please confirm by <Badge variant="outline" className="border-[#b76e79]/40 bg-[#b76e79]/10 align-middle text-[#e0a6b0]">{order.rsvp.deadline}</Badge>.</>
              ) : (
                "Please let us know if you can make it."
              )}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              {order.rsvp?.webhookUrl ? <RsvpForm order={order} /> : (
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button asChild variant="ghost" className="h-auto rounded-full bg-gradient-to-r from-[#0f5e4a] to-[#1a8b6a] px-8 py-4 text-base font-semibold text-white hover:text-white hover:shadow-[0_0_30px_rgba(26,139,106,0.35)]">
                    <a href={`https://wa.me/${order.rsvpWhatsApp}?text=${yesMsg}`} target="_blank" rel="noopener noreferrer">Yes, I will attend</a>
                  </Button>
                  <Button asChild variant="ghost" className="h-auto rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white">
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
                <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
                {order.closingDuaArabic && (
                  <p dir="rtl" lang="ar" className="mb-4 text-xl leading-loose text-[#f4e4b8]/90 sm:text-2xl" style={{ fontFamily: "var(--font-invitation-arabic), serif" }}>
                    {order.closingDuaArabic}
                  </p>
                )}
                {order.closingDua && (
                  <p className="font-[family-name:var(--font-invitation-script)] text-lg italic text-white/70 sm:text-xl">&ldquo;{order.closingDua}&rdquo;</p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="relative px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center"><Khatam className="h-8 w-8" strokeWidth={2} /></div>
          <p className="font-[family-name:var(--font-invitation-script)] text-lg text-white/70">With love, {order.groom} &amp; {order.bride}</p>
          <p className="mt-2 font-[family-name:var(--font-invitation-serif)] text-lg font-bold text-[#f4e4b8]">The families of {order.groom} &amp; {order.bride}</p>
          <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          <p className="mt-6 text-xs tracking-widest text-white/50">
            Crafted by <a href="https://axonstack.in/apps/shaadi-cards" target="_blank" rel="noopener noreferrer" className="text-[#d4af37]/80 transition-colors hover:text-[#d4af37]">axonstack</a> — Shaadi Cards
          </p>
        </footer>
      </div>
    </main>
  );
}
