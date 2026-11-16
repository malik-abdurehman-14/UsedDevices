"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/i18n/types";
import { SectionHeading } from "@/components/ui/Buttons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

const origin = { x: 820, y: 175 };
// Stylised positions (not to scale) for: Middle East, Africa, South Asia, SE Asia, Europe, Americas
const nodes = [
  { x: 470, y: 205 },
  { x: 420, y: 320 },
  { x: 590, y: 215 },
  { x: 720, y: 290 },
  { x: 300, y: 110 },
  { x: 1080, y: 210 },
];

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - Math.abs(a.x - b.x) * 0.28 - 20;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}

export function World({ dict }: { dict: Dictionary["world"] }) {
  return (
    <section id="worldwide" className="grain relative overflow-hidden bg-ink py-24 text-ivory sm:py-36">
      <div className="container-luxe relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionHeading eyebrow={dict.eyebrow} title={dict.title} tone="dark" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-[17px] leading-relaxed text-mist lg:ml-auto">{dict.desc}</p>
          </Reveal>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2">
          <svg viewBox="0 0 1200 400" className="w-full" role="img" aria-label={dict.title}>
            <defs>
              <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#ffffff" fillOpacity="0.08" />
              </pattern>
              <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#9c7a3c" />
                <stop offset="1" stopColor="#e6d3a8" />
              </linearGradient>
              <radialGradient id="originGlow">
                <stop offset="0" stopColor="#c8a464" stopOpacity="0.6" />
                <stop offset="1" stopColor="#c8a464" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1200" height="400" fill="url(#dots)" />
            <circle cx={origin.x} cy={origin.y} r="90" fill="url(#originGlow)" />

            {nodes.map((n, i) => (
              <g key={i}>
                <motion.path
                  d={arc(origin, n)}
                  stroke="url(#route)"
                  strokeWidth="1.4"
                  fill="none"
                  strokeDasharray="1 0"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
                <circle r="3" fill="#e6d3a8" opacity="0">
                  <animateMotion dur="3.2s" begin={`${2 + i * 0.4}s`} repeatCount="indefinite" path={arc(origin, n)} />
                  <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" begin={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + i * 0.15, duration: 0.6 }}
                >
                  <circle cx={n.x} cy={n.y} r="11" fill="#c8a464" fillOpacity="0.18" />
                  <circle cx={n.x} cy={n.y} r="4.5" fill="#c8a464" />
                  <text
                    x={n.x}
                    y={n.y + 30}
                    textAnchor="middle"
                    fill="#f5f1e9"
                    fillOpacity="0.75"
                    fontSize="14"
                    fontWeight="500"
                    letterSpacing="0.5"
                  >
                    {dict.regions[i]?.name}
                  </text>
                </motion.g>
              </g>
            ))}

            <circle cx={origin.x} cy={origin.y} r="7" fill="#f5f1e9" />
            <circle cx={origin.x} cy={origin.y} r="14" fill="none" stroke="#f5f1e9" strokeOpacity="0.4">
              <animate attributeName="r" values="10;28" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <text x={origin.x + 18} y={origin.y - 14} fill="#f5f1e9" fontSize="15" fontWeight="600" letterSpacing="1.5">
              {dict.origin}
            </text>
          </svg>
        </div>

        <Stagger className="mt-6 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {dict.regions.map((r, i) => (
            <StaggerItem key={r.name} className="group bg-ink p-7 transition-colors duration-500 hover:bg-ink-2">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold">{r.name}</h3>
              </div>
              <p className="mt-2 text-[14px] text-mist">{r.countries}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
