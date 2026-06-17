interface KhatamProps {
  className?: string;
  strokeWidth?: number;
  withDot?: boolean;
  gradientId?: string;
}

export function Khatam({
  className = "w-12 h-12",
  strokeWidth = 2,
  withDot = true,
  gradientId = "khatam-gold",
}: KhatamProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Decorative eight-point star"
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
      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      >
        <rect x="22" y="22" width="56" height="56" />
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          transform="rotate(45 50 50)"
        />
      </g>
      {withDot && <circle cx="50" cy="50" r="2.5" fill={`url(#${gradientId})`} />}
    </svg>
  );
}
