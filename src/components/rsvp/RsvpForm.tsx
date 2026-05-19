"use client";

import { useState } from "react";
import type { DeliveredOrder } from "@/data/delivered-orders";

interface Props {
  order: DeliveredOrder;
}

type Choice = "yes" | "no";
type Status = "idle" | "submitting" | "done";

export function RsvpForm({ order }: Props) {
  const webhookUrl = order.rsvp?.webhookUrl;
  const [status, setStatus] = useState<Status>("idle");
  const [choice, setChoice] = useState<Choice | null>(null);

  if (!webhookUrl) return null;

  async function handleClick(attending: Choice) {
    if (status !== "idle") return;
    setChoice(attending);
    setStatus("submitting");

    const data = new FormData();
    data.set("slug", order.slug);
    data.set("title", order.title);
    data.set("attending", attending);
    data.set("submittedAt", new Date().toISOString());

    try {
      await fetch(webhookUrl!, {
        method: "POST",
        body: data,
        mode: "no-cors",
      });
    } finally {
      // no-cors means we can't read the response — treat send as success
      setStatus("done");
    }
  }

  if (status === "done") {
    return (
      <div className="text-center">
        <div className="text-[#d4af37] text-3xl mb-3">✦</div>
        <p className="font-[family-name:var(--font-invitation-serif)] text-2xl font-bold text-[#0f5e4a] mb-2">
          {choice === "yes" ? "See you there!" : "We'll miss you"}
        </p>
        <p className="text-[#2c2c2c]/60 text-base">
          {choice === "yes"
            ? `${order.groom} & ${order.bride} can't wait to celebrate with you.`
            : "Thank you for letting us know. Sending love and prayers."}
        </p>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={() => handleClick("yes")}
        disabled={busy}
        className="px-8 py-4 bg-[#0f5e4a] text-white font-semibold rounded-full hover:bg-[#0a3d30] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {busy && choice === "yes" ? "Sending…" : "✓ Yes, I'll be there"}
      </button>
      <button
        onClick={() => handleClick("no")}
        disabled={busy}
        className="px-8 py-4 border-2 border-[#0f5e4a] text-[#0f5e4a] font-semibold rounded-full hover:bg-[#0f5e4a] hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {busy && choice === "no" ? "Sending…" : "✗ Can't make it"}
      </button>
    </div>
  );
}
