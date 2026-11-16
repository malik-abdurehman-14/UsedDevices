import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildJsonLd } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Stats, Brands } from "@/components/home/StatsBrands";
import { Devices, Paths } from "@/components/home/Devices";
import { Process } from "@/components/home/Process";
import { Why, Quality } from "@/components/home/WhyQuality";
import { World } from "@/components/home/World";
import { Faq, FinalCta } from "@/components/home/FaqCta";
import { LatestInsights } from "@/components/home/LatestInsights";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const wa = dict.whatsappMessage[dict.inquiry.defaultIntent];
  const jsonLd = buildJsonLd(lang, dict);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero dict={dict.hero} whatsappMessage={wa} />
      <Stats stats={dict.stats} lang={lang} />
      <Brands dict={dict.brands} />
      <Devices dict={dict.devices} lang={lang} viewDetails={dict.common.viewDetails} />
      <Paths dict={dict.paths} />
      <Process dict={dict.process} />
      <Why dict={dict.why} />
      <Quality dict={dict.quality} />
      <World dict={dict.world} />
      <LatestInsights lang={lang} />
      <Faq dict={dict.faq} whatsappMessage={wa} />
      <FinalCta dict={dict.cta} whatsappMessage={wa} />
    </>
  );
}
