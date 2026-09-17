import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  Building2,
  Briefcase,
  Cpu,
  GraduationCap,
  BookOpen,
  HeartPulse,
  Hospital,
  ShoppingBag,
  Store,
  TrainFront,
  Plane,
  TreePine,
  MapPin,
  Navigation,
  Info,
} from "lucide-react";
import { pois, locationTabs, estimatorNote } from "../data/locations";
import SectionHeading from "./ui/SectionHeading";
import AnimatedCounter from "./ui/AnimatedCounter";

const iconMap = {
  building: Building2,
  briefcase: Briefcase,
  cpu: Cpu,
  graduation: GraduationCap,
  book: BookOpen,
  heart: HeartPulse,
  cross: Hospital,
  shopping: ShoppingBag,
  store: Store,
  train: TrainFront,
  plane: Plane,
  tree: TreePine,
};

const C = 50;

export default function LocationSection() {
  const [filter, setFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState("hitec");

  const shown = useMemo(
    () => (filter === "ALL" ? pois : pois.filter((p) => p.category === filter)),
    [filter]
  );
  const selected = pois.find((p) => p.id === selectedId) || pois[0];

  const select = (id) => {
    setSelectedId(id);
    if (filter !== "ALL" && !shown.some((p) => p.id === id)) setFilter("ALL");
  };

  return (
    <section id="location" className="relative bg-charcoal py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Location"
          title={
            <>
              Connected to everything
              <span className="italic text-gold-light"> that matters</span>
            </>
          }
          description="Velora Residences — Madhapur, Hyderabad. A neighbourhood that works, shops, learns and breathes, all within minutes."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
              {locationTabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id)}
                  aria-pressed={filter === t.id}
                  className={clsx(
                    "relative shrink-0 border px-4 py-2 text-[10px] font-medium uppercase tracking-lux transition-colors",
                    filter === t.id
                      ? "border-gold bg-gold text-ink"
                      : "border-line text-smoke/60 hover:border-gold/60 hover:text-smoke"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <ul className="mt-6 space-y-2" aria-label="Nearby places">
              <AnimatePresence mode="popLayout">
                {shown.map((p) => {
                  const Icon = iconMap[p.icon] || MapPin;
                  const isSel = p.id === selectedId;
                  return (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                    >
                      <button
                        type="button"
                        onClick={() => select(p.id)}
                        aria-pressed={isSel}
                        className={clsx(
                          "group flex w-full items-center gap-4 border px-5 py-4 text-left transition-all duration-300",
                          isSel
                            ? "border-gold bg-graphite"
                            : "border-line bg-ink/40 hover:border-gold/50"
                        )}
                      >
                        <span
                          className={clsx(
                            "flex h-10 w-10 shrink-0 items-center justify-center border transition-colors",
                            isSel ? "border-gold bg-gold text-ink" : "border-line text-gold"
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-smoke">{p.name}</span>
                          <span className="mt-0.5 block text-[11px] uppercase tracking-wide text-mist">
                            {p.category}
                          </span>
                        </span>
                        <span className="text-right">
                          <span className="block text-sm text-gold-light">{p.distance}</span>
                          <span className="block text-[11px] text-mist">~{p.minutes} min</span>
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            <p className="mt-6 flex items-start gap-2 text-[11px] leading-relaxed text-mist/70">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" aria-hidden="true" />
              {estimatorNote}
            </p>
          </div>

          <div
            className="relative order-1 aspect-[4/5] overflow-hidden border border-line bg-[#12100d] sm:aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-[640px]"
            role="region"
            aria-label="Interactive map of the Madhapur locality"
          >
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(rgba(244,240,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,232,0.05) 1px, transparent 1px)", backgroundSize: "44px 44px" }} aria-hidden="true" />
            <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_20%,rgba(14,13,11,0.7)_100%)]" aria-hidden="true" />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <motion.line
                x1={C}
                y1={C}
                x2={selected.x}
                y2={selected.y}
                stroke="#b3965c"
                strokeWidth="0.35"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                key={selectedId}
              />
            </svg>

            {pois.map((p) => {
              const Icon = iconMap[p.icon] || MapPin;
              const isSel = p.id === selectedId;
              const dim = filter !== "ALL" && p.category !== filter;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => select(p.id)}
                  aria-label={`${p.name} — ${p.distance}`}
                  className={clsx(
                    "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                    dim ? "opacity-20" : "opacity-100"
                  )}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={clsx(
                      "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 sm:h-9 sm:w-9",
                      isSel
                        ? "scale-110 border-gold bg-gold text-ink shadow-glow"
                        : "border-gold/50 bg-ink/70 text-gold"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                  </span>
                  {isSel && (
                    <span className="pointer-events-none absolute left-full top-1/2 z-10 ml-1 -translate-y-1/2 whitespace-nowrap border border-gold/40 bg-ink/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-lux text-smoke backdrop-blur-sm">
                      {p.name}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-gold/15 text-center backdrop-blur-sm sm:h-16 sm:w-16">
                <span className="h-display text-[9px] leading-tight text-gold-light">VELORA</span>
              </span>
              <span className="absolute -bottom-2 left-1/2 h-4 w-1 -translate-x-1/2 bg-gold/70" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="mt-8 border border-line bg-ink p-7 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <Navigation className="h-5 w-5 text-gold" aria-hidden="true" />
                <div>
                  <p className="h-display text-2xl text-smoke sm:text-3xl">{selected.name}</p>
                  <p className="mt-1 max-w-lg text-sm text-mist">{selected.note}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex shrink-0 gap-8 border-t border-line pt-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <div>
                <p className="text-[10px] uppercase tracking-lux text-mist">Travel time</p>
                <p className="h-display mt-1 text-3xl text-gold-light sm:text-4xl">
                  <AnimatedCounter value={selected.minutes} suffix=" min" duration={1.2} />
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-lux text-mist">Distance</p>
                <p className="h-display mt-1 text-3xl text-smoke sm:text-4xl">{selected.distance}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-lux text-mist">Category</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide2 text-smoke/80">
                  {selected.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}