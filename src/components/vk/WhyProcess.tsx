import { motion, useScroll, useTransform } from "framer-motion";
import { Award, BadgeIndianRupee, CalendarCheck, Clock, Package, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { Counter, FloorTag, Reveal } from "./shared";

const features = [
  { icon: Clock, t: "24/7 Emergency Support", d: "A live engineer answers, day or night, with rapid on-site response." },
  { icon: Award, t: "Certified Engineers", d: "Licensed, factory-trained and safety-audited every year." },
  { icon: Package, t: "Quality Parts", d: "Genuine and OEM-grade components with full warranty." },
  { icon: CalendarCheck, t: "Preventive Plans", d: "Scheduled AMC visits that stop breakdowns before they start." },
  { icon: BadgeIndianRupee, t: "Transparent Pricing", d: "Itemised quotes. No surprise charges, ever." },
  { icon: ShieldCheck, t: "Safety Compliance", d: "Every lift meets IS 14665 and EN 81 standards." },
];

export function WhyUs() {
  return (
    <section id="why" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal><FloorTag n="04" label="Why VK" /></Reveal>
        <Reveal delay={0.1}><h2 className="max-w-3xl text-4xl font-bold md:text-6xl">Precision you can feel on every floor.</h2></Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08} className="bg-background">
              <div className="group h-full p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-card">
                <f.icon className="h-8 w-8 text-amber transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-6 text-xl font-semibold">{f.t}</h3>
                <p className="mt-2 text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10 lg:grid-cols-4">
          <Counter to={500} suffix="+" label="Installations" />
          <Counter to={24} suffix="/7" label="Support" />
          <Counter to={15} suffix="+" label="Years" />
          <Counter to={100} suffix="%" label="Safety Compliance" />
        </div>
      </div>
    </section>
  );
}

const steps = [
  { t: "Consultation", d: "We understand your building, traffic and budget." },
  { t: "Site Survey", d: "Engineers measure the shaft, pit and power supply." },
  { t: "Installation", d: "Rails, machine, cabin and doors — fitted to the millimetre." },
  { t: "Testing", d: "Load, speed and safety-gear tests before certification." },
  { t: "Maintenance", d: "Ongoing AMC care to keep every ride smooth." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section id="process" className="bg-card py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal><FloorTag n="05" label="Process" /></Reveal>
        <Reveal delay={0.1}><h2 className="text-4xl font-bold md:text-6xl">From blueprint to first ride.</h2></Reveal>
        <div ref={ref} className="relative mt-16 pl-12 md:pl-16">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-6" />
          <motion.div style={{ scaleY }} className="absolute left-4 top-0 h-full w-0.5 origin-top bg-primary md:left-6" />
          {steps.map((s, i) => (
            <Reveal key={s.t} x={40} className="relative pb-14 last:pb-0">
              <span className="absolute -left-12 top-0 flex h-9 w-9 items-center justify-center rounded-sm border border-amber bg-background font-display text-xs font-bold text-amber md:-left-16 md:ml-1">
                0{i + 1}
              </span>
              <h3 className="text-2xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
