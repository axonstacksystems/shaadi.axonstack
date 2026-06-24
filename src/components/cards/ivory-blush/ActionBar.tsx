"use client";

import { MapPin, Mail, CalendarPlus } from "lucide-react";

interface ActionBarProps {
  mapsUrl: string;
  groom: string;
  bride: string;
  eventDateIso: string;
  venue: string;
  venueAddress: string;
  onRSVP?: () => void;
}

function generateICS(
  groom: string,
  bride: string,
  eventDateIso: string,
  venue: string,
  venueAddress: string
): string {
  const start = new Date(eventDateIso);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // 3 hours

  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shaadi Cards//Ivory Blush//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Nikah of ${groom} & ${bride}`,
    `LOCATION:${venue}\\, ${venueAddress}`,
    `DESCRIPTION:You are cordially invited to the Nikah ceremony of ${groom} and ${bride}.`,
    `UID:${Date.now()}@shaadi.axonstack.in`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(ics: string, filename: string) {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ActionBar({
  mapsUrl,
  groom,
  bride,
  eventDateIso,
  venue,
  venueAddress,
  onRSVP,
}: ActionBarProps) {
  function handleCalendar() {
    const ics = generateICS(groom, bride, eventDateIso, venue, venueAddress);
    downloadICS(ics, `nikah-${groom.toLowerCase()}-${bride.toLowerCase()}.ics`);
  }

  return (
    <div
      className="sticky bottom-0 z-30 px-4 py-3"
      style={{
        background: "rgba(251,248,244,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
      }}
      role="toolbar"
      aria-label="Quick actions"
    >
      <div className="flex gap-2.5 max-w-[480px] mx-auto">
        {/* View Location */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl transition-all active:scale-95"
          style={{
            background: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(203,164,106,0.2)",
          }}
          aria-label="View venue location on map"
        >
          <MapPin size={18} style={{ color: "#CBA46A" }} aria-hidden="true" />
          <span style={{ fontSize: "10px", color: "#85705C", fontWeight: 500 }}>
            View Location
          </span>
        </a>

        {/* RSVP */}
        <button
          onClick={onRSVP}
          className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg,#CBA46A,#B99054)",
            border: "none",
          }}
          aria-label="Open RSVP form"
        >
          <Mail size={18} style={{ color: "#fff" }} aria-hidden="true" />
          <span style={{ fontSize: "10px", color: "#fff", fontWeight: 600 }}>
            RSVP
          </span>
        </button>

        {/* Add to Calendar */}
        <button
          onClick={handleCalendar}
          className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl transition-all active:scale-95"
          style={{
            background: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(203,164,106,0.2)",
          }}
          aria-label="Add event to calendar"
        >
          <CalendarPlus size={18} style={{ color: "#CBA46A" }} aria-hidden="true" />
          <span style={{ fontSize: "10px", color: "#85705C", fontWeight: 500 }}>
            Add to Calendar
          </span>
        </button>
      </div>
    </div>
  );
}
