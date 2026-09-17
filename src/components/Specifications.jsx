import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Building, LayoutGrid, CookingPot, Bath, Zap, Shield, Plus } from "lucide-react";
import clsx from "clsx";
import { specs } from "../data/specifications";
import SectionHeading from "./ui/SectionHeading";

const iconMap = {
  Building,
  LayoutGrid,
  CookingPot,
  Bath,
  Zap,
  Shield,
};

export default function Specifications() {
  const [open, setOpen] = useState("structure");
  const reduce = useReducedMotion();

  return (
    <section id="specifications" className="relative bg-ink py-24 sm:py-32">
      <div className="container-lux grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Specifications"
            title={
              <>
                Craft is in the
                <span className="italic text-gold-light"> detail</span>
              </>
            }
            description="Structural integrity, premium finishes and quiet systems — specified to a deliberate standard."
          />
          <p className="mt-8 max-w-md border-l-2 border-gold pl-5 text-[13px] leading-relaxed text-mist">
            The specifications listed here are indicative/demo specifications for presentation. Final
            specifications are shared with buyers at the time of booking.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {specs.map((s) => {
            const Icon = iconMap[s.icon] || Building;
            const isOpen = open === s.id;
            return (
              <div key={s.id}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-5 py-6 text-left"
                >
                  <span
                    className={clsx(
                      "flex h-12 w-12 shrink-0 items-center justify-center border transition-colors duration-300",
                      isOpen
                        ? "border-gold bg-gold text-ink"
                        : "border-line text-gold group-hover:border-gold/60"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className={clsx("h-display block text-xl transition-colors sm:text-2xl", isOpen ? "text-gold-light" : "text-smoke")}>
                      {s.title}
                    </span>
                    <span className="mt-1 block text-sm text-mist">{s.summary}</span>
                  </span>
                  <Plus
                    className={clsx("h-5 w-5 shrink-0 text-gold transition-transform duration-300", isOpen && "rotate-45")}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-x-8 gap-y-3 pb-7 sm:grid-cols-2">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-smoke/75">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}