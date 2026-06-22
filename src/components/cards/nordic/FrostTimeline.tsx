"use client";

import { motion } from "motion/react";
import type { DeliveredTimelineItem } from "@/data/delivered-orders";
import { Snowflake } from "./Snowflake";

/**
 * The order of events as frost spreading down a windowpane: snowflake nodes
 * strung along a meridian that freezes into view as you scroll, with event
 * cards alternating sides. Distinct from the plain bullet rail used elsewhere.
 */
export function FrostTimeline({ items }: { items: DeliveredTimelineItem[] }) {
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
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#2d4a3e]/70">AS THE FROST SETTLES</p>
          <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#1a1a1a] sm:text-4xl">
            Order of Events
          </h2>
        </motion.div>

        <div className="relative">
          {/* meridian: freezes top→bottom on scroll-in */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-[#a8c8d8] via-[#7a9e7e]/50 to-transparent sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="space-y-12">
            {items.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={i} className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 130 }}
                    className="absolute left-5 top-2 z-10 -translate-x-1/2 sm:left-1/2"
                  >
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 backdrop-blur-xl">
                      <Snowflake className="h-7 w-7" strokeWidth={2.4} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                    className={`w-full pl-16 sm:w-1/2 sm:pl-0 ${left ? "sm:pr-14 sm:text-right" : "sm:ml-auto sm:pl-14 sm:text-left"}`}
                  >
                    <div className="relative overflow-hidden rounded-lg border border-white/60 bg-gradient-to-b from-white/80 to-white/55 p-6 shadow-[0_8px_32px_rgba(168,200,216,0.25)] backdrop-blur-2xl">
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                      <p className="text-sm font-semibold tracking-[0.2em] text-[#2d4a3e]/80 uppercase">{item.time}</p>
                      <h3 className="mt-1 font-[family-name:var(--font-invitation-serif)] text-xl font-bold text-[#1a1a1a]">{item.event}</h3>
                      <p className="mt-2 text-[#5c7a8c]">{item.description}</p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
