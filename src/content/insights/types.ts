import type { Locale } from "@/i18n/config";

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "note"; title: string; text: string };

export type Post = {
  slug: string;
  lang: Locale;
  category: string;
  title: string;
  description: string;
  keywords: string[];
  /** ISO date, e.g. "2026-11-14" */
  date: string;
  readMinutes: number;
  /** Which business side the article serves — controls the CTA */
  intent: "buy" | "sell";
  body: Block[];
};
