"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { Check } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import { InquiryButton, WhatsAppButton } from "@/components/ui/Buttons";
import { LaptopArt, PhoneArt } from "@/components/visuals/DeviceArt";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ dict, whatsappMessage }: { dict: Dictionary["hero"]; whatsappMessage: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yArt = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const laptopX = useTransform(sx, (v) => v * 18);
  const laptopY = useTransform(sy, (v) => v * 12);
  const phoneX = useTransform(sx, (v) => v * -30);
  const phoneY = useTransform(sy, (v) => v * -22);

  return (
    <section
      ref={ref}
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pb-24 pt-32 text-ivory lg:pt-28"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* atmosphere */}
      <div className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <motion.div
        className="absolute -right-40 -top-40 -z-10 h-[680px] w-[680px] rounded-full bg-gold/25 blur-[140px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute -bottom-60 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#3b4a6b]/30 blur-[140px]" />

      <div className="container-luxe grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ y: yText, opacity: fade }}>
          {/* Entrance animations are pure CSS so text paints immediately (fast LCP), before hydration. */}
          <p
            className="anim-fade-up inline-flex items-center gap-3 text-balance rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-soft backdrop-blur"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-gold animate-pulse-ring" />
              <span className="relative h-2 w-2 rounded-full bg-gold" />
            </span>
            {dict.eyebrow}
          </p>

          <h1 className="heading-xl font-display mt-8 text-[3.2rem] leading-[0.98] sm:text-7xl lg:text-[5.6rem]">
            {dict.titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em]">
                <span
                  className={`anim-rise block ${i === dict.accentLine ? "text-gold-gradient italic" : ""}`}
                  style={{ animationDelay: `${0.15 + i * 0.12}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="anim-fade-up mt-8 max-w-xl text-[17px] leading-relaxed text-mist" style={{ animationDelay: "0.55s" }}>
            {dict.subtitle}
          </p>

          <div className="anim-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.7s" }}>
            <InquiryButton>{dict.primary}</InquiryButton>
            <WhatsAppButton message={whatsappMessage}>{dict.secondary}</WhatsAppButton>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-ivory/70">
            {dict.badges.map((b, i) => (
              <li key={b} className="anim-fade-up flex items-center gap-2" style={{ animationDelay: `${0.85 + i * 0.08}s` }}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold/40">
                  <Check className="h-3 w-3 text-gold" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* device composition */}
        <motion.div style={{ y: yArt }} className="relative mx-auto w-full max-w-[620px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.4, ease }}
            style={{ x: laptopX, y: laptopY }}
          >
            <LaptopArt id="hero-laptop" className="w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 80, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ delay: 0.9, duration: 1.4, ease }}
            style={{ x: phoneX, y: phoneY }}
            className="absolute -bottom-6 -right-2 w-[30%] sm:-right-6"
          >
            <div className="animate-float">
              <PhoneArt id="hero-phone" className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]" />
            </div>
          </motion.div>

          {dict.floating.map((chip, i) => (
            <motion.div
              key={chip.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.2, duration: 0.8, ease }}
              className={`absolute rounded-2xl border border-white/10 bg-ink-2/80 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-xl ${
                i === 0 ? "-left-2 top-[8%] sm:-left-10" : "bottom-[18%] left-[6%] sm:-left-4"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-gold-soft to-gold-deep" />
                <div>
                  <p className="text-[13px] font-semibold text-ivory">{chip.title}</p>
                  <p className="text-[11px] text-mist">{chip.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-mist md:flex"
      >
        {dict.scroll}
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-px bg-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
