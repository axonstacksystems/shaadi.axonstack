import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card Not Found — Shaadi Cards",
};

export default function NotFound() {
  return (
    <main className="invitation-root min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-[#d4af37] text-2xl mb-4 font-[family-name:var(--font-invitation-script)]">
          ✦ ✦ ✦
        </div>
        <h1 className="font-[family-name:var(--font-invitation-serif)] text-4xl sm:text-5xl font-bold text-[#0f5e4a] mb-6">
          Card Not Found
        </h1>
        <p className="font-[family-name:var(--font-invitation-sans)] text-lg text-[#2c2c2c]/70 mb-8 leading-relaxed">
          The invitation you&apos;re looking for doesn&apos;t exist or
          might have been moved. Double-check the link, or get in touch if
          you think this is a mistake.
        </p>
        <a
          href="https://axonstack.in/apps/shaadi-cards"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#0f5e4a] text-white font-[family-name:var(--font-invitation-sans)] font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          Visit Shaadi Cards
          <span className="text-xl">→</span>
        </a>
      </div>
    </main>
  );
}
