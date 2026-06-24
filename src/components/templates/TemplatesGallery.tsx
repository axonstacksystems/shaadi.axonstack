"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Eye,
  Sparkles,
  Wand2,
  Palette,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BottomNav } from "@/components/home/BottomNav";
import { AppHeader } from "@/components/home/AppHeader";
import { cn } from "@/lib/utils";

export type TemplateInfo = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** gradient stops for the preview tile */
  accent: string;
  /** swatch hexes shown as palette dots */
  palette: string[];
  /** the hero "signature effect" of the template */
  signature: string;
  /** short feature tags */
  tags: string[];
  /** whether the preview tile uses light or dark text */
  tone: "light" | "dark";
};

export const templates: TemplateInfo[] = [
  {
    slug: "malabar-emerald",
    name: "Malabar Emerald",
    tagline: "Kerala heritage",
    description:
      "Emerald and gold elegance rooted in Malabar tradition — timeless, regal, and warm.",
    accent: "from-[#0a3d30] via-[#0f5e4a] to-[#d4af37]",
    palette: ["#0f5e4a", "#1a8b6a", "#d4af37", "#faf8f3"],
    signature: "Glass countdown",
    tags: ["Emerald & Gold", "Glassmorphism", "Live RSVP"],
    tone: "light",
  },
  {
    slug: "noor-e-nikah",
    name: "Noor-e-Nikah",
    tagline: "Sacred & serene",
    description:
      "Luminous Islamic motifs with graceful Arabic calligraphy framed by gold filigree.",
    accent: "from-[#152a45] via-[#2c5f7a] to-[#c9a227]",
    palette: ["#1e3a5f", "#2c5f7a", "#c9a227", "#faf8f3"],
    signature: "Mihrab arch reveal",
    tags: ["Calligraphy", "Khatam Star", "Filigree"],
    tone: "dark",
  },
  {
    slug: "celestial-canvas",
    name: "Celestial Canvas",
    tagline: "Deep-space awe",
    description:
      "Names written in star constellations over a living, twinkling starfield.",
    accent: "from-[#050508] via-[#1a0a2e] to-[#0d1b2a]",
    palette: ["#050508", "#1a0a2e", "#0d1b2a", "#f4e4b8"],
    signature: "Shooting-star reveal",
    tags: ["Starfield", "Parallax", "Constellation"],
    tone: "dark",
  },
  {
    slug: "nordic-frost",
    name: "Nordic Frost",
    tagline: "Scandinavian winter",
    description:
      "Crisp, minimal frost aesthetics with quiet warmth and gently falling snow.",
    accent: "from-[#e8f0f5] via-[#bcd4e6] to-[#6f97b8]",
    palette: ["#e8f0f5", "#bcd4e6", "#8fb3cc", "#1e3a5f"],
    signature: "Falling-snow drift",
    tags: ["Minimal", "Frost Glass", "Snowfall"],
    tone: "light",
  },
  {
    slug: "mughal-miniature",
    name: "Mughal Miniature",
    tagline: "Royal grandeur",
    description:
      "Dense jewel-tone ornamentation and gold filigree borders from miniature painting.",
    accent: "from-[#8b1a2d] via-[#c9a227] to-[#1e3a5f]",
    palette: ["#8b1a2d", "#c9a227", "#1e3a5f", "#f5e6d3"],
    signature: "Filigree border draw",
    tags: ["Jewel Tones", "Ornate", "Heritage"],
    tone: "dark",
  },
  {
    slug: "monsoon-special",
    name: "Monsoon Special",
    tagline: "Lush & blooming",
    description:
      "A rain-blessed, verdant theme where two hearts bloom together with the season.",
    accent: "from-[#1b4332] via-[#2d6a4f] to-[#74c69d]",
    palette: ["#1b4332", "#2d6a4f", "#74c69d", "#f0fff4"],
    signature: "Monsoon rainfall",
    tags: ["Botanical", "Rainfall", "Verdant"],
    tone: "dark",
  },
  {
    slug: "ivory-blush",
    name: "Ivory Blush",
    tagline: "Apple-luxury elegance",
    description:
      "Champagne ivory and blush rose glassmorphism — an editorial Islamic invitation with drifting petals and live countdown.",
    accent: "from-[#F7F3EE] via-[#E8C6C1] to-[#D9B67A]",
    palette: ["#FBF8F4", "#E8C6C1", "#D9B67A", "#4B3A2A"],
    signature: "Floating rose petals",
    tags: ["Glassmorphism", "Blush Rose", "Champagne Gold"],
    tone: "light",
  },
];

const stats = [
  { value: "7", label: "Unique designs" },
  { value: "100%", label: "Mobile-first" },
  { value: "∞", label: "Personalisation" },
];

