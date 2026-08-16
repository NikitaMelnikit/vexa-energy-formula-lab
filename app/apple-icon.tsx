import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
        }}
      >
        <svg width="148" height="148" viewBox="0 0 64 64" aria-label="VEXA Angular X">
          <defs>
            <linearGradient id="apple-metal" x1="14" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffbd37" />
              <stop offset="0.48" stopColor="#f4f1e9" />
              <stop offset="1" stopColor="#b9ff52" />
            </linearGradient>
            <linearGradient id="apple-edge" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffbd37" stopOpacity="0.82" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="1" stopColor="#b9ff52" stopOpacity="0.78" />
            </linearGradient>
            <radialGradient id="apple-glow" cx="0" cy="0" r="1" gradientTransform="translate(32 32) rotate(90) scale(26)">
              <stop stopColor="#ffbd37" stopOpacity="0.2" />
              <stop offset="0.55" stopColor="#b9ff52" stopOpacity="0.08" />
              <stop offset="1" stopColor="#050505" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="1" y="1" width="62" height="62" rx="14" fill="#050505" />
          <rect x="4" y="4" width="56" height="56" rx="11" fill="url(#apple-glow)" />
          <rect x="1.75" y="1.75" width="60.5" height="60.5" rx="13.25" fill="none" stroke="url(#apple-edge)" strokeWidth="1.5" />
          <path d="M14 13h10.2L32 24.8 39.8 13H50L37.2 31.8 50.8 51H40.4L32 38.6 23.6 51H13.2l13.6-19.2L14 13Z" fill="url(#apple-metal)" />
          <path d="M14 13h10.2L32 24.8 39.8 13H50L37.2 31.8 50.8 51H40.4L32 38.6 23.6 51H13.2l13.6-19.2L14 13Z" fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="0.75" strokeLinejoin="round" />
          <path d="M20 14.5 32 32 44 14.5" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
