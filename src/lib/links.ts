import type { Locale } from "@/i18n/config";

/**
 * Turn a dictionary href into a real URL for the current locale.
 *  "/laptops" → "/en/laptops", "/" → "/en", "/#faq" → "/en#faq", "/ja/sell" stays as-is.
 */
export function localizeHref(lang: Locale, href: string) {
  if (/^\/(en|ja)(\/|#|$)/.test(href)) return href;
  if (href.startsWith("/#")) return `/${lang}${href.slice(1)}`;
  if (href === "/") return `/${lang}`;
  if (href.startsWith("/")) return `/${lang}${href}`;
  return href;
}
