import { ImageResponse } from "next/og";
import type { DesignEntry, DesignTheme } from "@/data/design-registry";
import type { DeliveredOrder } from "@/data/delivered-orders";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function generateOGImage(
  design: DesignEntry,
  theme: DesignTheme,
): ImageResponse {
  const goldColor = theme.palette[2] ?? "#CBA46A";
  const textDark = theme.palette[3] ?? "#3D2B1A";
  const petalColor = theme.palette[1] ?? "#ECC9C3";
  const bgColor1 = theme.palette[0] ?? "#FDF6EF";
  const bgColor2 = theme.palette[1] ?? "#F5E8D8";
  const bgColor3 = theme.palette[2] ?? "#EDD9C4";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(155deg, ${bgColor1} 0%, ${bgColor2} 50%, ${bgColor3} 100%)`,
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${petalColor}55 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${goldColor}44 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 180,
            height: 180,
            opacity: 0.18,
            background: `radial-gradient(ellipse at 20% 20%, ${petalColor} 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 180,
            height: 180,
            opacity: 0.18,
            background: `radial-gradient(ellipse at 80% 80%, ${petalColor} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            border: `1.5px solid rgba(255,255,255,0.85)`,
            borderRadius: 32,
            padding: "56px 72px",
            boxShadow: `0 24px 80px rgba(0,0,0,0.10), 0 0 0 1px ${goldColor}22`,
            gap: 0,
            minWidth: 560,
            maxWidth: 720,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: goldColor,
              letterSpacing: "0.08em",
              marginBottom: 12,
              opacity: 0.75,
              display: "flex",
            }}
          >
            ﷽
          </div>
          <div
            style={{
              width: 120,
              height: 1,
              background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
              marginBottom: 24,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: textDark,
              letterSpacing: "-0.01em",
              textAlign: "center",
              lineHeight: 1.15,
              display: "flex",
            }}
          >
            Nikah Invitation
          </div>
          <div
            style={{
              fontSize: 22,
              color: goldColor,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginTop: 14,
              marginBottom: 20,
              display: "flex",
            }}
          >
            {design.name} · {theme.label}
          </div>
          <div
            style={{
              width: 80,
              height: 1,
              background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
              marginBottom: 22,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 17,
              color: textDark,
              opacity: 0.55,
              letterSpacing: "0.04em",
              textAlign: "center",
              display: "flex",
            }}
          >
            Luxury Islamic Wedding Invitation · Shaadi Cards
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 28,
              background: textDark,
              borderRadius: 999,
              padding: "8px 22px",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "line-through",
                display: "flex",
              }}
            >
              ₹2,000
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: goldColor,
                background: `${goldColor}22`,
                borderRadius: 99,
                padding: "2px 10px",
                display: "flex",
              }}
            >
              50% OFF
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                display: "flex",
              }}
            >
              ₹999
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

export function generateOrderOGImage(
  design: DesignEntry,
  theme: DesignTheme,
  order: DeliveredOrder,
): ImageResponse {
  const goldColor = theme.palette[2] ?? "#CBA46A";
  const textDark = theme.palette[3] ?? "#3D2B1A";
  const petalColor = theme.palette[1] ?? "#ECC9C3";
  const bgColor1 = theme.palette[0] ?? "#FDF6EF";
  const bgColor2 = theme.palette[1] ?? "#F5E8D8";
  const bgColor3 = theme.palette[2] ?? "#EDD9C4";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(160deg, ${bgColor1} 0%, ${bgColor2} 45%, ${bgColor3} 100%)`,
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
          gap: 0,
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -180,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${petalColor}40 0%, transparent 65%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${goldColor}30 0%, transparent 65%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 250,
            height: 250,
            opacity: 0.12,
            background: `radial-gradient(ellipse at 80% 20%, ${petalColor} 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 250,
            height: 250,
            opacity: 0.12,
            background: `radial-gradient(ellipse at 20% 80%, ${petalColor} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Bismillah */}
        <div
          style={{
            fontSize: 32,
            color: goldColor,
            letterSpacing: "0.06em",
            opacity: 0.7,
            display: "flex",
            marginBottom: 8,
          }}
        >
          ﷽
        </div>

        {/* Gold hairline separator */}
        <div
          style={{
            width: 100,
            height: 1,
            background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
            display: "flex",
            marginBottom: 28,
          }}
        />

        {/* Groom name */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 600,
            color: textDark,
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {order.groom}
        </div>

        {/* Ampersand */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 200,
            fontStyle: "italic",
            color: petalColor,
            letterSpacing: "0.18em",
            margin: "8px 0",
            display: "flex",
          }}
        >
          &amp;
        </div>

        {/* Bride name */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 600,
            color: textDark,
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          {order.bride}
        </div>

        {/* Ornament placeholder — gold diamond */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <div style={{ width: 40, height: 1, background: `linear-gradient(to right, transparent, ${goldColor})`, display: "flex" }} />
          <div style={{ width: 8, height: 8, background: goldColor, transform: "rotate(45deg)", display: "flex" }} />
          <div style={{ width: 40, height: 1, background: `linear-gradient(to left, transparent, ${goldColor})`, display: "flex" }} />
        </div>

        {/* Invitation copy */}
        <div
          style={{
            fontSize: 18,
            color: textDark,
            opacity: 0.65,
            fontStyle: "italic",
            textAlign: "center",
            lineHeight: 1.6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>Together with their families,</div>
          <div>request the honor of your presence</div>
          <div>
            at their{" "}
            <span style={{ fontStyle: "normal", fontWeight: 600, color: textDark }}>
              {order.ceremonyHeadline}
            </span>
          </div>
        </div>

        {/* Date */}
        <div
          style={{
            fontSize: 14,
            color: goldColor,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginTop: 18,
            display: "flex",
          }}
        >
          {order.primaryEvent.date}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            fontSize: 12,
            color: textDark,
            opacity: 0.3,
            letterSpacing: "0.08em",
          }}
        >
          Shaadi Cards · by axonstack
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
