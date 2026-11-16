"use client";

import { animate, motion, useInView, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Stagger children that use `revealItem` variants. */
export function Stagger({ children, className, gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={revealItem} className={className}>
      {children}
    </motion.div>
  );
}

/** Line-by-line masked text reveal for headings. */
export function MaskText({ lines, className, lineClassName, delay = 0 }: { lines: ReactNode[]; className?: string; lineClassName?: (i: number) => string; delay?: number }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName?.(i) ?? ""}`}
            variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1.1, ease } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Number that counts up when visible. */
export function Counter({ value, prefix = "", suffix = "", locale = "en" }: { value: number; prefix?: string; suffix?: string; locale?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 2.2, ease });
    return () => controls.stop();
  }, [inView, mv, value]);

  useEffect(
    () =>
      mv.on("change", (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v).toLocaleString(locale)}${suffix}`;
      }),
    [mv, prefix, suffix, locale],
  );

  return (
    <span ref={ref}>
      {prefix}
      {(0).toLocaleString(locale)}
      {suffix}
    </span>
  );
}

/** Element that gently follows the cursor. */
export function Magnetic({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 18 });
  const y = useSpring(0, { stiffness: 200, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts in 3D toward the cursor. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 150, damping: 20 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
