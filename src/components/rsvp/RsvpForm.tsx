"use client";

import { useState, type FormEvent } from "react";
import type { DeliveredOrder } from "@/data/delivered-orders";

interface Props {
  order: DeliveredOrder;
}

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

/**
 * RSVP form that POSTs to a Google Apps Script Web App URL.
 *
 * We deliberately use FormData (not JSON) so the browser sends a
 * `text/plain`-equivalent simple request with no CORS preflight —
 * Apps Script Web Apps reject preflight by default. The Apps Script
 * reads everything via `e.parameter`.
 */
export function RsvpForm({ order }: Props) {
  const webhookUrl = order.rsvp?.webhookUrl;
  const maxGuests = order.rsvp?.maxGuests ?? 5;
  const showGuestCount = maxGuests > 1;

  const [status, setStatus] = useState<Status>({ kind: "idle" });

  if (!webhookUrl) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Stamp slug + timestamp so the Sheet is self-describing
    data.set("slug", order.slug);
    data.set("title", order.title);
    data.set("submittedAt", new Date().toISOString());

    setStatus({ kind: "submitting" });

    try {
      await fetch(webhookUrl!, {
        method: "POST",
        body: data,
        // Apps Script doesn't echo CORS headers; we don't need
        // to read the response so opaque is fine.
        mode: "no-cors",
      });
      setStatus({ kind: "success" });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message:
          "Couldn't send your response. Please try again or message on WhatsApp.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="invitation-glass rounded-2xl p-8 max-w-xl mx-auto text-center border border-[#0f5e4a]/15">
        <div className="text-[#d4af37] text-3xl mb-3">✦</div>
        <h3 className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#0f5e4a] mb-3">
          Thank you
        </h3>
        <p className="text-[#2c2c2c]/70 text-base">
          Your response has been recorded. {order.groom} &amp;{" "}
          {order.bride} can&apos;t wait to celebrate with you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="invitation-glass rounded-2xl p-6 sm:p-8 max-w-xl mx-auto text-left border border-[#0f5e4a]/15"
    >
      <div className="space-y-5">
        <Field label="Your name" htmlFor="rsvp-name">
          <input
            id="rsvp-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#0f5e4a]/20 text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none focus:border-[#0f5e4a] focus:ring-2 focus:ring-[#0f5e4a]/20 transition"
            placeholder="Name on the invitation"
          />
        </Field>

        <fieldset>
          <legend className="block text-sm font-semibold text-[#2c2c2c] mb-2">
            Will you attend?
          </legend>
          <div className="grid grid-cols-2 gap-3">
            <RadioCard
              name="attending"
              value="yes"
              label="Yes, I'll be there"
              tone="emerald"
              defaultChecked
            />
            <RadioCard
              name="attending"
              value="no"
              label="Can't make it"
              tone="muted"
            />
          </div>
        </fieldset>

        {showGuestCount && (
          <Field
            label="Number of guests (including you)"
            htmlFor="rsvp-guests"
          >
            <select
              id="rsvp-guests"
              name="guestCount"
              defaultValue="1"
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#0f5e4a]/20 text-[#2c2c2c] focus:outline-none focus:border-[#0f5e4a] focus:ring-2 focus:ring-[#0f5e4a]/20 transition"
            >
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                (n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ),
              )}
            </select>
          </Field>
        )}

        <Field
          label="Message for the couple (optional)"
          htmlFor="rsvp-message"
        >
          <textarea
            id="rsvp-message"
            name="message"
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#0f5e4a]/20 text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none focus:border-[#0f5e4a] focus:ring-2 focus:ring-[#0f5e4a]/20 transition resize-none"
            placeholder="Add a blessing or a note"
          />
        </Field>

        {status.kind === "error" && (
          <p
            role="alert"
            className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="w-full px-8 py-4 bg-[#0f5e4a] text-white font-semibold rounded-full hover:bg-[#0a3d30] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status.kind === "submitting" ? "Sending…" : "Send RSVP"}
        </button>

        {order.rsvp?.deadline && (
          <p className="text-xs text-center text-[#2c2c2c]/50">
            Kindly respond by {order.rsvp.deadline}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-sm font-semibold text-[#2c2c2c] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function RadioCard({
  name,
  value,
  label,
  tone,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  tone: "emerald" | "muted";
  defaultChecked?: boolean;
}) {
  const accent =
    tone === "emerald"
      ? "peer-checked:bg-[#0f5e4a] peer-checked:text-white peer-checked:border-[#0f5e4a]"
      : "peer-checked:bg-[#2c2c2c]/5 peer-checked:text-[#2c2c2c] peer-checked:border-[#2c2c2c]/40";

  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="sr-only peer"
      />
      <div
        className={`px-4 py-3 rounded-xl text-center font-semibold border-2 border-[#0f5e4a]/20 bg-white/80 text-[#2c2c2c]/70 transition ${accent}`}
      >
        {label}
      </div>
    </label>
  );
}
