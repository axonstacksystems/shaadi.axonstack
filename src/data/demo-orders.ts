import type { DeliveredOrder } from "@/data/delivered-orders";

const BASE_RSVP = {
  webhookUrl: "",
  maxGuests: 5,
} as const;

export const PETAL_ATELIER_DEMO: DeliveredOrder = {
  slug: "demo-petal-atelier",
  templateSlug: "petal-atelier",
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
  rsvp: { ...BASE_RSVP, deadline: "10th July 2026" },
};

export const MALABAR_HERITAGE_DEMO: DeliveredOrder = {
  slug: "demo-malabar",
  templateSlug: "malabar-heritage",
  title: "Malabar & Heritage",
  deliveredOn: "2026-06-22",
  bride: "Heritage",
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
    { time: "10:00 AM", event: "Nikah Ceremony", description: "The sacred union witnessed by family and friends" },
    { time: "12:00 PM", event: "Walima Reception", description: "The marriage feast, in keeping with the Sunnah" },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: { ...BASE_RSVP, deadline: "8th September 2026" },
};

export const NOOR_E_NIKAH_DEMO: DeliveredOrder = {
  slug: "demo-noor",
  templateSlug: "noor-e-nikah",
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
    { time: "10:00 AM", event: "Nikah Ceremony", description: "The sacred union witnessed by family and friends" },
    { time: "12:30 PM", event: "Walima Reception", description: "The marriage feast, in keeping with the Sunnah" },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: { ...BASE_RSVP, deadline: "29th September 2026" },
};

export const CELESTIAL_CANVAS_DEMO: DeliveredOrder = {
  slug: "demo-celestial",
  templateSlug: "celestial-canvas",
  title: "Ashik & Abiya",
  deliveredOn: "2026-06-22",
  bride: "Abiya",
  groom: "Ashik",
  groomParents: "Son of Mr. & Mrs. Abdul Rahman",
  brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
  invitationLine:
    "Under the same sky He created, by the will of Allah, with the blessings of our families",
  ceremonyHeadline: "Nikah",
  closingDuaArabic:
    "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
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
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Juma+Masjid+Ayikkarapadi+Malappuram",
  },
  timeline: [
    { time: "10:00 AM", event: "Nikah Ceremony", description: "The sacred union witnessed by family and friends" },
    { time: "12:00 PM", event: "Walima Reception", description: "The marriage feast, in keeping with the Sunnah" },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: { ...BASE_RSVP, deadline: "15th July 2026" },
};

export const NORDIC_MINIMAL_DEMO: DeliveredOrder = {
  slug: "demo-nordic",
  templateSlug: "nordic-minimal",
  title: "Nordic & Minimal",
  deliveredOn: "2026-06-22",
  bride: "Minimal",
  groom: "Nordic",
  groomParents: "Son of Mr. & Mrs. Abdul Rahman",
  brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
  invitationLine:
    "In the quiet of winter, by the will of Allah, our hearts find warmth",
  ceremonyHeadline: "Nikah",
  closingDuaArabic:
    "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
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
  rsvp: { ...BASE_RSVP, deadline: "15th December 2026" },
};

export const MUGHAL_MINIATURE_DEMO: DeliveredOrder = {
  slug: "demo-mughal",
  templateSlug: "mughal-miniature",
  title: "Mughal & Miniature",
  deliveredOn: "2026-06-22",
  bride: "Miniature",
  groom: "Mughal",
  invitationLine:
    "With the grace of Allah and blessings of our elders, we invite you to witness our sacred union",
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
  rsvp: { ...BASE_RSVP, deadline: "10th November 2026" },
};

export const MONSOON_GARDEN_DEMO: DeliveredOrder = {
  slug: "demo-monsoon",
  templateSlug: "monsoon-garden",
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
    { time: "4:00 PM", event: "Nikah Ceremony", description: "The sacred union witnessed by family and friends" },
    { time: "6:30 PM", event: "Walima Reception", description: "The marriage feast, in keeping with the Sunnah" },
  ],
  rsvpWhatsApp: "918985798572",
  rsvp: { ...BASE_RSVP, deadline: "10th August 2026" },
};

export const DEMO_ORDERS: Record<string, DeliveredOrder> = {
  "petal-atelier": PETAL_ATELIER_DEMO,
  "malabar-heritage": MALABAR_HERITAGE_DEMO,
  "noor-e-nikah": NOOR_E_NIKAH_DEMO,
  "celestial-canvas": CELESTIAL_CANVAS_DEMO,
  "nordic-minimal": NORDIC_MINIMAL_DEMO,
  "mughal-miniature": MUGHAL_MINIATURE_DEMO,
  "monsoon-garden": MONSOON_GARDEN_DEMO,
};
