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
              fontSize: 22,
              color: goldColor,
              letterSpacing: "0.08em",
              marginBottom: 12,
              opacity: 0.75,
              display: "flex",
              fontStyle: "italic",
            }}
          >
            Bismillah ir-Rahman ir-Rahim
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
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(160deg, ${bgColor1} 0%, ${bgColor2} 50%, ${bgColor3} 100%)`,
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${petalColor}35 0%, transparent 65%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${goldColor}25 0%, transparent 65%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 300,
            height: 300,
            opacity: 0.1,
            background: `radial-gradient(ellipse at 80% 20%, ${petalColor} 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 300,
            height: 300,
            opacity: 0.1,
            background: `radial-gradient(ellipse at 20% 80%, ${petalColor} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Inner border frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: `1px solid ${goldColor}30`,
            borderRadius: 16,
            display: "flex",
          }}
        />

        {/* Glass card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.55)",
            border: `1.5px solid rgba(255,255,255,0.8)`,
            borderRadius: 28,
            padding: "48px 80px",
            boxShadow: `0 16px 48px rgba(0,0,0,0.06)`,
            gap: 0,
            maxWidth: 820,
          }}
        >
          {/* Bismillah */}
          <div
            style={{
              fontSize: 22,
              color: goldColor,
              letterSpacing: "0.08em",
              opacity: 0.65,
              display: "flex",
              marginBottom: 6,
              fontStyle: "italic",
            }}
          >
            Bismillah ir-Rahman ir-Rahim
          </div>

          {/* Gold hairline separator */}
          <div
            style={{
              width: 90,
              height: 1,
              background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
              display: "flex",
              marginBottom: 24,
            }}
          />

          {/* Groom name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: textDark,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {order.groomShort ?? order.groom}
          </div>

          {/* Ampersand */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 200,
              fontStyle: "italic",
              color: petalColor,
              letterSpacing: "0.18em",
              margin: "6px 0",
              display: "flex",
            }}
          >
            &amp;
          </div>

          {/* Bride name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: textDark,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              display: "flex",
              marginBottom: 24,
            }}
          >
            {order.brideShort ?? order.bride}
          </div>

          {/* Ornament — double diamond with center dot */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 14,
            }}
          >
            <div style={{ width: 50, height: 1, background: `linear-gradient(to right, transparent, ${goldColor})`, display: "flex" }} />
            <div style={{ width: 6, height: 6, background: goldColor, transform: "rotate(45deg)", display: "flex" }} />
            <div style={{ width: 4, height: 4, background: goldColor, borderRadius: "50%", display: "flex" }} />
            <div style={{ width: 6, height: 6, background: goldColor, transform: "rotate(45deg)", display: "flex" }} />
            <div style={{ width: 50, height: 1, background: `linear-gradient(to left, transparent, ${goldColor})`, display: "flex" }} />
          </div>

          {/* Invitation copy */}
          <div
            style={{
              fontSize: 17,
              color: textDark,
              opacity: 0.75,
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.65,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>Together with their families,</div>
            <div style={{ display: "flex" }}>request the honor of your presence</div>
            <div style={{ display: "flex" }}>
              at their{" "}
              <span style={{ fontStyle: "normal", fontWeight: 600, color: textDark, opacity: 1 }}>
                {order.ceremonyHeadline}
              </span>
            </div>
          </div>

          {/* Date */}
          <div
            style={{
              fontSize: 15,
              color: goldColor,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginTop: 14,
              display: "flex",
            }}
          >
            {order.primaryEvent.date}
          </div>

          {/* Venue */}
          {order.primaryEvent.venue ? (
            <div
              style={{
                fontSize: 15,
                color: textDark,
                opacity: 0.55,
                textAlign: "center",
                marginTop: 6,
                display: "flex",
              }}
            >
              {order.primaryEvent.venue}
            </div>
          ) : null}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            fontSize: 11,
            color: textDark,
            opacity: 0.25,
            letterSpacing: "0.1em",
          }}
        >
          Shaadi Cards · by axonstack
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
