import { BadgeCheck, Boxes, FileText, Globe2, MapPin, ShieldCheck, Check } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import { SectionHeading } from "@/components/ui/Buttons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

const icons = [MapPin, BadgeCheck, ShieldCheck, FileText, Boxes, Globe2];

export function Why({ dict }: { dict: Dictionary["why"] }) {
  return (
    <section className="bg-paper py-24 sm:py-36">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
        </Reveal>
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={item.title} className="group relative bg-paper p-8 transition-colors duration-700 hover:bg-white sm:p-10">
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

export function Quality({ dict }: { dict: Dictionary["quality"] }) {
  return (
    <section id="quality" className="relative overflow-hidden bg-ivory py-24 sm:py-36">
      <div className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-gold/15 blur-[120px]" />
      <div className="container-luxe relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-[17px] leading-relaxed text-stone lg:ml-auto">{dict.desc}</p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-3" gap={0.12}>
          {dict.cards.map((c, i) => (
            <StaggerItem key={c.badge}>
              <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper p-8 transition duration-700 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/10 sm:p-10">
                <span
                  className={`font-display block text-[5.5rem] leading-none ${
                    i === 0 ? "text-gold-gradient" : i === 1 ? "text-ink/80" : "text-ink/35"
                  }`}
                >
                  {c.badge}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink">{c.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone">{c.desc}</p>
                <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-ink transition-transform duration-700 group-hover:scale-x-100" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-6">
          <div className="rounded-[1.75rem] bg-ink p-8 text-ivory sm:p-12">
            <h3 className="font-display text-3xl">{dict.checklistTitle}</h3>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {dict.checks.map((check) => (
                <li key={check} className="flex items-start gap-3 text-[14.5px] text-ivory/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <Check className="h-3 w-3 text-gold" />
                  </span>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
