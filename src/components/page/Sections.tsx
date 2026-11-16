import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Boxes, Check, FileText, Globe2, MapPin, ShieldCheck } from "lucide-react";
import { brandPhotoKey, type Brand, type Category } from "@/content/brands";
import { getPhoto } from "@/content/photos";
import { DevicePhoto } from "@/components/ui/DevicePhoto";
import type { Locale } from "@/i18n/config";
import { SectionHeading } from "@/components/ui/Buttons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { LaptopArt, PhoneArt } from "@/components/visuals/DeviceArt";

const icons = [MapPin, BadgeCheck, ShieldCheck, FileText, Boxes, Globe2];

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}

/* ───────── Feature grid (icon cards) ───────── */
export function FeatureGrid({
  eyebrow,
  title,
  desc,
  items,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  items: { title: string; desc: string }[];
  tone?: "light" | "ivory";
}) {
  const bg = tone === "ivory" ? "bg-ivory" : "bg-paper";
  return (
    <section className={`${bg} py-24 sm:py-32`}>
      <div className="container-luxe">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionHeading eyebrow={eyebrow} title={title} />
          </Reveal>
          {desc && (
            <Reveal delay={0.1}>
              <p className="max-w-lg text-[17px] leading-relaxed text-stone lg:ml-auto">{desc}</p>
            </Reveal>
          )}
        </div>
        <Stagger className={`mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 ${items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={item.title} className={`group relative ${bg} p-8 transition-colors duration-700 hover:bg-white sm:p-10`}>
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-deep to-gold-soft transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-gold transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-2xl text-ink/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone">{item.desc}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ───────── Series / model list ───────── */
export function SeriesList({
  eyebrow,
  title,
  desc,
  groups,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  groups: { label: string; items: { name: string; detail?: string }[] }[];
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div className="absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="container-luxe relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionHeading eyebrow={eyebrow} title={title} tone="dark" />
          </Reveal>
          {desc && (
            <Reveal delay={0.1}>
              <p className="max-w-lg text-[17px] leading-relaxed text-mist lg:ml-auto">{desc}</p>
            </Reveal>
          )}
        </div>
        <div className={`mt-14 grid gap-10 ${groups.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {groups.map((g) => (
            <div key={g.label}>
              {groups.length > 1 && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{g.label}</p>}
              <Stagger className={`grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 ${groups.length > 1 ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`} gap={0.05}>
                {g.items.map((item, i) => (
                  <StaggerItem key={item.name} className="group flex items-center justify-between gap-4 bg-ink px-6 py-5 transition-colors duration-500 hover:bg-ink-2">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-sm text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[15.5px] font-medium">{item.name}</span>
                    </div>
                    {item.detail && <span className="text-[12.5px] text-mist">{item.detail}</span>}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Brand cards ───────── */
export function BrandGrid({
  lang,
  eyebrow,
  title,
  desc,
  brands,
  category,
  categoryLabel,
  tone = "light",
}: {
  lang: Locale;
  eyebrow: string;
  title: string;
  desc?: string;
  brands: Brand[];
  /** When set, multi-category brands show the photo for this category. */
  category?: Category;
  categoryLabel: (c: Category) => string;
  tone?: "light" | "ivory";
}) {
  return (
    <section className={`${tone === "ivory" ? "bg-ivory" : "bg-paper"} py-24 sm:py-32`}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
        </Reveal>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" gap={0.05}>
          {brands.map((b) => {
            const photo = getPhoto(brandPhotoKey(b, category));
            return (
              <StaggerItem key={b.slug}>
                <Link
                  href={`/${lang}/brands/${b.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-ink/10 bg-white p-2.5 transition duration-700 hover:-translate-y-1 hover:border-ink hover:bg-ink hover:shadow-2xl hover:shadow-ink/20"
                >
                  <DevicePhoto photo={photo} lang={lang} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw" className="aspect-[4/3] rounded-[1.2rem]" />
                  <div className="flex flex-1 flex-col justify-between px-4 pb-4 pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display text-[1.75rem] leading-tight text-ink transition-colors duration-700 group-hover:text-ivory">{b.name}</span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition duration-700 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.16em] text-stone transition-colors duration-700 group-hover:text-gold-soft">
                      {b.categories.map(categoryLabel).join(" · ")}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ───────── Split: text + checklist panel ───────── */
export function SplitPanel({
  id,
  eyebrow,
  title,
  desc,
  points,
  tone = "light",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  desc: string;
  points: string[];
  tone?: "light" | "ivory";
}) {
  return (
    <section id={id} className={`${tone === "ivory" ? "bg-ivory" : "bg-paper"} py-24 sm:py-32`}>
      <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="grain relative overflow-hidden rounded-[2rem] bg-ink p-8 text-ivory sm:p-12">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
            <ul className="relative space-y-5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-4 border-b border-white/10 pb-5 text-[15.5px] last:border-0 last:pb-0">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <Check className="h-3.5 w-3.5 text-gold" />
                  </span>
                  <span className="text-ivory/85">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Category link cards (e.g. "What we buy") ───────── */
export function CategoryCards({
  eyebrow,
  title,
  cards,
}: {
  eyebrow: string;
  title: string;
  cards: { title: string; desc: string; href: string; cta: string; art: "laptop" | "phone" }[];
}) {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.1}>
              <Link
                href={c.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition duration-700 sm:p-11 ${
                  i === 0 ? "grain bg-ink text-ivory" : "border border-ink/5 bg-gradient-to-br from-ivory to-sand text-ink"
                }`}
              >
                <h3 className="font-display text-4xl sm:text-5xl">{c.title}</h3>
                <p className={`mt-4 max-w-md text-[15.5px] leading-relaxed ${i === 0 ? "text-mist" : "text-stone"}`}>{c.desc}</p>
                <div className="my-10 flex justify-center transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.03]">
                  {c.art === "laptop" ? <LaptopArt id={`cc-${i}`} className="w-[80%]" /> : <PhoneArt id={`cc-${i}`} className="w-[28%]" />}
                </div>
                <span className={`mt-auto inline-flex items-center gap-2 self-start border-b pb-1 text-[15px] font-semibold ${i === 0 ? "border-gold/50" : "border-ink/20"}`}>
                  {c.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Long-form story ───────── */
export function Story({ eyebrow, title, paragraphs, quote }: { eyebrow: string; title: string; paragraphs: string[]; quote?: string }) {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-luxe grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
          {quote && (
            <blockquote className="font-display mt-10 border-l-2 border-gold pl-6 text-2xl leading-snug text-ink/80 sm:text-3xl">“{quote}”</blockquote>
          )}
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 text-[17px] leading-[1.9] text-stone lg:pt-14">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Definition table (会社概要) ───────── */
export function ProfileTable({
  eyebrow,
  title,
  rows,
  tone = "ivory",
}: {
  eyebrow: string;
  title: string;
  rows: { label: string; value: string }[];
  tone?: "ivory" | "light";
}) {
  return (
    <section className={`${tone === "ivory" ? "bg-ivory" : "bg-paper"} py-24 sm:py-32`}>
      <div className="container-luxe grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="divide-y divide-ink/10 border-y border-ink/10">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-deep">{r.label}</dt>
                <dd className="whitespace-pre-line text-[16px] text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
