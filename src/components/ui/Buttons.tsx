"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/config/site";
import type { InquiryIntent } from "@/i18n/types";
import { useInquiry } from "@/components/layout/InquiryProvider";
import { WhatsAppIcon } from "./Icons";
import { Magnetic } from "./Motion";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[14px] font-semibold tracking-wide transition-colors duration-500";

export function InquiryButton({
  children,
  intent,
  category,
  variant = "gold",
  className = "",
}: {
  children: ReactNode;
  intent?: InquiryIntent;
  category?: number;
  variant?: "gold" | "ink" | "ghost-dark" | "ghost-light";
  className?: string;
}) {
  const { open } = useInquiry();
  const styles = {
    gold: "bg-gold text-ink hover:text-ink",
    ink: "bg-ink text-ivory",
    "ghost-dark": "border border-white/20 text-ivory hover:border-gold/60",
    "ghost-light": "border border-ink/15 text-ink hover:border-ink/40",
  }[variant];

  return (
    <Magnetic className="inline-block">
      <button onClick={() => open(intent, category)} className={`${base} ${styles} ${className}`}>
        {variant === "gold" && (
          <span className="absolute inset-0 translate-y-full rounded-full bg-gold-soft transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
        )}
        {variant === "ink" && (
          <span className="absolute inset-0 translate-y-full rounded-full bg-ink-3 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
        )}
        <span className="relative">{children}</span>
        <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
      </button>
    </Magnetic>
  );
}

export function WhatsAppButton({
  children,
  message,
  variant = "ghost-dark",
  className = "",
}: {
  children: ReactNode;
  message: string;
  variant?: "ghost-dark" | "ghost-light" | "solid";
  className?: string;
}) {
  const styles = {
    "ghost-dark": "border border-white/20 text-ivory hover:border-[#25D366]/70 hover:text-white",
    "ghost-light": "border border-ink/15 text-ink hover:border-[#25D366]",
    solid: "bg-[#25D366] text-white hover:bg-[#1fbd5a]",
  }[variant];

  return (
    <Magnetic className="inline-block">
      <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
        <WhatsAppIcon className={`h-[18px] w-[18px] ${variant === "solid" ? "" : "text-[#25D366]"}`} />
        <span>{children}</span>
      </a>
    </Magnetic>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  tone = "light",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] ${align === "center" ? "justify-center" : ""} ${dark ? "text-gold" : "text-gold-deep"}`}>
        <span className="h-px w-8 bg-current" />
        {eyebrow}
      </p>
      <h2 className={`heading-lg font-display mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.6rem] ${dark ? "text-ivory" : "text-ink"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-6 text-[17px] leading-relaxed ${dark ? "text-mist" : "text-stone"}`}>{desc}</p>}
    </div>
  );
}
