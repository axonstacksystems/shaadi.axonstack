"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
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
  Check,
  Palette,
  Wand2,
  ChevronDown,
  Home,
  LayoutGrid,
  Tag,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { templates } from "@/components/templates/TemplatesGallery";
import { cn } from "@/lib/utils";

/**
 * Marketing / conversion landing page for Shaadi Cards.
 * Replace WHATSAPP_NUMBER with the studio's real WhatsApp business number
 * (E.164 without the leading +). The default below is a placeholder.
 */
const WHATSAPP_NUMBER = "919876543210";
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
    desc: "Browse our living templates and choose the world that matches your story.",
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

const tiers = [
  {
    name: "Shaadi Lite",
    price: "₹1,499",
    tagline: "Small & beautiful",
    features: [
      "Clean animated design",
      "Names, events & venue map",
      "WhatsApp RSVP links",
      "Delivered in 48 hours",
    ],
    popular: false,
  },
  {
    name: "Shaadi Standard",
    price: "₹2,999",
    tagline: "Most loved",
    features: [
      "Heritage premium templates",
      "Live RSVP with guest tracking",
      "Countdown + full timeline",
      "Arabic dua & calligraphy",
      "Delivered in 24 hours",
    ],
    popular: true,
  },
  {
    name: "Shaadi Premium",
    price: "₹4,999",
    tagline: "The showstopper",
    features: [
      "Cinematic flagship templates",
      "Glassmorphism & 3D effects",
      "Priority 24h delivery",
      "Unlimited revision rounds",
      "Custom colour matching",
    ],
    popular: false,
  },
  {
    name: "Shaadi Custom",
    price: "₹9,999+",
    tagline: "Bespoke & exclusive",
    features: [
      "Designed from scratch for you",
      "Dedicated designer",
      "Exclusive one-of-a-kind concept",
      "Everything in Premium",
    ],
    popular: false,
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

const faqs = [
  {
    q: "How fast will I get my invitation?",
    a: "Standard and Premium cards are delivered within 24 hours of receiving your details. Lite cards take up to 48 hours.",
  },
  {
    q: "Can you write in Arabic, Malayalam or Urdu?",
    a: "Yes. We handle Arabic calligraphy, duas and regional scripts natively — perfect for nikah invitations.",
  },
  {
    q: "How do guests RSVP?",
    a: "On Standard and above, guests confirm with one tap and responses land in your private Google Sheet. Lite cards use WhatsApp RSVP links.",
  },
  {
    q: "What do you need from me?",
    a: "Just your names, family lines, event dates, venues and any photos. Send them over WhatsApp and we build everything for you.",
  },
  {
    q: "Will it work on older phones?",
    a: "Every template is mobile-first and tuned to run smoothly on budget Android devices, with graceful fallbacks for reduced-motion users.",
  },
];

const featured = templates.slice(0, 3);

type NavItem = {
  label: string;
  icon: typeof Home;
  /** in-page section anchor (scroll on home) */
  id?: string;
  /** full-page route (separate page) */
  href?: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { href: "/templates", label: "Designs", icon: LayoutGrid },
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

function TabButton({
  id,
  href,
  label,
  icon: Icon,
  active,
}: NavItem & { active: boolean }) {
  const className = cn(
    "flex flex-col items-center gap-1 rounded-xl py-1.5 font-[family-name:var(--font-invitation-sans)] transition-colors",
    active ? "text-[#0f5e4a]" : "text-[#2c2c2c]/45",
  );
  const inner = (
    <>
      <Icon
        className={cn(
          "size-[22px] transition-transform",
          active && "scale-110",
        )}
        strokeWidth={active ? 2.4 : 1.9}
      />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {inner}
    </a>
  );
}

export function HomeLanding() {
  const reduce = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll-spy: highlight the bottom-nav tab for the section in view.
  useEffect(() => {
    const ids = ["home", "pricing", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
          <Link href="/" className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-invitation-script)] text-xl text-[#d4af37]">
              ✦
            </span>
            <span className="font-[family-name:var(--font-invitation-serif)] text-lg font-bold text-[#0f5e4a]">
              Shaadi Cards
            </span>
          </Link>
          <div className="hidden items-center gap-7 sm:flex">
            <Link
              href="/templates"
              className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
            >
              Designs
            </Link>
            <a
              href="#pricing"
              className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
            >
              FAQ
            </a>
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
                View live templates
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

      {/* ── Featured templates ───────────────────────── */}
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
                <Link href={`/templates/${tpl.slug}`} className="block">
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
              <Link href="/templates">
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

      {/* ── Pricing ──────────────────────────────────── */}
      <section id="pricing" className="scroll-mt-20 px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
              Simple, honest pricing
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-invitation-sans)] text-[#2c2c2c]/65">
              One-time payment. No subscriptions. Your invitation link stays
              live forever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white/70 p-6 backdrop-blur transition-all duration-300",
                  t.popular
                    ? "border-[#d4af37] shadow-[0_20px_60px_rgba(212,175,55,0.25)] sm:scale-[1.03]"
                    : "border-[#d4af37]/20 hover:border-[#d4af37]/50",
                )}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#d4af37] px-3 py-1 font-[family-name:var(--font-invitation-sans)] text-[10px] font-bold uppercase tracking-widest text-[#1a2942]">
                    Most popular
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-invitation-serif)] text-xl font-bold text-[#0f5e4a]">
                  {t.name}
                </h3>
                <p className="mt-0.5 font-[family-name:var(--font-invitation-sans)] text-xs uppercase tracking-widest text-[#b8941f]">
                  {t.tagline}
                </p>
                <div className="mt-4 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#2c2c2c]">
                  {t.price}
                </div>
                <Separator className="my-5 bg-[#d4af37]/20" />
                <ul className="flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/75"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-[#0f5e4a]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={cn(
                    "mt-6 w-full rounded-full font-[family-name:var(--font-invitation-sans)] font-semibold",
                    t.popular
                      ? "bg-[#d4af37] text-[#1a2942] hover:bg-[#b8941f]"
                      : "bg-[#0f5e4a] text-white hover:bg-[#0a3d30]",
                  )}
                >
                  <a
                    href={waLink(
                      `Assalamu Alaikum! I'm interested in the ${t.name} (${t.price}) wedding invitation.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Choose {t.name.replace("Shaadi ", "")}
                  </a>
                </Button>
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

      {/* ── FAQ ──────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-20 px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
              Questions, answered
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.div key={f.q} variants={fadeUp}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full rounded-2xl border border-[#d4af37]/20 bg-white/70 p-5 text-left backdrop-blur transition-colors hover:border-[#d4af37]/45"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-[family-name:var(--font-invitation-serif)] font-semibold text-[#0f5e4a]">
                        {f.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-5 shrink-0 text-[#b8941f] transition-transform duration-300",
                          open && "rotate-180",
                        )}
                      />
                    </div>
                    {open && (
                      <p className="mt-3 font-[family-name:var(--font-invitation-sans)] text-sm leading-relaxed text-[#2c2c2c]/70">
                        {f.a}
                      </p>
                    )}
                  </button>
                </motion.div>
              );
            })}
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
                <Link href="/templates">
                  <Eye className="size-5" />
                  Browse templates
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
              by AxonStack
            </span>
          </div>
          <p className="font-[family-name:var(--font-invitation-sans)] text-xs text-[#2c2c2c]/50">
            © {new Date().getFullYear()} AxonStack · Crafted with care in Kerala
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
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d4af37]/20 bg-[#faf8f3]/90 backdrop-blur-xl sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="relative mx-auto grid max-w-md grid-cols-5 items-end px-2 pt-1.5 pb-2">
          {navItems.slice(0, 2).map((it) => (
            <TabButton
              key={it.label}
              {...it}
              active={!!it.id && activeSection === it.id}
            />
          ))}

          {/* Center elevated WhatsApp action */}
          <div className="flex justify-center">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="-mt-7 flex size-14 flex-col items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 ring-4 ring-[#faf8f3] transition-transform active:scale-95"
            >
              <MessageCircle className="size-6" />
            </a>
          </div>

          {navItems.slice(2).map((it) => (
            <TabButton
              key={it.label}
              {...it}
              active={!!it.id && activeSection === it.id}
            />
          ))}
        </div>
      </nav>
    </main>
  );
}
