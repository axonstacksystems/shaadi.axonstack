"use client";

import { useEffect, useState } from "react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { RsvpForm } from "@/components/rsvp/RsvpForm";

interface Props {
  order: DeliveredOrder;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function diff(target: Date): TimeLeft {
  const now = Date.now();
  const ms = target.getTime() - now;
  if (ms <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

export function MalabarEmeraldCard({ order }: Props) {
  const target = new Date(order.eventDateIso);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(diff(target));
    const id = setInterval(() => setTimeLeft(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.eventDateIso]);

  const yesMsg = encodeURIComponent(
    `I will be there to celebrate ${order.groom} & ${order.bride}'s ${order.ceremonyHeadline}. 💚`,
  );
  const noMsg = encodeURIComponent(
    `Sorry, I won't be able to attend ${order.groom} & ${order.bride}'s ${order.ceremonyHeadline}. Sending love and prayers.`,
  );

  return (
    <main className="invitation-root bg-[#faf8f3]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-start sm:items-center justify-center overflow-hidden invitation-gradient-emerald py-20 sm:py-24">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div
          className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Bismillah */}
          <div className="text-[#d4af37] text-3xl sm:text-4xl md:text-5xl mt-6 sm:mt-4 mb-10 sm:mb-12 leading-[1.4] font-[family-name:var(--font-invitation-script)]">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <div className="mx-4 text-[#d4af37] text-3xl">✦</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h1 className="font-[family-name:var(--font-invitation-serif)] text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {order.groom} &amp; {order.bride}
          </h1>

          <p className="font-[family-name:var(--font-invitation-script)] text-2xl sm:text-3xl md:text-4xl text-[#d4af37] mb-6 leading-snug">
            {order.invitationLine}
          </p>

          <p className="font-[family-name:var(--font-invitation-sans)] text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-xl mx-auto leading-relaxed">
            We joyfully invite you to share in our{" "}
            {order.ceremonyHeadline.toLowerCase()} as we begin our new life
            together.
          </p>

          {/* Date & Venue */}
          <div className="invitation-glass-dark rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <div className="text-[#d4af37] text-lg font-semibold mb-2">
              {order.primaryEvent.label}
            </div>
            <div className="text-white text-2xl font-bold mb-4">
              {order.primaryEvent.date}
            </div>
            <div className="text-white/80 text-lg mb-4">
              {order.primaryEvent.time}
            </div>
            <div className="text-white/90 text-lg">
              {order.primaryEvent.venue}
              <br />
              {order.primaryEvent.venueAddress}
            </div>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mb-12">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="invitation-glass-dark rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-[#d4af37] mb-1">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-white/70 text-sm">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="text-white/60 text-sm animate-bounce">
            Scroll to explore ↓
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-invitation-serif)] text-4xl sm:text-5xl font-bold text-[#0f5e4a] mb-16 text-center">
            Event Timeline
          </h2>

          <div className="space-y-8">
            {order.timeline.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start group hover:translate-x-2 transition-transform duration-300"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-[#d4af37] font-bold text-lg">
                    {item.time}
                  </div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#0f5e4a] mt-1.5 group-hover:scale-125 transition-transform" />
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c2c2c] mb-2">
                    {item.event}
                  </h3>
                  <p className="text-[#2c2c2c]/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#faf8f3] to-[#f5f5f0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-invitation-serif)] text-4xl sm:text-5xl font-bold text-[#0f5e4a] mb-8">
            Venue
          </h2>

          <div className="invitation-glass rounded-2xl overflow-hidden mb-8 invitation-shadow-soft">
            <div className="p-8 pb-6">
              <h3 className="font-[family-name:var(--font-invitation-serif)] font-bold text-2xl text-[#2c2c2c] mb-3">
                {order.primaryEvent.venue}
              </h3>
              <p className="text-[#2c2c2c]/70 mb-6">
                {order.primaryEvent.venueAddress}
              </p>
            </div>

            {/* Embedded map */}
            <div className="relative w-full aspect-[16/10] bg-[#e9e6df]">
              {(() => {
                const lat = order.primaryEvent.lat;
                const lng = order.primaryEvent.lng;
                const hasCoords =
                  typeof lat === "number" && typeof lng === "number";
                // OSM embed renders without an API key. Bbox is ~0.01° around
                // the pin (~1.1km) which gives a clean street-level preview.
                const delta = 0.005;
                const bbox = hasCoords
                  ? `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`
                  : "75.859%2C11.173%2C75.869%2C11.183";
                const marker = hasCoords
                  ? `${lat}%2C${lng}`
                  : "11.178%2C75.864";
                const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
                return (
                  <iframe
                    title={`Map of ${order.primaryEvent.venue}`}
                    src={src}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                );
              })()}
            </div>

            <div className="p-6 flex items-center justify-center border-t border-[#0f5e4a]/10">
              <a
                href={order.primaryEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f5e4a] text-white rounded-full hover:bg-[#0a3d30] transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  near_me
                </span>
                <span className="font-semibold">Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-invitation-serif)] text-4xl sm:text-5xl font-bold text-[#0f5e4a] mb-6">
            Will You Join Us?
          </h2>
          <p className="text-[#2c2c2c]/70 text-lg mb-8">
            Your blessings and presence would mean the world to us
          </p>

          {order.rsvp?.webhookUrl ? (
            <RsvpForm order={order} />
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${order.rsvpWhatsApp}?text=${yesMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#0f5e4a] text-white font-semibold rounded-full hover:bg-[#0a3d30] transition-colors"
              >
                ✓ Yes, I&apos;ll be there
              </a>
              <a
                href={`https://wa.me/${order.rsvpWhatsApp}?text=${noMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-[#0f5e4a] text-[#0f5e4a] font-semibold rounded-full hover:bg-[#0f5e4a] hover:text-white transition-colors"
              >
                ✗ Can&apos;t make it
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center invitation-gradient-emerald">
        <p className="text-white/70 text-sm font-[family-name:var(--font-invitation-sans)]">
          With love, {order.groom} &amp; {order.bride}
        </p>
        <p className="text-white/40 text-xs mt-2">
          Crafted by{" "}
          <a
            href="https://axonstack.in/apps/shaadi-cards"
            className="hover:text-white/70 transition-colors"
          >
            axonstack — Shaadi Cards
          </a>
        </p>
      </footer>
    </main>
  );
}
