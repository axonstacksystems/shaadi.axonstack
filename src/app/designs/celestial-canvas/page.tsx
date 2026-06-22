import type { Metadata } from "next";
import { CelestialCanvasCard } from "@/components/cards/CelestialCanvasCard";

export const metadata: Metadata = {
  title: "Celestial Canvas — Template Preview",
  description: "A deep-space astronomical wedding invitation template by Shaadi Cards.",
};

const demoOrder = {
  slug: "demo-celestial",
  templateSlug: "celestial-canvas" as const,
  title: "Ashik & Abiya",
  deliveredOn: "2026-06-22",
  bride: "Abiya",
  groom: "Ashik",
  groomParents: "Son of Mr. & Mrs. Abdul Rahman",
  brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
  invitationLine: "Under the same sky He created, by the will of Allah, with the blessings of our families",
  ceremonyHeadline: "Nikah",
  closingDuaArabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  closingDua:
    "May Allah bless you both, and shower His blessings upon you, and unite you in goodness.",
  eventDateIso: "2026-07-19T10:00:00+05:30",
  primaryEvent: {
    label: "NIKAH CEREMONY",
    date: "Sunday, 19th July 2026",
    hijriDate: "3 Muharram 1448 AH",
    time: "10:00 AM",
    venue: "Juma Masjid",
    venueAddress: "Ayikkarapadi, Malappuram, Kerala",
    lat: 11.1722,
    lng: 75.8981,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Juma+Masjid+Ayikkarapadi+Malappuram",
  },
  timeline: [
    { time: "10:00 AM", event: "Nikah Ceremony", description: "The sacred union witnessed by family and friends" },
    { time: "12:00 PM", event: "Walima Reception", description: "The marriage feast, in keeping with the Sunnah" },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: {
    webhookUrl: "",
    deadline: "15th July 2026",
    maxGuests: 5,
  },
};

export default function CelestialCanvasDemoPage() {
  return <CelestialCanvasCard order={demoOrder} />;
}
