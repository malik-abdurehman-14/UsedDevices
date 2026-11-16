import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/config/site";

export const alt = `${site.name} — used laptops & smartphones from Japan`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none"><defs><linearGradient id="g" x1="2" y1="6" x2="38" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#F1E2BD"/><stop offset=".5" stop-color="#C8A464"/><stop offset="1" stop-color="#8E6C33"/></linearGradient></defs><rect x="4.75" y="8.75" width="23.5" height="16" rx="2.25" stroke="url(#g)" stroke-width="1.5"/><path d="M1.5 27.25h26.5" stroke="url(#g)" stroke-width="2" stroke-linecap="round"/><path d="M18.6 16.75a4.1 4.1 0 1 1-4.1-4.1c1.15 0 2.25.46 3.07 1.25l1.03 1.03M18.6 12.4v2.55h-2.55" stroke="url(#g)" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/><rect x="25" y="13" width="12.5" height="22" rx="2.8" fill="#0A0C10"/><rect x="26.25" y="14.25" width="10" height="19.5" rx="2" fill="url(#g)"/><rect x="27.6" y="16.4" width="7.3" height="14.6" rx=".9" fill="#0A0C10" opacity=".88"/></svg>`;

// NOTE: the Japanese font is a subset containing only the characters below.
// If you change the Japanese text, re-download the subset (see README → Social share images).
const copy = {
  en: {
    eyebrow: "WHOLESALE EXPORT · JAPAN",
    title: ["Japan’s finest used tech,", "shipped in bulk."],
    sub: "Used laptops & smartphones · Graded A / B / C",
  },
  ja: {
    eyebrow: "中古ノートパソコン・スマートフォン買取",
    title: ["眠っている端末を、", "次の価値へ。"],
    sub: "査定無料・法人まとめ売り歓迎",
  },
} as const;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = lang === "ja" ? copy.ja : copy.en;
  const dir = join(process.cwd(), "assets/fonts");
  const [serif, sans, jp] = await Promise.all([
    readFile(join(dir, "InstrumentSerif-Regular.woff")),
    readFile(join(dir, "Manrope-Medium.woff")),
    readFile(join(dir, "NotoSerifJP-subset.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 10%, rgba(200,164,100,0.45), transparent 45%), #0a0c10",
          color: "#f5f1e9",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={`data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`} width={60} height={60} alt="" />
          <div style={{ fontSize: 28, letterSpacing: 8 }}>{site.shortName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: lang === "ja" ? 4 : 6, color: "#c8a464", fontFamily: lang === "ja" ? "NotoSerifJP" : "Manrope" }}>
            {t.eyebrow}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: lang === "ja" ? 76 : 92,
              lineHeight: 1.08,
              fontFamily: lang === "ja" ? "NotoSerifJP" : "Instrument Serif",
              maxWidth: 1040,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {t.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#8b909a" }}>
          <div style={{ fontFamily: lang === "ja" ? "NotoSerifJP" : "Manrope" }}>{t.sub}</div>
          <div style={{ display: "flex", height: 2, width: 220, background: "linear-gradient(90deg, transparent, #c8a464)" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
        { name: "Manrope", data: sans, weight: 500, style: "normal" },
        { name: "NotoSerifJP", data: jp, weight: 500, style: "normal" },
      ],
    },
  );
}
