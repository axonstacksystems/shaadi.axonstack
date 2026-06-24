"use client";

import { useEffect, useState, useId } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeContext";
import { THEMES, THEME_ORDER } from "./themes";
import { PreviewToolbar } from "./PreviewToolbar";

interface CoverScreenProps {
  groom: string;
  bride: string;
  onOpen: () => void;
}

/* ─────────────────────────────────────────────────────────────
   Petal system — client-only to avoid hydration mismatch
───────────────────────────────────────────────────────────── */
interface Petal {
  id: number; left: number; delay: number;
  duration: number; size: number; rotate: number; kind: number;
}

function usePetals(n: number): Petal[] {
  const [list, setList] = useState<Petal[]>([]);
  useEffect(() => {
    setList(Array.from({ length: n }, (_, i) => ({
      id: i,
      left: 5 + (i * 8.7) % 88,
      delay: (i * 1.9) % 14,
      duration: 15 + (i % 3) * 5,
      size: 12 + (i % 4) * 4,
      rotate: (i * 47) % 360,
      kind: i % 3,
    })));
  }, [n]);
  return list;
}

/* ─────────────────────────────────────────────────────────────
   Top rose cluster — roses concentrated near top of viewBox
   so they burst inward richly when placed at top corners
───────────────────────────────────────────────────────────── */
function TopRoseCluster({ flip, petalPrimary, petalSecondary, gold, petalFill }: { flip?: boolean; petalPrimary: string; petalSecondary: string; gold: string; petalFill: string }) {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined, transformOrigin: "center", width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {/* === Vines / stems — radiate outward from top-left corner === */}
      <path d="M10 10 Q60 70 100 110 Q140 150 185 200" stroke={gold} strokeWidth="1.4" opacity="0.45" fill="none"/>
      <path d="M10 10 Q40 60 80 90 Q120 120 165 160" stroke={gold} strokeWidth="1" opacity="0.32" fill="none"/>
      <path d="M10 10 Q30 50 55 80 Q80 110 110 160" stroke={gold} strokeWidth="0.9" opacity="0.28" fill="none"/>
      <path d="M0 40 Q40 60 70 100" stroke={gold} strokeWidth="0.8" opacity="0.25" fill="none"/>

      {/* === Champagne leaves === */}
      <ellipse cx="72" cy="82" rx="12" ry="22" fill={gold} opacity="0.3" transform="rotate(-35 72 82)"/>
      <ellipse cx="50" cy="55" rx="9" ry="18" fill={gold} opacity="0.24" transform="rotate(20 50 55)"/>
      <ellipse cx="115" cy="118" rx="10" ry="20" fill={gold} opacity="0.26" transform="rotate(-50 115 118)"/>
      <ellipse cx="145" cy="148" rx="8" ry="16" fill={gold} opacity="0.2" transform="rotate(-25 145 148)"/>
      <ellipse cx="28" cy="32" rx="8" ry="14" fill={gold} opacity="0.22" transform="rotate(35 28 32)"/>

      {/* === Small filler flowers === */}
      <circle cx="32" cy="22" r="12" fill={petalFill} opacity="0.85"/>
      <circle cx="32" cy="22" r="7"  fill={petalFill} opacity="0.9"/>
      <circle cx="52" cy="38" r="9"  fill={petalFill} opacity="0.75"/>
      <circle cx="18" cy="44" r="8"  fill={petalFill} opacity="0.7"/>
      <circle cx="98"  cy="115" r="7" fill={petalFill} opacity="0.6"/>
      <circle cx="158" cy="158" r="6" fill={petalFill} opacity="0.55"/>

      {/* === Main rose — large, top-left (corner anchor) === */}
      <g transform="translate(68, 52)">
        <ellipse rx="30" ry="34" fill={petalPrimary} opacity="0.95"/>
        <ellipse rx="23" ry="27" fill={petalSecondary} opacity="0.9"/>
        <ellipse rx="16" ry="20" fill={petalSecondary} opacity="0.85"/>
        <ellipse rx="10" ry="13" fill={petalSecondary} opacity="0.8"/>
        <ellipse rx="5"  ry="7"  fill={petalSecondary} opacity="0.75"/>
        <circle  r="2.5"         fill={petalSecondary}/>
        <ellipse rx="30" ry="11" fill={petalPrimary} opacity="0.38" transform="rotate(-30)"/>
        <ellipse rx="30" ry="11" fill={petalPrimary} opacity="0.33" transform="rotate(30)"/>
        <ellipse rx="30" ry="11" fill={petalPrimary} opacity="0.28" transform="rotate(-75)"/>
        <ellipse rx="30" ry="11" fill={petalPrimary} opacity="0.28" transform="rotate(75)"/>
      </g>

      {/* === Rose — medium, mid === */}
      <g transform="translate(148, 148)">
        <ellipse rx="22" ry="25" fill={petalPrimary} opacity="0.92"/>
        <ellipse rx="17" ry="19" fill={petalSecondary} opacity="0.88"/>
        <ellipse rx="11" ry="14" fill={petalSecondary} opacity="0.82"/>
        <ellipse rx="6"  ry="9"  fill={petalSecondary} opacity="0.78"/>
        <circle  r="2"           fill={petalSecondary}/>
        <ellipse rx="22" ry="8"  fill={petalPrimary} opacity="0.38" transform="rotate(-40)"/>
        <ellipse rx="22" ry="8"  fill={petalPrimary} opacity="0.32" transform="rotate(40)"/>
      </g>

      {/* === Rose — large, top-right corner (outward) === */}
      <g transform="translate(185, 20)">
        <ellipse rx="28" ry="32" fill={petalPrimary} opacity="0.9"/>
        <ellipse rx="21" ry="25" fill={petalSecondary} opacity="0.88"/>
        <ellipse rx="14" ry="18" fill={petalSecondary} opacity="0.84"/>
        <ellipse rx="8"  ry="11" fill={petalSecondary} opacity="0.78"/>
        <ellipse rx="4"  ry="6"  fill={petalSecondary} opacity="0.75"/>
        <circle  r="2"           fill={petalSecondary}/>
        <ellipse rx="28" ry="10" fill={petalPrimary} opacity="0.35" transform="rotate(-25)"/>
        <ellipse rx="28" ry="10" fill={petalPrimary} opacity="0.3"  transform="rotate(55)"/>
      </g>

      {/* === Small bud — far corner === */}
      <g transform="translate(22, 18)">
        <ellipse rx="14" ry="16" fill={petalPrimary} opacity="0.85"/>
        <ellipse rx="9"  ry="11" fill={petalSecondary} opacity="0.8"/>
        <ellipse rx="4"  ry="6"  fill={petalSecondary} opacity="0.75"/>
        <circle  r="1.5"         fill={petalSecondary}/>
      </g>

      {/* === Gold arabesque lattice (bottom-right of this cluster) === */}
      <g opacity="0.16">
        {[0,1,2,3].map(row => (
          <g key={row}>
            {[0,1,2,3].map(col => (
              <g key={col} transform={`translate(${128+col*22},${160+row*22})`}>
                <rect x="-8" y="-8" width="16" height="16" stroke={gold} strokeWidth="0.6" fill="none"/>
                <rect x="-8" y="-8" width="16" height="16" stroke={gold} strokeWidth="0.6" fill="none" transform="rotate(45)"/>
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Large rose SVG cluster — used in bottom corners
───────────────────────────────────────────────────────────── */
function RoseCluster({ flip, flipY, className, petalPrimary, petalSecondary, gold, petalFill }: {
  flip?: boolean; flipY?: boolean; className?: string;
  petalPrimary: string; petalSecondary: string; gold: string; petalFill: string;
}) {
  const sx = flip ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `scale(${sx},${sy})`, transformOrigin: "center" }}
      aria-hidden="true"
    >
      {/* === Vines / stems === */}
      <path d="M10 250 Q60 190 100 150 Q140 110 180 60" stroke={gold} strokeWidth="1.4" opacity="0.5" fill="none"/>
      <path d="M10 250 Q40 200 80 170 Q120 140 160 90" stroke={gold} strokeWidth="1" opacity="0.35" fill="none"/>
      <path d="M10 250 Q50 210 90 200 Q130 190 170 130" stroke={gold} strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M0 200 Q50 180 80 140" stroke={gold} strokeWidth="0.8" opacity="0.3" fill="none"/>

      {/* === Champagne leaves === */}
      <ellipse cx="75" cy="185" rx="12" ry="22" fill={gold} opacity="0.28" transform="rotate(35 75 185)"/>
      <ellipse cx="55" cy="210" rx="9" ry="18" fill={gold} opacity="0.22" transform="rotate(-20 55 210)"/>
      <ellipse cx="120" cy="155" rx="10" ry="20" fill={gold} opacity="0.25" transform="rotate(50 120 155)"/>
      <ellipse cx="145" cy="110" rx="8" ry="16" fill={gold} opacity="0.2" transform="rotate(25 145 110)"/>
      <ellipse cx="30" cy="230" rx="8" ry="15" fill={gold} opacity="0.2" transform="rotate(-35 30 230)"/>

      {/* === Small filler flowers (ivory / white) === */}
      {/* cluster near bottom-left */}
      <circle cx="35" cy="240" r="12" fill={petalFill} opacity="0.85"/>
      <circle cx="35" cy="240" r="7" fill={petalFill} opacity="0.9"/>
      <circle cx="55" cy="225" r="9" fill={petalFill} opacity="0.75"/>
      <circle cx="20" cy="218" r="8" fill={petalFill} opacity="0.7"/>
      {/* small blossoms on stems */}
      <circle cx="100" cy="148" r="7" fill={petalFill} opacity="0.65"/>
      <circle cx="162" cy="88" r="6" fill={petalFill} opacity="0.6"/>

      {/* === Main rose — large, bottom === */}
      <g transform="translate(70, 200)">
        <ellipse rx="28" ry="32" fill={petalPrimary} opacity="0.95"/>
        <ellipse rx="22" ry="26" fill={petalSecondary} opacity="0.9"/>
        <ellipse rx="16" ry="20" fill={petalSecondary} opacity="0.85"/>
        <ellipse rx="10" ry="13" fill={petalSecondary} opacity="0.8"/>
        <ellipse rx="5"  ry="7"  fill={petalSecondary} opacity="0.75"/>
        <circle  r="2.5"         fill={petalSecondary}/>
        {/* petals suggestion */}
        <ellipse rx="28" ry="10" fill={petalPrimary} opacity="0.4" transform="rotate(30)"/>
        <ellipse rx="28" ry="10" fill={petalPrimary} opacity="0.35" transform="rotate(-30)"/>
        <ellipse rx="28" ry="10" fill={petalPrimary} opacity="0.3" transform="rotate(75)"/>
        <ellipse rx="28" ry="10" fill={petalPrimary} opacity="0.3" transform="rotate(-75)"/>
      </g>

      {/* === Rose — medium, upper-mid === */}
      <g transform="translate(148, 105)">
        <ellipse rx="22" ry="25" fill={petalPrimary} opacity="0.92"/>
        <ellipse rx="17" ry="19" fill={petalSecondary} opacity="0.88"/>
        <ellipse rx="11" ry="14" fill={petalSecondary} opacity="0.82"/>
        <ellipse rx="6"  ry="9"  fill={petalSecondary} opacity="0.78"/>
        <circle  r="2"           fill={petalSecondary}/>
        <ellipse rx="22" ry="8" fill={petalPrimary} opacity="0.38" transform="rotate(40)"/>
        <ellipse rx="22" ry="8" fill={petalPrimary} opacity="0.32" transform="rotate(-40)"/>
      </g>

      {/* === Rose — large, top-right === */}
      <g transform="translate(185, 48)">
        <ellipse rx="30" ry="34" fill={petalPrimary} opacity="0.9"/>
        <ellipse rx="23" ry="27" fill={petalSecondary} opacity="0.88"/>
        <ellipse rx="16" ry="20" fill={petalSecondary} opacity="0.84"/>
        <ellipse rx="9"  ry="13" fill={petalSecondary} opacity="0.78"/>
        <ellipse rx="4"  ry="6"  fill={petalSecondary} opacity="0.75"/>
        <circle  r="2"           fill={petalSecondary}/>
        <ellipse rx="30" ry="11" fill={petalPrimary} opacity="0.35" transform="rotate(25)"/>
        <ellipse rx="30" ry="11" fill={petalPrimary} opacity="0.3" transform="rotate(-55)"/>
        <ellipse rx="30" ry="11" fill={petalPrimary} opacity="0.28" transform="rotate(80)"/>
      </g>

      {/* === Rose bud — small, left === */}
      <g transform="translate(25, 205)">
        <ellipse rx="14" ry="16" fill={petalPrimary} opacity="0.85"/>
        <ellipse rx="9"  ry="11" fill={petalSecondary} opacity="0.8"/>
        <ellipse rx="4"  ry="6"  fill={petalSecondary} opacity="0.75"/>
        <circle  r="1.5"         fill={petalSecondary}/>
      </g>

      {/* === Gold arabesque lattice overlay (top-right corner) === */}
      <g opacity="0.18">
        {[0,1,2,3].map(row => (
          <g key={row}>
            {[0,1,2,3].map(col => (
              <g key={col} transform={`translate(${130+col*22},${10+row*22})`}>
                <rect x="-8" y="-8" width="16" height="16" stroke={gold} strokeWidth="0.6" fill="none"/>
                <rect x="-8" y="-8" width="16" height="16" stroke={gold} strokeWidth="0.6" fill="none" transform="rotate(45)"/>
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mosque silhouette — far background, very soft
───────────────────────────────────────────────────────────── */
function MosqueSilhouette({ tint }: { tint: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* main dome */}
      <ellipse cx="200" cy="120" rx="70" ry="80" fill={`${tint}0.18)`}/>
      <rect x="130" y="120" width="140" height="80" fill={`${tint}0.14)`}/>
      {/* minarets */}
      <rect x="90"  y="70"  width="20" height="130" fill={`${tint}0.12)`} rx="2"/>
      <ellipse cx="100" cy="68" rx="12" ry="18" fill={`${tint}0.14)`}/>
      <rect x="290" y="70"  width="20" height="130" fill={`${tint}0.12)`} rx="2"/>
      <ellipse cx="300" cy="68" rx="12" ry="18" fill={`${tint}0.14)`}/>
      {/* side buildings */}
      <rect x="50"  y="130" width="50" height="70" fill={`${tint}0.09)`} rx="1"/>
      <ellipse cx="75" cy="128" rx="26" ry="32" fill={`${tint}0.1)`}/>
      <rect x="300" y="130" width="50" height="70" fill={`${tint}0.09)`} rx="1"/>
      <ellipse cx="325" cy="128" rx="26" ry="32" fill={`${tint}0.1)`}/>
      {/* ground line */}
      <rect x="0" y="195" width="400" height="5" fill={`${tint}0.08)`}/>
    </svg>
  );
}


/* ─────────────────────────────────────────────────────────────
   Center Mughal ornament divider
───────────────────────────────────────────────────────────── */
function MughalOrnament({ uid, gold, goldLight, petalFill }: { uid: string; gold: string; goldLight: string; petalFill: string }) {
  return (
    <svg width="120" height="36" viewBox="0 0 120 36" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`mo-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor={gold} stopOpacity="0"/>
          <stop offset="30%" stopColor={gold} stopOpacity="1"/>
          <stop offset="50%" stopColor={goldLight} stopOpacity="1"/>
          <stop offset="70%" stopColor={gold} stopOpacity="1"/>
          <stop offset="100%" stopColor={gold} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* lines */}
      <line x1="0" y1="18" x2="40" y2="18" stroke={`url(#mo-${uid})`} strokeWidth="0.8"/>
      <line x1="80" y1="18" x2="120" y2="18" stroke={`url(#mo-${uid})`} strokeWidth="0.8"/>
      {/* center 8-pointed star */}
      <g transform="translate(60,18)">
        {[0,45,90,135].map(a=>(
          <ellipse key={a} rx="4" ry="11" fill={gold} opacity="0.6" transform={`rotate(${a})`}/>
        ))}
        <circle r="4" fill={goldLight} opacity="0.9"/>
        <circle r="2" fill={petalFill}/>
      </g>
      {/* side diamonds */}
      <rect x="36" y="14" width="8" height="8" fill={gold} opacity="0.45" transform="rotate(45 40 18)"/>
      <rect x="76" y="14" width="8" height="8" fill={gold} opacity="0.45" transform="rotate(45 80 18)"/>
      {/* tiny dots */}
      <circle cx="26" cy="18" r="2" fill={gold} opacity="0.35"/>
      <circle cx="94" cy="18" r="2" fill={gold} opacity="0.35"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating petals rendered client-side
───────────────────────────────────────────────────────────── */
const PETAL_SHAPES = [
  "M10 1 C15 4 17 11 12 18 C10 22 8 22 6 18 C1 11 3 4 10 1Z",
  "M10 2 Q18 7 15 17 Q10 22 5 17 Q2 7 10 2Z",
  "M10 1 Q19 9 13 20 Q10 23 7 20 Q1 9 10 1Z",
];
function Petals({ list, petalColor, goldColor }: { list: Petal[]; petalColor: string; goldColor: string }) {
  return (
    <>
      {list.map(p => (
        <motion.div key={p.id} className="pointer-events-none absolute" aria-hidden="true"
          style={{ left: `${p.left}%`, top: "-5%", width: p.size, height: p.size }}
          animate={{
            y: ["0vh","110vh"],
            x: [0, p.id%2===0 ? 40:-40, 0],
            rotate: [p.rotate, p.rotate+200],
            opacity: [0, 0.5, 0.4, 0.5, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease:"linear" }}
        >
          <svg viewBox="0 0 20 24" width={p.size} height={p.size}>
            <path d={PETAL_SHAPES[p.kind]} fill={p.kind===2 ? goldColor : petalColor} opacity="0.85"/>
          </svg>
        </motion.div>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────── */
export function CoverScreen({ groom, bride, onOpen }: CoverScreenProps) {
  const petals = usePetals(16);
  const uid = useId().replace(/:/g,"");
  const { theme, themeId } = useTheme();
  const router = useRouter();
  const nextThemeId = THEME_ORDER[(THEME_ORDER.indexOf(themeId) + 1) % THEME_ORDER.length];
  const nextTheme = THEMES[nextThemeId];

  function handleThemeSwitch() {
    const base = "/designs/ivory-blush";
    router.push(`${base}/${nextThemeId}`);
  }

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{ height:"100dvh", width:"100%", background: theme.coverBg,
        transition:"background 0.6s ease" }}
    >

      {/* ═══ LAYER 0 — far background sunlight rays ═══ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          background:[
            `radial-gradient(ellipse 55% 60% at 50% 20%, ${theme.ambientTop} 0%, transparent 65%)`,
            `radial-gradient(ellipse 30% 50% at 50% 10%, ${theme.ambientTop.replace("0.7","0.35")} 0%, transparent 55%)`,
            `radial-gradient(ellipse 80% 40% at 20% 90%, ${theme.ambientBottom} 0%, transparent 60%)`,
            `radial-gradient(ellipse 80% 40% at 80% 90%, ${theme.ambientBottom} 0%, transparent 60%)`,
          ].join(","),
          transition:"background 0.6s ease",
        }}
      />

      {/* ═══ LAYER 1 — mosque silhouette, blurred ═══ */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[45%]"
        aria-hidden="true"
        style={{ filter:"blur(6px)", opacity: 0.55 }}>
        <MosqueSilhouette tint={theme.mosqueTint}/>
      </div>

      {/* ═══ LAYER 2 — accent arabesque lattice sides ═══ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='${encodeURIComponent(theme.gold)}' stroke-width='0.5' opacity='0.2'%3E%3Crect x='8' y='8' width='32' height='32'/%3E%3Crect x='8' y='8' width='32' height='32' transform='rotate(45 24 24)'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage:"radial-gradient(ellipse 90% 95% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)",
          WebkitMaskImage:"radial-gradient(ellipse 90% 95% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ═══ LAYER 3 — ROSE CLUSTERS (all 4 corners, overlap arch) ═══ */}
      {/* Top-left — dedicated cluster with roses near top */}
      <div className="pointer-events-none absolute -top-4 -left-4 z-[8]" aria-hidden="true"
        style={{ width:"clamp(130px,36vw,170px)", height:"clamp(130px,36vw,170px)" }}>
        <TopRoseCluster petalPrimary={theme.petalPrimary} petalSecondary={theme.petalSecondary} gold={theme.gold} petalFill={theme.petalFill}/>
      </div>
      {/* Top-right — mirrored horizontally */}
      <div className="pointer-events-none absolute -top-4 -right-4 z-[8]" aria-hidden="true"
        style={{ width:"clamp(130px,36vw,170px)", height:"clamp(130px,36vw,170px)" }}>
        <TopRoseCluster flip petalPrimary={theme.petalPrimary} petalSecondary={theme.petalSecondary} gold={theme.gold} petalFill={theme.petalFill}/>
      </div>
      {/* Bottom-left */}
      <div className="pointer-events-none absolute -bottom-4 -left-4 z-[8]" aria-hidden="true"
        style={{ width:"clamp(140px,42vw,185px)", height:"clamp(160px,48vw,210px)", transform:"scaleY(-1)" }}>
        <RoseCluster petalPrimary={theme.petalPrimary} petalSecondary={theme.petalSecondary} gold={theme.gold} petalFill={theme.petalFill}/>
      </div>
      {/* Bottom-right */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 z-[8]" aria-hidden="true"
        style={{ width:"clamp(140px,42vw,185px)", height:"clamp(160px,48vw,210px)", transform:"scaleX(-1) scaleY(-1)" }}>
        <RoseCluster petalPrimary={theme.petalPrimary} petalSecondary={theme.petalSecondary} gold={theme.gold} petalFill={theme.petalFill}/>
      </div>

      {/* ═══ LAYER 4 — floating petals ═══ */}
      <div className="pointer-events-none absolute inset-0 z-[9]" aria-hidden="true">
        <Petals list={petals} petalColor={theme.petalPrimary} goldColor={theme.gold}/>
      </div>

      {/* ═══ LAYER 5 — SOFT IVORY LIGHT COLUMN ═══ */}
      {/* No hard edges — pure atmospheric radial glow that bleeds into the flowers */}
      <div
        className="pointer-events-none absolute z-[5]"
        aria-hidden="true"
        style={{
          top: "-5%", left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(220px, 68vw, 320px)",
          height: "115%",
          background: [
            "radial-gradient(ellipse 85% 38% at 50% 22%, rgba(255,255,255,0.97) 0%, rgba(255,252,246,0.92) 35%, rgba(255,248,238,0.6) 60%, transparent 100%)",
            "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(255,250,242,0.88) 0%, rgba(255,244,230,0.65) 40%, transparent 80%)",
            "radial-gradient(ellipse 60% 25% at 50% 88%, rgba(255,246,234,0.7) 0%, transparent 70%)",
          ].join(","),
          filter: "blur(2px)",
        }}
      />

      {/* ═══ LAYER 7 — CONTENT inside arch ═══ */}
      <div
        className="absolute inset-0 z-[10] flex flex-col items-center justify-between"
        style={{ paddingTop:"clamp(28px,7dvh,56px)", paddingBottom:"clamp(100px,22dvh,160px)" }}
      >
        {/* ── TOP BLOCK: Bismillah ── */}
        <motion.div
          initial={{ opacity:0, y:-10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.3 }}
          className="text-center relative flex flex-col items-center"
        >
          <div className="absolute inset-0 blur-xl rounded-full"
            style={{ background:`${theme.mosqueTint}0.22)`, transform:"scale(1.6)" }}
            aria-hidden="true"
          />
          <p
            className="invitation-arabic relative"
            style={{
              fontSize:"clamp(17px,4.2vw,25px)",
              fontWeight:500,
              color:theme.arabicColor,
              lineHeight:2,
              direction:"rtl",
              textShadow:`0 2px 12px ${theme.mosqueTint}0.5)`,
            }}
            aria-label="Bismillah ir-Rahman ir-Rahim"
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          {/* Gold hairline separator — transitions Bismillah into names */}
          <motion.div
            initial={{ scaleX:0, opacity:0 }}
            animate={{ scaleX:1, opacity:1 }}
            transition={{ duration:0.7, delay:0.5 }}
            style={{
              width:"clamp(48px,12vw,64px)",
              height:1,
              marginTop:4,
              background:`linear-gradient(to right,transparent,${theme.gold},transparent)`,
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* ── CENTRE BLOCK: Names ── */}
        <motion.div
          initial={{ opacity:0, y:18 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.85, delay:0.55 }}
          className="text-center"
          style={{ lineHeight:1.0 }}
        >
          <h1 style={{ fontFamily:'"Cormorant Garamond","Bodoni Moda",serif', color:theme.textDark, margin:0 }}>
            {groom.split(" ").map((word, wi) => (
              <span key={wi} className="block"
                style={{ fontSize:"clamp(42px,10.5vw,66px)", fontWeight:600, letterSpacing:"-0.01em", lineHeight:1.05 }}>
                {word}
              </span>
            ))}
            {/* Whisper ampersand — delicate, not competing */}
            <span className="block" style={{
              fontSize:"clamp(18px,3.5vw,22px)",
              fontWeight:200,
              fontStyle:"italic",
              color:theme.ampersandColor,
              margin:"6px 0",
              letterSpacing:"0.18em",
              fontFamily:'"Cormorant Garamond",serif',
            }}>
              &amp;
            </span>
            {bride.split(" ").map((word, wi) => (
              <span key={`b${wi}`} className="block"
                style={{ fontSize:"clamp(42px,10.5vw,66px)", fontWeight:600, letterSpacing:"-0.01em", lineHeight:1.05 }}>
                {word}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* ── BOTTOM BLOCK: Ornament + copy + date ── */}
        <div className="flex flex-col items-center gap-2">
          {/* Mughal ornament */}
          <motion.div
            initial={{ opacity:0, scaleX:0.5 }}
            animate={{ opacity:1, scaleX:1 }}
            transition={{ duration:0.6, delay:0.8 }}
          >
            <MughalOrnament uid={`${uid}b`} gold={theme.gold} goldLight={theme.goldLight} petalFill={theme.petalFill}/>
          </motion.div>

          {/* Invitation copy */}
          <motion.p
            initial={{ opacity:0, y:8 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.95 }}
            className="text-center px-10"
            style={{
              fontSize:"clamp(11.5px,3vw,14px)",
              color:theme.textMid,
              fontFamily:'"Cormorant Garamond",serif',
              fontStyle:"italic",
              lineHeight:1.65,
            }}
          >
            Together with their families,<br/>
            request the honor of your presence<br/>
            at their <strong style={{ fontStyle:"normal", color:theme.textDark }}>Nikah</strong>
          </motion.p>

          {/* Date — slim, tracking caps, gold */}
          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.6, delay:1.1 }}
            style={{
              fontSize:"clamp(9px,2.2vw,11px)",
              color:theme.gold,
              letterSpacing:"0.22em",
              textTransform:"uppercase",
              fontFamily:"var(--font-invitation-sans),system-ui,sans-serif",
              fontWeight:500,
            }}
          >
            15 · December · 2026
          </motion.p>
        </div>
      </div>

      {/* ═══ LAYER 8 — CTA + swipe indicator, anchored to bottom ═══ */}
      <div className="absolute bottom-0 left-0 right-0 z-[20] flex flex-col items-center"
        style={{ paddingBottom:"max(20px,env(safe-area-inset-bottom,20px))", gap:"10px" }}>

        {/* ── Unified floating toolbar ── */}
        <PreviewToolbar
          accentColor={theme.gold}
          nextThemeSwatch={nextTheme.swatch}
          nextThemeLabel={nextTheme.label}
          nextThemeAriaLabel={`Switch to ${nextTheme.label} theme`}
          mrp="₹2k"
          salePrice="₹999"
          discountLabel="50% OFF"
          whatsappHref="https://wa.me/918985798572?text=Hi%2C%20I%27m%20interested%20in%20the%20Ivory%20Blush%20wedding%20invitation%20%E2%80%94%20please%20share%20details!"
          onThemeSwitch={handleThemeSwitch}
        />

        {/* ── Premium glass capsule ── */}
        <motion.button
          initial={{ opacity:0, y:24, scale:0.95 }}
          animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.75, delay:1.2 }}
          whileTap={{ scale:0.97 }}
          onClick={onOpen}
          aria-label="Open invitation"
          style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            height:72,
            width:"min(320px,82%)",
            background:theme.buttonBg,
            backdropFilter:"blur(30px)",
            WebkitBackdropFilter:"blur(30px)",
            border:`1.5px solid ${theme.glassBorder}`,
            borderRadius:999,
            paddingLeft:28, paddingRight:10,
            cursor:"pointer",
            boxShadow:[
              `0 12px 40px ${theme.mosqueTint}0.22)`,
              "0 2px 8px rgba(0,0,0,0.05)",
              "inset 0 1px 0 rgba(255,255,255,0.95)",
              `0 0 0 1px ${theme.mosqueTint}0.18)`,
            ].join(","),
            transition:"background 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <span style={{
            fontFamily:'"Cormorant Garamond",serif',
            fontSize:"clamp(16px,4.5vw,19px)",
            fontWeight:600,
            color:theme.buttonText,
            letterSpacing:"0.01em",
            flex:1,
            textAlign:"center",
            paddingLeft:4,
          }}>
            Open Invitation
          </span>

          {/* Champagne gold action circle */}
          <div
            aria-hidden="true"
            style={{
              width:52, height:52,
              borderRadius:"50%",
              background:theme.buttonCircleBg,
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0,
              boxShadow:`0 8px 30px ${theme.mosqueTint}0.4), inset 0 1px 0 rgba(255,255,255,0.3)`,
              transition:"background 0.4s ease",
            }}
          >
            <ChevronRight size={22} color="#fff" strokeWidth={2.5}/>
          </div>
        </motion.button>

        {/* Apple-style button reflection */}
        <div aria-hidden="true" style={{
          width:"min(300px,78%)",
          height:12,
          borderRadius:"0 0 24px 24px",
          background:`linear-gradient(to bottom, ${theme.mosqueTint}0.12), transparent)`,
          filter:"blur(4px)",
          marginTop:-6,
        }}/>

        {/* Swipe indicator — tight to button */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.5, delay:1.6 }}
          className="flex flex-col items-center"
          style={{ gap:3, marginTop:-2 }}
        >
          <motion.svg
            width="16" height="10" viewBox="0 0 16 10"
            animate={{ y:[0,-4,0] }}
            transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}
            aria-hidden="true"
          >
            <path d="M1 8 L8 2 L15 8" stroke={theme.textMid} strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
          </motion.svg>
          <span style={{
            fontSize:"9px", color:theme.textMid, opacity:0.42,
            letterSpacing:"0.16em", textTransform:"uppercase",
            fontFamily:"var(--font-invitation-sans),system-ui,sans-serif",
          }}>
            Swipe up to continue
          </span>
        </motion.div>
      </div>

    </div>
  );
}
