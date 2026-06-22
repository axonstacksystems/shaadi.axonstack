import type { Metadata } from "next";
import { MalabarEmeraldCard } from "@/components/cards/MalabarEmeraldCard";

export const metadata: Metadata = {
  title: "Malabar Emerald — Template Preview",
  description:
    "An emerald-and-gold Kerala heritage wedding invitation template by Shaadi Cards.",
};

const demoOrder = {
  slug: "demo-malabar",
  templateSlug: "malabar-emerald" as const,
  title: "Malabar & Emerald",
  deliveredOn: "2026-06-22",
  bride: "Emerald",
  groom: "Malabar",
  groomParents: "Son of Mr. & Mrs. Abdul Rahman",
  brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
  invitationLine:
    "With hearts full of joy and the blessings of our families, by the will of Allah",
  ceremonyHeadline: "Nikah",
  closingDuaArabic:
    "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  closingDua:
    "May Allah bless you both, and shower His blessings upon you, and unite you in goodness.",
  eventDateIso: "2026-09-13T10:00:00+05:30",
  primaryEvent: {
    label: "NIKAH CEREMONY",
    date: "Sunday, 13th September 2026",
    hijriDate: "1 Rabiʿ al-Awwal 1448 AH",
    time: "10:00 AM onwards",
    venue: "Malabar Avenue",
    venueAddress: "Perumugham Road, Ramanattukara, Kerala",
    lat: 11.1782,
    lng: 75.8643,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Malabar+Avenue+Perumugham+Road+Ramanattukara",
  },
  timeline: [
    {
      time: "10:00 AM",
      event: "Nikah Ceremony",
      description: "The sacred union witnessed by family and friends",
    },
    {
      time: "12:00 PM",
      event: "Walima Reception",
      description: "The marriage feast, in keeping with the Sunnah",
    },
  ],
  rsvpWhatsApp: "919876543210",
  rsvp: {
    webhookUrl: "",
    deadline: "8th September 2026",
    maxGuests: 5,
  },
};

export default function MalabarEmeraldDemoPage() {
  return <MalabarEmeraldCard order={demoOrder} />;
}
