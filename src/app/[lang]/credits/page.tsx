import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { photos } from "@/content/photos";
import { PageHero } from "@/components/page/PageHero";
import { DevicePhoto } from "@/components/ui/DevicePhoto";

const copy = {
  en: {
    title: "Photo credits",
    eyebrow: "Image attribution",
    desc: "Device photography on this site comes from Wikimedia Commons and is used under the free licences listed below. Photos show example models, not specific stock.",
    by: "Photo",
    licence: "Licence",
    source: "Source",
    meta: {
      title: "Photo credits",
      description: "Attribution for device photographs used on this website, with authors and licences.",
      keywords: [],
    },
  },
  ja: {
    title: "写真クレジット",
    eyebrow: "画像の出典",
    desc: "当サイトの製品写真は Wikimedia Commons より、以下のフリーライセンスに基づき使用しています。写真は機種のイメージであり、実際の在庫ではありません。",
    by: "撮影",
    licence: "ライセンス",
    source: "出典",
    meta: {
      title: "写真クレジット",
      description: "当サイトで使用している製品写真の撮影者・ライセンス情報です。",
      keywords: [],
    },
  },
} as const;

export async function generateMetadata({ params }: PageProps<"/[lang]/credits">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = copy[lang];
  return { ...pageMetadata(lang, "/credits", { ...c.meta, keywords: [...c.meta.keywords] }), robots: { index: false, follow: true } };
}

export default async function CreditsPage({ params }: PageProps<"/[lang]/credits">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = copy[lang];
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: c.title, href: `/${lang}/credits` },
  ];

  return (
    <>
      <PageHero breadcrumbs={crumbs} eyebrow={c.eyebrow} title={c.title} desc={c.desc} whatsappMessage={dict.whatsappMessage[dict.inquiry.defaultIntent]} />
      <section className="bg-paper py-16 sm:py-24">
        <ul className="container-luxe grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(photos).map(([key, p]) => (
            <li key={key} className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-3">
              <DevicePhoto photo={p} lang={lang} sizes="96px" hoverZoom={false} className="aspect-square w-24 shrink-0 rounded-xl" />
              <div className="min-w-0 py-1 text-[13.5px] leading-relaxed text-stone">
                <p className="font-semibold text-ink">{p.alt[lang]}</p>
                <p>
                  {c.by}: {p.credit.author}
                </p>
                <p>
                  {c.licence}:{" "}
                  <a href={p.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline decoration-ink/20 underline-offset-2 hover:text-ink">
                    {p.credit.license}
                  </a>
                  {" · "}
                  <a href={p.credit.source} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/20 underline-offset-2 hover:text-ink">
                    {c.source}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
