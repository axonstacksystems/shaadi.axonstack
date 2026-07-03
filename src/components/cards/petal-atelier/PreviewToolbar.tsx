"use client";

import { useState, useRef } from "react";
import { motion, useDragControls, AnimatePresence } from "motion/react";

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

const HDivider = () => (
  <div style={{ height: 1, width: 30, background: "rgba(255,255,255,0.12)", flexShrink: 0, alignSelf: "center" }} />
);

/* 44×44 minimum tap target wrapper — invisible padding around small visual */
const TapTarget = ({ children, style, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
  <button
    {...props}
    style={{
      width: 44, height: 44,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "transparent", border: "none", cursor: "pointer",
      flexShrink: 0, padding: 0,
      WebkitTapHighlightColor: "transparent",
      ...style,
    }}
  >
    {children}
  </button>
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
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: "Wedding Invitation", text: "Check out this beautiful wedding invitation!", url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  const pillBase: React.CSSProperties = {
    background: "rgba(8,5,3,0.6)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    border: "1px solid rgba(255,255,255,0.11)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
  };

  const iconCircle = (bg: string, shadow?: string): React.CSSProperties => ({
    width: 36, height: 36, borderRadius: "50%",
    background: bg,
    boxShadow: shadow ?? "none",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    transition: "transform 0.15s ease",
  });

  return (
    <div
      ref={constraintsRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 40 }}
    >
      <motion.div
        drag
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragMomentum={false}
        /* entry: slide in from right + subtle wiggle to show it's draggable */
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.94, x: 0 }}
        whileHover={{ opacity: 1 }}
        whileDrag={{ scale: 1.04, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: "absolute",
          top: "50%",
          right: 10,
          y: "-50%",
          pointerEvents: "auto",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {expanded ? (
            /* ════ EXPANDED vertical pill ════ */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.7, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: 24 }}
              transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                ...pillBase,
                borderRadius: 26,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
                padding: "6px 0 8px",
                width: 54,
                overflow: "hidden",
              }}
            >
              {/* ── Top row: drag handle + collapse ── */}
              <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 6px 4px",
              }}>
                {/* Drag handle — full width touch area */}
                <div
                  onPointerDown={(e) => { e.stopPropagation(); dragControls.start(e); }}
                  style={{
                    flex: 1, height: 20, display: "flex", flexDirection: "column",
                    alignItems: "flex-start", justifyContent: "center",
                    gap: 3, paddingLeft: 4, cursor: "grab",
                  }}
                  aria-label="Drag to move"
                  role="button"
                >
                  {[0, 1].map(i => (
                    <div key={i} style={{ display: "flex", gap: 2.5 }}>
                      {[0, 1].map(c => (
                        <div key={c} style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Collapse — top-right chevron, 44×44 tap target */}
                <TapTarget
                  onClick={() => setExpanded(false)}
                  aria-label="Minimise toolbar"
                  style={{ width: 28, height: 28 }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="2,4 6,8 10,4"/>
                  </svg>
                </TapTarget>
              </div>

              {/* ── Price block ── */}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 2, padding: "6px 6px 8px",
                width: "100%",
              }}>
                <span style={{
                  fontSize: "7px", fontWeight: 700, color: "#fff",
                  background: accentColor, borderRadius: 99,
                  padding: "2px 6px", letterSpacing: "0.06em",
                  fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
                  whiteSpace: "nowrap", maxWidth: "100%",
                }}>{discountLabel}</span>
                <span style={{
                  fontSize: "14px", fontWeight: 800, color: "#fff",
                  fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
                  letterSpacing: "-0.02em", lineHeight: 1.1,
                }}>{salePrice}</span>
                <span style={{
                  fontSize: "8px", color: "rgba(255,255,255,0.35)",
                  textDecoration: "line-through",
                  fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
                }}>{mrp}</span>
              </div>

              <HDivider />

              {/* ── WhatsApp — "Order for ₹999" implied by proximity ── */}
              {/* Outer 44×44 tap target, inner 36px visual circle */}
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order via WhatsApp"
                /* Fix drag/tap conflict: stop propagation so drag doesn't fire */
                onPointerDown={(e) => e.stopPropagation()}
                whileTap={{ scale: 0.88 }}
                style={{
                  width: 44, height: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none", flexShrink: 0,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div style={iconCircle("rgba(37,211,102,0.9)", "0 2px 16px rgba(37,211,102,0.5)")}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.529 5.847L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.012-1.375l-.36-.214-3.724.888.933-3.61-.235-.37A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                </div>
              </motion.a>

              {/* ── Share / Copy ── */}
              <TapTarget
                onClick={handleShare}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label={copied ? "Link copied!" : "Share this template"}
              >
                <motion.div
                  animate={copied ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  style={iconCircle(
                    copied ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.09)",
                  )}
                >
                  {copied ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  )}
                </motion.div>
              </TapTarget>

              <HDivider />

              {/* ── Theme switcher — shows NEXT theme clearly labelled ── */}
              <TapTarget
                onClick={onThemeSwitch}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label={nextThemeAriaLabel}
                title={nextThemeAriaLabel}
                style={{ height: 52, flexDirection: "column", gap: 3 }}
              >
                {/* Arrow → swatch to show "switching TO this" */}
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3,2 7,5 3,8"/>
                  </svg>
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: nextThemeSwatch,
                    boxShadow: "0 0 0 1.5px rgba(255,255,255,0.28), 0 2px 8px rgba(0,0,0,0.4)",
                  }}/>
                </div>
                <span style={{
                  fontSize: "6.5px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
                  fontFamily: "var(--font-invitation-sans),system-ui,sans-serif",
                  lineHeight: 1, textAlign: "center",
                  maxWidth: 44, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{nextThemeLabel.split(" ").slice(0, 2).join(" ")}</span>
              </TapTarget>

            </motion.div>
          ) : (
            /* ════ COLLAPSED dot ════ */
            <motion.button
              key="collapsed"
              initial={{ opacity: 0, scale: 0.3, x: 20 }}
              animate={{ opacity: 0.88, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.3, x: 20 }}
              transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
              whileTap={{ scale: 0.88 }}
              onClick={() => setExpanded(true)}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Expand toolbar — order, share & themes"
              style={{
                ...pillBase,
                borderRadius: "50%",
                width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", border: "1px solid rgba(255,255,255,0.14)",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {/* Pulsing ring to signal interactivity */}
              <motion.div
                animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: 44, height: 44, borderRadius: "50%",
                  border: `1.5px solid ${accentColor}`,
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", width: 22, height: 22 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: accentColor,
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.2), 0 3px 10px rgba(0,0,0,0.4)",
                }}/>
                {/* Expand badge */}
                <div style={{
                  position: "absolute", bottom: -2, right: -2,
                  width: 10, height: 10, borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="6" height="6" viewBox="0 0 8 8" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <line x1="4" y1="1" x2="4" y2="7"/><line x1="1" y1="4" x2="7" y2="4"/>
                  </svg>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
