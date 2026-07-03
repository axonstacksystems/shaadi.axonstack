"use client";

/**
 * Layered nebula bloom that sits between the starfield and the content.
 * Pure CSS (GPU-composited blur + slow drift) so it adds cinematic depth
 * without a per-frame JS cost. Drift pauses for reduced-motion users.
 */
export function Nebula() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        className="absolute -left-[20%] -top-[10%] h-[70vh] w-[70vw] rounded-full opacity-40 blur-[120px] motion-safe:animate-[nebula-drift-a_26s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle, rgba(123,67,151,0.55) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -right-[15%] top-[20%] h-[60vh] w-[60vw] rounded-full opacity-35 blur-[110px] motion-safe:animate-[nebula-drift-b_32s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle, rgba(30,58,95,0.6) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[5%] left-[25%] h-[55vh] w-[55vw] rounded-full opacity-25 blur-[100px] motion-safe:animate-[nebula-drift-a_38s_ease-in-out_infinite_alternate-reverse]"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 70%)" }}
      />
      <div
        className="absolute right-[20%] bottom-[18%] h-[40vh] w-[40vw] rounded-full opacity-25 blur-[90px] motion-safe:animate-[nebula-drift-b_29s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle, rgba(183,110,121,0.3) 0%, transparent 70%)" }}
      />
      <style jsx>{`
        @keyframes nebula-drift-a {
          0% { transform: translate3d(-4%, -3%, 0) scale(1); }
          100% { transform: translate3d(5%, 4%, 0) scale(1.12); }
        }
        @keyframes nebula-drift-b {
          0% { transform: translate3d(4%, 2%, 0) scale(1.05); }
          100% { transform: translate3d(-5%, -4%, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
