import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Quote, Youtube } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Logo } from "./Navbar";
import { ADDRESS, EMAIL, FLOORS, FloorTag, PHONE, Reveal, btnPrimary, scrollToId } from "./shared";

const reviews = [
  { q: "VK modernised our 22-year-old lifts in just three weeks. Residents noticed the smoother ride on day one.", n: "R. Srinivasan", r: "Secretary, Lakeview Apartments" },
  { q: "Their 24/7 team reached our hospital in under 40 minutes at 2 AM. That reliability is priceless.", n: "Dr. Meena Iyer", r: "Facilities Head, Sunrise Hospital" },
  { q: "Transparent quote, no hidden costs, and the installation team was spotless and punctual.", n: "Arjun Patel", r: "Owner, Patel Residency" },
  { q: "We moved our entire mall's AMC to VK. Breakdowns dropped by more than half in the first year.", n: "Kavya Reddy", r: "Operations, Grand Square Mall" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);
  const r = reviews[i] ?? reviews[0]!;
  return (
    <section id="testimonials" className="py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal><div className="flex justify-center"><FloorTag n="06" label="Testimonials" /></div></Reveal>
        <Quote className="mx-auto h-12 w-12 text-amber" />
        <div className="relative mt-8 min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <blockquote className="font-display text-2xl font-medium leading-snug md:text-4xl">“{r.q}”</blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold text-amber">{r.n}</p>
                <p className="text-sm text-muted-foreground">{r.r}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Show review ${k + 1}`} className={`h-1 rounded-full transition-all ${k === i ? "w-10 bg-primary" : "w-4 bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

const field = "w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-amber focus:outline-none";

export function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks! Our team will call you within 2 working hours.");
    e.currentTarget.reset();
  };
  return (
    <section id="contact" className="bg-card py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal><FloorTag n="07" label="Contact" /></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl font-bold md:text-5xl">Get a free quote.</h2></Reveal>
          <Reveal delay={0.2}><p className="mt-6 text-lg text-muted-foreground">Tell us about your building. An engineer will get back with a site visit slot and an itemised estimate.</p></Reveal>
          <div className="mt-10 space-y-5">
            {[{ i: Phone, v: PHONE, h: `tel:${PHONE.replace(/\s/g, "")}` }, { i: Mail, v: EMAIL, h: `mailto:${EMAIL}` }, { i: MapPin, v: ADDRESS }].map((c) => (
              <Reveal key={c.v}>
                <a href={c.h} className="flex items-start gap-4 hover:text-amber">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border"><c.i className="h-5 w-5 text-amber" /></span>
                  <span className="pt-2.5">{c.v}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal x={50} className="lg:col-span-3">
          <form onSubmit={onSubmit} className="grid gap-5 rounded-sm border border-border bg-background p-6 md:grid-cols-2 md:p-10">
            <label className="space-y-2 text-sm"><span>Name</span><input required name="name" maxLength={100} className={field} placeholder="Your full name" /></label>
            <label className="space-y-2 text-sm"><span>Phone</span><input required name="phone" type="tel" maxLength={20} className={field} placeholder="+91" /></label>
            <label className="space-y-2 text-sm md:col-span-2"><span>Email</span><input required name="email" type="email" maxLength={255} className={field} placeholder="you@company.com" /></label>
            <label className="space-y-2 text-sm md:col-span-2"><span>Service needed</span>
              <select required name="service" defaultValue="" className={field}>
                <option value="" disabled>Select a service</option>
                <option>New Installation</option><option>Maintenance</option><option>Repair</option><option>Modernization</option>
              </select>
            </label>
            <label className="space-y-2 text-sm md:col-span-2"><span>Message</span><textarea name="message" rows={4} maxLength={1000} className={field} placeholder="Building type, floors, current lift details..." /></label>
            <button type="submit" className={`${btnPrimary} md:col-span-2`}>Request My Free Quote</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border pb-24 pt-20 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-4 md:px-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">Reliable Solutions. Safe Elevation.</p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((I, k) => (
              <a key={k} href="#" aria-label="Social link" className="flex h-10 w-10 items-center justify-center rounded-sm border border-border transition-all hover:-translate-y-0.5 hover:border-amber hover:text-amber"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display font-semibold">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {FLOORS.map((f) => <li key={f.id}><button onClick={() => scrollToId(f.id)} className="amber-underline hover:text-foreground">{f.label}</button></li>)}
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["New Installation", "Maintenance", "Repair", "Modernization"].map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground"><li>{PHONE}</li><li>{EMAIL}</li><li>{ADDRESS}</li></ul>
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-7xl px-5 text-xs text-muted-foreground md:px-8">© {new Date().getFullYear()} VK Elevators. All rights reserved.</p>
    </footer>
  );
}

export function CallNow() {
  return (
    <a href={`tel:${PHONE.replace(/\s/g, "")}`} className={`${btnPrimary} fixed inset-x-4 bottom-4 z-40 shadow-glow md:hidden`}>
      <Phone className="h-4 w-4" /> Call Now
    </a>
  );
}
