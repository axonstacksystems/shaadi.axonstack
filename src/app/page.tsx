import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shaadi Cards — Luxury Digital Wedding Invitations",
  description:
    "Delivered digital wedding invitations by AxonStack. Visit a specific card by its slug, or explore templates at axonstack.in/apps/shaadi-cards.",
};

export default function Home() {
  return (
    <main className="invitation-root min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-[#d4af37] text-2xl mb-4 font-[family-name:var(--font-invitation-script)]">
          ✦ ✦ ✦
        </div>
        <h1 className="font-[family-name:var(--font-invitation-serif)] text-4xl sm:text-5xl font-bold text-[#0f5e4a] mb-6">
          Shaadi Cards
        </h1>
        <p className="font-[family-name:var(--font-invitation-sans)] text-lg text-[#2c2c2c]/70 mb-8 leading-relaxed">
          This domain hosts delivered digital wedding invitations. If you
          received a link from someone, open it directly. To explore
          templates or commission your own card, visit our marketing site.
        </p>
        <a
          href="https://axonstack.in/apps/shaadi-cards"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] text-white font-[family-name:var(--font-invitation-sans)] font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          Explore Templates
          <span className="text-xl">→</span>
        </a>
      </div>
    </main>
  );
}
