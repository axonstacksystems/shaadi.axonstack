export interface DeliveredEvent {
    label: string;
    date: string; // human-readable
    time: string;
    venue: string;
    venueAddress: string;
    mapsUrl: string;
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
    invitationLine: string;
    ceremonyHeadline: string;
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
        rsvpWhatsApp: "919876543210",
        rsvp: {
            // Paste the Apps Script Web App URL here once published. While
            // empty, the card falls back to WhatsApp buttons.
            webhookUrl: "https://script.google.com/macros/s/AKfycbyPVwEqRmffTCFUOInYGFN0tH2Hg-IxV_Nt9RLOTdOinujW-7gPWI-sqZme0WS0AqO1/exec",
            deadline: "20th May 2026",
            maxGuests: 5,
        },
    },
    {
        slug: "abiya-ashik",
        templateSlug: "noor-e-nikah",
        title: "Abiya & Ashik",
        deliveredOn: "2026-06-18",
        bride: "Abiya",
        groom: "Ashik",
        invitationLine: "In the name of Allah, with the blessings of our families",
        ceremonyHeadline: "Nikah",
        eventDateIso: "2026-12-20T18:30:00+05:30",
        primaryEvent: {
            label: "NIKAH CEREMONY",
            date: "Sunday, 20th December 2026",
            time: "After Maghrib",
            venue: "Juma Masjid",
            venueAddress: "Mananchira, Calicut, Kerala 673001",
            mapsUrl:
                "https://www.google.com/maps/search/?api=1&query=Juma+Masjid+Calicut",
        },
        timeline: [
            {
                time: "After Maghrib",
                event: "Nikah Ceremony",
                description: "The sacred union witnessed by family and friends",
            },
            {
                time: "7:00 PM",
                event: "Walima Reception",
                description: "Dinner and celebration with loved ones",
            },
        ],
        rsvpWhatsApp: "919876543210",
        rsvp: {
            webhookUrl: "",
            deadline: "15th December 2026",
            maxGuests: 5,
        },
    },
];

export function getDeliveredOrderBySlug(
    slug: string,
): DeliveredOrder | undefined {
    return deliveredOrders.find((o) => o.slug === slug);
}
