import { ImageResponse } from "next/og";
import { THEMES } from "@/components/cards/ivory-blush/themes";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ theme: string }>;
}

export default async function OgImage({ params }: Props) {
  const { theme } = await params;
  const t = THEMES[theme] ?? THEMES["ivory-blush"];

  const coverBgColors =
    theme === "royal-amethyst"
      ? ["#F7F3FF", "#EDE3F7", "#E0D0F0"]
      : theme === "crimson-maroon"
      ? ["#FDF4F4", "#F0DADA", "#E4C4C4"]
      : ["#FDF6EF", "#F5E8D8", "#EDD9C4"];

  const petalColor =
    theme === "royal-amethyst" ? "#D4B8E8" : theme === "crimson-maroon" ? "#D4818E" : "#ECC9C3";

  const goldColor = t.gold;
  const textDark = t.textDark;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(155deg, ${coverBgColors[0]} 0%, ${coverBgColors[1]} 50%, ${coverBgColors[2]} 100%)`,
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        {/* Ambient glow top-left */}
        <div style={{
          position: "absolute", top: -120, left: -120,
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${petalColor}55 0%, transparent 70%)`,
          display: "flex",
        }} />
        {/* Ambient glow bottom-right */}
        <div style={{
          position: "absolute", bottom: -100, right: -80,
          width: 420, height: 420, borderRadius: "50%",
          background: `radial-gradient(circle, ${goldColor}44 0%, transparent 70%)`,
          display: "flex",
        }} />

        {/* Decorative corner petals top-left */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 180, height: 180, opacity: 0.18,
          background: `radial-gradient(ellipse at 20% 20%, ${petalColor} 0%, transparent 70%)`,
          display: "flex",
        }} />
        {/* Decorative corner petals bottom-right */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 180, height: 180, opacity: 0.18,
          background: `radial-gradient(ellipse at 80% 80%, ${petalColor} 0%, transparent 70%)`,
          display: "flex",
        }} />

        {/* Glass card */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(255,255,255,0.85)",
          borderRadius: 32,
          padding: "56px 72px",
          boxShadow: `0 24px 80px rgba(0,0,0,0.10), 0 0 0 1px ${goldColor}22`,
          gap: 0,
          minWidth: 560,
          maxWidth: 720,
        }}>
          {/* Arabic Bismillah-style ornament */}
          <div style={{
            fontSize: 28,
            color: goldColor,
            letterSpacing: "0.08em",
            marginBottom: 12,
            opacity: 0.75,
            display: "flex",
          }}>
            ﷽
          </div>

          {/* Gold divider line */}
          <div style={{
            width: 120, height: 1,
            background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
            marginBottom: 24,
            display: "flex",
          }} />

          {/* Names */}
          <div style={{
            fontSize: 52,
            fontWeight: 700,
            color: textDark,
            letterSpacing: "-0.01em",
            textAlign: "center",
            lineHeight: 1.15,
            display: "flex",
          }}>
            Nikah Invitation
          </div>

          <div style={{
            fontSize: 22,
            color: goldColor,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: 14,
            marginBottom: 20,
            display: "flex",
          }}>
            {t.label} Collection
          </div>

          {/* Gold divider line */}
          <div style={{
            width: 80, height: 1,
            background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
            marginBottom: 22,
            display: "flex",
          }} />

          {/* Tag line */}
          <div style={{
            fontSize: 17,
            color: textDark,
            opacity: 0.55,
            letterSpacing: "0.04em",
            textAlign: "center",
            display: "flex",
          }}>
            Luxury Islamic Wedding Invitation · Shaadi Cards
          </div>

          {/* Price badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 28,
            background: textDark,
            borderRadius: 999,
            padding: "8px 22px",
          }}>
            <div style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "line-through",
              display: "flex",
            }}>₹2,000</div>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: goldColor,
              background: `${goldColor}22`,
              borderRadius: 99,
              padding: "2px 10px",
              display: "flex",
            }}>50% OFF</div>
            <div style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              display: "flex",
            }}>₹999</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
