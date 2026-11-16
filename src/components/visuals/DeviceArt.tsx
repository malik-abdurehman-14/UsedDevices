import type { SVGProps } from "react";

/** Elegant generic laptop illustration (no brand marks). */
export function LaptopArt({ id = "lp", ...props }: SVGProps<SVGSVGElement> & { id?: string }) {
  return (
    <svg viewBox="0 0 640 420" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2f38" />
          <stop offset="1" stopColor="#14171d" />
        </linearGradient>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2030" />
          <stop offset="0.55" stopColor="#0d1018" />
          <stop offset="1" stopColor="#2a2216" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.7" cy="0.25" r="0.7">
          <stop offset="0" stopColor="#c8a464" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c8a464" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a404b" />
          <stop offset="1" stopColor="#1a1d23" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8a464" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e6d3a8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c8a464" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* lid */}
      <rect x="92" y="18" width="456" height="300" rx="18" fill={`url(#${id}-body)`} stroke="#ffffff" strokeOpacity="0.08" />
      <rect x="108" y="34" width="424" height="268" rx="8" fill={`url(#${id}-screen)`} />
      <rect x="108" y="34" width="424" height="268" rx="8" fill={`url(#${id}-glow)`} />
      {/* on-screen UI */}
      <rect x="132" y="60" width="120" height="8" rx="4" fill="#e6d3a8" fillOpacity="0.7" />
      <rect x="132" y="78" width="200" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
      <rect x="132" y="92" width="160" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={132 + i * 128} y="130" width="112" height="140" rx="10" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
          <rect x={146 + i * 128} y="146" width="40" height="40" rx="10" fill="#c8a464" fillOpacity={0.25 + i * 0.15} />
          <rect x={146 + i * 128} y="204" width="72" height="6" rx="3" fill="#ffffff" fillOpacity="0.25" />
          <rect x={146 + i * 128} y="218" width="52" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
          <rect x={146 + i * 128} y="244" width="84" height="12" rx="6" fill="#ffffff" fillOpacity="0.07" />
        </g>
      ))}
      <circle cx="320" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.25" />
      {/* base */}
      <path d="M40 330h560l-22 40c-4 7-11 12-20 12H82c-9 0-16-5-20-12L40 330z" fill={`url(#${id}-base)`} />
      <rect x="40" y="318" width="560" height="14" rx="6" fill="#4a505b" />
      <rect x="40" y="318" width="560" height="2" fill={`url(#${id}-edge)`} />
      <rect x="276" y="318" width="88" height="7" rx="3.5" fill="#22262d" />
      <ellipse cx="320" cy="400" rx="280" ry="12" fill="#000" fillOpacity="0.35" />
    </svg>
  );
}

/** Elegant generic smartphone illustration (no brand marks). */
export function PhoneArt({ id = "ph", ...props }: SVGProps<SVGSVGElement> & { id?: string }) {
  return (
    <svg viewBox="0 0 220 440" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${id}-frame`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6d3a8" />
          <stop offset="0.45" stopColor="#9c7a3c" />
          <stop offset="1" stopColor="#e6d3a8" />
        </linearGradient>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#262033" />
          <stop offset="0.5" stopColor="#0e1118" />
          <stop offset="1" stopColor="#30261a" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.3" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#c8a464" stopOpacity="0.45" />
          <stop offset="1" stopColor="#c8a464" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="4" y="4" width="212" height="432" rx="38" fill={`url(#${id}-frame)`} />
      <rect x="9" y="9" width="202" height="422" rx="34" fill="#0b0d11" />
      <rect x="15" y="15" width="190" height="410" rx="29" fill={`url(#${id}-screen)`} />
      <rect x="15" y="15" width="190" height="410" rx="29" fill={`url(#${id}-glow)`} />
      <rect x="80" y="28" width="60" height="18" rx="9" fill="#000" />
      <text x="34" y="96" fill="#f5f1e9" fillOpacity="0.9" fontSize="30" fontFamily="ui-serif, Georgia, serif">9:41</text>
      <rect x="34" y="110" width="80" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.25" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={34 + c * 40}
            y={160 + r * 46}
            width="30"
            height="30"
            rx="9"
            fill={(r + c) % 3 === 0 ? "#c8a464" : "#ffffff"}
            fillOpacity={(r + c) % 3 === 0 ? 0.45 : 0.08}
          />
        )),
      )}
      <rect x="28" y="370" width="164" height="38" rx="19" fill="#ffffff" fillOpacity="0.07" />
      <rect x="80" y="414" width="60" height="4" rx="2" fill="#ffffff" fillOpacity="0.4" />
    </svg>
  );
}
