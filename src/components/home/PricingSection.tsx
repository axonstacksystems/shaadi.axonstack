"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "918985798572";
const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

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
      "Heritage premium designs",
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
      "Cinematic flagship designs",
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

export function PricingSection() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08 },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
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
  );
}
