"use client";

import { useState, useEffect } from "react";
import type { DeliveredOrder } from "@/data/delivered-orders";
import { RsvpForm } from "@/components/rsvp/RsvpForm";
import { Khatam } from "./shared/Khatam";
import { MihrabFrame } from "./shared/MihrabFrame";

interface Props {
  order: DeliveredOrder;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(target: Date): TimeLeft {
  const now = Date.now();
  const ms = target.getTime() - now;
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
      <Khatam className="mx-4 h-7 w-7" strokeWidth={3} gradientId="div-gold" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
    </div>
  );
}

export function NoorENikahCard({ order }: Props) {
  const target = new Date(order.eventDateIso);
  const [opened, setOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(diff(target));
    const timer = setInterval(() => setTimeLeft(diff(target)), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.eventDateIso]);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setIsVisible(true), 400);
  };

  const yesMsg = encodeURIComponent(
    `Alhamdulillah, I will attend the Nikah of ${order.bride} & ${order.groom}.`,
  );
  const noMsg = encodeURIComponent(
    `With regret, I am unable to attend the Nikah ceremony of ${order.bride} & ${order.groom}.`,
  );

  const brideInitial = order.bride.split(" ")[0][0];
  const groomInitial = order.groom.split(" ")[0][0];

  return (
    <main className="invitation-root relative bg-[#faf8f3]">
      {/* Paper grain across the whole page */}
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04] invitation-paper-grain" />

      {/* Envelope / Open Invitation */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
          opened ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {/* Split curtain panels */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-[#faf8f3] to-[#f0ebe0] transition-transform duration-[900ms] ease-in-out ${
            opened ? "-translate-x-full" : "translate-x-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#faf8f3] to-[#f0ebe0] transition-transform duration-[900ms] ease-in-out ${
            opened ? "translate-x-full" : "translate-x-0"
          }`}
        />
        {/* Seam glow */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />

        {/* Curtain content */}
        <div
          className={`relative z-10 px-6 text-center transition-opacity duration-500 ${
            opened ? "opacity-0" : "opacity-100"
          }`}
        >
          <MihrabFrame className="mx-auto mb-8 h-44 w-36" gradientId="curtain-arch">
            <div className="flex h-full flex-col items-center justify-center pt-6">
              <Khatam className="mb-3 h-8 w-8" gradientId="curtain-star" />
              <div className="invitation-gold-leaf font-[family-name:var(--font-invitation-serif)] text-4xl font-bold">
                {brideInitial} &amp; {groomInitial}
              </div>
            </div>
          </MihrabFrame>

          <p className="mb-2 font-[family-name:var(--font-invitation-script)] text-xl text-[#2c2c2c]/60">
            The Nikah of
          </p>
          <p className="mb-8 font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c2c2c]">
            {order.bride} &amp; {order.groom}
          </p>

          <button
            onClick={handleOpen}
            className="rounded-full border border-[#d4af37] px-10 py-4 font-[family-name:var(--font-invitation-sans)] text-sm font-semibold tracking-[0.2em] text-[#0f5e4a] uppercase transition-all duration-300 hover:bg-[#d4af37] hover:text-white"
          >
            Open Invitation
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        {/* Soft gold radial glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fffff0] via-[#faf8f3] to-[#f4e4b8]/30" />
        {/* Faint khatam tile */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='1.5'%3E%3Crect x='25' y='25' width='40' height='40'/%3E%3Crect x='25' y='25' width='40' height='40' transform='rotate(45 45 45)'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div
          className={`relative z-10 mx-auto max-w-3xl text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Bismillah */}
          <p className="invitation-arabic invitation-gold-leaf mb-10 text-3xl tracking-wide sm:text-4xl md:text-5xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <GoldDivider className="mb-8" />

          <p className="mb-8 font-[family-name:var(--font-invitation-script)] text-2xl text-[#2c2c2c]/60 sm:text-3xl">
            {order.invitationLine}
          </p>

          {/* Names in mihrab arch */}
          <MihrabFrame
            className="mx-auto mb-10 max-w-xl px-8 py-10"
            gradientId="hero-arch"
          >
            <h1
              className="font-[family-name:var(--font-invitation-serif)] font-bold leading-tight text-[#0f5e4a]"
              style={{ textWrap: "balance" }}
            >
              <span
                className="block"
                style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}
              >
                {order.bride}
              </span>
              <span className="my-2 block font-[family-name:var(--font-invitation-script)] text-4xl text-[#b76e79]">
                &amp;
              </span>
              <span
                className="block"
                style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}
              >
                {order.groom}
              </span>
            </h1>
          </MihrabFrame>

          <p className="mb-12 font-[family-name:var(--font-invitation-sans)] text-lg text-[#2c2c2c]/80">
            …request the honour of your presence at their {order.ceremonyHeadline}
          </p>

          {/* Ceremony glass card */}
          <div className="invitation-glass mx-auto max-w-md rounded-3xl border border-[#d4af37]/30 p-8">
            <div className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#d4af37]">
              {order.primaryEvent.label}
            </div>
            <div className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c2c2c]">
              {order.primaryEvent.date}
            </div>
            <div className="mt-1 text-[#2c2c2c]/70">{order.primaryEvent.time}</div>
            <div className="mx-auto my-4 h-px w-24 bg-[#d4af37]/30" />
            <div className="text-[#2c2c2c]/80">
              {order.primaryEvent.venue}
              <br />
              {order.primaryEvent.venueAddress}
            </div>
          </div>

          <GoldDivider className="mt-12" />
        </div>
      </section>

      {/* Ayah */}
      <section className="invitation-gradient-emerald relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-[#b76e79] to-transparent" />
          <p className="invitation-arabic mb-8 text-2xl text-[#f4e4b8] sm:text-3xl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="font-[family-name:var(--font-invitation-script)] text-xl italic leading-relaxed text-white/90 sm:text-2xl">
            &ldquo;And among His signs is that He created for you mates from
            among yourselves, that you may dwell in tranquillity, and He has
            placed between you affection and mercy.&rdquo;
          </p>
          <p className="mt-4 text-sm tracking-widest text-white/60">
            — SURAH AR-RUM 30:21
          </p>
          <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#b76e79] to-transparent" />
        </div>
      </section>

      {/* Countdown */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#d4af37]">
            COUNTING THE DAYS
          </p>
          <h2 className="mb-12 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
            Until We Say Qabool
          </h2>
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="invitation-glass rounded-2xl border border-[#d4af37]/30 p-4 sm:p-6"
              >
                <div className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-5xl">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-xs tracking-widest text-[#2c2c2c]/50 uppercase sm:text-sm">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blessed Union */}
      <section className="relative bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <Khatam className="mx-auto mb-4 h-10 w-10" gradientId="fam-star" />
            <h2 className="font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
              A Blessed Union of Two Families
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="invitation-shadow-soft rounded-2xl border border-[#d4af37]/20 p-8 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#d4af37]">
                THE BRIDE
              </p>
              <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c2c2c]">
                {order.bride}
              </h3>
              <p className="mt-3 text-[#2c2c2c]/70">
                With love and blessings
                <br />
                from her family
              </p>
            </div>
            <div className="invitation-shadow-soft rounded-2xl border border-[#d4af37]/20 p-8 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#d4af37]">
                THE GROOM
              </p>
              <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c2c2c]">
                {order.groom}
              </h3>
              <p className="mt-3 text-[#2c2c2c]/70">
                With love and blessings
                <br />
                from his family
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order of Events */}
      <section className="relative bg-gradient-to-br from-[#faf8f3] to-[#f5f5f0] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-16 text-center font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
            Order of Events
          </h2>

          <div className="space-y-8">
            {order.timeline.map((item, index) => (
              <div key={index} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <Khatam
                    className="h-8 w-8 shrink-0"
                    gradientId={`tl-${index}`}
                  />
                  {index < order.timeline.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-[#d4af37]/30" />
                  )}
                </div>
                <div className="invitation-glass flex-1 rounded-2xl border border-[#d4af37]/20 p-6">
                  <h3 className="font-[family-name:var(--font-invitation-serif)] text-xl font-bold text-[#2c2c2c]">
                    {item.event}
                  </h3>
                  <p className="mt-1 text-[#d4af37]">{item.time}</p>
                  <p className="mt-1 text-[#2c2c2c]/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Map */}
      <section className="relative bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-10 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
            Venue
          </h2>
          <div className="invitation-shadow-soft rounded-3xl border border-[#0f5e4a]/15 p-10">
            <Khatam className="mx-auto mb-5 h-10 w-10" gradientId="venue-star" />
            <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#2c2c2c]">
              {order.primaryEvent.venue}
            </h3>
            <p className="mt-3 text-[#2c2c2c]/70">
              {order.primaryEvent.venueAddress}
            </p>
            <a
              href={order.primaryEvent.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0f5e4a] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#0a3d30]"
            >
              Open in Maps
            </a>
          </div>

          {/* Embedded map */}
          <div className="mt-8 relative w-full aspect-[16/10] bg-[#e9e6df] rounded-3xl overflow-hidden invitation-shadow-soft">
            {(() => {
              const lat = order.primaryEvent.lat;
              const lng = order.primaryEvent.lng;
              const hasCoords =
                typeof lat === "number" && typeof lng === "number";
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
        </div>
      </section>

      {/* RSVP */}
      <section className="relative bg-gradient-to-br from-[#faf8f3] to-[#f5f5f0] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Khatam className="mx-auto mb-5 h-10 w-10" gradientId="rsvp-star" />
          <h2 className="mb-4 font-[family-name:var(--font-invitation-serif)] text-3xl font-bold text-[#0f5e4a] sm:text-4xl">
            Kindly Respond
          </h2>
          <p className="mb-8 text-[#2c2c2c]/70">
            Your presence would honour us.{" "}
            {order.rsvp?.deadline
              ? `Please confirm by ${order.rsvp.deadline}.`
              : "Please let us know if you can make it."}
          </p>

          {order.rsvp?.webhookUrl ? (
            <RsvpForm order={order} />
          ) : (
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={`https://wa.me/${order.rsvpWhatsApp}?text=${yesMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#0f5e4a] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#0a3d30]"
              >
                Alhamdulillah, I&apos;ll Attend
              </a>
              <a
                href={`https://wa.me/${order.rsvpWhatsApp}?text=${noMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#0f5e4a] px-8 py-4 font-semibold text-[#0f5e4a] transition-colors hover:bg-[#0f5e4a] hover:text-white"
              >
                Unable to Attend
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Du'a & Closing */}
      <section className="invitation-gradient-emerald relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Khatam className="mx-auto mb-8 h-12 w-12" gradientId="dua-star" />
          <p className="invitation-arabic mb-6 text-2xl text-[#f4e4b8] sm:text-3xl">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي
            خَيْرٍ
          </p>
          <p className="font-[family-name:var(--font-invitation-script)] text-xl italic text-white/90 sm:text-2xl">
            &ldquo;May Allah bless you both and unite you in goodness.&rdquo;
          </p>
          <div className="mx-auto my-10 h-px w-32 bg-[#b76e79]/40" />
          <p className="font-[family-name:var(--font-invitation-sans)] text-white/70">
            With duas and love,
          </p>
          <p className="mt-2 font-[family-name:var(--font-invitation-serif)] text-lg font-bold text-[#f4e4b8]">
            The families of {order.bride} &amp; {order.groom}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center bg-white">
        <p className="text-[#2c2c2c]/60 text-sm font-[family-name:var(--font-invitation-sans)]">
          With love, {order.groom} &amp; {order.bride}
        </p>
        <p className="text-[#2c2c2c]/30 text-xs mt-2">
          Crafted by{" "}
          <a
            href="https://axonstack.in/apps/shaadi-cards"
            className="hover:text-[#2c2c2c]/60 transition-colors"
          >
            AxonStack — Shaadi Cards
          </a>
        </p>
      </footer>
    </main>
  );
}
