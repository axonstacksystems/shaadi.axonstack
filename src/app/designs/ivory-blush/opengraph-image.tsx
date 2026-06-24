import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(155deg, #FDF6EF 0%, #F5E8D8 50%, #EDD9C4 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        <div style={{
          position: "absolute", top: -120, left: -120,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, #ECC9C355 0%, transparent 70%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: -100, right: -80,
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, #CBA46A44 0%, transparent 70%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 180, height: 180, opacity: 0.18,
          background: "radial-gradient(ellipse at 20% 20%, #ECC9C3 0%, transparent 70%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 180, height: 180, opacity: 0.18,
          background: "radial-gradient(ellipse at 80% 80%, #ECC9C3 0%, transparent 70%)",
          display: "flex",
        }} />

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.55)",
          border: "1.5px solid rgba(255,255,255,0.85)",
          borderRadius: 32,
          padding: "56px 72px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.10)",
          gap: 0,
          minWidth: 560,
          maxWidth: 720,
        }}>
          <div style={{ fontSize: 28, color: "#CBA46A", letterSpacing: "0.08em", marginBottom: 12, opacity: 0.75, display: "flex" }}>﷽</div>
          <div style={{ width: 120, height: 1, background: "linear-gradient(to right, transparent, #CBA46A, transparent)", marginBottom: 24, display: "flex" }} />
          <div style={{ fontSize: 52, fontWeight: 700, color: "#3D2B1A", letterSpacing: "-0.01em", textAlign: "center", lineHeight: 1.15, display: "flex" }}>
            Nikah Invitation
          </div>
          <div style={{ fontSize: 22, color: "#CBA46A", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 14, marginBottom: 20, display: "flex" }}>
            Ivory Blush Collection
          </div>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, #CBA46A, transparent)", marginBottom: 22, display: "flex" }} />
          <div style={{ fontSize: 17, color: "#3D2B1A", opacity: 0.55, letterSpacing: "0.04em", textAlign: "center", display: "flex" }}>
            Luxury Islamic Wedding Invitation · Shaadi Cards
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 28, background: "#3D2B1A", borderRadius: 999, padding: "8px 22px" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "line-through", display: "flex" }}>₹2,000</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#CBA46A", background: "#CBA46A22", borderRadius: 99, padding: "2px 10px", display: "flex" }}>50% OFF</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", display: "flex" }}>₹999</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
