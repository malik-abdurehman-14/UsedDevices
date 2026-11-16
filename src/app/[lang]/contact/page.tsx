import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/config/site";
import { contactPage } from "@/content/pages/about-contact";
import { PageHero } from "@/components/page/PageHero";
import { JsonLd } from "@/components/page/Sections";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Faq } from "@/components/home/FaqCta";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { WhatsAppIcon } from "@/components/ui/Icons";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/contact", contactPage[lang].meta);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = contactPage[lang];
  const wa = dict.whatsappMessage[dict.inquiry.defaultIntent];
  const crumbs = [
    { label: dict.common.home, href: `/${lang}` },
    { label: c.hero.eyebrow, href: `/${lang}/contact` },
  ];

  const methods = [
    { icon: WhatsAppIcon, label: c.methods.whatsapp, value: site.whatsappDisplay, desc: c.methods.whatsappDesc, href: whatsappLink(wa), external: true, accent: true },
    { icon: Mail, label: c.methods.email, value: site.email, desc: c.methods.emailDesc, href: `mailto:${site.email}` },
    { icon: Phone, label: c.methods.phone, value: site.phoneDisplay, desc: c.methods.phoneDesc, href: `tel:${site.phoneDisplay.replace(/[^+\d]/g, "")}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(c.faq.items)]} />
      <PageHero breadcrumbs={crumbs} eyebrow={c.hero.eyebrow} title={c.hero.title} desc={c.hero.desc} whatsappMessage={wa} />

      <section className="bg-paper py-20 sm:py-28">
        <div className="container-luxe grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Stagger className="space-y-4" gap={0.08}>
              {methods.map((m) => (
                <StaggerItem key={m.label}>
                  <a
                    href={m.href}
                    target={m.external ? "_blank" : undefined}
                    rel={m.external ? "noopener noreferrer" : undefined}
                    className={`group flex items-center gap-5 rounded-[1.5rem] border p-6 transition duration-500 hover:-translate-y-0.5 hover:shadow-xl ${
                      m.accent ? "border-[#25D366]/30 bg-white hover:border-[#25D366]" : "border-ink/10 bg-white hover:border-ink/30"
                    }`}
                  >
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${m.accent ? "bg-[#25D366] text-white" : "bg-ink text-gold"}`}>
                      <m.icon className="h-6 w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-stone">{m.label}</span>
                      <span className="mt-1 block truncate text-lg font-semibold text-ink">{m.value}</span>
                      <span className="mt-0.5 block text-[13.5px] text-stone">{m.desc}</span>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <div className="rounded-[1.5rem] border border-ink/10 bg-ivory p-6 text-[15px] text-ink/80">
                <p className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-stone">{c.methods.office}</span>
                    <span className="mt-1 block">{lang === "ja" ? site.address.ja : site.address.en}</span>
                  </span>
                </p>
                <p className="mt-4 flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  {site.hours[lang]}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="grain relative overflow-hidden rounded-[2rem] bg-ink-2 p-7 text-ivory sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
              <h2 className="font-display relative text-3xl sm:text-4xl">{c.formTitle}</h2>
              <p className="relative mt-2 text-sm text-mist">{c.formDesc}</p>
              <div className="relative mt-8">
                <InquiryForm lang={lang} dict={dict.inquiry} whatsappMessage={dict.whatsappMessage} layoutKey="contact" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq dict={c.faq} whatsappMessage={wa} />
    </>
  );
}
