export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeMeta: Record<Locale, { label: string; short: string; og: string }> = {
  en: { label: "English", short: "EN", og: "en_US" },
  ja: { label: "日本語", short: "JP", og: "ja_JP" },
};
