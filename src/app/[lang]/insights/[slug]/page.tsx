import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lang as rootLang } from "next/root-params";
import { ArrowLeft, Clock } from "lucide-react";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/config/site";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { getPost, insightsCopy, posts } from "@/content/insights";
import { JsonLd } from "@/components/page/Sections";
import { ArticleBody, PostCards, formatDate } from "@/components/insights/Article";
import { InquiryButton, WhatsAppButton } from "@/components/ui/Buttons";

export async function generateStaticParams() {
  const l = await rootLang();
  return hasLocale(l) ? posts[l].map((p) => ({ slug: p.slug })) : [];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/insights/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = getPost(lang, slug);
  if (!post) return {};
  const url = `/${lang}/insights/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    // Articles exist in one language only, so no cross-language alternates.
    alternates: { canonical: url, languages: { [lang]: url } },
    openGraph: { type: "article", title: post.title, description: post.description, url, publishedTime: post.date },
    twitter: { title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/insights/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = getPost(lang, slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);
  const c = insightsCopy[lang];
  const wa = dict.whatsappMessage[post.intent];
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: c.eyebrow, href: `/${lang}/insights` },
    { label: post.title, href: `/${lang}/insights/${post.slug}` },
  ];
  const more = posts[lang].filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    mainEntityOfPage: absoluteUrl(`/${lang}/insights/${post.slug}`),
    image: absoluteUrl(`/${lang}/opengraph-image`),
    author: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleLd]} />

      <header className="grain relative overflow-hidden bg-ink pb-16 pt-36 text-ivory sm:pb-24 sm:pt-44">
        <div className="absolute -right-32 -top-48 h-[520px] w-[520px] rounded-full bg-gold/20 blur-[140px]" />
        <div className="container-luxe relative max-w-4xl">
          <Link href={`/${lang}/insights`} className="inline-flex items-center gap-2 text-[13px] text-mist transition hover:text-ivory">
            <ArrowLeft className="h-3.5 w-3.5" /> {c.back}
          </Link>
          <div className="anim-fade-up">
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span>{post.category}</span>
              <span className="text-mist">·</span>
              <time dateTime={post.date} className="normal-case tracking-normal text-mist">{formatDate(post.date, lang)}</time>
              <span className="text-mist">·</span>
              <span className="flex items-center gap-1.5 normal-case tracking-normal text-mist">
                <Clock className="h-3.5 w-3.5" /> {c.minutes(post.readMinutes)}
              </span>
            </div>
            <h1 className="heading-xl font-display mt-6 text-[2.5rem] leading-[1.08] sm:text-6xl">{post.title}</h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-mist">{post.description}</p>
          </div>
        </div>
      </header>

      <section className="bg-paper py-16 sm:py-24">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_320px]">
          <article className="mx-auto w-full max-w-[720px]">
            <ArticleBody blocks={post.body} />
          </article>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="grain relative overflow-hidden rounded-[1.75rem] bg-ink p-7 text-ivory">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/25 blur-3xl" />
              <p className="font-display relative text-2xl leading-snug">{c.ctaTitle}</p>
              <p className="relative mt-3 text-[14px] leading-relaxed text-mist">{c.ctaDesc}</p>
              <div className="relative mt-6 flex flex-col gap-3">
                <InquiryButton intent={post.intent} className="w-full">{dict.nav.cta}</InquiryButton>
                <WhatsAppButton message={wa} className="w-full">{dict.nav.whatsapp}</WhatsAppButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="bg-ivory py-20 sm:py-28">
          <div className="container-luxe">
            <h2 className="font-display mb-10 text-4xl">{c.more}</h2>
            <PostCards posts={more} lang={lang} readLabel={c.read} minutes={c.minutes} featured={false} />
          </div>
        </section>
      )}
    </>
  );
}
