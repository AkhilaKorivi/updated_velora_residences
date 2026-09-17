import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Ruler, DoorOpen, Bath, Sun } from "lucide-react";
import clsx from "clsx";
import { residences } from "../data/residences";
import SectionHeading from "./ui/SectionHeading";
import { usePlan } from "./PlanContext";
import { useEnquiry } from "./EnquiryContext";

const scrollToFloorPlans = (type) => {
  document.getElementById("floor-plans")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const meta = [
  {
    icon: Ruler,
    key: "area",
  },
  {
    icon: DoorOpen,
    key: "bedrooms",
    label: (v) => `${v} Bedrooms`,
  },
  {
    icon: Bath,
    key: "bathrooms",
    label: (v) => `${v} Bathrooms`,
  },
  {
    icon: Sun,
    key: "balcony",
    label: (v) => v,
  },
];

export default function ResidenceSelector() {
  const [current, setCurrent] = useState(0);
  const { selectPlan } = usePlan();
  const { openEnquiry } = useEnquiry();
  const res = residences[current];

  const pick = (i) => {
    setCurrent(i);
    selectPlan(residences[i].type);
  };

  return (
    <section id="residences" className="relative bg-charcoal py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="The Residences"
          title={
            <>
              Two compositions.
              <span className="italic text-gold-light"> One standard.</span>
            </>
          }
          description="Choose the residence that suits your life. Both typologies share the same obsessive attention to light, proportion and finish."
        />

        <div className="mt-14 flex items-center justify-center gap-2">
          {residences.map((r, i) => (
            <button
              key={r.type}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={current === i}
              className={clsx(
                "relative px-8 py-4 text-sm font-light uppercase tracking-lux transition-colors duration-300 sm:px-12",
                current === i ? "text-ink" : "text-smoke/70 hover:text-smoke"
              )}
            >
              {current === i && (
                <motion.span
                  layoutId="residence-tab"
                  className="absolute inset-0 bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{r.type.replace(" ", "")}</span>
            </button>
          ))}
        </div>

        <div className="relative mt-12 grid gap-10 border border-line bg-ink p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="relative h-[300px] overflow-hidden sm:h-[420px] lg:h-[520px]"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={res.image}
                alt={`${res.type} apartment interior at Velora Residences`}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ animation: "kenburns 22s ease-in-out infinite alternate" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" aria-hidden="true" />
              <span className="absolute left-5 top-5 bg-ink/70 px-4 py-2 text-[10px] uppercase tracking-lux text-gold backdrop-blur-sm">
                {res.type}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="h-display text-4xl text-smoke sm:text-5xl">{res.type}</h3>
              <p className="mt-3 flex items-center gap-3 text-gold">
                <span className="h-display text-2xl sm:text-3xl">{res.area}</span>
                <span className="text-[10px] uppercase tracking-lux text-mist">Super Built-up*</span>
              </p>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
                {meta.map((m) => (
                  <div key={m.key} className="flex items-center gap-3 bg-charcoal px-5 py-4">
                    <m.icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span className="text-xs uppercase tracking-wide text-smoke/85">
                      {m.label ? m.label(res[m.key]) : res[m.key]}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-mist">{res.description}</p>

              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-2">
                {res.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-smoke/80">
                    <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToFloorPlans(res.type)}
                  className="btn-lux btn-outline w-full sm:w-auto"
                  data-cursor="cta"
                >
                  View Floor Plan
                </button>
                <button
                  type="button"
                  onClick={() => openEnquiry(res.type)}
                  className="btn-lux btn-gold w-full sm:w-auto"
                  data-cursor="cta"
                >
                  Enquire · {res.type}
                </button>
              </div>

              <p className="mt-4 text-[11px] text-mist/70">
                *Areas are indicative and subject to final measurement by the developer.
              </p>
            </motion.div>
          </AnimatePresence>

          </div>
      </div>
    </section>
  );
}