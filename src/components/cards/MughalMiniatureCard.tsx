"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { RsvpForm } from "@/components/rsvp/RsvpForm";

/* ── Gold Dust Particles ─────────────────────────────────── */
function GoldDust() {
  const particles = useRef(Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 8, duration: Math.random() * 4 + 6,
    size: Math.random() * 2 + 1, opacity: Math.random() * 0.4 + 0.2,
  })));
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {particles.current.map((p) => (
        <div key={p.id} className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, bottom: "-5px", opacity: p.opacity,
            background: "radial-gradient(circle, #c9a227 0%, transparent 70%)",
            animation: `gold-drift ${p.duration}s ${p.delay}s linear infinite`, filter: "blur(0.3px)" }} />
      ))}
    </div>
  );
}

/* ── Ornate Filigree Border ──────────────────────────────── */
function FiligreeBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* SVG filigree frame */}
      <svg className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.rect x="2" y="2" width="96" height="96" rx="2" fill="none" stroke="#c9a227" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, ease: "easeInOut" }} />
        <motion.path d="M2 2 L8 8 M98 2 L92 8 M2 98 L8 92 M98 98 L92 92" stroke="#c9a227" strokeWidth="0.6" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 2, ease: "easeInOut" }} />
      </svg>
      {children}
    </div>
  );
}

/* ── Jewel Node ─────────────────────────────────────────── */
function JewelNode({ color }: { color: "ruby" | "sapphire" | "emerald" }) {
  const colors = { ruby: "#8b1a2d", sapphire: "#1e3a5f", emerald: "#0f5e4a" };
  return (
    <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
      <div className="absolute h-4 w-4 rotate-45" style={{ background: colors[color], boxShadow: `0 0 8px ${colors[color]}66` }} />
      <div className="relative z-10 h-2 w-2 rounded-full bg-white/80" />
    </div>
  );
}

/* ── Parchment Card ──────────────────────────────────────── */
function ParchmentCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-[#c9a227]/30 bg-[#f5e6d3] p-8 shadow-[0_4px_20px_rgba(201,162,39,0.1)] ${className}`}
      style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(201,162,39,0.03) 0%, transparent 50%)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      {children}
    </div>
  );
}

