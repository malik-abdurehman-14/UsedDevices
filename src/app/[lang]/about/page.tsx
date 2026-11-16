import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { aboutPage } from "@/content/pages/about";
import { getPhoto } from "@/content/photos";
import { PageHero } from "@/components/page/PageHero";
import { FeatureGrid, JsonLd, ProfileTable, Story } from "@/components/page/Sections";
import { Process } from "@/components/home/Process";
import { Quality } from "@/components/home/WhyQuality";
import { FinalCta } from "@/components/home/FaqCta";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/about", aboutPage[lang].meta);
}

/** About + Wholesale, merged into one page (the old /wholesale URL redirects here). */
export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = aboutPage[lang];
  const intent = lang === "en" ? "buy" : undefined;
  const wa = lang === "en" ? dict.whatsappMessage.buy : dict.whatsappMessage[dict.inquiry.defaultIntent];
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: lang === "en" ? "About us" : c.hero.eyebrow, href: `/${lang}/about` },
  ];
  const l = c.profile.labels;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        desc={c.hero.desc}
        primary={c.hero.primary}
        secondary={c.hero.secondary}
        whatsappMessage={wa}
        intent={intent}
        photos={[getPhoto("tp-x1jp"), getPhoto("iphone15")]}
        lang={lang}
      />
      <Story {...c.story} />
      <FeatureGrid {...c.why} tone="ivory" />
      <Process dict={c.process} />
      <Quality dict={c.lots} />
      <ProfileTable
        tone="light"
        eyebrow={c.profile.eyebrow}
        title={c.profile.title}
        rows={[
          { label: l.name, value: lang === "ja" ? `${site.nameJa}\n${site.name}` : site.name },
          { label: l.founded, value: site.company.founded[lang] },
          { label: l.representative, value: site.company.representative[lang] },
          { label: l.address, value: lang === "ja" ? site.address.ja : site.address.en },
          { label: l.business, value: c.profile.business },
          { label: l.license, value: site.kobutsuLicense },
          { label: l.contact, value: `${site.email}\n${site.phoneDisplay}\nWhatsApp ${site.whatsappDisplay}` },
          { label: l.hours, value: site.hours[lang] },
        ]}
      />
      <FinalCta dict={c.cta} whatsappMessage={wa} intent={intent} />
    </>
  );
}
