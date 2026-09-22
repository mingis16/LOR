import { ImageResponse } from "next/og";

export const alt = "LÖR — Luxury Restaurant, Lounge & Fitness on Goderich Road, Freetown";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 30%, #1a1a1a 0%, #0a0a0a 70%)",
          color: "#f5f5f0",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 700,
            letterSpacing: 12,
            color: "#f5f5f0",
          }}
        >
          L<span style={{ color: "#d4af37" }}>Ö</span>R
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d4af37",
          }}
        >
          Restaurant &middot; Lounge &middot; Fitness
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 22,
            color: "rgba(245,245,240,0.6)",
          }}
        >
          Goderich Road, Freetown, Sierra Leone
        </div>
      </div>
    ),
    { ...size }
  );
}
