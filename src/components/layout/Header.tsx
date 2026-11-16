"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Globe, Menu, X, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localeMeta, locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { site, whatsappLink } from "@/config/site";
import { localizeHref } from "@/lib/links";
import { LogoMark, WhatsAppIcon } from "@/components/ui/Icons";
import { useInquiry } from "./InquiryProvider";
import { lockScroll } from "@/lib/lenis";
import megaPhoto from "@/assets/devices/iphone-series.webp";

type BrandLink = { slug: string; name: string };
type Props = {
  lang: Locale;
  nav: Dictionary["nav"];
  brandLabels: { laptops: string; phones: string };
  laptopBrands: BrandLink[];
  phoneBrands: BrandLink[];
  whatsappMessage: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Header({ lang, nav, brandLabels, laptopBrands, phoneBrands, whatsappMessage }: Props) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { open } = useInquiry();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 640 && y > prev && !menuOpen && !megaOpen);
  });

  useEffect(() => {
    lockScroll(menuOpen);
  }, [menuOpen]);

  // Close menus on navigation (state adjustment during render, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setMegaOpen(false);
  }

  const isActive = (href: string) => {
    const full = localizeHref(lang, href);
    return pathname === full || pathname.startsWith(`${full}/`);
  };
  const brandsActive = pathname.includes("/brands/");
  // Japanese labels are wider, so the full desktop nav starts at xl (1280px) instead of lg (1024px).
  const ja = lang === "ja";
  const bp = {
    show: ja ? "xl:flex" : "lg:flex",
    hide: ja ? "xl:hidden" : "lg:hidden",
    block: ja ? "xl:block" : "lg:block",
  };

  const showMega = (v: boolean) => {
    clearTimeout(megaTimer.current);
    if (v) setMegaOpen(true);
    else megaTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`container-luxe relative flex h-16 items-center justify-between max-[359px]:px-3.5 rounded-2xl border transition-all duration-500 ${
            scrolled || megaOpen ? "border-white/10 bg-ink/90 shadow-xl shadow-black/25 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <Link href={`/${lang}`} className="group flex items-center gap-2.5 text-ivory sm:gap-3">
            <LogoMark className="h-8 w-8 shrink-0 transition-transform sm:h-9 sm:w-9 duration-700 group-hover:scale-110" />
            <span className="flex flex-col leading-none">
              <span className="whitespace-nowrap text-[13px] font-semibold tracking-[0.18em] sm:text-[15px] sm:tracking-[0.28em]">{site.shortName}</span>
              <span className="mt-1 whitespace-nowrap text-[9.5px] tracking-[0.16em] text-ivory/65 sm:text-[10px] sm:tracking-[0.2em]">{lang === "ja" ? "日本の中古PC・スマホ" : "JAPAN · WORLDWIDE"}</span>
            </span>
          </Link>

          <nav className={`hidden items-center gap-0.5 whitespace-nowrap ${bp.show}`} aria-label="Primary">
            {nav.items.map((item) =>
              item.href === "#brands" ? (
                <div key={item.href} onPointerEnter={() => showMega(true)} onPointerLeave={() => showMega(false)}>
                  <button
                    onClick={() => setMegaOpen((v) => !v)}
                    aria-expanded={megaOpen}
                    className={`group relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
                      brandsActive || megaOpen ? "text-ivory" : "text-ivory/70 hover:text-ivory"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={localizeHref(lang, item.href)}
                  className={`group relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
                    isActive(item.href) ? "text-ivory" : "text-ivory/70 hover:text-ivory"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher lang={lang} />
            <a
              href={whatsappLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory transition hover:border-gold/60 hover:text-gold md:flex"
              aria-label={nav.whatsapp}
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </a>
            <button
              onClick={() => open()}
              className="hidden rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-gold-soft sm:inline-flex"
            >
              {nav.cta}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory ${bp.hide}`}
              aria-label={nav.menu}
              aria-expanded={menuOpen}
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>

          {/* Desktop mega menu */}
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                onPointerEnter={() => showMega(true)}
                onPointerLeave={() => showMega(false)}
                className={`absolute inset-x-0 top-[calc(100%+8px)] hidden overflow-hidden rounded-2xl border border-white/10 bg-ink-2 p-8 text-ivory shadow-2xl shadow-black/40 backdrop-blur-xl ${bp.block}`}
              >
                <div className="grid grid-cols-[1fr_1fr_0.8fr] gap-10">
                  {[
                    { label: brandLabels.laptops, items: laptopBrands, href: "/laptops" },
                    { label: brandLabels.phones, items: phoneBrands, href: "/smartphones" },
                  ].map((col) => (
                    <div key={col.label}>
                      <Link href={localizeHref(lang, col.href)} className="text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-gold-soft">
                        {col.label}
                      </Link>
                      <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
                        {col.items.map((b, i) => (
                          <motion.li
                            key={b.slug}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.03 * i, duration: 0.35 }}
                          >
                            <Link
                              href={`/${lang}/brands/${b.slug}`}
                              className="group flex items-center justify-between rounded-lg py-2 text-[14px] text-ivory/75 transition hover:text-ivory"
                            >
                              {b.name}
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="grain group relative isolate flex min-h-[260px] flex-col justify-between overflow-hidden rounded-xl p-6">
                    <Image
                      src={megaPhoto}
                      alt=""
                      fill
                      sizes="340px"
                      className="-z-10 object-cover opacity-70 transition-transform duration-[1500ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
                    <p className="font-display text-2xl leading-tight">{nav.brandsViewAll}</p>
                    <button
                      onClick={() => {
                        setMegaOpen(false);
                        open();
                      }}
                      className="mt-6 self-start rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-gold-soft"
                    >
                      {nav.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`fixed inset-0 z-[60] flex flex-col bg-ink text-ivory ${bp.hide}`}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="container-luxe flex h-[88px] shrink-0 items-center justify-between">
              <span className="whitespace-nowrap text-[13px] font-semibold tracking-[0.18em] sm:text-[15px] sm:tracking-[0.28em]">{site.shortName}</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
                aria-label={nav.close}
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>
            <nav className="container-luxe flex-1 overflow-y-auto" data-lenis-prevent>
              {nav.items
                .filter((i) => i.href !== "#brands")
                .map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease }}
                  >
                    <Link
                      href={localizeHref(lang, item.href)}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-[2rem] ${isActive(item.href) ? "text-gold-soft" : ""}`}
                    >
                      <span className="font-sans text-xs text-gold">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="py-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{nav.brandsLabel}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[...laptopBrands, ...phoneBrands].map((b) => (
                    <Link
                      key={b.slug}
                      href={`/${lang}/brands/${b.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] text-ivory/80"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </nav>
            <div className="container-luxe grid shrink-0 grid-cols-2 gap-3 py-6">
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-4 text-sm font-semibold"
              >
                <WhatsAppIcon className="h-4 w-4" /> {nav.whatsapp}
              </a>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  open();
                }}
                className="rounded-full bg-gold py-4 text-sm font-semibold text-ink"
              >
                {nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  // Articles are written per language, so switching language from an article goes to that language's article list.
  const rest = pathname.replace(/^\/(en|ja)(?=\/|$)/, "").replace(/^\/insights\/.+$/, "/insights");

  return (
    <div className="flex shrink-0 items-center whitespace-nowrap rounded-full border border-white/15 p-1 text-[12px] font-semibold">
      <Globe className="mx-1.5 hidden h-3.5 w-3.5 text-mist sm:block" aria-hidden />
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`relative rounded-full px-2 py-1.5 transition min-[360px]:px-2.5 ${l === lang ? "text-ink" : "text-ivory/70 hover:text-ivory"}`}
        >
          {l === lang && (
            <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-ivory" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
          )}
          <span className="relative">{localeMeta[l].short}</span>
          <span className="sr-only"> {localeMeta[l].label}</span>
        </Link>
      ))}
    </div>
  );
}
