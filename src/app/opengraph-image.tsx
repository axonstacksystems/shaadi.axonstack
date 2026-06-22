import { ImageResponse } from "next/og";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const alt =
  "Shaadi Cards — Digital Wedding Invitations by axonstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const fontData = readFileSync(
    join(
      process.cwd(),
      "node_modules/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff",
    ),
  );

  const logoPath = join(process.cwd(), "public", "logo.png");
  const logoData = existsSync(logoPath)
    ? `data:image/png;base64,${readFileSync(logoPath).toString("base64")}`
    : null;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a3d30 0%, #0f5e4a 50%, #1a8b6a 100%)",
        position: "relative",
        fontFamily: "Playfair, serif",
      }}
    >
      {/* Outer border */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          right: 40,
          bottom: 40,
          border: "2px solid rgba(212, 175, 55, 0.5)",
          borderRadius: 12,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 56,
          right: 56,
          bottom: 56,
          border: "1px solid rgba(212, 175, 55, 0.25)",
          borderRadius: 8,
        }}
      />

      {/* Logo or fallback title */}
      {logoData ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoData}
          alt="Shaadi Cards by axonstack"
          style={{ width: 240, height: 240, objectFit: "contain", marginBottom: 24 }}
        />
      ) : (
        <>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#d4af37",
              fontSize: 20,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 40,
            }}
          >
            <span>✦</span>
            <span>Digital Wedding Invitations</span>
            <span>✦</span>
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: "#fffff0",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Shaadi Cards
          </div>
        </>
      )}

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          margin: "36px 0 28px",
        }}
      >
        <div
          style={{
            width: 120,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />
        <div style={{ color: "#d4af37", fontSize: 28 }}>◆</div>
        <div
          style={{
            width: 120,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 28,
          color: "rgba(244, 228, 184, 0.9)",
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        Cinematic · Elegant · Mobile-First
      </div>

      {/* Branding */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: 20,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "rgba(212, 175, 55, 0.95)" }}>
          Shaadi Cards
        </span>
        <span style={{ color: "rgba(255, 255, 240, 0.4)" }}>·</span>
        <span style={{ color: "rgba(255, 255, 240, 0.85)" }}>
          by axonstack
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Playfair",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
