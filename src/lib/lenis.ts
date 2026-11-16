import type Lenis from "lenis";

/** Shared Lenis instance so overlays (modal, mobile menu) can pause smooth scrolling. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export function lockScroll(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
  document.body.style.overflow = locked ? "hidden" : "";
}
