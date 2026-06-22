import type { Metadata } from "next";
import { NordicFrostCard } from "@/components/cards/NordicFrostCard";

export const metadata: Metadata = {
  title: "Nordic Frost — Template Preview",
  description: "A Scandinavian winter wedding invitation template by Shaadi Cards.",
};

const demoOrder = {
  slug: "demo-nordic",
  templateSlug: "nordic-frost" as const,
  title: "Nordic & Frost",
  deliveredOn: "2026-06-22",
  bride: "Frost",
  groom: "Nordic",
  groomParents: "Son of Mr. & Mrs. Abdul Rahman",
  brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
  invitationLine: "In the quiet of winter, by the will of Allah, our hearts find warmth",
  ceremonyHeadline: "Nikah",
  closingDuaArabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  closingDua:
    "May Allah bless you both, and shower His blessings upon you, and unite you in goodness.",
  eventDateIso: "2026-12-20T15:00:00+05:30",
  primaryEvent: {
    label: "NIKAH CEREMONY",
    date: "Saturday, 20th December 2026",
    hijriDate: "1 Rajab 1448 AH",
    time: "3:00 PM",
    venue: "Community Hall",
    venueAddress: "Kochi, Kerala",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kochi",
  },
  timeline: [
    { time: "3:00 PM", event: "Nikah Ceremony", description: "The sacred union witnessed by family and friends" },
    { time: "5:00 PM", event: "Walima Reception", description: "The marriage feast, in keeping with the Sunnah" },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: {
    webhookUrl: "",
    deadline: "15th December 2026",
    maxGuests: 5,
  },
};

export default function NordicFrostDemoPage() {
  return <NordicFrostCard order={demoOrder} />;
}
