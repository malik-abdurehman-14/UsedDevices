import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { laptopsPage } from "@/content/pages/laptops";
import { CategoryPage } from "@/components/page/CategoryPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/laptops">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/laptops", laptopsPage[lang].meta);
}

export default async function Page({ params }: PageProps<"/[lang]/laptops">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <CategoryPage lang={lang} dict={dict} content={laptopsPage[lang]} category="laptops" />;
}
