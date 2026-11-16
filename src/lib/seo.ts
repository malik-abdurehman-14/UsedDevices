import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

/** Structured data (schema.org) for rich results in Google. */
export function buildJsonLd(locale: Locale, dict: Dictionary) {
  const url = absoluteUrl(`/${locale}`);
  const orgId = absoluteUrl("/#organization");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": orgId,
        name: site.name,
        alternateName: site.nameJa,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon.svg"),
        email: site.email,
        telephone: site.phoneDisplay,
        description: dict.meta.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: locale === "ja" ? site.address.ja : site.address.en,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        areaServed: locale === "ja" ? "JP" : "Worldwide",
        knowsLanguage: ["en", "ja"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: locale === "ja" ? "customer service" : "sales",
            telephone: site.whatsappDisplay,
            availableLanguage: ["English", "Japanese"],
          },
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: dict.devices.laptops.title },
            businessFunction:
              locale === "ja"
                ? "http://purl.org/goodrelations/v1#Buy"
                : "http://purl.org/goodrelations/v1#Sell",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: dict.devices.phones.title },
            businessFunction:
              locale === "ja"
                ? "http://purl.org/goodrelations/v1#Buy"
                : "http://purl.org/goodrelations/v1#Sell",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl(`/${locale}#website`),
        url,
        name: locale === "ja" ? site.nameJa : site.name,
        inLanguage: locale,
        publisher: { "@id": orgId },
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl(`/${locale}#faq`),
        inLanguage: locale,
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

type PageMetaInput = { title: string; description: string; keywords?: string[] };

/** Per-page metadata with canonical + hreflang alternates. `path` is locale-less, e.g. "/laptops". */
export function pageMetadata(lang: Locale, path: string, meta: PageMetaInput) {
  const url = `/${lang}${path}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: { en: `/en${path}`, ja: `/ja${path}`, "x-default": `/en${path}` },
    },
    openGraph: { title: meta.title, description: meta.description, url },
    twitter: { title: meta.title, description: meta.description },
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
