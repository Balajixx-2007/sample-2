import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";

export const FLOORS = [
  { id: "home", label: "Lobby" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why Us" },
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Reviews" },
  { id: "contact", label: "Contact" },
] as const;

export const PHONE = "+91 98765 43210";
export const EMAIL = "info@vkelevators.in";
export const ADDRESS = "Plot 24, Industrial Estate, Guindy, Chennai 600032";

let lenisRef: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef) lenisRef.scrollTo(el, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef = null;
    };
  }, [reduce]);
  return null;
}

export function Reveal({
  children,
  delay = 0,
  x = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: x ? 0 : 40, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FloorTag({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-amber">
      <span className="rounded-sm border border-amber/40 px-2 py-1">{n}</span>
      <span className="h-px w-10 bg-amber/50" />
      <span>{label}</span>
    </div>
  );
}

export function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <div ref={ref} className="border-l border-amber/40 pl-5">
      <div className="font-display text-4xl font-bold text-foreground md:text-5xl">
        {val}
        <span className="text-amber">{suffix}</span>
      </div>
      <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-sm border border-foreground/25 px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-amber hover:text-amber";
