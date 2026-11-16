import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { privacyPage } from "@/content/pages/privacy";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/Sections";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/privacy", privacyPage[lang].meta);
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = privacyPage[lang];
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: c.title, href: `/${lang}/privacy` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero breadcrumbs={crumbs} eyebrow={c.eyebrow} title={c.title} desc={c.updated} whatsappMessage={dict.whatsappMessage[dict.inquiry.defaultIntent]} />
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-luxe max-w-3xl text-[16.5px] leading-[1.9] text-ink/80">
          <p className="mb-12 text-[18px] text-ink">{c.intro}</p>
          {c.sections.map((s) => (
            <div key={s.h} className="mb-12">
              <h2 className="font-display mb-4 text-3xl text-ink">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p.slice(0, 30)} className="mb-4">{p}</p>
              ))}
            </div>
          ))}
          <div className="rounded-2xl border border-ink/10 bg-ivory p-6 text-[15px]">
            <p className="font-semibold text-ink">{lang === "ja" ? site.nameJa : site.name}</p>
            <p>{lang === "ja" ? site.address.ja : site.address.en}</p>
            <p>{site.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}
