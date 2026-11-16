"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import type { Dictionary } from "@/i18n/types";
import { SectionHeading } from "@/components/ui/Buttons";
import { Reveal } from "@/components/ui/Motion";

export function Process({ dict }: { dict: Dictionary["process"] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="grain relative overflow-hidden bg-ink py-24 text-ivory sm:py-36">
      <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="container-luxe relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionHeading eyebrow={dict.eyebrow} title={dict.title} desc={dict.intro} tone="dark" />
          </Reveal>
        </div>

        <ol ref={ref} className="relative">
          <span className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" aria-hidden />
          <motion.span
            style={{ scaleY: progress }}
            className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-gold-soft via-gold to-gold-deep"
            aria-hidden
          />
          {dict.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-8 pb-14 last:pb-0"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ink font-display text-xl text-gold-soft shadow-[0_0_0_8px_var(--color-ink)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="group flex-1 rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition duration-500 hover:border-gold/30 hover:bg-white/[0.04] sm:p-9">
                <h3 className="font-display text-2xl sm:text-3xl">{step.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-mist">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
