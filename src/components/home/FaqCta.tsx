"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Dictionary, InquiryIntent } from "@/i18n/types";
import { InquiryButton, SectionHeading, WhatsAppButton } from "@/components/ui/Buttons";
import { MaskText, Reveal } from "@/components/ui/Motion";

export function Faq({ dict, whatsappMessage }: { dict: Dictionary["faq"]; whatsappMessage: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-24 sm:py-36">
      <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionHeading eyebrow={dict.eyebrow} title={dict.title} desc={dict.desc} />
            <div className="mt-8">
              <WhatsAppButton message={whatsappMessage} variant="ghost-light">WhatsApp</WhatsAppButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {dict.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span className={`text-lg font-semibold transition-colors sm:text-xl ${isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"}`}>
                        {item.q}
                      </span>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          isOpen ? "rotate-45 border-ink bg-ink text-gold" : "border-ink/15 text-ink group-hover:border-ink/40"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-8 text-[15.5px] leading-relaxed text-stone">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* keep answers in the DOM for search engines when collapsed */}
                  {!isOpen && <p className="sr-only">{item.a}</p>}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta({ dict, whatsappMessage, intent }: { dict: Dictionary["cta"]; whatsappMessage: string; intent?: InquiryIntent }) {
  return (
    <section className="bg-paper px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="grain relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-24 text-center text-ivory sm:py-32">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[140px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold">{dict.eyebrow}</p>
          <h2 className="font-display mt-6 text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
            <MaskText lines={[dict.title]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-mist">{dict.desc}</p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <InquiryButton intent={intent}>{dict.primary}</InquiryButton>
              <WhatsAppButton message={whatsappMessage} variant="solid">
                {dict.secondary}
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
