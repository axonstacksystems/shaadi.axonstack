"use client";

import { useEffect, useState, useId } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

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
function TopRoseCluster({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined, transformOrigin: "center", width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {/* === Vines / stems — radiate outward from top-left corner === */}
      <path d="M10 10 Q60 70 100 110 Q140 150 185 200" stroke="#C9A46A" strokeWidth="1.4" opacity="0.45" fill="none"/>
      <path d="M10 10 Q40 60 80 90 Q120 120 165 160" stroke="#C9A46A" strokeWidth="1" opacity="0.32" fill="none"/>
      <path d="M10 10 Q30 50 55 80 Q80 110 110 160" stroke="#C9A46A" strokeWidth="0.9" opacity="0.28" fill="none"/>
      <path d="M0 40 Q40 60 70 100" stroke="#C9A46A" strokeWidth="0.8" opacity="0.25" fill="none"/>

      {/* === Champagne leaves === */}
      <ellipse cx="72" cy="82" rx="12" ry="22" fill="#D9B67A" opacity="0.3" transform="rotate(-35 72 82)"/>
      <ellipse cx="50" cy="55" rx="9" ry="18" fill="#D9B67A" opacity="0.24" transform="rotate(20 50 55)"/>
      <ellipse cx="115" cy="118" rx="10" ry="20" fill="#D9B67A" opacity="0.26" transform="rotate(-50 115 118)"/>
      <ellipse cx="145" cy="148" rx="8" ry="16" fill="#D9B67A" opacity="0.2" transform="rotate(-25 145 148)"/>
      <ellipse cx="28" cy="32" rx="8" ry="14" fill="#D9B67A" opacity="0.22" transform="rotate(35 28 32)"/>

      {/* === Small filler flowers === */}
      <circle cx="32" cy="22" r="12" fill="#FBF8F4" opacity="0.85"/>
      <circle cx="32" cy="22" r="7"  fill="#F7F3EE" opacity="0.9"/>
      <circle cx="52" cy="38" r="9"  fill="#FBF8F4" opacity="0.75"/>
      <circle cx="18" cy="44" r="8"  fill="#FBF8F4" opacity="0.7"/>
      <circle cx="98"  cy="115" r="7" fill="#FBF8F4" opacity="0.6"/>
      <circle cx="158" cy="158" r="6" fill="#FBF8F4" opacity="0.55"/>

      {/* === Main rose — large, top-left (corner anchor) === */}
      <g transform="translate(68, 52)">
        <ellipse rx="30" ry="34" fill="#ECC9C3" opacity="0.95"/>
        <ellipse rx="23" ry="27" fill="#E4BAB3" opacity="0.9"/>
        <ellipse rx="16" ry="20" fill="#D9A9A1" opacity="0.85"/>
        <ellipse rx="10" ry="13" fill="#CF9B92" opacity="0.8"/>
        <ellipse rx="5"  ry="7"  fill="#C48D83" opacity="0.75"/>
        <circle  r="2.5"         fill="#B87E73"/>
        <ellipse rx="30" ry="11" fill="#ECC9C3" opacity="0.38" transform="rotate(-30)"/>
        <ellipse rx="30" ry="11" fill="#ECC9C3" opacity="0.33" transform="rotate(30)"/>
        <ellipse rx="30" ry="11" fill="#ECC9C3" opacity="0.28" transform="rotate(-75)"/>
        <ellipse rx="30" ry="11" fill="#ECC9C3" opacity="0.28" transform="rotate(75)"/>
      </g>

      {/* === Rose — medium, mid === */}
      <g transform="translate(148, 148)">
        <ellipse rx="22" ry="25" fill="#ECC9C3" opacity="0.92"/>
        <ellipse rx="17" ry="19" fill="#E4BAB3" opacity="0.88"/>
        <ellipse rx="11" ry="14" fill="#D9A9A1" opacity="0.82"/>
        <ellipse rx="6"  ry="9"  fill="#CF9B92" opacity="0.78"/>
        <circle  r="2"           fill="#B87E73"/>
        <ellipse rx="22" ry="8"  fill="#ECC9C3" opacity="0.38" transform="rotate(-40)"/>
        <ellipse rx="22" ry="8"  fill="#ECC9C3" opacity="0.32" transform="rotate(40)"/>
      </g>

      {/* === Rose — large, top-right corner (outward) === */}
      <g transform="translate(185, 20)">
        <ellipse rx="28" ry="32" fill="#ECC9C3" opacity="0.9"/>
        <ellipse rx="21" ry="25" fill="#E0B4AC" opacity="0.88"/>
        <ellipse rx="14" ry="18" fill="#D4A49B" opacity="0.84"/>
        <ellipse rx="8"  ry="11" fill="#C99189" opacity="0.78"/>
        <ellipse rx="4"  ry="6"  fill="#BC7F76" opacity="0.75"/>
        <circle  r="2"           fill="#A86B62"/>
        <ellipse rx="28" ry="10" fill="#ECC9C3" opacity="0.35" transform="rotate(-25)"/>
        <ellipse rx="28" ry="10" fill="#ECC9C3" opacity="0.3"  transform="rotate(55)"/>
      </g>

      {/* === Small bud — far corner === */}
      <g transform="translate(22, 18)">
        <ellipse rx="14" ry="16" fill="#ECC9C3" opacity="0.85"/>
        <ellipse rx="9"  ry="11" fill="#D9A9A1" opacity="0.8"/>
        <ellipse rx="4"  ry="6"  fill="#CF9B92" opacity="0.75"/>
        <circle  r="1.5"         fill="#B87E73"/>
      </g>

      {/* === Gold arabesque lattice (bottom-right of this cluster) === */}
      <g opacity="0.16">
        {[0,1,2,3].map(row => (
          <g key={row}>
            {[0,1,2,3].map(col => (
              <g key={col} transform={`translate(${128+col*22},${160+row*22})`}>
                <rect x="-8" y="-8" width="16" height="16" stroke="#CBA46A" strokeWidth="0.6" fill="none"/>
                <rect x="-8" y="-8" width="16" height="16" stroke="#CBA46A" strokeWidth="0.6" fill="none" transform="rotate(45)"/>
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
function RoseCluster({ flip, flipY, className }: {
  flip?: boolean; flipY?: boolean; className?: string;
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
      <path d="M10 250 Q60 190 100 150 Q140 110 180 60" stroke="#C9A46A" strokeWidth="1.4" opacity="0.5" fill="none"/>
      <path d="M10 250 Q40 200 80 170 Q120 140 160 90" stroke="#C9A46A" strokeWidth="1" opacity="0.35" fill="none"/>
      <path d="M10 250 Q50 210 90 200 Q130 190 170 130" stroke="#C9A46A" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M0 200 Q50 180 80 140" stroke="#C9A46A" strokeWidth="0.8" opacity="0.3" fill="none"/>

      {/* === Champagne leaves === */}
      <ellipse cx="75" cy="185" rx="12" ry="22" fill="#D9B67A" opacity="0.28" transform="rotate(35 75 185)"/>
      <ellipse cx="55" cy="210" rx="9" ry="18" fill="#D9B67A" opacity="0.22" transform="rotate(-20 55 210)"/>
      <ellipse cx="120" cy="155" rx="10" ry="20" fill="#D9B67A" opacity="0.25" transform="rotate(50 120 155)"/>
      <ellipse cx="145" cy="110" rx="8" ry="16" fill="#D9B67A" opacity="0.2" transform="rotate(25 145 110)"/>
      <ellipse cx="30" cy="230" rx="8" ry="15" fill="#D9B67A" opacity="0.2" transform="rotate(-35 30 230)"/>

      {/* === Small filler flowers (ivory / white) === */}
      {/* cluster near bottom-left */}
      <circle cx="35" cy="240" r="12" fill="#FBF8F4" opacity="0.85"/>
      <circle cx="35" cy="240" r="7" fill="#F7F3EE" opacity="0.9"/>
      <circle cx="55" cy="225" r="9" fill="#FBF8F4" opacity="0.75"/>
      <circle cx="20" cy="218" r="8" fill="#FBF8F4" opacity="0.7"/>
      {/* small blossoms on stems */}
      <circle cx="100" cy="148" r="7" fill="#FBF8F4" opacity="0.65"/>
      <circle cx="162" cy="88" r="6" fill="#FBF8F4" opacity="0.6"/>

      {/* === Main rose — large, bottom === */}
      <g transform="translate(70, 200)">
        <ellipse rx="28" ry="32" fill="#ECC9C3" opacity="0.95"/>
        <ellipse rx="22" ry="26" fill="#E4BAB3" opacity="0.9"/>
        <ellipse rx="16" ry="20" fill="#D9A9A1" opacity="0.85"/>
        <ellipse rx="10" ry="13" fill="#CF9B92" opacity="0.8"/>
        <ellipse rx="5"  ry="7"  fill="#C48D83" opacity="0.75"/>
        <circle  r="2.5"         fill="#B87E73"/>
        {/* petals suggestion */}
        <ellipse rx="28" ry="10" fill="#ECC9C3" opacity="0.4" transform="rotate(30)"/>
        <ellipse rx="28" ry="10" fill="#ECC9C3" opacity="0.35" transform="rotate(-30)"/>
        <ellipse rx="28" ry="10" fill="#ECC9C3" opacity="0.3" transform="rotate(75)"/>
        <ellipse rx="28" ry="10" fill="#ECC9C3" opacity="0.3" transform="rotate(-75)"/>
      </g>

      {/* === Rose — medium, upper-mid === */}
      <g transform="translate(148, 105)">
        <ellipse rx="22" ry="25" fill="#ECC9C3" opacity="0.92"/>
        <ellipse rx="17" ry="19" fill="#E4BAB3" opacity="0.88"/>
        <ellipse rx="11" ry="14" fill="#D9A9A1" opacity="0.82"/>
        <ellipse rx="6"  ry="9"  fill="#CF9B92" opacity="0.78"/>
        <circle  r="2"           fill="#B87E73"/>
        <ellipse rx="22" ry="8" fill="#ECC9C3" opacity="0.38" transform="rotate(40)"/>
        <ellipse rx="22" ry="8" fill="#ECC9C3" opacity="0.32" transform="rotate(-40)"/>
      </g>

      {/* === Rose — large, top-right === */}
      <g transform="translate(185, 48)">
        <ellipse rx="30" ry="34" fill="#ECC9C3" opacity="0.9"/>
        <ellipse rx="23" ry="27" fill="#E0B4AC" opacity="0.88"/>
        <ellipse rx="16" ry="20" fill="#D4A49B" opacity="0.84"/>
        <ellipse rx="9"  ry="13" fill="#C99189" opacity="0.78"/>
        <ellipse rx="4"  ry="6"  fill="#BC7F76" opacity="0.75"/>
        <circle  r="2"           fill="#A86B62"/>
        <ellipse rx="30" ry="11" fill="#ECC9C3" opacity="0.35" transform="rotate(25)"/>
        <ellipse rx="30" ry="11" fill="#ECC9C3" opacity="0.3" transform="rotate(-55)"/>
        <ellipse rx="30" ry="11" fill="#ECC9C3" opacity="0.28" transform="rotate(80)"/>
      </g>

      {/* === Rose bud — small, left === */}
      <g transform="translate(25, 205)">
        <ellipse rx="14" ry="16" fill="#ECC9C3" opacity="0.85"/>
        <ellipse rx="9"  ry="11" fill="#D9A9A1" opacity="0.8"/>
        <ellipse rx="4"  ry="6"  fill="#CF9B92" opacity="0.75"/>
        <circle  r="1.5"         fill="#B87E73"/>
      </g>

      {/* === Gold arabesque lattice overlay (top-right corner) === */}
      <g opacity="0.18">
        {[0,1,2,3].map(row => (
          <g key={row}>
            {[0,1,2,3].map(col => (
              <g key={col} transform={`translate(${130+col*22},${10+row*22})`}>
                <rect x="-8" y="-8" width="16" height="16" stroke="#CBA46A" strokeWidth="0.6" fill="none"/>
                <rect x="-8" y="-8" width="16" height="16" stroke="#CBA46A" strokeWidth="0.6" fill="none" transform="rotate(45)"/>
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
function MosqueSilhouette() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* main dome */}
      <ellipse cx="200" cy="120" rx="70" ry="80" fill="rgba(203,164,106,0.18)"/>
      <rect x="130" y="120" width="140" height="80" fill="rgba(203,164,106,0.14)"/>
      {/* minarets */}
      <rect x="90"  y="70"  width="20" height="130" fill="rgba(203,164,106,0.12)" rx="2"/>
      <ellipse cx="100" cy="68" rx="12" ry="18" fill="rgba(203,164,106,0.14)"/>
      <rect x="290" y="70"  width="20" height="130" fill="rgba(203,164,106,0.12)" rx="2"/>
      <ellipse cx="300" cy="68" rx="12" ry="18" fill="rgba(203,164,106,0.14)"/>
      {/* side buildings */}
      <rect x="50"  y="130" width="50" height="70" fill="rgba(203,164,106,0.09)" rx="1"/>
      <ellipse cx="75" cy="128" rx="26" ry="32" fill="rgba(203,164,106,0.1)"/>
      <rect x="300" y="130" width="50" height="70" fill="rgba(203,164,106,0.09)" rx="1"/>
      <ellipse cx="325" cy="128" rx="26" ry="32" fill="rgba(203,164,106,0.1)"/>
      {/* ground line */}
      <rect x="0" y="195" width="400" height="5" fill="rgba(203,164,106,0.08)"/>
    </svg>
  );
}


/* ─────────────────────────────────────────────────────────────
   Center Mughal ornament divider
───────────────────────────────────────────────────────────── */
function MughalOrnament({ uid }: { uid: string }) {
  return (
    <svg width="120" height="36" viewBox="0 0 120 36" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`mo-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="#B99054" stopOpacity="0"/>
          <stop offset="30%" stopColor="#CBA46A" stopOpacity="1"/>
          <stop offset="50%" stopColor="#D9B67A" stopOpacity="1"/>
          <stop offset="70%" stopColor="#CBA46A" stopOpacity="1"/>
          <stop offset="100%" stopColor="#B99054" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* lines */}
      <line x1="0" y1="18" x2="40" y2="18" stroke={`url(#mo-${uid})`} strokeWidth="0.8"/>
      <line x1="80" y1="18" x2="120" y2="18" stroke={`url(#mo-${uid})`} strokeWidth="0.8"/>
      {/* center 8-pointed star */}
      <g transform="translate(60,18)">
        {[0,45,90,135].map(a=>(
          <ellipse key={a} rx="4" ry="11" fill="#CBA46A" opacity="0.6" transform={`rotate(${a})`}/>
        ))}
        <circle r="4" fill="#D9B67A" opacity="0.9"/>
        <circle r="2" fill="#FBF8F4"/>
      </g>
      {/* side diamonds */}
      <rect x="36" y="14" width="8" height="8" fill="#CBA46A" opacity="0.45" transform="rotate(45 40 18)"/>
      <rect x="76" y="14" width="8" height="8" fill="#CBA46A" opacity="0.45" transform="rotate(45 80 18)"/>
      {/* tiny dots */}
      <circle cx="26" cy="18" r="2" fill="#CBA46A" opacity="0.35"/>
      <circle cx="94" cy="18" r="2" fill="#CBA46A" opacity="0.35"/>
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
function Petals({ list }: { list: Petal[] }) {
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
            <path d={PETAL_SHAPES[p.kind]} fill={p.kind===2?"#D9B67A":"#ECC9C3"} opacity="0.85"/>
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

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{ height:"100dvh", width:"100%",
        background:"linear-gradient(170deg,#FDF6EF 0%,#F5E8D8 40%,#EDD9C4 100%)" }}
    >

      {/* ═══ LAYER 0 — far background sunlight rays ═══ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          background:[
            "radial-gradient(ellipse 55% 60% at 50% 20%, rgba(255,240,210,0.7) 0%, transparent 65%)",
            "radial-gradient(ellipse 30% 50% at 50% 10%, rgba(255,220,160,0.35) 0%, transparent 55%)",
            "radial-gradient(ellipse 80% 40% at 20% 90%, rgba(232,198,193,0.35) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 40% at 80% 90%, rgba(232,198,193,0.35) 0%, transparent 60%)",
          ].join(","),
        }}
      />

      {/* ═══ LAYER 1 — mosque silhouette, blurred ═══ */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[45%]"
        aria-hidden="true"
        style={{ filter:"blur(6px)", opacity: 0.55 }}>
        <MosqueSilhouette/>
      </div>

      {/* ═══ LAYER 2 — gold arabesque lattice sides ═══ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23CBA46A' stroke-width='0.5' opacity='0.2'%3E%3Crect x='8' y='8' width='32' height='32'/%3E%3Crect x='8' y='8' width='32' height='32' transform='rotate(45 24 24)'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage:"radial-gradient(ellipse 90% 95% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)",
          WebkitMaskImage:"radial-gradient(ellipse 90% 95% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ═══ LAYER 3 — ROSE CLUSTERS (all 4 corners, overlap arch) ═══ */}
      {/* Top-left — dedicated cluster with roses near top */}
      <div className="pointer-events-none absolute -top-4 -left-4 z-[8]" aria-hidden="true"
        style={{ width:"clamp(160px,48vw,210px)", height:"clamp(190px,56vw,250px)" }}>
        <TopRoseCluster/>
      </div>
      {/* Top-right — mirrored horizontally */}
      <div className="pointer-events-none absolute -top-4 -right-4 z-[8]" aria-hidden="true"
        style={{ width:"clamp(160px,48vw,210px)", height:"clamp(190px,56vw,250px)" }}>
        <TopRoseCluster flip/>
      </div>
      {/* Bottom-left */}
      <div className="pointer-events-none absolute -bottom-4 -left-4 z-[8]" aria-hidden="true"
        style={{ width:"clamp(140px,42vw,185px)", height:"clamp(160px,48vw,210px)", transform:"scaleY(-1)" }}>
        <RoseCluster/>
      </div>
      {/* Bottom-right */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 z-[8]" aria-hidden="true"
        style={{ width:"clamp(140px,42vw,185px)", height:"clamp(160px,48vw,210px)", transform:"scaleX(-1) scaleY(-1)" }}>
        <RoseCluster/>
      </div>

      {/* ═══ LAYER 4 — floating petals ═══ */}
      <div className="pointer-events-none absolute inset-0 z-[9]" aria-hidden="true">
        <Petals list={petals}/>
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
      <div className="absolute inset-0 z-[10] flex flex-col items-center"
        style={{
          paddingTop: "clamp(32px, 8dvh, 60px)",
        }}
      >
        {/* Bismillah — engraved at top of arch */}
        <motion.div
          initial={{ opacity:0, y:-10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.3 }}
          className="text-center mb-1 relative"
        >
          {/* subtle gold glow behind text */}
          <div className="absolute inset-0 blur-xl rounded-full"
            style={{ background:"rgba(203,164,106,0.2)", transform:"scale(1.4)" }}
            aria-hidden="true"
          />
          <p
            className="invitation-arabic relative"
            style={{
              fontSize:"clamp(18px,4.5vw,26px)",
              fontWeight:500,
              color:"#9A7040",
              lineHeight:2,
              direction:"rtl",
              textShadow:"0 1px 8px rgba(203,164,106,0.4)",
            }}
            aria-label="Bismillah ir-Rahman ir-Rahim"
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </motion.div>

        {/* Couple Names — editorial scale, dominant */}
        <motion.div
          initial={{ opacity:0, y:18 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.85, delay:0.55 }}
          className="text-center"
          style={{ lineHeight:1.05 }}
        >
          <h1 style={{ fontFamily:'"Cormorant Garamond","Bodoni Moda",serif', color:"#3D2B1A" }}>
            {groom.split(" ").map((word, wi) => (
              <span key={wi} className="block"
                style={{ fontSize:"clamp(44px,11vw,72px)", fontWeight:600, letterSpacing:"-0.01em" }}>
                {word}
              </span>
            ))}
            <span className="block" style={{
              fontSize:"clamp(26px,6.5vw,40px)", fontWeight:300, fontStyle:"italic",
              color:"#C9956A", marginTop:"2px", marginBottom:"2px",
              fontFamily:'"Cormorant Garamond",serif',
            }}>
              &amp;
            </span>
            <span className="block"
              style={{ fontSize:"clamp(44px,11vw,72px)", fontWeight:600, letterSpacing:"-0.01em" }}>
              {bride}
            </span>
          </h1>
        </motion.div>

        {/* Mughal ornament divider */}
        <motion.div
          initial={{ opacity:0, scaleX:0.5 }}
          animate={{ opacity:1, scaleX:1 }}
          transition={{ duration:0.6, delay:0.8 }}
          className="my-3"
        >
          <MughalOrnament uid={`${uid}b`}/>
        </motion.div>

        {/* Invitation copy — compact, close to names */}
        <motion.p
          initial={{ opacity:0, y:8 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, delay:0.95 }}
          className="text-center px-8 leading-snug"
          style={{
            fontSize:"clamp(12px,3.2vw,15px)",
            color:"#7A5C3E",
            fontFamily:'"Cormorant Garamond",serif',
            fontStyle:"italic",
          }}
        >
          Together with their families,<br/>
          request the honor of your presence<br/>
          at their <strong style={{ fontStyle:"normal", color:"#5A3D22" }}>Nikah</strong>
        </motion.p>
      </div>

      {/* ═══ LAYER 8 — CTA + swipe indicator, anchored to bottom ═══ */}
      <div className="absolute bottom-0 left-0 right-0 z-[20] flex flex-col items-center"
        style={{ paddingBottom:"max(20px,env(safe-area-inset-bottom,20px))", gap:"10px" }}>

        {/* bottom arch ornament */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.5, delay:1.1 }}
          className="mb-1"
        >
          <MughalOrnament uid={`${uid}c`}/>
        </motion.div>

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
            background:"rgba(255,255,255,0.82)",
            backdropFilter:"blur(30px)",
            WebkitBackdropFilter:"blur(30px)",
            border:"1.5px solid rgba(255,255,255,0.95)",
            borderRadius:999,
            paddingLeft:28, paddingRight:10,
            cursor:"pointer",
            boxShadow:[
              "0 12px 40px rgba(203,164,106,0.22)",
              "0 2px 8px rgba(0,0,0,0.05)",
              "inset 0 1px 0 rgba(255,255,255,0.95)",
              "0 0 0 1px rgba(203,164,106,0.18)",
            ].join(","),
          }}
        >
          <span style={{
            fontFamily:'"Cormorant Garamond",serif',
            fontSize:"clamp(16px,4.5vw,19px)",
            fontWeight:600,
            color:"#3D2B1A",
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
              background:"linear-gradient(135deg,#E7C58A 0%,#CBA46A 50%,#C99B57 100%)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0,
              boxShadow:"0 8px 30px rgba(201,155,87,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
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
          background:"linear-gradient(to bottom, rgba(203,164,106,0.12), transparent)",
          filter:"blur(4px)",
          marginTop:-6,
        }}/>

        {/* Swipe indicator */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.5, delay:1.6 }}
          className="flex flex-col items-center gap-0.5"
        >
          <motion.div
            animate={{ y:[0,-5,0] }}
            transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}
            className="flex flex-col items-center gap-0.5"
            aria-hidden="true"
          >
            <svg width="18" height="11" viewBox="0 0 18 11">
              <path d="M1 9 L9 2 L17 9" stroke="#7A5C3E" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
            </svg>
          </motion.div>
          <span style={{
            fontSize:"10px", color:"#7A5C3E", opacity:0.5,
            letterSpacing:"0.14em", textTransform:"uppercase",
            fontFamily:"var(--font-invitation-sans),system-ui,sans-serif",
          }}>
            Swipe up to continue
          </span>
        </motion.div>
      </div>
    </div>
  );
}
