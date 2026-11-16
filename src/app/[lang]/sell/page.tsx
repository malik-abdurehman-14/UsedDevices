import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { sellPage } from "@/content/pages/sell";
import { PageHero } from "@/components/page/PageHero";
import { CategoryCards, FeatureGrid, JsonLd, SplitPanel } from "@/components/page/Sections";
import { Quality } from "@/components/home/WhyQuality";
import { Process } from "@/components/home/Process";
import { Faq, FinalCta } from "@/components/home/FaqCta";

export async function generateMetadata({ params }: PageProps<"/[lang]/sell">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/sell", sellPage[lang].meta);
}

export default async function SellPage({ params }: PageProps<"/[lang]/sell">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = sellPage[lang];
  const wa = dict.whatsappMessage.sell;
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: c.hero.eyebrow.split(" · ")[0], href: `/${lang}/sell` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(c.faq.items)]} />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        desc={c.hero.desc}
        primary={c.hero.primary}
        secondary={c.hero.secondary}
        whatsappMessage={wa}
        intent="sell"
        art="both"
      />
      <CategoryCards
        eyebrow={c.whatWeBuy.eyebrow}
        title={c.whatWeBuy.title}
        cards={[
          { ...c.whatWeBuy.laptops, href: `/${lang}/laptops`, art: "laptop" },
          { ...c.whatWeBuy.phones, href: `/${lang}/smartphones`, art: "phone" },
        ]}
      />
      <FeatureGrid {...c.features} tone="ivory" />
      <Process dict={c.process} />
      <SplitPanel id="corporate" {...c.corporate} />
      <Quality dict={c.pricing} />
      <Faq dict={c.faq} whatsappMessage={wa} />
      <FinalCta dict={c.cta} whatsappMessage={wa} intent="sell" />
    </>
  );
}
