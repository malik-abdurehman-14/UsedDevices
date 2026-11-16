/**
 * Central business configuration.
 * ⚠️ Replace every placeholder below with your client's real details before launch.
 */
export const site = {
  name: "Used Devices",
  nameJa: "ユーズドデバイス",
  shortName: "USED DEVICES",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",

  /** WhatsApp number in international format, digits only (no +, spaces or dashes). */
  whatsapp: "819000000000",
  whatsappDisplay: "+81 90-0000-0000",
  email: "info@example.com",
  phoneDisplay: "+81 3-0000-0000",

  address: {
    en: "1-1-1 Chiyoda, Chiyoda-ku, Tokyo 100-0001, Japan",
    ja: "〒100-0001 東京都千代田区千代田1-1-1",
    locality: "Tokyo",
    region: "Tokyo",
    postalCode: "100-0001",
    country: "JP",
  },

  /** Japanese secondhand dealer licence (古物商許可) — legally required to display. */
  kobutsuLicense: "東京都公安委員会 許可 第000000000000号",

  /** Company profile (会社概要) — shown on the About page. */
  company: {
    founded: { en: "20XX", ja: "20XX年" },
    representative: { en: "Representative Director — (name)", ja: "代表取締役 ○○ ○○" },
    capital: { en: "—", ja: "—" },
  },

  hours: { en: "Mon – Sat · 9:00 – 19:00 JST", ja: "月〜土 9:00〜19:00" },

  socials: {
    instagram: "",
    facebook: "",
    linkedin: "",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
