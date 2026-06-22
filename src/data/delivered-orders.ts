export interface DeliveredEvent {
    label: string;
    date: string; // human-readable
    time: string;
    venue: string;
    venueAddress: string;
    mapsUrl: string;
    /** Optional Hijri (Islamic calendar) date shown alongside the Gregorian
     * date, e.g. "6 Rabiʿ al-Thani 1448 AH". */
    hijriDate?: string;
    /** Latitude / longitude for the map embed. Optional — if omitted, the
     * map falls back to a search query of the venue address. */
    lat?: number;
    lng?: number;
}

export interface DeliveredTimelineItem {
    time: string;
    event: string;
    description: string;
}

export interface RsvpConfig {
    /**
     * Google Apps Script Web App URL that records RSVPs into the
     * couple's Google Sheet. When set, the card renders a real RSVP
     * form. When omitted, the card falls back to plain WhatsApp links.
     *
     * See README → "Adding a new delivered card" for the Apps Script
     * template and setup steps.
     */
    webhookUrl?: string;
    /** Optional human-readable cutoff displayed on the form. */
    deadline?: string;
    /**
     * Maximum guest count selectable in the form. Defaults to 5.
     * Set to 1 to hide the guest-count picker entirely.
     */
    maxGuests?: number;
}

export interface DeliveredOrder {
    /** URL slug — served at /<slug> on shaadi.axonstack.in */
    slug: string;
    /** Template this card was built from */
    templateSlug: string;
    /** Public-facing customer / couple title */
    title: string; // e.g. "Siyad & Faleela"
    /** ISO date the order was delivered to the client */
    deliveredOn: string;
    /** Couple-specific copy */
    bride: string;
    groom: string;
    /** Optional host/parent lines. Muslim invitations are traditionally
     * issued by the families, so these appear under each name when set,
     * e.g. "Son of Mr. & Mrs. Abdul Rahman". */
    groomParents?: string;
    brideParents?: string;
    invitationLine: string;
    ceremonyHeadline: string;
    /** Optional closing dua/blessing shown near the signature. Arabic is
     * rendered in the naskh face; translation appears beneath it. */
    closingDuaArabic?: string;
    closingDua?: string;
    /** Countdown target in ISO so the timer is real, not hard-coded */
    eventDateIso: string;
    primaryEvent: DeliveredEvent;
    timeline: DeliveredTimelineItem[];
    rsvpWhatsApp: string; // E.164 without + (used in wa.me fallback links)
    /** Optional Sheets-backed RSVP. If omitted, WhatsApp buttons are shown. */
    rsvp?: RsvpConfig;
}

