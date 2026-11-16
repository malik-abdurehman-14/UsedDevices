import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import { InquiryButton, SectionHeading } from "@/components/ui/Buttons";
import { Reveal, TiltCard } from "@/components/ui/Motion";
import { DevicePhoto } from "@/components/ui/DevicePhoto";
import { getPhoto, type PhotoKey } from "@/content/photos";
import type { Locale } from "@/i18n/config";

function PhotoCollage({ keys, lang, dark }: { keys: [PhotoKey, PhotoKey, PhotoKey]; lang: Locale; dark?: boolean }) {
  const frame = dark ? "border border-white/10" : "border border-ink/5 shadow-lg shadow-ink/5";
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2.5 sm:gap-3">
      <DevicePhoto photo={getPhoto(keys[0])} lang={lang} sizes="(min-width: 1024px) 380px, 60vw" className={`col-span-2 row-span-2 aspect-[4/3] h-full rounded-2xl ${frame}`} />
      <DevicePhoto photo={getPhoto(keys[1])} lang={lang} sizes="(min-width: 1024px) 190px, 30vw" className={`h-full min-h-0 rounded-2xl ${frame}`} />
      <DevicePhoto photo={getPhoto(keys[2])} lang={lang} sizes="(min-width: 1024px) 190px, 30vw" className={`h-full min-h-0 rounded-2xl ${frame}`} />
    </div>
  );
}

export function Devices({ dict, lang, viewDetails }: { dict: Dictionary["devices"]; lang: Locale; viewDetails: string }) {
  return (
    <section id="devices" className="bg-paper pb-24 sm:pb-32">
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-[17px] leading-relaxed text-stone lg:ml-auto">{dict.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <TiltCard className="grain group relative h-full overflow-hidden rounded-[2rem] bg-ink p-8 text-ivory sm:p-12">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl transition-opacity duration-700 group-hover:opacity-100 lg:opacity-60" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.24em] text-gold">01</p>
              <h3 className="font-display relative mt-4 text-4xl sm:text-5xl">{dict.laptops.title}</h3>
              <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-mist">{dict.laptops.desc}</p>
              <div className="relative my-10">
                <PhotoCollage keys={["mac-pro-m3", "tp-x1jp", "hp-840g8"]} lang={lang} dark />
              </div>
              <ul className="relative flex flex-wrap gap-2">
                {dict.laptops.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-ivory/80">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10 flex flex-wrap items-center gap-6">
                <InquiryButton category={0}>{dict.laptops.cta}</InquiryButton>
                <Link href={`/${lang}/laptops`} className="group/l inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm font-semibold text-ivory transition hover:border-gold">
                  {viewDetails}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/l:rotate-45" />
                </Link>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.12}>
            <TiltCard className="group relative h-full overflow-hidden rounded-[2rem] border border-ink/5 bg-gradient-to-br from-ivory to-sand p-8 text-ink sm:p-12">
              <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep">02</p>
              <h3 className="font-display relative mt-4 text-4xl sm:text-5xl">{dict.phones.title}</h3>
              <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-stone">{dict.phones.desc}</p>
              <div className="relative my-10">
                <PhotoCollage keys={["iphone-series", "sam-s23u", "pixel8pro"]} lang={lang} />
              </div>
              <ul className="relative flex flex-wrap gap-2">
                {dict.phones.tags.map((t) => (
                  <li key={t} className="rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 text-[12.5px] text-ink/75">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10 flex flex-wrap items-center gap-6">
                <InquiryButton category={1} variant="ink">{dict.phones.cta}</InquiryButton>
                <Link href={`/${lang}/smartphones`} className="group/l inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-sm font-semibold text-ink transition hover:border-ink">
                  {viewDetails}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/l:rotate-45" />
                </Link>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Paths({ dict }: { dict: Dictionary["paths"] }) {
  return (
    <section className="bg-paper pb-24 sm:pb-32">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} align="center" />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {dict.cards.map((card, i) => {
            const primary = i === 0;
            return (
              <Reveal key={card.title} delay={i * 0.12}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition-shadow duration-700 sm:p-11 ${
                    primary ? "grain bg-ink text-ivory hover:shadow-2xl hover:shadow-gold/10" : "border border-ink/10 bg-white text-ink hover:shadow-xl"
                  }`}
                >
                  {primary && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />}
                  <p className={`relative text-xs font-semibold uppercase tracking-[0.22em] ${primary ? "text-gold" : "text-gold-deep"}`}>{card.label}</p>
                  <h3 className="font-display relative mt-5 text-4xl sm:text-5xl">{card.title}</h3>
                  <p className={`relative mt-4 max-w-md text-[15.5px] leading-relaxed ${primary ? "text-mist" : "text-stone"}`}>{card.desc}</p>
                  <ul className="relative mt-8 flex flex-wrap gap-2">
                    {card.points.map((p) => (
                      <li key={p} className={`rounded-full px-4 py-2 text-[13px] ${primary ? "bg-white/[0.06] text-ivory/85" : "bg-ivory text-ink/75"}`}>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-auto pt-10">
                    {card.action === "inquiry" ? (
                      <InquiryButton>{card.cta}</InquiryButton>
                    ) : (
                      <Link
                        href={card.href ?? "/"}
                        className="group/link inline-flex items-center gap-3 border-b border-ink/20 pb-1.5 text-[15px] font-semibold transition hover:border-gold-deep"
                      >
                        {card.cta}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/link:rotate-45" />
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
