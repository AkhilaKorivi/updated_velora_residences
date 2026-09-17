import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { amenities, amenityCategories } from "../data/amenities";
import SectionHeading from "./ui/SectionHeading";

export default function Amenities() {
  const [filter, setFilter] = useState("ALL");

  const grid = useMemo(
    () => (filter === "ALL" ? amenities : amenities.filter((a) => a.category === filter)),
    [filter]
  );

  return (
    <section id="amenities" className="relative bg-charcoal py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Amenities"
          title={
            <>
              Life, layered with
              <span className="italic text-gold-light"> indulgences</span>
            </>
          }
          description="Twenty-five-plus curated spaces across fitness, leisure, family and community — so every hour of the day has a place to happen."
        />

        <div className="no-scrollbar mt-12 flex items-center justify-start gap-2 overflow-x-auto sm:flex-wrap sm:justify-center">
          {amenityCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={clsx(
                "relative shrink-0 px-5 py-2.5 text-[10px] font-medium uppercase tracking-lux transition-colors duration-300 sm:px-6",
                filter === c ? "text-ink" : "text-smoke/60 hover:text-smoke"
              )}
            >
              {filter === c && (
                <motion.span
                  layoutId="amenity-filter"
                  className="absolute inset-0 bg-gold"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
        </div>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {grid.map((a) => (
              <motion.article
                key={a.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[3/4] min-w-[74%] snap-center overflow-hidden sm:min-w-0"
                data-cursor="view"
              >
                <img
                  src={a.image}
                  alt={`${a.title} at Velora Residences`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent transition-opacity duration-500" aria-hidden="true" />
                <div className="absolute inset-0 bg-ink/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

                <span className="absolute left-4 top-4 border border-line bg-ink/50 px-3 py-1.5 text-[9px] uppercase tracking-lux text-gold backdrop-blur-sm">
                  {a.category}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="h-display text-xl text-smoke transition-transform duration-500 group-hover:-translate-y-1 sm:text-2xl">
                    {a.title}
                  </h3>
                  <p className="mt-2 max-w-[24ch] text-[13px] leading-relaxed text-mist transition-all duration-500 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    {a.description}
                  </p>
                  <span className="mt-3 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-14" aria-hidden="true" />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}