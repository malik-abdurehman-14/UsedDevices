import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Instrument_Serif, Manrope } from "next/font/google";
import "../globals.css";

import { site } from "@/config/site";
import { hasLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { InquiryProvider } from "@/components/layout/InquiryProvider";
import { brandsIn } from "@/content/brands";
import { Analytics } from "@/components/layout/Analytics";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0a0c10",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const brand = lang === "ja" ? site.nameJa : site.name;

  return {
    metadataBase: new URL(site.url),
    title: { default: `${dict.meta.title} | ${brand}`, template: `%s | ${brand}` },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    category: "business",
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ja: "/ja", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: brand,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeMeta[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeMeta[l].og),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: false },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${instrument.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {lang === "ja" ? "本文へスキップ" : "Skip to content"}
        </a>
        <SmoothScroll />
        <InquiryProvider lang={lang} dict={dict.inquiry} whatsappMessage={dict.whatsappMessage}>
          <Header
            lang={lang}
            nav={dict.nav}
            brandLabels={{ laptops: dict.brands.laptops, phones: dict.brands.phones }}
            laptopBrands={brandsIn("laptops").map(({ slug, name }) => ({ slug, name }))}
            phoneBrands={brandsIn("smartphones").map(({ slug, name }) => ({ slug, name }))}
            whatsappMessage={dict.whatsappMessage[dict.inquiry.defaultIntent]}
          />
          <main id="main">{children}</main>
          <Footer lang={lang} dict={dict} />
          <WhatsAppFloat label={dict.floatingWhatsapp} message={dict.whatsappMessage[dict.inquiry.defaultIntent]} />
        </InquiryProvider>
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} lang={lang} />
      </body>
    </html>
  );
}
