"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import type { InquiryIntent } from "@/i18n/types";
import { InquiryButton, WhatsAppButton } from "@/components/ui/Buttons";
import { LaptopArt, PhoneArt } from "@/components/visuals/DeviceArt";
import { DevicePhoto } from "@/components/ui/DevicePhoto";
import type { Photo } from "@/content/photos";
import type { Locale } from "@/i18n/config";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  breadcrumbs: { label: string; href: string }[];
  eyebrow: string;
  title: string;
  desc: string;
  primary?: string;
  secondary?: string;
  whatsappMessage: string;
  intent?: InquiryIntent;
  category?: number;
  art?: "laptop" | "phone" | "both" | "none";
  /** Large brand word shown behind the art (brand pages). */
  watermark?: string;
  /** Real device photos — shown instead of `art` when provided (first = main, second = floating inset). */
  photos?: Photo[];
  lang?: Locale;
};

export function PageHero({ breadcrumbs, eyebrow, title, desc, primary, secondary, whatsappMessage, intent, category, art = "none", watermark, photos, lang = "en" }: Props) {
  const hasPhotos = !!photos?.length;
  const hasArt = hasPhotos || art !== "none";
  return (
    <section className="grain relative isolate overflow-hidden bg-ink pb-20 pt-36 text-ivory sm:pb-28 sm:pt-44">
      <div className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
      <motion.div
        className="absolute -right-32 -top-48 -z-10 h-[560px] w-[560px] rounded-full bg-gold/20 blur-[140px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {watermark && (
        <motion.p
          aria-hidden
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, ease }}
          className="font-display pointer-events-none absolute -bottom-8 right-0 -z-10 select-none whitespace-nowrap text-[18vw] leading-none text-white/[0.035]"
        >
          {watermark}
        </motion.p>
      )}

      <div className={`container-luxe grid items-center gap-14 ${hasArt ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
        <div className={hasArt ? "" : "max-w-4xl"}>
          <nav aria-label="Breadcrumb" className="anim-fade-up">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-mist">
              {breadcrumbs.map((b, i) => (
                <li key={b.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-ivory/80">{b.label}</span>
                  ) : (
                    <Link href={b.href} className="transition hover:text-ivory">{b.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p
            className="anim-fade-up mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-px w-8 bg-current" />
            {eyebrow}
          </p>

          <h1 className="heading-xl font-display mt-6 text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="anim-rise block" style={{ animationDelay: "0.15s" }}>
                {title}
              </span>
            </span>
          </h1>

          <p className="anim-fade-up mt-7 max-w-2xl text-[17px] leading-relaxed text-mist" style={{ animationDelay: "0.45s" }}>
            {desc}
          </p>

          {(primary || secondary) && (
            <div className="anim-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.6s" }}>
              {primary && <InquiryButton intent={intent} category={category}>{primary}</InquiryButton>}
              {secondary && <WhatsAppButton message={whatsappMessage}>{secondary}</WhatsAppButton>}
            </div>
          )}
        </div>

        {hasPhotos && (
          <div className="anim-lift relative mx-auto w-full max-w-[560px] lg:pb-6 lg:pl-6" style={{ animationDelay: "0.2s" }}>
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-gold/10 blur-3xl" />
            <figure className="group relative">
              <DevicePhoto
                photo={photos[0]}
                lang={lang}
                preload
                sizes="(min-width: 1024px) 560px, 92vw"
                className="aspect-[4/3] rounded-[2rem] border border-white/10 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.75)]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              <figcaption className="absolute left-4 top-4 max-w-[80%] rounded-full border border-white/15 bg-ink/70 px-4 py-2 text-[11.5px] font-medium text-ivory/90 backdrop-blur-md">
                {photos[0].alt[lang]}
              </figcaption>
            </figure>
            {photos[1] && (
              <div className="absolute -bottom-2 -left-2 w-[38%] animate-float sm:-left-6 lg:-left-4 lg:bottom-0">
                <DevicePhoto
                  photo={photos[1]}
                  lang={lang}
                  sizes="220px"
                  hoverZoom={false}
                  className="aspect-square -rotate-3 rounded-[1.4rem] border-4 border-ink shadow-2xl shadow-black/60"
                />
              </div>
            )}
          </div>
        )}

        {!hasPhotos && hasArt && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.4, ease }}
            className="relative mx-auto hidden w-full max-w-[460px] lg:block"
          >
            {art === "laptop" && <LaptopArt id="ph-laptop" className="w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" />}
            {art === "phone" && (
              <div className="flex items-end justify-center gap-4">
                <PhoneArt id="ph-a" className="w-[34%] -rotate-6 opacity-70" />
                <div className="w-[42%] animate-float">
                  <PhoneArt id="ph-b" className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]" />
                </div>
              </div>
            )}
            {art === "both" && (
              <div className="relative">
                <LaptopArt id="ph-laptop2" className="w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" />
                <div className="absolute -bottom-6 -right-4 w-[30%] animate-float">
                  <PhoneArt id="ph-c" className="w-full -rotate-6 drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]" />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
