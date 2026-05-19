import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import {
  deliveredOrders,
  getDeliveredOrderBySlug,
} from "@/data/delivered-orders";

export const alt = "Wedding Invitation · Shaadi Cards by AxonStack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return deliveredOrders.map((order) => ({ slug: order.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const order = getDeliveredOrderBySlug(slug);

  // Load local WOFF font — Satori (used by next/og) supports WOFF
  const fontData = readFileSync(
    join(
      process.cwd(),
      "node_modules/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff",
    ),
  );

  const couple = order?.title ?? "Wedding Invitation";
  const date = order?.primaryEvent.date ?? "";
  const venue = order?.primaryEvent.venue ?? "";
  const headline = order?.ceremonyHeadline ?? "Wedding Ceremony";

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
        color: "#faf8f3",
        position: "relative",
        padding: "80px",
        fontFamily: "Playfair, serif",
      }}
    >
      {/* Outer gold border */}
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

      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#d4af37",
          fontSize: 22,
          letterSpacing: 8,
          textTransform: "uppercase",
          marginBottom: 32,
        }}
      >
        <span>✦</span>
        <span>You Are Invited</span>
        <span>✦</span>
      </div>

      {/* Couple name */}
      <div
        style={{
          fontFamily: "Playfair, serif",
          fontSize: 96,
          fontWeight: 700,
          color: "#fffff0",
          textAlign: "center",
          lineHeight: 1.1,
          maxWidth: 1000,
        }}
      >
        {couple}
      </div>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          margin: "32px 0 24px",
        }}
      >
        <div
          style={{
            width: 80,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />
        <div style={{ color: "#d4af37", fontSize: 28 }}>◆</div>
        <div
          style={{
            width: 80,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />
      </div>

      {/* Ceremony headline */}
      <div
        style={{
          fontSize: 32,
          color: "#f4e4b8",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {headline}
      </div>

      {/* Date */}
      {date ? (
        <div
          style={{
            fontSize: 26,
            color: "rgba(255, 255, 240, 0.85)",
            textAlign: "center",
          }}
        >
          {date}
        </div>
      ) : null}

      {/* Venue */}
      {venue ? (
        <div
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 240, 0.65)",
            textAlign: "center",
            marginTop: 6,
          }}
        >
          {venue}
        </div>
      ) : null}

      {/* AxonStack branding */}
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
          fontSize: 18,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "rgba(212, 175, 55, 0.95)" }}>
          Shaadi Cards
        </span>
        <span style={{ color: "rgba(255, 255, 240, 0.4)" }}>·</span>
        <span style={{ color: "rgba(255, 255, 240, 0.8)" }}>
          by AxonStack
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
