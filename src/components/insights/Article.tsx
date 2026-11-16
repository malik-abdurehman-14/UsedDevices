import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Block, Post } from "@/content/insights/types";
import type { Locale } from "@/i18n/config";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

export function formatDate(date: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-GB", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${date}T00:00:00Z`));
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[17px] leading-[1.9] text-ink/80">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2 key={i} className="font-display mb-4 mt-14 text-[1.9rem] leading-tight text-ink first:mt-0">
                {b.text}
              </h2>
            );
          case "p":
            return <p key={i} className="mb-6">{b.text}</p>;
          case "ul":
            return (
              <ul key={i} className="mb-8 space-y-3">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mb-8 space-y-3">
                {b.items.map((it, n) => (
                  <li key={it} className="flex gap-4">
                    <span className="font-display w-6 shrink-0 text-lg text-gold-deep">{n + 1}.</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside key={i} className="my-10 rounded-2xl border border-gold/30 bg-ivory p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">{b.title}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-ink/80">{b.text}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}

export function PostCards({ posts, lang, readLabel, minutes, featured = true }: { posts: Post[]; lang: Locale; readLabel: string; minutes: (n: number) => string; featured?: boolean }) {
  return (
    <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
      {posts.map((p, i) => {
        const big = featured && i === 0;
        return (
          <StaggerItem key={p.slug} className={big ? "md:col-span-2 lg:col-span-3" : ""}>
            <Link
              href={`/${lang}/insights/${p.slug}`}
              className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-8 transition duration-700 hover:-translate-y-1 hover:shadow-2xl sm:p-10 ${
                big ? "grain border-transparent bg-ink text-ivory hover:shadow-gold/10" : "border-ink/10 bg-white text-ink hover:shadow-ink/10"
              }`}
            >
              {big && <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />}
              <div className={`relative flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${big ? "text-gold" : "text-gold-deep"}`}>
                <span>{p.category}</span>
                <span className={big ? "text-mist" : "text-stone"}>·</span>
                <time dateTime={p.date} className={`normal-case tracking-normal ${big ? "text-mist" : "text-stone"}`}>
                  {formatDate(p.date, lang)}
                </time>
              </div>
              <h3 className={`font-display relative mt-6 leading-[1.15] ${big ? "max-w-3xl text-4xl sm:text-5xl" : "text-[1.75rem]"}`}>{p.title}</h3>
              <p className={`relative mt-4 text-[15.5px] leading-relaxed ${big ? "max-w-2xl text-mist" : "text-stone"}`}>{p.description}</p>
              <div className="relative mt-auto flex items-center justify-between pt-10">
                <span className={`flex items-center gap-2 text-[13px] ${big ? "text-mist" : "text-stone"}`}>
                  <Clock className="h-3.5 w-3.5" /> {minutes(p.readMinutes)}
                </span>
                <span className={`inline-flex items-center gap-2 text-sm font-semibold ${big ? "text-gold-soft" : "text-ink"}`}>
                  {readLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-luxe">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}
