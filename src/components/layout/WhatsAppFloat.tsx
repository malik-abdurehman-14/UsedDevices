"use client";

import { motion } from "motion/react";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function WhatsAppFloat({ label, message }: { label: string; message: string }) {
  return (
    <motion.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-8 sm:right-8"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full border border-white/10 bg-ink/90 px-4 py-2 text-xs font-medium text-ivory opacity-0 backdrop-blur transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        {label}
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform duration-500 group-hover:scale-105">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </motion.a>
  );
}
