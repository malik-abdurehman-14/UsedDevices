import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { smartphonesPage } from "@/content/pages/smartphones";
import { CategoryPage } from "@/components/page/CategoryPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/smartphones">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/smartphones", smartphonesPage[lang].meta);
}

export default async function Page({ params }: PageProps<"/[lang]/smartphones">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <CategoryPage lang={lang} dict={dict} content={smartphonesPage[lang]} category="smartphones" />;
}
