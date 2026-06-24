"use client";

import { motion } from "motion/react";

interface InvitationHeaderProps {
  groom: string;
  bride: string;
}

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5" aria-hidden="true">
      <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to right, transparent, #D9B67A)" }} />
      <svg width="64" height="28" viewBox="0 0 64 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="14" rx="5" ry="7" fill="#E8C6C1" opacity="0.9"/>
        <ellipse cx="32" cy="14" rx="3" ry="4.5" fill="#D8A9A2" opacity="0.7"/>
        <ellipse cx="18" cy="14" rx="4" ry="5.5" fill="#E8C6C1" opacity="0.7" transform="rotate(-20 18 14)"/>
        <ellipse cx="46" cy="14" rx="4" ry="5.5" fill="#E8C6C1" opacity="0.7" transform="rotate(20 46 14)"/>
        <ellipse cx="8" cy="16" rx="3" ry="4" fill="#D9B67A" opacity="0.5" transform="rotate(-35 8 16)"/>
        <ellipse cx="56" cy="16" rx="3" ry="4" fill="#D9B67A" opacity="0.5" transform="rotate(35 56 16)"/>
        <path d="M32 7 Q34 4 32 2 Q30 4 32 7Z" fill="#D9B67A" opacity="0.6"/>
        <path d="M32 21 Q34 24 32 26 Q30 24 32 21Z" fill="#D9B67A" opacity="0.6"/>
      </svg>
      <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to left, transparent, #D9B67A)" }} />
    </div>
  );
}

export function InvitationHeader({ groom, bride }: InvitationHeaderProps) {
  return (
    <header className="relative z-10 text-center pt-16 pb-4 px-6">
      {/* Background floral corners */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-40 h-40 opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='30' rx='28' ry='36' fill='%23E8C6C1'/%3E%3Cellipse cx='30' cy='30' rx='18' ry='24' fill='%23D8A9A2'/%3E%3Cellipse cx='70' cy='15' rx='20' ry='28' fill='%23FBF8F4'/%3E%3Cellipse cx='70' cy='15' rx='13' ry='18' fill='%23F7F3EE'/%3E%3Cellipse cx='15' cy='70' rx='14' ry='20' fill='%23D9B67A' opacity='0.7'/%3E%3Cellipse cx='50' cy='60' rx='16' ry='22' fill='%23E8C6C1' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 w-40 h-40 opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='130' cy='30' rx='28' ry='36' fill='%23E8C6C1'/%3E%3Cellipse cx='130' cy='30' rx='18' ry='24' fill='%23D8A9A2'/%3E%3Cellipse cx='90' cy='15' rx='20' ry='28' fill='%23FBF8F4'/%3E%3Cellipse cx='90' cy='15' rx='13' ry='18' fill='%23F7F3EE'/%3E%3Cellipse cx='145' cy='70' rx='14' ry='20' fill='%23D9B67A' opacity='0.7'/%3E%3Cellipse cx='110' cy='60' rx='16' ry='22' fill='%23E8C6C1' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      {/* Bismillah */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <p
          className="invitation-arabic mb-6"
          style={{
            fontSize: "clamp(28px, 7vw, 42px)",
            fontWeight: 500,
            color: "#CBA46A",
            lineHeight: 1.8,
            direction: "rtl",
          }}
          aria-label="Bismillah ir-Rahman ir-Rahim"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      </motion.div>

      {/* Couple Names */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <h1
          className="tracking-tight"
          style={{
            fontFamily: '"Cormorant Garamond", "Bodoni Moda", serif',
            color: "#4B3A2A",
            lineHeight: 1.15,
          }}
        >
          <span
            className="block font-semibold"
            style={{ fontSize: "clamp(36px, 10vw, 56px)" }}
          >
            {groom}
          </span>
          <span
            className="block font-light italic my-2"
            style={{
              fontSize: "clamp(22px, 6vw, 34px)",
              color: "#D8A9A2",
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            &amp;
          </span>
          <span
            className="block font-semibold"
            style={{ fontSize: "clamp(36px, 10vw, 56px)" }}
          >
            {bride}
          </span>
        </h1>
      </motion.div>

      {/* Floral Divider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <FloralDivider />
      </motion.div>
    </header>
  );
}
