"use client";

import { motion } from "motion/react";
import type { DeliveredTimelineItem } from "@/data/delivered-orders";
import { Khatam } from "@/components/cards/shared/Khatam";

/**
 * The order of events plotted as a constellation: glowing eight-point star
 * nodes strung along a luminous meridian that draws itself as you scroll,
 * with event cards alternating sides like charted stars. A deliberate
 * departure from the plain vertical bullet rail used elsewhere.
 */
export function ConstellationTimeline({ items }: { items: DeliveredTimelineItem[] }) {
  return (
    <section className="relative px-4 py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#d4af37]/80">CHARTING THE EVENING</p>
          <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-white sm:text-4xl">
            The Night&apos;s Constellation
          </h2>
        </motion.div>

        <div className="relative">
          {/* the meridian: draws itself top→bottom on scroll-in */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-[#d4af37]/60 via-[#b76e79]/40 to-transparent sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="space-y-12">
            {items.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={i} className="relative">
                  {/* star node sitting on the meridian */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 140 }}
                    className="absolute left-5 top-3 z-10 -translate-x-1/2 sm:left-1/2"
                  >
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      <span
                        className="absolute inset-0 rounded-full motion-safe:animate-[node-twinkle_3s_ease-in-out_infinite]"
                        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.45) 0%, transparent 70%)", animationDelay: `${i * 0.4}s` }}
                      />
                      <Khatam className="relative h-7 w-7" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  {/* event card, alternating sides on desktop */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                    className={`w-full pl-14 sm:w-1/2 sm:pl-0 ${left ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12 sm:text-left"}`}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
                      <p className="text-sm font-semibold tracking-[0.2em] text-[#d4af37]/90 uppercase">{item.time}</p>
                      <h3 className="mt-1 font-[family-name:var(--font-invitation-serif)] text-xl font-bold text-white">{item.event}</h3>
                      <p className="mt-2 text-white/55">{item.description}</p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <style jsx>{`
        @keyframes node-twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }
      `}</style>
    </section>
  );
}
