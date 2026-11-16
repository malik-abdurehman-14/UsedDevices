import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { insightsCopy, posts } from "@/content/insights";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/Sections";
import { PostCards } from "@/components/insights/Article";
import { FinalCta } from "@/components/home/FaqCta";

export async function generateMetadata({ params }: PageProps<"/[lang]/insights">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = insightsCopy[lang];
  return pageMetadata(lang, "/insights", { title: c.metaTitle, description: c.metaDesc });
}

export default async function InsightsPage({ params }: PageProps<"/[lang]/insights">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = insightsCopy[lang];
  const wa = dict.whatsappMessage[dict.inquiry.defaultIntent];
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: c.eyebrow, href: `/${lang}/insights` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero breadcrumbs={crumbs} eyebrow={c.eyebrow} title={c.title} desc={c.desc} whatsappMessage={wa} />
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-luxe">
          <PostCards posts={posts[lang]} lang={lang} readLabel={c.read} minutes={c.minutes} />
        </div>
      </section>
      <FinalCta
        dict={{ eyebrow: dict.cta.eyebrow, title: c.ctaTitle, desc: c.ctaDesc, primary: dict.cta.primary, secondary: dict.cta.secondary }}
        whatsappMessage={wa}
      />
    </>
  );
}
