import type { ReactNode } from "react";

interface MihrabFrameProps {
  children: ReactNode;
  className?: string;
  gradientId?: string;
  strokeWidth?: number;
}

export function MihrabFrame({
  children,
  className = "",
  gradientId = "mihrab-gold",
  strokeWidth = 1.5,
}: MihrabFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 280"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b8941f" />
            <stop offset="0.35" stopColor="#d4af37" />
            <stop offset="0.5" stopColor="#f4e4b8" />
            <stop offset="0.65" stopColor="#d4af37" />
            <stop offset="1" stopColor="#b8941f" />
          </linearGradient>
        </defs>
        <path
          d="M20 280 L20 150
             C20 96 40 70 70 44
             C92 24 100 14 100 0
             C100 14 108 24 130 44
             C160 70 180 96 180 150
             L180 280"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
