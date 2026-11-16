import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localeMeta, locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { site, whatsappLink } from "@/config/site";
import { brandsIn } from "@/content/brands";
import { localizeHref } from "@/lib/links";
import { LogoMark, WhatsAppIcon } from "@/components/ui/Icons";
import { CookieSettings } from "./CookieSettings";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const year = 2026;
  const heading = "text-xs font-semibold uppercase tracking-[0.2em] text-gold";
  const list = "mt-5 space-y-3 text-[14.5px] text-ivory/70";
  const link = "transition hover:text-ivory";

  return (
    <footer className="grain relative overflow-hidden bg-ink text-ivory">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="container-luxe relative grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href={`/${lang}`} className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <span className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-[0.28em]">{site.shortName}</span>
              <span className="mt-1 text-[11px] tracking-[0.2em] text-mist">{lang === "ja" ? "日本の中古PC・スマホ" : "JAPAN · WORLDWIDE"}</span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist">{f.tagline}</p>
          <a
            href={whatsappLink(dict.whatsappMessage[dict.inquiry.defaultIntent])}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-gold/60 hover:text-gold-soft"
          >
            <WhatsAppIcon className="h-4 w-4" /> {site.whatsappDisplay}
          </a>
          <ul className="mt-8 space-y-3 text-[14px] text-ivory/70">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mist" />
              <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mist" />
              <span>{site.phoneDisplay}</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mist" />
              <address className="not-italic">{lang === "ja" ? site.address.ja : site.address.en}</address>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-mist" />
              <span>{site.hours[lang]}</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className={heading}>{f.explore}</h3>
          <ul className={list}>
            {dict.nav.items
              .filter((i) => i.href !== "#brands")
              .map((item) => (
                <li key={item.href}>
                  <Link href={localizeHref(lang, item.href)} className={link}>{item.label}</Link>
                </li>
              ))}
            {f.links.map((item) => (
              <li key={item.href}>
                <Link href={localizeHref(lang, item.href)} className={link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className={heading}>{dict.brands.laptops}</h3>
          <ul className={list}>
            {brandsIn("laptops").map((b) => (
              <li key={b.slug}>
                <Link href={`/${lang}/brands/${b.slug}`} className={link}>{b.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className={heading}>{dict.brands.phones}</h3>
          <ul className={list}>
            {brandsIn("smartphones").map((b) => (
              <li key={b.slug}>
                <Link href={`/${lang}/brands/${b.slug}`} className={link}>{b.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className={heading}>{f.language}</h3>
          <ul className={list}>
            {locales.map((l) => (
              <li key={l}>
                <Link href={`/${l}`} hrefLang={l} className={l === lang ? "text-ivory" : link}>
                  {localeMeta[l].label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-luxe flex flex-col gap-3 py-8 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {lang === "ja" ? site.nameJa : site.name}. {f.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={`/${lang}/privacy`} className="transition hover:text-ivory">
              {lang === "ja" ? "プライバシーポリシー" : "Privacy Policy"}
            </Link>
            <Link href={`/${lang}/credits`} className="transition hover:text-ivory">
              {lang === "ja" ? "写真クレジット" : "Photo credits"}
            </Link>
            <CookieSettings label={lang === "ja" ? "Cookie設定" : "Cookie settings"} />
            <span>
              {f.license}：{site.kobutsuLicense}
            </span>
          </div>
        </div>
        <p className="container-luxe pb-8 text-[11px] leading-relaxed text-stone">{f.seoLine}</p>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden whitespace-nowrap text-center font-display text-[13vw] leading-[0.85] text-white/[0.03]">
        {site.shortName}
      </div>
    </footer>
  );
}
