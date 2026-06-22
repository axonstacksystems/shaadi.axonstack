"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Tag, HelpCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon: typeof Home;
  /** in-page section anchor (scroll on home) */
  id?: string;
  /** full-page route (separate page) */
  href?: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { href: "/designs", label: "Designs", icon: LayoutGrid },
  { href: "/pricing", label: "Pricing", icon: Tag },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
];

const WHATSAPP_NUMBER = "918985798572";
const WHATSAPP_MESSAGE =
  "Assalamu Alaikum! I'd like to order a digital wedding invitation from Shaadi Cards.";
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function TabButton({
  id,
  href,
  label,
  icon: Icon,
  active,
  useRoute,
}: NavItem & { active: boolean; useRoute?: boolean }) {
  const className = cn(
    "flex flex-col items-center gap-1 rounded-xl py-1.5 font-[family-name:var(--font-invitation-sans)] transition-colors",
    active ? "text-[#0f5e4a]" : "text-[#2c2c2c]/45",
  );
  const inner = (
    <>
      <Icon
        className={cn(
          "size-[22px] transition-transform",
          active && "scale-110",
        )}
        strokeWidth={active ? 2.4 : 1.9}
      />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-current={active ? "page" : undefined}>
        {inner}
      </Link>
    );
  }

  // When on a different page, link back to home (top of page)
  if (useRoute) {
    return (
      <Link href="/" className={className} aria-current={active ? "page" : undefined}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={`#${id}`}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {inner}
    </a>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const isHome = pathname === "/";

  // Scroll-spy only on the home page
  useEffect(() => {
    if (!isHome) return;
    const ids = ["home"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  function isActive(it: NavItem) {
    if (it.href) return pathname === it.href;
    if (!isHome) return false;
    return activeSection === it.id;
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d4af37]/20 bg-[#faf8f3]/90 backdrop-blur-xl sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative mx-auto grid max-w-md grid-cols-5 items-end px-2 pt-1.5 pb-2">
        {navItems.slice(0, 2).map((it) => (
          <TabButton key={it.label} {...it} active={isActive(it)} useRoute={!isHome} />
        ))}

        {/* Center elevated WhatsApp action */}
        <div className="flex justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            className="-mt-7 flex size-14 flex-col items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 ring-4 ring-[#faf8f3] transition-transform active:scale-95"
          >
            <MessageCircle className="size-6" />
          </a>
        </div>

        {navItems.slice(2).map((it) => (
          <TabButton key={it.label} {...it} active={isActive(it)} useRoute={!isHome} />
        ))}
      </div>
    </nav>
  );
}
