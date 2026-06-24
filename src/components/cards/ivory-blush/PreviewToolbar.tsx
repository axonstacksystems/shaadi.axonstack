"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface PreviewToolbarProps {
  accentColor: string;
  nextThemeSwatch: string;
  nextThemeLabel: string;
  nextThemeAriaLabel: string;
  mrp: string;
  salePrice: string;
  discountLabel: string;
  whatsappHref: string;
  onThemeSwitch: () => void;
}

const DIVIDER = (
  <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
);

export function PreviewToolbar({
  accentColor,
  nextThemeSwatch,
  nextThemeLabel,
  nextThemeAriaLabel,
  mrp,
  salePrice,
  discountLabel,
  whatsappHref,
  onThemeSwitch,
}: PreviewToolbarProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wedding Invitation Template",
          text: "Check out this beautiful wedding invitation!",
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const iconBtn: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
    border: "none",
    transition: "opacity 0.2s",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 0.92, y: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.55, delay: 1.0 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        background: "rgba(10,6,4,0.52)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 999,
        padding: "5px 8px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Price section ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "2px 6px" }}>
        <span style={{
          fontSize: "9px",
          color: "rgba(255,255,255,0.45)",
          textDecoration: "line-through",
          fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
          letterSpacing: "0.02em",
        }}>
          {mrp}
        </span>
        <span style={{
          fontSize: "7.5px",
          fontWeight: 700,
          color: "#fff",
          background: accentColor,
          borderRadius: 99,
          padding: "1.5px 5px",
          letterSpacing: "0.06em",
          fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
          opacity: 0.92,
          whiteSpace: "nowrap",
        }}>
          {discountLabel}
        </span>
        <span style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#fff",
          fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}>
          {salePrice}
        </span>
      </div>

      {DIVIDER}

      {/* ── WhatsApp ── */}
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        aria-label="Order via WhatsApp"
        style={{
          ...iconBtn,
          background: "rgba(37,211,102,0.9)",
          boxShadow: "0 2px 12px rgba(37,211,102,0.4)",
          textDecoration: "none",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.529 5.847L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.012-1.375l-.36-.214-3.724.888.933-3.61-.235-.37A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
      </motion.a>

      {/* ── Share / Copy ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        onClick={handleShare}
        aria-label={copied ? "Link copied!" : "Share this template"}
        style={{
          ...iconBtn,
          background: copied ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {copied ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        )}
      </motion.button>

      {DIVIDER}

      {/* ── Theme switcher ── */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.88 }}
        onClick={onThemeSwitch}
        aria-label={nextThemeAriaLabel}
        title={nextThemeAriaLabel}
        style={{
          ...iconBtn,
          width: "auto",
          borderRadius: 999,
          padding: "4px 8px 4px 5px",
          gap: 5,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: nextThemeSwatch,
          boxShadow: `0 0 0 1.5px rgba(255,255,255,0.35), 0 2px 6px rgba(0,0,0,0.3)`,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: "8.5px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.65)",
          fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
          whiteSpace: "nowrap",
        }}>
          Theme
        </span>
      </motion.button>
    </motion.div>
  );
}
