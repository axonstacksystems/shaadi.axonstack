"use client";

import { motion } from "motion/react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { Snowflake } from "./Snowflake";

const FROST_CARD =
  "relative overflow-hidden rounded-lg border border-white/60 bg-gradient-to-b from-white/80 to-white/55 p-8 text-center shadow-[0_8px_32px_rgba(168,200,216,0.25)] backdrop-blur-2xl";

/** A named crystal: a snowflake that grows in, with the person's name beneath. */
function Crystal({ name, size, accent }: { name: string; size: string; accent: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center">
        <span
          className="absolute inset-0 rounded-full blur-xl"
          style={{ background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)` }}
        />
        <Snowflake className={`relative ${size}`} strokeWidth={1.6} animate />
      </div>
      <span className="font-[family-name:var(--font-invitation-serif)] text-lg font-bold text-[#1a1a1a] sm:text-xl">
        {name}
      </span>
    </div>
  );
}

export function FrostUnion({ order }: { order: DeliveredOrder }) {
  return (
    <section className="relative px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#2d4a3e]/70">EACH ONE FORMED, THEN JOINED</p>
          <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#1a1a1a] sm:text-4xl">
            Two Crystals, One Lattice
          </h2>
        </motion.div>

        {/* ── Forming-crystal centrepiece ─────────────────── */}
        <motion.div
          className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Crystal name={order.groom} size="h-20 w-20 sm:h-24 sm:w-24" accent="#7a9e7e" />

          {/* connector → core */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden h-px w-16 origin-left bg-gradient-to-r from-[#7a9e7e]/60 to-[#a8c8d8] sm:block"
          />

          {/* central union core */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#a8c8d8]/40 blur-2xl motion-safe:animate-[frost-pulse_4s_ease-in-out_infinite]" />
              <Snowflake className="relative h-28 w-28 sm:h-32 sm:w-32" strokeWidth={1.4} animate />
            </div>
            <span
              dir="rtl"
              lang="ar"
              className="text-sm text-[#2d4a3e]/80"
              style={{ fontFamily: "var(--font-invitation-arabic), serif" }}
            >
              نِكَاح
            </span>
          </div>

          {/* connector → bride */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden h-px w-16 origin-right bg-gradient-to-l from-[#b76e79]/50 to-[#a8c8d8] sm:block"
          />

          <Crystal name={order.bride} size="h-20 w-20 sm:h-24 sm:w-24" accent="#b76e79" />
        </motion.div>

        {/* ── Family detail cards ─────────────────────────── */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80 }}
            className={FROST_CARD}
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#2d4a3e]/70">THE GROOM</p>
            <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#1a1a1a]">{order.groom}</h3>
            <p className="mt-3 text-[#5c7a8c]">
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
            className={FROST_CARD}
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#7a9e7e]/80">THE BRIDE</p>
            <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#1a1a1a]">{order.bride}</h3>
            <p className="mt-3 text-[#5c7a8c]">
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
        @keyframes frost-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
      `}</style>
    </section>
  );
}
