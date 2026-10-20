import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, ShieldCheck, Timer } from "lucide-react";
import { useRef } from "react";
import about from "@/assets/about.jpg";
import { FloorTag, Reveal } from "./shared";

const badges = [
  { icon: BadgeCheck, t: "Certified Technicians", d: "Factory-trained, licensed engineers" },
  { icon: ShieldCheck, t: "Safety-First", d: "Every job audited to IS & EN 81 norms" },
  { icon: Timer, t: "Quick Response", d: "Average 45-minute emergency callout" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);
  return (
    <section id="about" ref={ref} className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <Reveal><FloorTag n="02" label="About Us" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl font-bold leading-tight md:text-6xl">Engineering every ride since 2010.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-muted-foreground">
              VK Elevators began as a two-person service crew keeping Chennai's apartment lifts running. Today we design, install and care for over 500 elevators across residential towers, hospitals, malls and factories.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We stay brand-agnostic, stock genuine parts, and treat every lift like our own family rides in it — because someone's family does.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {badges.map((b, i) => (
              <Reveal key={b.t} delay={0.3 + i * 0.1}>
                <div className="h-full rounded-sm border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber/60">
                  <b.icon className="h-7 w-7 text-amber" />
                  <p className="mt-4 font-display font-semibold">{b.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal x={60}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.img style={{ y }} src={about} alt="VK technician servicing an elevator traction machine" loading="lazy" width={1280} height={1280} className="absolute inset-0 h-[125%] w-full -top-[12%] object-cover" />
            <div className="absolute bottom-0 left-0 bg-primary px-6 py-5 text-primary-foreground">
              <p className="font-display text-4xl font-bold">15+</p>
              <p className="text-xs font-semibold uppercase tracking-widest">Years in service</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
