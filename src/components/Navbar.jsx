import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import clsx from "clsx";
import { navLinks, contact } from "../config";
import { useEnquiry } from "./EnquiryContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { openEnquiry } = useEnquiry();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 50));
  }, [scrollY]);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-500",
          scrolled
            ? "border-b border-line bg-ink/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent py-5"
        )}
      >
        <nav className="container-lux flex items-center justify-between gap-6" aria-label="Main">
          <a
            href="#home"
            data-cursor="cta"
            className="group flex items-baseline gap-2"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            aria-label="Velora Residences — home"
          >
            <span className="h-display text-xl tracking-[0.18em] text-smoke sm:text-2xl">
              VELORA
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-lux text-gold sm:inline">
              Residences
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className={clsx(
                    "group relative pb-1 text-[11px] font-medium uppercase tracking-wide2 transition-colors duration-300",
                    active === l.href.slice(1) ? "text-gold" : "text-smoke/75 hover:text-smoke"
                  )}
                >
                  {l.label}
                  <span
                    className={clsx(
                      "absolute bottom-0 left-0 h-px bg-gold transition-all duration-300",
                      active === l.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={contact.phoneHref}
              className="hidden items-center gap-2 text-[11px] uppercase tracking-wide2 text-mist transition-colors hover:text-gold xl:flex"
              aria-label={`Call ${contact.phone}`}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {contact.phone}
            </a>
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="btn-lux hidden bg-gold px-6 py-3 text-ink transition-colors duration-300 hover:bg-gold-light md:inline-flex"
            >
              Enquire Now
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center border border-line text-smoke transition-colors hover:border-gold hover:text-gold lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[95] flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="container-lux flex items-center justify-between py-5">
              <span className="h-display text-xl tracking-[0.18em] text-smoke">VELORA</span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center border border-line text-smoke hover:text-gold"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="container-lux flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="group flex items-center gap-4 border-b border-line/50 py-4"
                >
                  <span className="text-[10px] text-gold">0{i + 1}</span>
                  <span className="h-display text-3xl text-smoke transition-transform duration-300 group-hover:translate-x-2">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="container-lux pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openEnquiry();
                }}
                className="btn-lux w-full bg-gold text-ink"
              >
                Enquire Now
              </button>
              <p className="mt-6 text-center text-[11px] uppercase tracking-lux text-mist">
                {contact.phone} · Madhapur, Hyderabad
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}