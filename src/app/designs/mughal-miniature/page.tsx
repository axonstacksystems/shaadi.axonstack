import type { Metadata } from "next";
import { MughalMiniatureCard } from "@/components/cards/MughalMiniatureCard";

export const metadata: Metadata = {
  title: "Mughal Miniature — Template Preview",
  description: "A royal Mughal miniature painting wedding invitation template by Shaadi Cards.",
};

const demoOrder = {
  slug: "demo-mughal",
  templateSlug: "mughal-miniature" as const,
  title: "Mughal & Miniature",
  deliveredOn: "2026-06-22",
  bride: "Miniature",
  groom: "Mughal",
  invitationLine: "With the grace of Allah and blessings of our elders, we invite you to witness our sacred union",
  ceremonyHeadline: "Nikah",
  eventDateIso: "2026-11-15T10:00:00+05:30",
  primaryEvent: {
    label: "NIKAH CEREMONY",
    date: "Sunday, 15th November 2026",
    time: "10:00 AM",
    venue: "Juma Masjid",
    venueAddress: "Malappuram, Kerala",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Malappuram",
  },
  timeline: [
    { time: "10:00 AM", event: "Nikah Ceremony", description: "The sacred union witnessed by family and friends" },
    { time: "12:00 PM", event: "Reception", description: "Dinner and celebration with loved ones" },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: {
    webhookUrl: "",
    deadline: "10th November 2026",
    maxGuests: 5,
  },
};

export default function MughalMiniatureDemoPage() {
  return <MughalMiniatureCard order={demoOrder} />;
}
