"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface RSVPCardProps {
  groom: string;
  bride: string;
  webhookUrl?: string;
  rsvpWhatsApp: string;
  deadline?: string;
}

interface RSVPModalProps {
  groom: string;
  bride: string;
  webhookUrl?: string;
  rsvpWhatsApp: string;
  deadline?: string;
  onClose: () => void;
}

function RSVPModal({
  groom,
  bride,
  webhookUrl,
  rsvpWhatsApp,
  deadline,
  onClose,
}: RSVPModalProps) {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const yesMsg = encodeURIComponent(
    `Alhamdulillah, I will attend the Nikah of ${groom} & ${bride}. Name: ${name}, Guests: ${guests}`
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    if (webhookUrl) {
      setStatus("loading");
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, guests, attending: true, timestamp: new Date().toISOString() }),
        });
        setStatus("success");
      } catch {
        setStatus("error");
      }
    } else {
      window.open(`https://wa.me/${rsvpWhatsApp}?text=${yesMsg}`, "_blank");
      onClose();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      style={{ background: "rgba(75,58,42,0.4)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="RSVP form"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="ib-glass w-full max-w-[480px] p-6 m-4"
        style={{ borderRadius: 28 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 22,
              color: "#4B3A2A",
              fontWeight: 600,
            }}
          >
            Confirm RSVP
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(75,58,42,0.08)" }}
            aria-label="Close RSVP form"
          >
            <X size={16} style={{ color: "#85705C" }} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <CheckCircle size={48} style={{ color: "#CBA46A", margin: "0 auto 12px" }} />
              <p style={{ color: "#4B3A2A", fontSize: 16, fontWeight: 600 }}>
                JazakAllah Khair!
              </p>
              <p style={{ color: "#85705C", fontSize: 13, marginTop: 6 }}>
                Your RSVP has been confirmed.
              </p>
            </motion.div>
          ) : status === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <AlertCircle size={48} style={{ color: "#D8A9A2", margin: "0 auto 12px" }} />
              <p style={{ color: "#4B3A2A", fontSize: 16, fontWeight: 600 }}>
                Something went wrong
              </p>
              <p style={{ color: "#85705C", fontSize: 13, marginTop: 6 }}>
                Please try via WhatsApp.
              </p>
              <a
                href={`https://wa.me/${rsvpWhatsApp}?text=${yesMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full px-6 py-2.5 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#CBA46A,#B99054)" }}
              >
                Open WhatsApp
              </a>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {deadline && (
                <p style={{ fontSize: 12, color: "#85705C", textAlign: "center" }}>
                  Please respond by <strong>{deadline}</strong>
                </p>
              )}
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block mb-1.5"
                  style={{ fontSize: 12, color: "#85705C", fontWeight: 500 }}
                >
                  Your Name
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-2xl px-4 py-3 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(203,164,106,0.3)",
                    fontSize: 14,
                    color: "#4B3A2A",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="rsvp-guests"
                  className="block mb-1.5"
                  style={{ fontSize: 12, color: "#85705C", fontWeight: 500 }}
                >
                  Number of Guests
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGuests(n)}
                      className="w-9 h-9 rounded-full font-semibold text-sm transition-all"
                      style={
                        guests === n
                          ? {
                              background: "linear-gradient(135deg,#CBA46A,#B99054)",
                              color: "#fff",
                            }
                          : {
                              background: "rgba(203,164,106,0.12)",
                              color: "#85705C",
                            }
                      }
                      aria-pressed={guests === n}
                      aria-label={`${n} guest${n > 1 ? "s" : ""}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !name.trim()}
                className="w-full rounded-full py-3.5 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#CBA46A,#B99054)" }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Confirming…
                  </>
                ) : (
                  "Confirm RSVP"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function RSVPCard({
  groom,
  bride,
  webhookUrl,
  rsvpWhatsApp,
  deadline,
}: RSVPCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-4 pb-6"
        aria-label="RSVP"
      >
        <div className="ib-glass-rose p-6 text-center">
          <p
            className="font-semibold mb-2"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "clamp(20px, 5.5vw, 26px)",
              color: "#4B3A2A",
            }}
          >
            Kindly RSVP
          </p>
          <p
            className="mb-5 leading-relaxed"
            style={{ fontSize: "13px", color: "#85705C" }}
          >
            We would be honored by your presence and blessings.
            {deadline && (
              <>
                {" "}Please confirm by <strong style={{ color: "#4B3A2A" }}>{deadline}</strong>.
              </>
            )}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-full px-7 py-3 font-semibold text-white text-sm transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#CBA46A,#B99054)" }}
            aria-haspopup="dialog"
          >
            Confirm RSVP
          </button>
        </div>
      </motion.section>

      <AnimatePresence>
        {showModal && (
          <RSVPModal
            groom={groom}
            bride={bride}
            webhookUrl={webhookUrl}
            rsvpWhatsApp={rsvpWhatsApp}
            deadline={deadline}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
