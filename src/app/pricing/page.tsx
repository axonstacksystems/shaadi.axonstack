import type { Metadata } from "next";
import { PricingSection } from "@/components/home/PricingSection";
import { BottomNav } from "@/components/home/BottomNav";
import { AppHeader } from "@/components/home/AppHeader";

export const metadata: Metadata = {
  title: "Pricing — Shaadi Cards",
  description:
    "Simple, honest pricing for digital wedding invitations. One-time payment, no subscriptions. Your invitation link stays live forever.",
};

export default function PricingPage() {
  return (
    <main className="invitation-root min-h-screen overflow-hidden pb-20 sm:pb-0">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(212,175,55,0.14), transparent 70%), radial-gradient(50% 40% at 85% 20%, rgba(15,94,74,0.10), transparent 70%)",
        }}
      />
      <AppHeader />
      <PricingSection />
      <BottomNav />
    </main>
  );
}
