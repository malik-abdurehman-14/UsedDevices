import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { brands, getBrand } from "@/content/brands";
import { brandPageContent } from "@/content/brand-page";
import { getPhoto } from "@/content/photos";
import { PageHero } from "@/components/page/PageHero";
import { BrandGrid, FeatureGrid, JsonLd, SeriesList } from "@/components/page/Sections";
import { Process } from "@/components/home/Process";
import { Faq, FinalCta } from "@/components/home/FaqCta";

export async function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/brands/[brand]">): Promise<Metadata> {
  const { lang, brand: slug } = await params;
  const brand = getBrand(slug);
  if (!hasLocale(lang) || !brand) return {};
  return pageMetadata(lang, `/brands/${slug}`, brandPageContent(brand, lang).meta);
}

export default async function BrandPage({ params }: PageProps<"/[lang]/brands/[brand]">) {
  const { lang, brand: slug } = await params;
  const brand = getBrand(slug);
  if (!hasLocale(lang) || !brand) notFound();

  const dict = await getDictionary(lang);
  const c = brandPageContent(brand, lang);
  const wa = dict.whatsappMessage[dict.inquiry.defaultIntent];
  const primaryCat = brand.categories[0];
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: primaryCat === "laptops" ? dict.brands.laptops : dict.brands.phones, href: `/${lang}/${primaryCat}` },
    { label: brand.name, href: `/${lang}/brands/${brand.slug}` },
  ];

  const groups = [
    ...(brand.laptopSeries ? [{ label: c.groupLabels.laptops, items: brand.laptopSeries.map((name) => ({ name })) }] : []),
    ...(brand.phoneSeries ? [{ label: c.groupLabels.smartphones, items: brand.phoneSeries.map((name) => ({ name })) }] : []),
  ];

  const related = brands.filter((b) => b.slug !== brand.slug && b.categories.some((cat) => brand.categories.includes(cat))).slice(0, 8);

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
        category={brand.categories.length > 1 ? 2 : primaryCat === "laptops" ? 0 : 1}
        photos={brand.photos.map(getPhoto)}
        lang={lang}
        watermark={brand.name}
      />
      <SeriesList eyebrow={c.seriesHeading.eyebrow} title={c.seriesHeading.title} desc={c.seriesHeading.desc} groups={groups} />
      <FeatureGrid {...c.features} />
      <Process dict={dict.process} />
      <Faq dict={c.faq} whatsappMessage={wa} />
      <BrandGrid
        lang={lang}
        eyebrow={c.others.eyebrow}
        title={c.others.title}
        brands={related}
        categoryLabel={(cat) => (cat === "laptops" ? dict.brands.laptops : dict.brands.phones)}
        tone="ivory"
      />
      <FinalCta dict={c.cta} whatsappMessage={wa} />
    </>
  );
}
