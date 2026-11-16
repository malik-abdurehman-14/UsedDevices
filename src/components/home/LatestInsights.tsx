import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { insightsCopy, posts } from "@/content/insights";
import { PostCards } from "@/components/insights/Article";
import { SectionHeading } from "@/components/ui/Buttons";
import { Reveal } from "@/components/ui/Motion";

export function LatestInsights({ lang }: { lang: Locale }) {
  const c = insightsCopy[lang];
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="container-luxe">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading eyebrow={c.eyebrow} title={c.title} />
          </Reveal>
          <Link href={`/${lang}/insights`} className="group inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[15px] font-semibold text-ink transition hover:border-ink">
            {c.back}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>
        <div className="mt-14">
          <PostCards posts={posts[lang].slice(0, 3)} lang={lang} readLabel={c.read} minutes={c.minutes} featured={false} />
        </div>
      </div>
    </section>
  );
}
