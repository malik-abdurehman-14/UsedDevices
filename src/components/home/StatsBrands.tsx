import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { Counter, Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/Buttons";

export const laptopBrands = ["Apple MacBook", "Dell", "Lenovo ThinkPad", "HP", "Panasonic Let’s note", "Fujitsu", "NEC", "Dynabook", "Microsoft Surface", "ASUS", "Acer", "VAIO"];
export const phoneBrands = ["Apple iPhone", "Samsung Galaxy", "Google Pixel", "Sony Xperia", "Sharp AQUOS", "OPPO", "Xiaomi", "Fujitsu arrows", "Motorola", "Huawei", "ASUS Zenfone"];

export function Stats({ stats, lang }: { stats: Dictionary["stats"]; lang: Locale }) {
  return (
    <section id="stats" className="relative bg-ink text-ivory">
      <div className="container-luxe">
        <div className="grid grid-cols-2 border-y border-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className={`px-2 py-10 sm:px-8 sm:py-14 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <p className="font-display whitespace-nowrap text-[clamp(2.1rem,7vw,3.75rem)] text-ivory lg:text-[clamp(2.4rem,4vw,3.75rem)]">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} locale={lang === "ja" ? "ja-JP" : "en-US"} />
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-mist">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="mask-fade-x group flex overflow-hidden">
      <ul
        className={`flex shrink-0 items-center gap-4 pr-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        style={{ ["--marquee-duration" as string]: "55s" }}
      >
        {loop.map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= items.length}
            className="font-display whitespace-nowrap rounded-full border border-ink/10 bg-white px-8 py-4 text-2xl text-ink/80 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:border-gold hover:text-ink sm:text-3xl"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Brands({ dict }: { dict: Dictionary["brands"] }) {
  return (
    <section className="overflow-hidden bg-paper py-24 sm:py-32">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} align="center" />
        </Reveal>
      </div>
      <div className="mt-16 space-y-5">
        <p className="container-luxe text-center text-xs font-semibold uppercase tracking-[0.24em] text-stone">{dict.laptops}</p>
        <MarqueeRow items={laptopBrands} />
        <p className="container-luxe pt-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-stone">{dict.phones}</p>
        <MarqueeRow items={phoneBrands} reverse />
      </div>
    </section>
  );
}