/* ── Countdown ──────────────────────────────────────────── */
function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate);
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const ms = target.getTime() - Date.now();
      if (ms <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({ days: Math.floor(ms / 86400000), hours: Math.floor((ms % 86400000) / 3600000), minutes: Math.floor((ms % 3600000) / 60000), seconds: Math.floor((ms % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [targetDate]);
  const units = [{ label: "Days", value: t.days }, { label: "Hours", value: t.hours }, { label: "Minutes", value: t.minutes }, { label: "Seconds", value: t.seconds }];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {units.map((u) => (
        <ParchmentCard key={u.label} className="text-center">
          <div className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#8b1a2d] sm:text-4xl">{String(u.value).padStart(2, "0")}</div>
          <div className="mt-1 text-xs tracking-widest text-[#2c1810]/60 uppercase">{u.label}</div>
        </ParchmentCard>
      ))}
    </div>
  );
}

interface Props { order: DeliveredOrder; }

/* ── Main Component ───────────────────────────────────────── */
export function MughalMiniatureCard({ order }: Props) {
  const [opened, setOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => { if (opened) { const t = setTimeout(() => setShowContent(true), 800); return () => clearTimeout(t); } }, [opened]);

  const yesMsg = encodeURIComponent(`Alhamdulillah, I will attend the Nikah of ${order.groom} & ${order.bride}.`);
  const noMsg = encodeURIComponent(`With regret, I am unable to attend the Nikah ceremony of ${order.groom} & ${order.bride}.`);

  const jewelColors: Array<"ruby" | "sapphire" | "emerald"> = ["ruby", "sapphire", "emerald", "ruby", "sapphire", "emerald"];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f5e6d3] text-[#2c1810]">
      <GoldDust />

      <style jsx>{`
        @keyframes gold-drift { 0% { transform: translateY(0) translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 0.6; } 100% { transform: translateY(-100vh) translateX(10px); opacity: 0; } }
      `}</style>

      {/* Opening Screen */}
      {!opened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#f5e6d3]/95" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="relative z-10 px-6 text-center">
            <FiligreeBorder className="mx-auto inline-block p-10">
              <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center border-2 border-[#c9a227]/40 bg-[#f5e6d3]">
                <span className="font-[family-name:var(--font-invitation-serif)] text-4xl font-bold text-[#8b1a2d]">{order.groom[0]}&{order.bride[0]}</span>
              </div>
              <p className="mb-2 font-[family-name:var(--font-invitation-script)] text-lg text-[#2c1810]/60">The Nikah of</p>
              <p className="mb-8 font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c1810]">{order.groom} <span className="text-[#8b1a2d]">&amp;</span> {order.bride}</p>
              <button onClick={() => setOpened(true)} className="border-2 border-[#c9a227]/50 bg-gradient-to-r from-[#c9a227]/20 via-[#c9a227]/10 to-[#c9a227]/20 px-10 py-3 text-sm font-semibold tracking-widest text-[#8b1a2d] uppercase transition-all duration-300 hover:border-[#c9a227] hover:from-[#c9a227]/30">Open Invitation</button>
            </FiligreeBorder>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}>
            <p className="mb-6 text-3xl tracking-wide text-[#8b1a2d] sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-invitation-arabic), serif" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}>
            <div className="mx-auto mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a227]/60" />
              <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a227]/60" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a227]/60" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}>
            <p className="mb-8 font-[family-name:var(--font-invitation-script)] text-xl text-[#2c1810]/70 sm:text-2xl">{order.invitationLine}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1.2, type: "spring", stiffness: 60 }}>
            <FiligreeBorder className="mx-auto max-w-2xl">
              <ParchmentCard className="!border-0 !shadow-none">
                <h1 className="font-[family-name:var(--font-invitation-serif)] font-bold leading-tight" style={{ textWrap: "balance" }}>
                  <span className="block text-[#8b1a2d]" style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}>{order.groom}</span>
                  <span className="my-2 block font-[family-name:var(--font-invitation-script)] text-5xl text-[#c9a227]">&amp;</span>
                  <span className="block text-[#1e3a5f]" style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}>{order.bride}</span>
                </h1>
              </ParchmentCard>
            </FiligreeBorder>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }}>
            <p className="mt-8 text-lg text-[#2c1810]/70">We request the honour of your presence at our {order.ceremonyHeadline}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }}>
            <FiligreeBorder className="mx-auto mt-10 max-w-lg">
              <ParchmentCard className="!border-0 !shadow-none">
                <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#8b1a2d]/80">{order.primaryEvent.label}</p>
                <div className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c1810]">{order.primaryEvent.date}</div>
                <div className="mt-1 text-[#2c1810]/60">{order.primaryEvent.time}</div>
                <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
                <div className="text-[#2c1810]/80">
                  <div className="font-semibold text-[#2c1810]">{order.primaryEvent.venue}</div>
                  <div className="text-sm">{order.primaryEvent.venueAddress}</div>
                </div>
              </ParchmentCard>
            </FiligreeBorder>
          </motion.div>
        </section>

        {/* Ayah */}
        <section className="relative px-4 py-28 text-center">
          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <div className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 1 }}>
              <p className="mb-6 text-xl leading-relaxed text-[#8b1a2d]/80 sm:text-2xl" style={{ fontFamily: "var(--font-invitation-arabic), serif" }}>
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1 }}>
              <p className="font-[family-name:var(--font-invitation-script)] text-lg italic leading-relaxed text-[#2c1810]/70 sm:text-xl">
                &ldquo;And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity, and He has placed between you affection and mercy.&rdquo;
              </p>
              <p className="mt-4 text-sm tracking-widest text-[#c9a227]/70">— SURAH AR-RUM 30:21</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1 }}>
              <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Countdown */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#8b1a2d]/60">COUNTING THE DAYS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="mb-14 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#2c1810] sm:text-4xl">Until We Say Qabool</motion.h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <Countdown targetDate={order.eventDateIso} />
            </motion.div>
          </div>
        </section>

        {/* Union */}
        <section className="relative px-4 py-24">
          <div className="relative z-10 mx-auto max-w-5xl">
            <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="mx-auto mb-4 flex h-8 w-8 items-center justify-center"><div className="h-2.5 w-2.5 rotate-45 bg-[#c9a227]/60" /></div>
              <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#2c1810] sm:text-4xl">A Blessed Union of Two Families</h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 80 }}>
                <FiligreeBorder>
                  <ParchmentCard className="!border-0 !shadow-none text-center">
                    <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#8b1a2d]/80">THE GROOM</p>
                    <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c1810]">{order.groom}</h3>
                    <p className="mt-3 text-[#2c1810]/60">With love and blessings<br />from his family</p>
                  </ParchmentCard>
                </FiligreeBorder>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 80, delay: 0.15 }}>
                <FiligreeBorder>
                  <ParchmentCard className="!border-0 !shadow-none text-center">
                    <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#1e3a5f]/80">THE BRIDE</p>
                    <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c1810]">{order.bride}</h3>
                    <p className="mt-3 text-[#2c1810]/60">With love and blessings<br />from her family</p>
                  </ParchmentCard>
                </FiligreeBorder>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-2xl">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 text-center font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#2c1810] sm:text-4xl">Order of Events</motion.h2>
            <div className="space-y-8">
              {order.timeline.map((item: { time: string; event: string; description: string }, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <JewelNode color={jewelColors[i % 3]} />
                      {i < order.timeline.length - 1 && <div className="mt-2 w-px flex-1 bg-gradient-to-b from-[#c9a227]/40 to-transparent" />}
                    </div>
                    <FiligreeBorder className="flex-1">
                      <ParchmentCard className="!border-0 !shadow-none !p-6">
                        <h3 className="font-[family-name:var(--font-invitation-serif)] text-xl font-bold text-[#2c1810]">{item.event}</h3>
                        <p className="mt-1 text-[#c9a227]/80">{item.time}</p>
                        <p className="mt-1 text-[#2c1810]/60">{item.description}</p>
                      </ParchmentCard>
                    </FiligreeBorder>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Venue */}
        <section className="relative px-4 py-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#2c1810] sm:text-4xl">Venue</motion.h2>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <FiligreeBorder>
                <ParchmentCard className="!border-0 !shadow-none p-10">
                  <div className="mx-auto mb-5 flex h-8 w-8 items-center justify-center"><div className="h-2.5 w-2.5 rotate-45 bg-[#c9a227]/60" /></div>
                  <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c1810]">{order.primaryEvent.venue}</h3>
                  <p className="mt-3 text-[#2c1810]/60">{order.primaryEvent.venueAddress}</p>
                  <a href={order.primaryEvent.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 border-2 border-[#c9a227]/50 bg-gradient-to-r from-[#c9a227]/20 via-[#c9a227]/10 to-[#c9a227]/20 px-8 py-3 font-semibold text-[#8b1a2d] transition-all duration-300 hover:border-[#c9a227] hover:from-[#c9a227]/30">Open in Maps</a>
                </ParchmentCard>
              </FiligreeBorder>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative mt-8 aspect-[16/10] w-full overflow-hidden border border-[#c9a227]/20">
              {(() => { const lat = order.primaryEvent.lat; const lng = order.primaryEvent.lng; const hasCoords = typeof lat === "number" && typeof lng === "number"; const delta = 0.005; const bbox = hasCoords ? `${lng-delta}%2C${lat-delta}%2C${lng+delta}%2C${lat+delta}` : "75.859%2C11.173%2C75.869%2C11.183"; const marker = hasCoords ? `${lat}%2C${lng}` : "11.178%2C75.864"; return <iframe title={`Map of ${order.primaryEvent.venue}`} src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />; })()}
            </motion.div>
          </div>
        </section>

        {/* RSVP */}
        <section className="relative px-4 py-24">
          <div className="mx-auto max-w-xl text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><div className="mx-auto mb-5 flex h-8 w-8 items-center justify-center"><div className="h-2.5 w-2.5 rotate-45 bg-[#c9a227]/60" /></div></motion.div>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#2c1810] sm:text-4xl">Kindly Respond</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mb-8 text-[#2c1810]/60">
              Your presence would honour us. {order.rsvp?.deadline ? `Please confirm by ${order.rsvp.deadline}.` : "Please let us know if you can make it."}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              {order.rsvp?.webhookUrl ? <RsvpForm order={order} /> : (
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <a href={`https://wa.me/${order.rsvpWhatsApp}?text=${yesMsg}`} target="_blank" rel="noopener noreferrer" className="border-2 border-[#8b1a2d]/30 bg-gradient-to-r from-[#8b1a2d]/20 via-[#8b1a2d]/10 to-[#8b1a2d]/20 px-8 py-4 font-semibold text-[#8b1a2d] transition-all duration-300 hover:border-[#8b1a2d]/50 hover:from-[#8b1a2d]/30">Yes, I will attend</a>
                  <a href={`https://wa.me/${order.rsvpWhatsApp}?text=${noMsg}`} target="_blank" rel="noopener noreferrer" className="border-2 border-[#c9a227]/30 bg-gradient-to-r from-[#c9a227]/10 via-[#c9a227]/5 to-[#c9a227]/10 px-8 py-4 font-semibold text-[#2c1810] transition-all duration-300 hover:border-[#c9a227]/50 hover:from-[#c9a227]/20">Regretfully decline</a>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex h-8 w-8 items-center justify-center"><div className="h-2.5 w-2.5 rotate-45 bg-[#c9a227]/60" /></div>
          <p className="font-[family-name:var(--font-invitation-script)] text-lg text-[#2c1810]/60">With love, {order.groom} &amp; {order.bride}</p>
          <p className="mt-2 font-[family-name:var(--font-invitation-serif)] text-lg font-bold text-[#8b1a2d]">The families of {order.groom} &amp; {order.bride}</p>
          <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
          <p className="mt-6 text-xs tracking-widest text-[#2c1810]/30">
            Crafted by <a href="https://axonstack.in/apps/shaadi-cards" target="_blank" rel="noopener noreferrer" className="text-[#c9a227]/60 transition-colors hover:text-[#c9a227]">axonstack</a> — Shaadi Cards
          </p>
        </footer>
      </div>
    </main>
  );
}

