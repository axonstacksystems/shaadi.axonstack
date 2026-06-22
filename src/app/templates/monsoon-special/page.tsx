import type { Metadata } from "next";
import { MonsoonSpecialCard } from "@/components/cards/MonsoonSpecialCard";

export const metadata: Metadata = {
  title: "Monsoon Special — Template Preview",
  description:
    "A lush monsoon-themed wedding invitation template by Shaadi Cards.",
};

const demoOrder = {
  slug: "demo-monsoon",
  templateSlug: "monsoon-special" as const,
  title: "Rahman & Raina",
  deliveredOn: "2026-06-23",
  bride: "Raina",
  groom: "Rahman",
  groomParents: "Son of Mr. & Mrs. Abdul Karim",
  brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
  invitationLine:
    "As the rains bless the earth, by the will of Allah, our hearts bloom together",
  ceremonyHeadline: "Nikah",
  closingDuaArabic:
    "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  closingDua:
    "May Allah bless you both, and shower His blessings upon you, and unite you in goodness.",
  eventDateIso: "2026-08-15T16:00:00+05:30",
  primaryEvent: {
    label: "NIKAH CEREMONY",
    date: "Saturday, 15th August 2026",
    hijriDate: "2 Safar 1448 AH",
    time: "4:00 PM",
    venue: "Juma Masjid",
    venueAddress: "Kondotty, Malappuram, Kerala",
    lat: 11.1312,
    lng: 75.9949,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Juma+Masjid+Kondotty+Malappuram",
  },
  timeline: [
    {
      time: "4:00 PM",
      event: "Nikah Ceremony",
      description: "The sacred union witnessed by family and friends",
    },
    {
      time: "6:30 PM",
      event: "Walima Reception",
      description: "The marriage feast, in keeping with the Sunnah",
    },
  ],
  rsvpWhatsApp: "919876543210",
  rsvp: {
    webhookUrl: "",
    deadline: "10th August 2026",
    maxGuests: 5,
  },
};

export default function MonsoonSpecialDemoPage() {
  return <MonsoonSpecialCard order={demoOrder} />;
}
