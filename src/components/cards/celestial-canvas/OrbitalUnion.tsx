"use client";

import { motion } from "motion/react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { Khatam } from "@/components/cards/shared/Khatam";

/** A single orbiting body. The outer wrapper revolves; an inner counter-rotating
 *  layer keeps the label upright. Both pause under prefers-reduced-motion. */
function OrbitingBody({
  initial,
  name,
  accent,
  glow,
  delay,
}: {
  initial: string;
  name: string;
  accent: string;
  glow: string;
  delay: string;
}) {
  return (
    <div
      className="absolute inset-0 motion-safe:animate-[orbit-spin_46s_linear_infinite]"
      style={{ animationDelay: delay }}
    >
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[orbit-spin-reverse_46s_linear_infinite]"
        style={{ animationDelay: delay }}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold backdrop-blur-md sm:h-16 sm:w-16 sm:text-xl"
            style={{
              borderColor: `${accent}66`,
              color: accent,
              background: "rgba(255,255,255,0.04)",
              boxShadow: `0 0 28px ${glow}`,
            }}
          >
            {initial}
          </div>
          <span className="font-[family-name:var(--font-invitation-serif)] text-sm font-semibold text-white/90 sm:text-base">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}

export function OrbitalUnion({ order }: { order: DeliveredOrder }) {
  return (
    <section className="relative px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#d4af37]/80">
            WRITTEN ABOVE THE SEVEN HEAVENS
          </p>
          <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-white sm:text-4xl">
            Bound in One Orbit
          </h2>
        </motion.div>

        {/* ── Orbital diagram ─────────────────────────────── */}
        <motion.div
          className="relative mx-auto aspect-square max-w-sm sm:max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* orbit rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/20 motion-safe:animate-[orbit-spin_60s_linear_infinite]" />
          <div className="absolute inset-[16%] rounded-full border border-dashed border-[#b76e79]/15 motion-safe:animate-[orbit-spin-reverse_44s_linear_infinite]" />
          <div className="absolute inset-[34%] rounded-full border border-white/5" />

          {/* central Nikah core */}
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-28 sm:w-28">
            <div
              className="absolute inset-0 rounded-full motion-safe:animate-[core-pulse_4s_ease-in-out_infinite]"
              style={{ background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)" }}
            />
            <Khatam className="relative h-16 w-16 sm:h-20 sm:w-20" strokeWidth={1.5} />
            <span
              dir="rtl"
              lang="ar"
              className="absolute -bottom-7 text-sm text-[#f4e4b8]/80"
              style={{ fontFamily: "var(--font-invitation-arabic), serif" }}
            >
              نِكَاح
            </span>
          </div>

          {/* orbiting bodies (groom top, bride opposite) */}
          <OrbitingBody initial={order.groom[0]} name={order.groom} accent="#f4e4b8" glow="rgba(212,175,55,0.45)" delay="0s" />
          <OrbitingBody initial={order.bride[0]} name={order.bride} accent="#e0a6b0" glow="rgba(183,110,121,0.45)" delay="-23s" />
        </motion.div>

        {/* ── Family detail cards ─────────────────────────── */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 text-center shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
            <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37]/80">THE GROOM</p>
            <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-white">{order.groom}</h3>
            <p className="mt-3 text-white/60">
              {order.groomParents ?? (
                <>
                  With love and blessings
                  <br />
                  from his family
                </>
              )}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, delay: 0.12 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 text-center shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b76e79]/40 to-transparent" />
            <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#b76e79]/80">THE BRIDE</p>
            <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-white">{order.bride}</h3>
            <p className="mt-3 text-white/60">
              {order.brideParents ?? (
                <>
                  With love and blessings
                  <br />
                  from her family
                </>
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes core-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }
      `}</style>
    </section>
  );
}