export const deliveredOrders: DeliveredOrder[] = [
    {
        slug: "siyad-faleela",
        templateSlug: "malabar-emerald",
        title: "Siyad & Faleela",
        deliveredOn: "2026-05-19",
        bride: "Faleela",
        groom: "Siyad",
        invitationLine: "With hearts full of joy",
        ceremonyHeadline: "Wedding Ceremony",
        eventDateIso: "2026-05-24T10:00:00+05:30",
        primaryEvent: {
            label: "WEDDING CEREMONY",
            date: "Sunday, 24th May 2026",
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
                time: "11:00 AM",
                event: "Wedding Ceremony",
                description: "The sacred union witnessed by family and friends",
            },
            {
                time: "12:30 PM",
                event: "Wedding Lunch",
                description: "Traditional Malabar cuisine served",
            },
        ],
        rsvpWhatsApp: "918985798572",
        rsvp: {
            // Paste the Apps Script Web App URL here once published. While
            // empty, the card falls back to WhatsApp buttons.
            webhookUrl: "https://script.google.com/macros/s/AKfycbyPVwEqRmffTCFUOInYGFN0tH2Hg-IxV_Nt9RLOTdOinujW-7gPWI-sqZme0WS0AqO1/exec",
            deadline: "20th May 2026",
            maxGuests: 5,
        },
    },
    {
        slug: "ashik-abiya",
        templateSlug: "noor-e-nikah",
        title: "Ashik & Abia",
        deliveredOn: "2026-06-18",
        bride: "Abiya",
        groom: "Ashik",
        invitationLine: "In the name of Allah, with the blessings of our families",
        ceremonyHeadline: "Nikah",
        eventDateIso: "2026-07-19T10:00:00+05:30",
        primaryEvent: {
            label: "NIKAH CEREMONY",
            date: "Sunday, 19th July 2026",
            time: "10:00 AM",
            venue: "Juma Masjid",
            venueAddress: "Ayikkarapadi, Malappuram, Kerala",
            lat: 11.1722,
            lng: 75.8981,
            mapsUrl:
                "https://www.google.com/maps/search/?api=1&query=Juma+Masjid+Ayikkarapadi+Malappuram",
        },
        timeline: [
            {
                time: "10:00 AM",
                event: "Nikah Ceremony",
                description: "The sacred union witnessed by family and friends",
            },
            {
                time: "12:00 PM",
                event: "Reception",
                description: "Dinner and celebration with loved ones",
            },
        ],
        rsvpWhatsApp: "918985798572",
        rsvp: {
            webhookUrl: "",
            deadline: "15th July 2026",
            maxGuests: 5,
        },
    },
    {
        slug: "demo-celestial",
        templateSlug: "celestial-canvas",
        title: "Demo & Celestial",
        deliveredOn: "2026-06-22",
        bride: "Celestial",
        groom: "Demo",
        groomParents: "Son of Mr. & Mrs. Abdul Rahman",
        brideParents: "Daughter of Mr. & Mrs. Yusuf Ali",
        invitationLine: "Under the same sky He created, by the will of Allah",
        ceremonyHeadline: "Nikah",
        closingDuaArabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
        closingDua:
            "May Allah bless you both, and shower His blessings upon you, and unite you in goodness.",
        eventDateIso: "2026-12-25T18:30:00+05:30",
        primaryEvent: {
            label: "NIKAH CEREMONY",
            date: "Friday, 25th December 2026",
            hijriDate: "15 Jumada al-Akhirah 1448 AH",
            time: "After Maghrib",
            venue: "Juma Masjid",
            venueAddress: "Calicut, Kerala",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Calicut",
        },
        timeline: [
            {
                time: "After Maghrib",
                event: "Nikah Ceremony",
                description: "The sacred union witnessed by family and friends",
            },
            {
                time: "8:00 PM",
                event: "Walima Reception",
                description: "The marriage feast, in keeping with the Sunnah",
            },
        ],
        rsvpWhatsApp: "918985798572",
        rsvp: {
            webhookUrl: "",
            deadline: "20th December 2026",
            maxGuests: 5,
        },
    },
    {
        slug: "demo-nordic",
        templateSlug: "nordic-frost",
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
            {
                time: "3:00 PM",
                event: "Nikah Ceremony",
                description: "The sacred union witnessed by family and friends",
            },
            {
                time: "5:00 PM",
                event: "Walima Reception",
                description: "The marriage feast, in keeping with the Sunnah",
            },
        ],
        rsvpWhatsApp: "918985798572",
        rsvp: {
            webhookUrl: "",
            deadline: "15th December 2026",
            maxGuests: 5,
        },
    },
    {
        slug: "demo-mughal",
        templateSlug: "mughal-miniature",
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
            {
                time: "10:00 AM",
                event: "Nikah Ceremony",
                description: "The sacred union witnessed by family and friends",
            },
            {
                time: "12:00 PM",
                event: "Reception",
                description: "Dinner and celebration with loved ones",
            },
        ],
        rsvpWhatsApp: "918985798572",
        rsvp: {
            webhookUrl: "",
            deadline: "10th November 2026",
            maxGuests: 5,
        },
    },
    {
        slug: "demo-monsoon",
        templateSlug: "monsoon-special",
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
        rsvpWhatsApp: "918985798572",
        rsvp: {
            webhookUrl: "",
            deadline: "10th August 2026",
            maxGuests: 5,
        },
    },
];

export function getDeliveredOrderBySlug(
    slug: string,
): DeliveredOrder | undefined {
    return deliveredOrders.find((o) => o.slug === slug);
}
