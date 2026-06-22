import type { Metadata } from "next";
import { HomeLanding } from "@/components/home/HomeLanding";

export const metadata: Metadata = {
  title: "Shaadi Cards — Cinematic Digital Wedding Invitations in Kerala",
  description:
    "Premium animated digital nikah & wedding invitations with live RSVP, countdowns and venue maps. Delivered as one shareable link in 24 hours. Crafted in Kerala by AxonStack.",
  keywords: [
    "digital wedding invitation",
    "nikah invitation",
    "Kerala wedding card",
    "Muslim wedding invitation",
    "animated wedding card",
    "WhatsApp wedding invite",
    "e-invitation",
  ],
  alternates: { canonical: "https://shaadi.axonstack.in" },
  openGraph: {
    title: "Shaadi Cards — Cinematic Digital Wedding Invitations",
    description:
      "Animated nikah & wedding invitations with live RSVP, countdowns and maps. One shareable link, delivered in 24 hours.",
    url: "https://shaadi.axonstack.in",
    type: "website",
  },
};

export default function Home() {
  return <HomeLanding />;
}
