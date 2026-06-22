"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function FaqSection() {
  const reduce = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
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
  );
}
