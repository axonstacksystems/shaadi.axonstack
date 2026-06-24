"use client";

import { motion } from "motion/react";

interface FamilyCardProps {
  groomFamily: string;
  brideFamily: string;
}

function CenterOrnament() {
  return (
    <div className="flex flex-col items-center justify-center px-3" aria-hidden="true">
      <svg width="32" height="80" viewBox="0 0 32 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="0" x2="16" y2="28" stroke="#D9B67A" strokeWidth="1" opacity="0.5"/>
        <circle cx="16" cy="16" r="3" fill="#D9B67A" opacity="0.6"/>
        {/* Floral center */}
        <ellipse cx="16" cy="40" rx="4" ry="6" fill="#E8C6C1" opacity="0.8"/>
        <ellipse cx="16" cy="40" rx="3" ry="4.5" fill="#E8C6C1" opacity="0.9" transform="rotate(60 16 40)"/>
        <ellipse cx="16" cy="40" rx="3" ry="4.5" fill="#E8C6C1" opacity="0.9" transform="rotate(-60 16 40)"/>
        <circle cx="16" cy="40" r="2.5" fill="#CBA46A" opacity="0.9"/>
        <circle cx="16" cy="40" r="1.2" fill="#D9B67A"/>
        <line x1="16" y1="52" x2="16" y2="80" stroke="#D9B67A" strokeWidth="1" opacity="0.5"/>
        <circle cx="16" cy="64" r="3" fill="#D9B67A" opacity="0.6"/>
      </svg>
    </div>
  );
}

export function FamilyCard({ groomFamily, brideFamily }: FamilyCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="px-4 pb-6"
      aria-label="Family blessings"
    >
      <div className="ib-glass p-5">
        <p
          className="text-center mb-5 font-semibold tracking-[0.15em] uppercase"
          style={{ fontSize: "9px", color: "#85705C" }}
        >
          With The Blessings Of Our Families
        </p>
        <div className="flex items-center justify-center">
          {/* Groom family */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-1 text-center"
          >
            <p
              className="font-semibold leading-snug"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(13px, 3.8vw, 16px)",
                color: "#4B3A2A",
              }}
            >
              {groomFamily}
            </p>
            <p
              className="mt-1 italic"
              style={{ fontSize: "11px", color: "#85705C" }}
            >
              &amp; Family
            </p>
          </motion.div>

          <CenterOrnament />

          {/* Bride family */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 text-center"
          >
            <p
              className="font-semibold leading-snug"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(13px, 3.8vw, 16px)",
                color: "#4B3A2A",
              }}
            >
              {brideFamily}
            </p>
            <p
              className="mt-1 italic"
              style={{ fontSize: "11px", color: "#85705C" }}
            >
              &amp; Family
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
