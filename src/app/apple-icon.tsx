import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none"><defs><linearGradient id="g" x1="2" y1="6" x2="38" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#F1E2BD"/><stop offset=".5" stop-color="#C8A464"/><stop offset="1" stop-color="#8E6C33"/></linearGradient></defs><rect x="4.75" y="8.75" width="23.5" height="16" rx="2.25" stroke="url(#g)" stroke-width="1.6"/><path d="M1.5 27.25h26.5" stroke="url(#g)" stroke-width="2.1" stroke-linecap="round"/><path d="M18.6 16.75a4.1 4.1 0 1 1-4.1-4.1c1.15 0 2.25.46 3.07 1.25l1.03 1.03M18.6 12.4v2.55h-2.55" stroke="url(#g)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><rect x="25" y="13" width="12.5" height="22" rx="2.8" fill="#0A0C10"/><rect x="26.25" y="14.25" width="10" height="19.5" rx="2" fill="url(#g)"/><rect x="27.6" y="16.4" width="7.3" height="14.6" rx=".9" fill="#0A0C10" opacity=".88"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0c10" }}>
        <img src={`data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`} width={128} height={128} alt="" />
      </div>
    ),
    size,
  );
}
