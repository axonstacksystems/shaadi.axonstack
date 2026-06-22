import type { Metadata } from "next";
import { NoorENikahCard } from "@/components/cards/NoorENikahCard";

export const metadata: Metadata = {
  title: "Noor-e-Nikah — Template Preview",
  description:
    "A luminous, sacred Islamic wedding invitation template by Shaadi Cards.",
};

const demoOrder = {
  slug: "demo-noor",
  templateSlug: "noor-e-nikah" as const,
  title: "Noor & Nikah",
  deliveredOn: "2026-06-22",
  bride: "Noor",
  groom: "Nikah",
  groomParents: "Son of Mr. & Mrs. Abdul Rahman",
  brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
  invitationLine:
    "In the light of His mercy, by the will of Allah, two souls become one",
  ceremonyHeadline: "Nikah",
  closingDuaArabic:
    "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  closingDua:
    "May Allah bless you both, and shower His blessings upon you, and unite you in goodness.",
  eventDateIso: "2026-10-04T10:00:00+05:30",
  primaryEvent: {
    label: "NIKAH CEREMONY",
    date: "Sunday, 4th October 2026",
    hijriDate: "22 Rabiʿ al-Thani 1448 AH",
    time: "10:00 AM",
    venue: "Juma Masjid",
    venueAddress: "Kondotty, Malappuram, Kerala",
    lat: 11.1312,
    lng: 75.9949,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Juma+Masjid+Kondotty+Malappuram",
  },
  timeline: [
    {
      time: "10:00 AM",
      event: "Nikah Ceremony",
      description: "The sacred union witnessed by family and friends",
    },
    {
      time: "12:30 PM",
      event: "Walima Reception",
      description: "The marriage feast, in keeping with the Sunnah",
    },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: {
    webhookUrl: "",
    deadline: "29th September 2026",
    maxGuests: 5,
  },
};

export default function NoorENikahDemoPage() {
  return <NoorENikahCard order={demoOrder} />;
}
