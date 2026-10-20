import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Building2, Cpu, Wrench, Settings2 } from "lucide-react";
import { useRef, useState } from "react";
import install from "@/assets/svc-install.jpg";
import maint from "@/assets/svc-maint.jpg";
import repair from "@/assets/svc-repair.jpg";
import modern from "@/assets/svc-modern.jpg";
import { FloorTag } from "./shared";

const services = [
  { t: "New Installation", icon: Building2, img: install, d: "Passenger, home, hospital and goods lifts — from shaft design and civil coordination to commissioning and handover.", pts: ["MRL & traction systems", "Custom cabin finishes", "Turnkey project management"] },
  { t: "Maintenance", icon: Settings2, img: maint, d: "Annual maintenance contracts with scheduled preventive checks that keep your lift smooth, quiet and compliant.", pts: ["Monthly safety inspections", "Lubrication & rope checks", "Digital service logs"] },
  { t: "Repair", icon: Wrench, img: repair, d: "Fast diagnosis and repair for breakdowns, door faults, controller errors and levelling issues — any make, any model.", pts: ["24/7 emergency callout", "Genuine spare parts", "Multi-brand expertise"] },
  { t: "Modernization", icon: Cpu, img: modern, d: "Upgrade ageing lifts with energy-efficient drives, smart controllers and modern cabins — without replacing the whole system.", pts: ["VVVF drive upgrades", "Touchscreen COPs", "Up to 40% energy savings"] },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(3, Math.floor(v * 4))));
  const s = services[i] ?? services[0]!;
  return (
    <section id="services" ref={ref} className="relative h-[400vh] bg-card">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <FloorTag n="03" label="Services" />
              <h2 className="text-4xl font-bold md:text-5xl">Four ways we keep you moving.</h2>
            </div>
            <div className="flex gap-2">
              {services.map((x, k) => (
                <span key={x.t} className={`font-display text-sm font-semibold transition-colors ${k === i ? "text-amber" : "text-muted-foreground"}`}>0{k + 1}</span>
              ))}
            </div>
          </div>
          <div className="mt-6 h-0.5 w-full bg-border">
            <motion.div className="h-full origin-left bg-primary" style={{ scaleX: scrollYProgress }} />
          </div>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <AnimatePresence mode="wait">
              <motion.div key={s.t} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5 }}>
                <s.icon className="h-12 w-12 text-amber" strokeWidth={1.5} />
                <h3 className="mt-6 text-3xl font-bold md:text-5xl">{s.t}</h3>
                <p className="mt-5 max-w-lg text-lg text-muted-foreground">{s.d}</p>
                <ul className="mt-6 space-y-2">
                  {s.pts.map((p) => (
                    <li key={p} className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-amber" />{p}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-sm sm:block">
              <AnimatePresence mode="popLayout">
                <motion.img key={s.img} src={s.img} alt={s.t} loading="lazy" width={1280} height={960}
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }} animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 h-full w-full object-cover" />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
