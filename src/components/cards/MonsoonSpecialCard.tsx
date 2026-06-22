"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { RsvpForm } from "@/components/rsvp/RsvpForm";
import { Khatam } from "@/components/cards/shared/Khatam";
import { MihrabFrame } from "@/components/cards/shared/MihrabFrame";

/* ── Reduced-motion preference ──────────────────────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const handler = () => setReduced(m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

/* ── Rainfall Particles ─────────────────────────────────── */
function Rainfall() {
  const reduced = usePrefersReducedMotion();
  const [drops, setDrops] = useState<
    Array<{
      id: number;
      x: number;
      delay: number;
      duration: number;
      length: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    setDrops(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 0.5 + 0.6,
        length: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1,
      })),
    );
  }, []);

  const list = reduced ? drops.slice(0, 15) : drops;

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {list.map((d) => (
        <div
          key={d.id}
          className="absolute top-0"
          style={{
            left: `${d.x}%`,
            width: "1px",
            height: `${d.length}px`,
            background:
              "linear-gradient(to bottom, transparent, rgba(180,220,200,0.6))",
            opacity: d.opacity,
            animation: reduced
              ? undefined
              : `rain-fall ${d.duration}s ${d.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Misty Cloud Background ─────────────────────────────── */
function MistyClouds() {
  const reduced = usePrefersReducedMotion();
  const drift = (anim: string) => (reduced ? undefined : anim);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1a3c34 0%, #1e4d44 20%, #265e54 45%, #2d6b60 70%, #1e4d44 100%)",
        }}
      />
      <div
        className="absolute -left-[20%] top-[5%] h-[60vh] w-[70vw] opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #4a9d8c 0%, transparent 70%)",
          animation: drift("cloud-drift 25s ease-in-out infinite alternate"),
        }}
      />
      <div
        className="absolute -right-[15%] top-[30%] h-[50vh] w-[60vw] opacity-15 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #6ab7a5 0%, transparent 70%)",
          animation: drift(
            "cloud-drift 20s ease-in-out infinite alternate-reverse",
          ),
        }}
      />
      <div
        className="absolute bottom-[5%] left-[15%] h-[40vh] w-[50vw] opacity-15 blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #3d7a6e 0%, transparent 70%)",
          animation: drift("cloud-drift 22s ease-in-out infinite alternate"),
        }}
      />
    </div>
  );
}

/* ── Rain Glass Card ────────────────────────────────────── */
function RainGlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStyle({
      transform: `perspective(1200px) rotateX(${(y - 0.5) * -5}deg) rotateY(${(x - 0.5) * 5}deg)`,
      transition: "transform 0.15s ease-out",
    });
  }, []);
  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1200px) rotateX(0) rotateY(0)",
      transition: "transform 0.5s ease-out",
    });
  }, []);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`relative overflow-hidden rounded-xl border border-[#4a9d8c]/30 bg-gradient-to-b from-[#265e54]/40 to-[#1e4d44]/40 p-8 shadow-[0_8px_32px_rgba(38,94,84,0.3)] backdrop-blur-xl ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6ab7a5]/40 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[#4a9d8c]/20"
      />
      {children}
    </div>
  );
}

/* ── Ripple Hover Effect ────────────────────────────────── */
function RippleHover({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#6ab7a5]/30"
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{ width: 200, height: 200, opacity: 0 }}
              transition={{
                duration: 1.5,
                delay: i * 0.3,
                ease: "easeOut",
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Islamic Star Divider ───────────────────────────────── */
function IslamicStarDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto mb-6 flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4a9d8c]" />
      <Khatam className="h-6 w-6" strokeWidth={2} gradientId="monsoon-khatam" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#4a9d8c]" />
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
      if (ms <= 0)
        return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({
        days: Math.floor(ms / 86400000),
        hours: Math.floor((ms % 86400000) / 3600000),
        minutes: Math.floor((ms % 3600000) / 60000),
        seconds: Math.floor((ms % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {units.map((u) => (
        <RainGlassCard key={u.label} className="text-center">
          <div className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#a8d8c8] sm:text-4xl">
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs tracking-widest text-[#6ab7a5] uppercase">
            {u.label}
          </div>
        </RainGlassCard>
      ))}
    </div>
  );
}

interface Props {
  order: DeliveredOrder;
}

/* ── Main Component ───────────────────────────────────────── */
export function MonsoonSpecialCard({ order }: Props) {
  const [opened, setOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (opened) {
      const t = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(t);
    }
  }, [opened]);

  const yesMsg = encodeURIComponent(
    `Alhamdulillah, I will attend the Nikah of ${order.groom} & ${order.bride}.`,
  );
  const noMsg = encodeURIComponent(
    `With regret, I am unable to attend the Nikah ceremony of ${order.groom} & ${order.bride}.`,
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#1e4d44] text-[#e8f5f0]">
      <MistyClouds />
      <Rainfall />

      <style jsx>{`
        @keyframes rain-fall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes cloud-drift {
          0% {
            transform: translateX(-10%) translateY(-5%) scale(1);
          }
          100% {
            transform: translateX(10%) translateY(5%) scale(1.1);
          }
        }
      `}</style>

      {/* Opening Screen */}
      {!opened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#1e4d44]/95 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 px-6 text-center"
          >
            <MihrabFrame className="mx-auto mb-8 h-44 w-36" gradientId="monsoon-arch" strokeWidth={1.5}>
              <div className="flex h-full flex-col items-center justify-center pt-6">
                <Khatam className="mb-3 h-8 w-8" gradientId="monsoon-arch-star" />
                <span className="font-[family-name:var(--font-invitation-serif)] text-4xl font-bold text-[#a8d8c8]">
                  {order.groom[0]}&{order.bride[0]}
                </span>
              </div>
            </MihrabFrame>
            <p className="mb-2 font-[family-name:var(--font-invitation-script)] text-lg text-[#6ab7a5]">
              The Nikah of
            </p>
            <p className="mb-8 font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#e8f5f0]">
              {order.groom}{" "}
              <span className="text-[#6ab7a5]">&amp;</span> {order.bride}
            </p>
            <button
              onClick={() => setOpened(true)}
              className="rounded-xl border border-[#4a9d8c]/40 bg-gradient-to-r from-[#265e54]/30 via-[#2d6b60]/20 to-[#265e54]/30 px-10 py-3 text-sm font-semibold tracking-widest text-[#a8d8c8] uppercase backdrop-blur-sm transition-all duration-300 hover:border-[#6ab7a5]/60 hover:from-[#265e54]/40 hover:shadow-[0_0_30px_rgba(74,157,140,0.2)]"
            >
              Open Invitation
            </button>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}
      >
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p
              className="mb-6 text-3xl tracking-wide text-[#a8d8c8] sm:text-4xl md:text-5xl"
              style={{
                fontFamily: "var(--font-invitation-arabic), serif",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <IslamicStarDivider />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="mb-8 font-[family-name:var(--font-invitation-script)] text-xl text-[#6ab7a5] sm:text-2xl">
              {order.invitationLine}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.6,
              duration: 1.2,
              type: "spring",
              stiffness: 60,
            }}
          >
            <MihrabFrame className="mx-auto max-w-2xl px-8 py-10" gradientId="monsoon-hero-arch" strokeWidth={1.5}>
              <h1
                className="font-[family-name:var(--font-invitation-serif)] font-bold leading-tight text-center"
                style={{ textWrap: "balance" }}
              >
                <span
                  className="block text-[#e8f5f0]"
                  style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
                >
                  {order.groom}
                </span>
                <span className="my-2 block font-[family-name:var(--font-invitation-script)] text-5xl text-[#6ab7a5]">
                  &amp;
                </span>
                <span
                  className="block text-[#e8f5f0]"
                  style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
                >
                  {order.bride}
                </span>
              </h1>
            </MihrabFrame>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="mt-8 text-lg text-[#a8d8c8]">
              We request the honour of your presence at our{" "}
              {order.ceremonyHeadline}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <RainGlassCard className="mx-auto mt-10 max-w-lg">
              <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#6ab7a5]">
                {order.primaryEvent.label}
              </p>
              <div className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#e8f5f0]">
                {order.primaryEvent.date}
              </div>
              {order.primaryEvent.hijriDate && (
                <div className="mt-1 text-sm text-[#6ab7a5]">
                  {order.primaryEvent.hijriDate}
                </div>
              )}
              <div className="mt-1 text-[#a8d8c8]">
                {order.primaryEvent.time}
              </div>
              <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-[#4a9d8c] to-transparent" />
              <div className="text-[#a8d8c8]">
                <div className="font-semibold text-[#e8f5f0]">
                  {order.primaryEvent.venue}
                </div>
                <div className="text-sm">
                  {order.primaryEvent.venueAddress}
                </div>
              </div>
            </RainGlassCard>
          </motion.div>
        </section>

        {/* Ayah */}
        <section className="relative px-4 py-28 text-center">
          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-[#4a9d8c] to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <p
                className="mb-6 text-xl leading-relaxed text-[#a8d8c8] sm:text-2xl"
                style={{
                  fontFamily: "var(--font-invitation-arabic), serif",
                }}
              >
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <p className="font-[family-name:var(--font-invitation-script)] text-lg italic leading-relaxed text-[#6ab7a5] sm:text-xl">
                &ldquo;And among His signs is that He created for you mates from
                among yourselves, that you may dwell in tranquillity, and He has
                placed between you affection and mercy.&rdquo;
              </p>
              <p className="mt-4 text-sm tracking-widest text-[#4a9d8c]">
                — SURAH AR-RUM 30:21
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#4a9d8c] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Countdown */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#4a9d8c]"
            >
              COUNTING THE DAYS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mb-14 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#e8f5f0] sm:text-4xl"
            >
              Until We Say Qabool
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Countdown targetDate={order.eventDateIso} />
            </motion.div>
          </div>
        </section>

        {/* Union */}
        <section className="relative px-4 py-24">
          <div className="relative z-10 mx-auto max-w-5xl">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <IslamicStarDivider />
              <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#e8f5f0] sm:text-4xl">
                A Blessed Union of Two Families
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80 }}
              >
                <RippleHover>
                  <RainGlassCard className="text-center">
                    <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#6ab7a5]">
                      THE GROOM
                    </p>
                    <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#e8f5f0]">
                      {order.groom}
                    </h3>
                    {order.groomParents && (
                      <p className="mt-2 text-sm text-[#a8d8c8]">
                        {order.groomParents}
                      </p>
                    )}
                    <p className="mt-3 text-[#6ab7a5]">
                      With love and blessings
                      <br />
                      from his family
                    </p>
                  </RainGlassCard>
                </RippleHover>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, delay: 0.15 }}
              >
                <RippleHover>
                  <RainGlassCard className="text-center">
                    <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#6ab7a5]">
                      THE BRIDE
                    </p>
                    <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#e8f5f0]">
                      {order.bride}
                    </h3>
                    {order.brideParents && (
                      <p className="mt-2 text-sm text-[#a8d8c8]">
                        {order.brideParents}
                      </p>
                    )}
                    <p className="mt-3 text-[#6ab7a5]">
                      With love and blessings
                      <br />
                      from her family
                    </p>
                  </RainGlassCard>
                </RippleHover>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-2xl">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16 text-center font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#e8f5f0] sm:text-4xl"
            >
              Order of Events
            </motion.h2>
            <div className="space-y-8">
              {order.timeline.map(
                (
                  item: { time: string; event: string; description: string },
                  i: number,
                ) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#4a9d8c]">
                          <div className="h-2 w-2 rounded-full bg-[#6ab7a5]" />
                        </div>
                        {i < order.timeline.length - 1 && (
                          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-[#4a9d8c] to-transparent" />
                        )}
                      </div>
                      <RippleHover className="flex-1">
                        <RainGlassCard className="!p-6">
                          <h3 className="font-[family-name:var(--font-invitation-serif)] text-xl font-bold text-[#e8f5f0]">
                            {item.event}
                          </h3>
                          <p className="mt-1 text-[#a8d8c8]">{item.time}</p>
                          <p className="mt-1 text-[#6ab7a5]">
                            {item.description}
                          </p>
                        </RainGlassCard>
                      </RippleHover>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Venue */}
        <section className="relative px-4 py-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-10 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#e8f5f0] sm:text-4xl"
            >
              Venue
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <RainGlassCard className="p-10">
                <IslamicStarDivider />
                <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#e8f5f0]">
                  {order.primaryEvent.venue}
                </h3>
                <p className="mt-3 text-[#a8d8c8]">
                  {order.primaryEvent.venueAddress}
                </p>
                <a
                  href={order.primaryEvent.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#265e54] to-[#2d6b60] px-8 py-3 font-semibold text-[#e8f5f0] transition-all duration-300 hover:from-[#2d6b60] hover:to-[#3a7a6e] hover:shadow-[0_0_30px_rgba(74,157,140,0.25)]"
                >
                  Open in Maps
                </a>
              </RainGlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#4a9d8c]/30"
            >
              {(() => {
                const lat = order.primaryEvent.lat;
                const lng = order.primaryEvent.lng;
                const hasCoords =
                  typeof lat === "number" && typeof lng === "number";
                const delta = 0.005;
                const bbox = hasCoords
                  ? `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`
                  : "75.859%2C11.173%2C75.869%2C11.183";
                const marker = hasCoords
                  ? `${lat}%2C${lng}`
                  : "11.178%2C75.864";
                return (
                  <iframe
                    title={`Map of ${order.primaryEvent.venue}`}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                );
              })()}
            </motion.div>
          </div>
        </section>

        {/* RSVP */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-xl text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <IslamicStarDivider />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#e8f5f0] sm:text-4xl"
            >
              Kindly Respond
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-[#a8d8c8]"
            >
              Your presence would honour us.{" "}
              {order.rsvp?.deadline
                ? `Please confirm by ${order.rsvp.deadline}.`
                : "Please let us know if you can make it."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {order.rsvp?.webhookUrl ? (
                <RsvpForm order={order} />
              ) : (
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <a
                    href={`https://wa.me/${order.rsvpWhatsApp}?text=${yesMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-gradient-to-r from-[#265e54] to-[#2d6b60] px-8 py-4 font-semibold text-[#e8f5f0] transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,157,140,0.25)]"
                  >
                    Alhamdulillah, I&apos;ll Attend
                  </a>
                  <a
                    href={`https://wa.me/${order.rsvpWhatsApp}?text=${noMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-[#4a9d8c]/40 bg-[#265e54]/30 px-8 py-4 font-semibold text-[#a8d8c8] backdrop-blur-sm transition-all duration-300 hover:bg-[#265e54]/50"
                  >
                    Unable to Attend
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Closing Dua */}
        {order.closingDuaArabic && order.closingDua && (
          <section className="relative px-4 py-24 text-center">
            <div className="relative z-10 mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <Khatam className="mx-auto mb-8 h-10 w-10" gradientId="monsoon-dua-star" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
                className="mb-4 text-2xl leading-relaxed text-[#a8d8c8]"
                style={{ fontFamily: "var(--font-invitation-arabic), serif" }}
              >
                {order.closingDuaArabic}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
                className="font-[family-name:var(--font-invitation-script)] text-lg italic leading-relaxed text-[#6ab7a5]"
              >
                {order.closingDua}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#4a9d8c] to-transparent" />
              </motion.div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="relative px-4 py-16 text-center">
          <IslamicStarDivider />
          <p className="font-[family-name:var(--font-invitation-script)] text-lg text-[#6ab7a5]">
            With duas and love, {order.groom} &amp; {order.bride}
          </p>
          <p className="mt-2 font-[family-name:var(--font-invitation-serif)] text-lg font-bold text-[#a8d8c8]">
            The families of {order.groom} &amp; {order.bride}
          </p>
          <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[#4a9d8c]/30 to-transparent" />
          <p className="mt-6 text-xs tracking-widest text-[#e8f5f0]/30">
            Crafted by{" "}
            <a
              href="https://axonstack.in/apps/shaadi-cards"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4a9d8c]/60 transition-colors hover:text-[#6ab7a5]"
            >
              axonstack
            </a>{" "}
            — Shaadi Cards
          </p>
        </footer>
      </div>
    </main>
  );
}
