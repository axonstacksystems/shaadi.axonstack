import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IvoryBlushCard } from "@/components/cards/IvoryBlushCard";
import { THEMES } from "@/components/cards/ivory-blush/themes";

interface Props {
  params: Promise<{ theme: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { theme } = await params;
  const t = THEMES[theme];
  if (!t) return {};
  return {
    title: `Ivory Blush — ${t.label} Preview`,
    description: `Luxury Islamic Nikah invitation in the ${t.label} palette, by Shaadi Cards.`,
  };
}

export function generateStaticParams() {
  return Object.keys(THEMES).map((theme) => ({ theme }));
}

const demoOrder = {
  slug: "demo-ivory-blush",
  templateSlug: "ivory-blush" as const,
  title: "Muhammed Ashik & Abia Manal",
  deliveredOn: "2026-06-24",
  bride: "Abia Manal",
  groom: "Muhammed Ashik",
  groomParents: "Son of Mr. Abdul Rahman",
  brideParents: "Daughter of Mr. Ibrahim Kutty",
  invitationLine:
    "With the blessings of Allah and our beloved families, two hearts unite in the sacred bond of Nikah.",
  ceremonyHeadline: "Nikah",
  closingDuaArabic:
    "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  closingDua:
    "May Allah bless you both, and shower His blessings upon you, and unite you in goodness.",
  eventDateIso: "2026-07-19T11:00:00+05:30",
  primaryEvent: {
    label: "NIKAH CEREMONY",
    date: "Sunday, 19th July 2026",
    hijriDate: "24 Muharram 1448 AH",
    time: "11:00 AM",
    venue: "Noor Mahal Convention Centre",
    venueAddress: "Malappuram, Kerala",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Noor+Mahal+Convention+Centre+Malappuram",
  },
  timeline: [
    { time: "11:00 AM", event: "Guest Arrival", description: "Guests are warmly welcomed" },
    { time: "11:30 AM", event: "Nikah Ceremony", description: "The sacred union witnessed by family and friends" },
    { time: "1:00 PM", event: "Lunch", description: "Traditional Malabar cuisine served with love" },
    { time: "3:00 PM", event: "Photos", description: "Capturing beautiful moments together" },
    { time: "7:00 PM", event: "Walima Reception", description: "The marriage feast, in keeping with the Sunnah" },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: {
    webhookUrl: "",
    deadline: "10th July 2026",
    maxGuests: 5,
  },
};

export default async function IvoryBlushThemePage({ params }: Props) {
  const { theme } = await params;
  if (!THEMES[theme]) notFound();
  return <IvoryBlushCard order={demoOrder} initialTheme={theme} />;
}
