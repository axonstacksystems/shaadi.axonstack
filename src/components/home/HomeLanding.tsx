"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { NavLogo } from "@/components/home/NavLogo";
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  Eye,
  Star,
  Smartphone,
  CalendarCheck,
  MapPin,
  Share2,
  Clock,
  ShieldCheck,
  Heart,
  Palette,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/components/templates/TemplatesGallery";
import { BottomNav } from "@/components/home/BottomNav";
import { cn } from "@/lib/utils";

/**
 * Marketing / conversion landing page for Shaadi Cards.
 * Replace WHATSAPP_NUMBER with the studio's real WhatsApp business number
 * (E.164 without the leading +). The default below is a placeholder.
 */
const WHATSAPP_NUMBER = "918985798572";
const WHATSAPP_MESSAGE =
  "Assalamu Alaikum! I'd like to order a digital wedding invitation from Shaadi Cards.";
const waLink = (msg: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const trustStats = [
  { value: "500+", label: "Cards delivered" },
  { value: "4.9★", label: "Couple rating" },
  { value: "24h", label: "Avg. delivery" },
  { value: "100%", label: "Mobile-first" },
];

const benefits = [
  {
    icon: CalendarCheck,
    title: "Live RSVP tracking",
    desc: "Guests confirm in one tap. Replies land straight in your Google Sheet — no more phone-call chaos.",
  },
  {
    icon: Share2,
    title: "Share to unlimited guests",
    desc: "One link on WhatsApp reaches everyone. No printing, no postage, no per-card cost.",
  },
  {
    icon: MapPin,
    title: "Live maps & directions",
    desc: "Tap-to-navigate venue maps so every guest arrives on time, at the right masjid or hall.",
  },
  {
    icon: Clock,
    title: "Real countdown timer",
    desc: "A ticking countdown to your nikah builds anticipation every time the card is opened.",
  },
  {
    icon: Smartphone,
    title: "Cinematic on every phone",
    desc: "Hand-tuned animations that run smooth on budget Androids and the latest iPhones alike.",
  },
  {
    icon: ShieldCheck,
    title: "Yours, forever",
    desc: "A permanent link you can reshare for years — a keepsake, not a card that ends up in the bin.",
  },
];

const steps = [
  {
    n: "01",
    title: "Pick your design",
    desc: "Browse our living designs and choose the world that matches your story.",
  },
  {
    n: "02",
    title: "Share your details",
    desc: "Send your names, events, venues and photos over WhatsApp. We do the rest.",
  },
  {
    n: "03",
    title: "Receive your link in 24h",
    desc: "Get a personalised, animated invitation link ready to share with every guest.",
  },
];

const testimonials = [
  {
    quote:
      "Every single guest messaged to ask how we made it. The shooting-star card felt like magic on the phone.",
    name: "Siyad & Faleela",
    place: "Ramanattukara",
  },
  {
    quote:
      "RSVP tracking saved us so much stress. We knew exactly how many were coming — straight to a sheet.",
    name: "Ashik & Abiya",
    place: "Malappuram",
  },
  {
    quote:
      "Delivered in a day, looked more expensive than the printed cards our cousins paid double for.",
    name: "Rahman & Raina",
    place: "Kondotty",
  },
];

const featured = templates.slice(0, 3);

export function HomeLanding() {
  const reduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };

  return (
    <main className="invitation-root min-h-screen overflow-hidden pb-20 sm:pb-0">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(212,175,55,0.16), transparent 70%), radial-gradient(50% 40% at 85% 15%, rgba(15,94,74,0.12), transparent 70%), radial-gradient(40% 40% at 10% 30%, rgba(183,110,121,0.08), transparent 70%)",
        }}
      />

      {/* ── Sticky nav ───────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#d4af37]/15 bg-[#faf8f3]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <NavLogo />
          <div className="hidden items-center gap-7 sm:flex">
            <Link
              href="/designs"
              className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
            >
              Designs
            </Link>
            <Link
              href="/pricing"
              className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
            >
              FAQ
            </Link>
          </div>
          <Button
            asChild
            className="rounded-full bg-[#0f5e4a] font-[family-name:var(--font-invitation-sans)] text-sm font-semibold text-white hover:bg-[#0a3d30]"
          >
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              Get yours
            </a>
          </Button>
        </nav>
      </header>

      {/* ── Hero ─────────────────────────────────────── */}
      <section id="home" className="relative scroll-mt-20 px-6 pt-16 pb-12 sm:pt-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 border-[#d4af37]/40 bg-white/60 px-4 py-1.5 text-[#0f5e4a] backdrop-blur"
            >
              <Sparkles className="size-3.5 text-[#b8941f]" />
              <span className="font-[family-name:var(--font-invitation-sans)] tracking-wide">
                Kerala&apos;s premium digital nikah invitations
              </span>
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-[family-name:var(--font-invitation-serif)] text-4xl font-bold leading-[1.1] text-[#0f5e4a] sm:text-6xl"
          >
            Invitations your guests will{" "}
            <span className="invitation-text-gradient-gold">never forget</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-invitation-sans)] text-lg leading-relaxed text-[#2c2c2c]/70"
          >
            Cinematic, animated wedding cards delivered as a single link —
            shareable in seconds, with live RSVP, countdowns and venue maps
            built in. Crafted for the South Asian Muslim celebration.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-[#25D366] px-8 font-[family-name:var(--font-invitation-sans)] text-base font-semibold text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#1eb858] sm:w-auto"
            >
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" />
                Order on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-[#0f5e4a]/30 bg-white/70 px-8 font-[family-name:var(--font-invitation-sans)] text-base font-semibold text-[#0f5e4a] backdrop-blur hover:bg-white sm:w-auto"
            >
              <a href="#templates">
                <Eye className="size-5" />
                View live designs
              </a>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-4 flex items-center justify-center gap-1.5 font-[family-name:var(--font-invitation-sans)] text-xs text-[#2c2c2c]/50"
          >
            <Star className="size-3.5 fill-[#d4af37] text-[#d4af37]" />
            Rated 4.9/5 by couples across Malabar — delivered in 24 hours
          </motion.p>

          {/* Trust stats */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {trustStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a]">
                  {s.value}
                </div>
                <div className="mt-1 font-[family-name:var(--font-invitation-sans)] text-[11px] uppercase tracking-widest text-[#2c2c2c]/55">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured designs ────────────────────────── */}
      <section id="templates" className="scroll-mt-20 px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
              Living designs, not static cards
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-invitation-sans)] text-[#2c2c2c]/65">
              Each template is a distinct visual world with its own signature
              animation. Tap any card to experience the real, full-screen
              invitation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((tpl) => (
              <motion.div
                key={tpl.slug}
                variants={fadeUp}
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group"
              >
                <Link href={`/designs/${tpl.slug}`} className="block">
                  <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-[#d4af37]/25 bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur transition-all duration-300 group-hover:border-[#d4af37]/70 group-hover:shadow-[0_24px_70px_rgba(212,175,55,0.22)]">
                    <div
                      className={cn(
                        "relative h-56 overflow-hidden bg-gradient-to-br",
                        tpl.accent,
                      )}
                    >
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
                          backgroundSize: "18px 18px",
                        }}
                      />
                      <Badge
                        className={cn(
                          "absolute right-3 top-3 gap-1 border-0 backdrop-blur",
                          tpl.tone === "dark"
                            ? "bg-black/30 text-white"
                            : "bg-white/55 text-[#2c2c2c]",
                        )}
                      >
                        <Wand2 className="size-3" />
                        {tpl.signature}
                      </Badge>
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                        <span
                          className={cn(
                            "font-[family-name:var(--font-invitation-script)] text-3xl drop-shadow-md",
                            tpl.tone === "dark"
                              ? "text-white"
                              : "text-[#1a2942]",
                          )}
                        >
                          {tpl.name}
                        </span>
                      </div>
                    </div>
                    <CardContent className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Palette className="size-4 text-[#b8941f]" />
                        <div className="flex gap-1.5">
                          {tpl.palette.map((hex) => (
                            <span
                              key={hex}
                              className="size-3.5 rounded-full ring-1 ring-black/10"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                        <span className="ml-auto font-[family-name:var(--font-invitation-sans)] text-[11px] uppercase tracking-widest text-[#b8941f]">
                          {tpl.tagline}
                        </span>
                      </div>
                      <p className="flex-1 font-[family-name:var(--font-invitation-sans)] text-sm leading-relaxed text-[#2c2c2c]/70">
                        {tpl.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 font-[family-name:var(--font-invitation-sans)] text-sm font-semibold text-[#0f5e4a] group-hover:gap-2 transition-all">
                        Preview live card
                        <ArrowRight className="size-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[#d4af37]/40 bg-white/70 px-8 font-[family-name:var(--font-invitation-sans)] font-semibold text-[#0f5e4a] backdrop-blur hover:bg-white"
            >
              <Link href="/designs">
                See all {templates.length} designs
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Benefits ─────────────────────────────────── */}
      <section className="px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
              Everything a printed card can&apos;t do
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-invitation-sans)] text-[#2c2c2c]/65">
              One link replaces hundreds of cards — and does far more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeUp}>
                <Card className="h-full rounded-2xl border-[#d4af37]/20 bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:border-[#d4af37]/50 hover:shadow-[0_16px_50px_rgba(212,175,55,0.15)]">
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-[#0f5e4a]/8 text-[#0f5e4a]">
                    <b.icon className="size-5" />
                  </div>
                  <h3 className="font-[family-name:var(--font-invitation-serif)] text-lg font-semibold text-[#0f5e4a]">
                    {b.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-invitation-sans)] text-sm leading-relaxed text-[#2c2c2c]/65">
                    {b.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── How it works ─────────────────────────────── */}
      <section className="px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mx-auto max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
              Your card in three simple steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <motion.div key={s.n} variants={fadeUp} className="relative">
                <div className="rounded-2xl border border-[#d4af37]/20 bg-white/70 p-7 backdrop-blur">
                  <span className="font-[family-name:var(--font-invitation-serif)] text-5xl font-bold text-[#d4af37]/30">
                    {s.n}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-invitation-serif)] text-xl font-semibold text-[#0f5e4a]">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-invitation-sans)] text-sm leading-relaxed text-[#2c2c2c]/65">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      <section className="px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
              Loved by couples across Malabar
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card className="flex h-full flex-col rounded-2xl border-[#d4af37]/20 bg-white/70 p-6 backdrop-blur">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-[#d4af37] text-[#d4af37]"
                      />
                    ))}
                  </div>
                  <p className="flex-1 font-[family-name:var(--font-invitation-script)] text-lg leading-relaxed text-[#2c2c2c]/85">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <Heart className="size-4 text-[#b76e79]" />
                    <span className="font-[family-name:var(--font-invitation-serif)] font-semibold text-[#0f5e4a]">
                      {t.name}
                    </span>
                    <span className="font-[family-name:var(--font-invitation-sans)] text-xs text-[#2c2c2c]/50">
                      · {t.place}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#d4af37]/30 p-10 text-center sm:p-14"
          style={{
            background:
              "linear-gradient(135deg, #0a3d30 0%, #0f5e4a 55%, #127a5f 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(50% 60% at 80% 0%, rgba(212,175,55,0.5), transparent 70%)",
            }}
          />
          <div className="relative">
            <Sparkles className="mx-auto mb-4 size-7 text-[#f4e4b8]" />
            <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-white sm:text-4xl">
              Ready to wow every guest?
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-invitation-sans)] text-white/75">
              Limited slots each wedding season. Message us today and your
              personalised invitation could be ready by tomorrow.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-[#25D366] px-8 font-[family-name:var(--font-invitation-sans)] text-base font-semibold text-white shadow-lg hover:bg-[#1eb858] sm:w-auto"
              >
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-5" />
                  Order on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-white/40 bg-white/10 px-8 font-[family-name:var(--font-invitation-sans)] text-base font-semibold text-white backdrop-blur hover:bg-white/20 sm:w-auto"
              >
                <Link href="/designs">
                  <Eye className="size-5" />
                  Browse designs
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-[#d4af37]/15 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-invitation-script)] text-xl text-[#d4af37]">
              ✦
            </span>
            <span className="font-[family-name:var(--font-invitation-serif)] font-bold text-[#0f5e4a]">
              Shaadi Cards
            </span>
            <span className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/50">
              by axonstack
            </span>
          </div>
          <p className="font-[family-name:var(--font-invitation-sans)] text-xs text-[#2c2c2c]/50">
            © {new Date().getFullYear()} AXONSTACK PVT LTD · Crafted with care in Kerala
          </p>
        </div>
      </footer>

      {/* ── Floating WhatsApp button (desktop only) ─── */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed bottom-6 right-6 z-50 hidden size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform hover:scale-110 sm:flex"
      >
        <MessageCircle className="size-7" />
      </a>

      {/* ── Native-style bottom tab bar (mobile only) ── */}
      <BottomNav />
    </main>
  );
}
