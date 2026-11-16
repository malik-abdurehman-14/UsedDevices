import type { SVGProps } from "react";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.7.22 1.35.19 1.86.11.57-.08 1.75-.71 2-1.4.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.6.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.72 2.79a9.43 9.43 0 0 1 2.78 6.72c0 5.24-4.27 9.5-9.5 9.5zm8.09-17.6A11.36 11.36 0 0 0 12.05.55C5.74.55.6 5.68.6 12c0 2.02.53 3.99 1.53 5.72L.5 23.5l5.92-1.55a11.42 11.42 0 0 0 5.63 1.43h.01c6.31 0 11.45-5.13 11.45-11.45 0-3.06-1.19-5.93-3.36-8.1z" />
    </svg>
  );
}

/** Used Devices mark — a laptop with a phone in front; the renew arrow signals pre-owned devices given a second life. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="ud-logo-g" x1="2" y1="6" x2="38" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F1E2BD" />
          <stop offset=".5" stopColor="#C8A464" />
          <stop offset="1" stopColor="#8E6C33" />
        </linearGradient>
      </defs>
      <rect x="4.75" y="8.75" width="23.5" height="16" rx="2.25" stroke="url(#ud-logo-g)" strokeWidth="1.5" />
      <path d="M1.5 27.25h26.5" stroke="url(#ud-logo-g)" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 27.25h7" stroke="#0A0C10" strokeWidth=".9" strokeLinecap="round" opacity=".55" />
      <path
        d="M18.6 16.75a4.1 4.1 0 1 1-4.1-4.1c1.15 0 2.25.46 3.07 1.25l1.03 1.03M18.6 12.4v2.55h-2.55"
        stroke="url(#ud-logo-g)"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="25" y="13" width="12.5" height="22" rx="2.8" fill="#0A0C10" />
      <rect x="26.25" y="14.25" width="10" height="19.5" rx="2" fill="url(#ud-logo-g)" />
      <rect x="27.6" y="16.4" width="7.3" height="14.6" rx=".9" fill="#0A0C10" opacity=".88" />
      <path d="M29.9 15.35h2.7" stroke="#0A0C10" strokeWidth=".7" strokeLinecap="round" />
    </svg>
  );
}