export function TemplatesGallery() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <main className="invitation-root min-h-screen overflow-hidden pb-20 sm:pb-0">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(212,175,55,0.14), transparent 70%), radial-gradient(50% 40% at 85% 20%, rgba(15,94,74,0.10), transparent 70%)",
        }}
      />

      <AppHeader />

      {/* Hero */}
      <section className="px-6 pt-12 pb-10 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-6 gap-1.5 border-[#d4af37]/40 bg-white/60 px-4 py-1.5 text-[#0f5e4a] backdrop-blur"
          >
            <Sparkles className="size-3.5 text-[#b8941f]" />
            <span className="font-[family-name:var(--font-invitation-sans)] tracking-wide">
              Premium Design Collection
            </span>
          </Badge>

          <h1 className="font-[family-name:var(--font-invitation-serif)] text-4xl font-bold leading-tight text-[#0f5e4a] sm:text-6xl">
            Choose Your{" "}
            <span className="invitation-text-gradient-gold">Story</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-invitation-sans)] text-lg leading-relaxed text-[#2c2c2c]/70">
            Seven distinct visual worlds — each a living, animated invitation.
            Tap any design to experience the full card.
          </p>

          {/* Separator with sparkle */}
          <div className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-3">
            <Separator className="bg-gradient-to-r from-transparent to-[#d4af37]/50" />
            <Sparkles className="size-4 shrink-0 text-[#b8941f]" />
            <Separator className="bg-gradient-to-l from-transparent to-[#d4af37]/50" />
          </div>

          {/* Stats */}
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a]">
                  {s.value}
                </div>
                <div className="mt-1 font-[family-name:var(--font-invitation-sans)] text-xs uppercase tracking-widest text-[#2c2c2c]/55">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Gallery */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="px-6 pb-24"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((tpl) => (
            <motion.div
              key={tpl.slug}
              variants={item}
              whileHover={reduce ? undefined : { y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group h-full"
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-[#d4af37]/25 bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur transition-all duration-300 group-hover:border-[#d4af37]/70 group-hover:shadow-[0_24px_70px_rgba(212,175,55,0.22)]">
                {/* Preview tile */}
                <div
                  className={cn(
                    "relative h-44 overflow-hidden bg-gradient-to-br",
                    tpl.accent,
                  )}
                >
                  {/* shimmer sweep */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {/* subtle dot texture */}
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
                        tpl.tone === "dark" ? "text-white" : "text-[#1a2942]",
                      )}
                    >
                      {tpl.name}
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Palette className="size-4 text-[#b8941f]" />
                    <div className="flex gap-1.5">
                      {tpl.palette.map((hex) => (
                        <span
                          key={hex}
                          className="size-3.5 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                    <span className="ml-auto font-[family-name:var(--font-invitation-sans)] text-[11px] uppercase tracking-widest text-[#b8941f]">
                      {tpl.tagline}
                    </span>
                  </div>
                  <CardTitle className="mt-3 font-[family-name:var(--font-invitation-serif)] text-xl text-[#0f5e4a]">
                    {tpl.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="font-[family-name:var(--font-invitation-sans)] text-sm leading-relaxed text-[#2c2c2c]/70">
                    {tpl.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tpl.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="border border-[#0f5e4a]/10 bg-[#0f5e4a]/5 font-[family-name:var(--font-invitation-sans)] text-[11px] font-medium text-[#0f5e4a]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="gap-3 pt-2">
                  <Button
                    asChild
                    className="flex-1 rounded-full bg-[#0f5e4a] font-[family-name:var(--font-invitation-sans)] font-semibold text-white shadow-sm hover:bg-[#0a3d30]"
                  >
                    <Link href={`/designs/${tpl.slug}`}>
                      <Eye className="size-4" />
                      Preview
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={item}
          className="mx-auto mt-16 max-w-2xl rounded-3xl border border-[#d4af37]/25 bg-white/70 p-8 text-center backdrop-blur"
        >
          <h2 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#0f5e4a]">
            Want a design made just for you?
          </h2>
          <p className="mx-auto mt-2 max-w-md font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70">
            Every card is hand-tailored to your names, events, and story by the
            axonstack studio.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 rounded-full bg-[#d4af37] font-[family-name:var(--font-invitation-sans)] font-semibold text-[#1a2942] hover:bg-[#b8941f]"
          >
            <a href="https://axonstack.in/apps/shaadi-cards">
              Commission your card
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </motion.div>
      </motion.section>

      {/* ── Native-style bottom tab bar (mobile only) ── */}
      <BottomNav />
    </main>
  );
}
