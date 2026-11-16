import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import type { CategoryPageContent } from "@/content/types";
import { brandsIn, type Category } from "@/content/brands";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { categoryPhotos, getPhoto } from "@/content/photos";
import { PageHero } from "./PageHero";
import { BrandGrid, FeatureGrid, JsonLd, SeriesList } from "./Sections";
import { Quality } from "@/components/home/WhyQuality";
import { Process } from "@/components/home/Process";
import { Faq, FinalCta } from "@/components/home/FaqCta";

type Props = {
  lang: Locale;
  dict: Dictionary;
  content: CategoryPageContent;
  category: Category;
};

export function CategoryPage({ lang, dict, content: c, category }: Props) {
  const wa = dict.whatsappMessage[dict.inquiry.defaultIntent];
  const path = `/${lang}/${category}`;
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: category === "laptops" ? dict.brands.laptops : dict.brands.phones, href: path },
  ];
  const catIndex = category === "laptops" ? 0 : 1;

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
        category={catIndex}
        photos={categoryPhotos[category].map(getPhoto)}
        lang={lang}
      />
      <BrandGrid
        lang={lang}
        eyebrow={c.brands.eyebrow}
        title={c.brands.title}
        desc={c.brands.desc}
        brands={brandsIn(category)}
        category={category}
        categoryLabel={(cat) => (cat === "laptops" ? dict.brands.laptops : dict.brands.phones)}
      />
      <FeatureGrid {...c.features} tone="ivory" />
      <SeriesList eyebrow={c.series.eyebrow} title={c.series.title} desc={c.series.desc} groups={[{ label: c.series.title, items: c.series.items }]} />
      <Quality dict={c.inspection} />
      <Process dict={dict.process} />
      <Faq dict={c.faq} whatsappMessage={wa} />
      <FinalCta dict={c.cta} whatsappMessage={wa} />
    </>
  );
}
