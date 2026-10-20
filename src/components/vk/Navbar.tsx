import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FLOORS, btnPrimary, scrollToId } from "./shared";

export function Logo() {
  return (
    <button onClick={() => scrollToId("home")} className="flex items-center gap-2.5" aria-label="VK Elevators home">
      <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground">
        <ArrowUpDown className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="font-display text-lg font-bold tracking-[0.12em]">
        VK <span className="text-amber">ELEVATORS</span>
      </span>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-border shadow-2xl" : "bg-transparent"}`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <ul className="hidden items-center gap-7 lg:flex">
          {FLOORS.slice(1).map((f) => (
            <li key={f.id}>
              <button onClick={() => go(f.id)} className="amber-underline pb-1 text-sm text-foreground/80 hover:text-foreground">
                {f.label}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => go("contact")} className={`${btnPrimary} hidden !py-2.5 lg:inline-flex`}>
          Get a Quote
        </button>
        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-7 w-7" />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed inset-0 z-50 flex flex-col bg-background p-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-7 w-7" />
              </button>
            </div>
            <ul className="mt-12 space-y-2">
              {FLOORS.map((f, i) => (
                <motion.li key={f.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                  <button onClick={() => go(f.id)} className="flex w-full items-baseline gap-4 border-b border-border py-4 text-left">
                    <span className="font-display text-sm text-amber">0{i + 1}</span>
                    <span className="font-display text-2xl font-semibold">{f.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <button onClick={() => go("contact")} className={`${btnPrimary} mt-auto`}>
              Get a Free Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function FloorIndicator() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const on = () => {
      const mid = window.innerHeight / 2;
      let idx = 0;
      FLOORS.forEach((f, i) => {
        const el = document.getElementById(f.id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-sm border border-border glass p-1.5 md:flex">
      <motion.div key={active} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-1 text-amber">
        <ArrowUpDown className="h-4 w-4" />
      </motion.div>
      {FLOORS.map((f, i) => (
        <button
          key={f.id}
          onClick={() => scrollToId(f.id)}
          aria-label={`Go to ${f.label}`}
          aria-current={i === active}
          className={`group relative flex h-9 w-9 items-center justify-center rounded-sm font-display text-xs font-semibold transition-all ${i === active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
        >
          0{i + 1}
          <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-sm bg-card px-2 py-1 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100">
            {f.label}
          </span>
        </button>
      ))}
    </div>
  );
}
