import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import hero from "@/assets/hero.jpg";
import { btnGhost, btnPrimary, scrollToId } from "./shared";

const lines = ["Reliable Solutions.", "Safe Elevation."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const k = reduce ? 0 : 1;
  const bgY = useTransform(p, [0, 1], ["0%", `${25 * k}%`]);
  const midY = useTransform(p, [0, 1], ["0%", `${55 * k}%`]);
  const fgY = useTransform(p, [0, 1], ["0%", `${90 * k}%`]);
  const fade = useTransform(p, [0, 0.7], [1, reduce ? 1 : 0]);

  return (
    <section id="home" ref={ref} className="relative h-screen min-h-[640px] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img src={hero} alt="Modern glass elevator shaft rising through a skyscraper atrium" width={1920} height={1088} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 hero-fade" />
      {/* midground: steel beams + light streaks */}
      <motion.div style={{ y: midY }} className="pointer-events-none absolute inset-0 shaft-lines">
        {[12, 28, 71, 88].map((l, i) => (
          <motion.span
            key={l}
            className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-amber to-transparent"
            style={{ left: `${l}%` }}
            animate={reduce ? {} : { y: ["-20vh", "110vh"] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
          />
        ))}
        <div className="absolute left-[6%] top-0 h-full w-3 steel-panel opacity-40" />
        <div className="absolute right-[6%] top-0 h-full w-3 steel-panel opacity-40" />
      </motion.div>

      <motion.div style={{ y: fgY, opacity: fade }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 md:px-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6 font-display text-xs font-semibold uppercase tracking-[0.35em] text-amber">
          Floor 01 · VK Elevators
        </motion.p>
        <h1 className="font-display text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-2">
              <motion.span
                className={`block ${i === 1 ? "text-amber" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8 max-w-xl text-lg text-foreground/80">
          Installation, maintenance, repair and modernization of passenger, goods and home elevators — engineered for safety, serviced around the clock.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <button onClick={() => scrollToId("contact")} className={btnPrimary}>Get a Free Quote</button>
          <button onClick={() => scrollToId("services")} className={btnGhost}>Our Services</button>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId("about")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        animate={reduce ? {} : { y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
        <ChevronDown className="h-5 w-5 text-amber" />
      </motion.button>
    </section>
  );
}

export function Doors() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0.3, 0.6], ["0%", reduce ? "0%" : "-100%"]);
  const right = useTransform(scrollYProgress, [0.3, 0.6], ["0%", reduce ? "0%" : "100%"]);
  if (reduce) return null;
  return (
    <div ref={ref} className="relative h-[120vh]" aria-hidden>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-amber">Arriving</p>
          <p className="mt-3 font-display text-7xl font-bold md:text-9xl">02</p>
          <p className="mt-2 text-muted-foreground">About VK Elevators</p>
        </div>
        <motion.div style={{ x: left }} className="absolute inset-y-0 left-0 w-1/2 steel-panel border-r border-foreground/20 shadow-2xl" />
        <motion.div style={{ x: right }} className="absolute inset-y-0 right-0 w-1/2 steel-panel border-l border-foreground/20 shadow-2xl" />
        <motion.div style={{ opacity: useTransform(scrollYProgress, [0.25, 0.32], [1, 0]) }} className="absolute top-1/2 left-1/2 h-24 w-1 -translate-x-1/2 -translate-y-1/2 bg-amber" />
      </div>
    </div>
  );
}
