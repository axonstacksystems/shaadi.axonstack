import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLogo } from "@/components/home/NavLogo";

const WHATSAPP_NUMBER = "918985798572";
const WHATSAPP_MESSAGE =
  "Assalamu Alaikum! I'd like to order a digital wedding invitation from Shaadi Cards.";
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d4af37]/15 bg-[#faf8f3]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <NavLogo />
        <div className="hidden items-center gap-7 sm:flex">
          <Link
            href="/designs"
            className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
          >
            Designs
          </Link>
          <Link
            href="/pricing"
            className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="font-[family-name:var(--font-invitation-sans)] text-sm text-[#2c2c2c]/70 transition-colors hover:text-[#0f5e4a]"
          >
            FAQ
          </Link>
        </div>
        <Button
          asChild
          className="rounded-full bg-[#0f5e4a] font-[family-name:var(--font-invitation-sans)] text-sm font-semibold text-white hover:bg-[#0a3d30]"
        >
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" />
            Get yours
          </a>
        </Button>
      </nav>
    </header>
  );
}
