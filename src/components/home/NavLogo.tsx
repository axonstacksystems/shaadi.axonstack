import Link from "next/link";

export function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="font-[family-name:var(--font-invitation-script)] text-xl text-[#d4af37]">
        ✦
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-invitation-serif)] text-lg font-bold text-[#0f5e4a]">
          Shaadi Cards
        </span>
        <span className="font-[family-name:var(--font-invitation-sans)] text-[10px] font-medium tracking-wide text-[#2c2c2c]/45">
          by axonstack
        </span>
      </span>
    </Link>
  );
}
