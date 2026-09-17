import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import clsx from "clsx";
import { gallery, galleryCategories } from "../data/gallery";
import SectionHeading from "./ui/SectionHeading";

export default function Gallery() {
  const [filter, setFilter] = useState("ALL");
  const [lightbox, setLightbox] = useState(null);
  const [fs, setFs] = useState(false);

  const items = useMemo(
    () => (filter === "ALL" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter]
  );

  const index = lightbox !== null ? items.findIndex((g) => g.id === lightbox) : -1;
  const current = index >= 0 ? items[index] : null;

  const step = useCallback(
    (dir) => {
      if (index < 0) return;
      const next = (index + dir + items.length) % items.length;
      setLightbox(items[next].id);
    },
    [index, items]
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, step]);

  return (
    <section id="gallery" className="relative bg-ink py-24 sm:py-32">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Gallery"
            title={
              <>
                A visual
                <span className="italic text-gold-light"> tour</span>
              </>
            }
            description="Architecture, interiors, amenities and moments — curated across the residence."
          />
          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border border-line lg:max-w-md">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={clsx(
                  "relative shrink-0 px-4 py-3 text-[9px] font-medium uppercase tracking-lux transition-colors duration-300",
                  filter === c ? "text-ink" : "text-smoke/60 hover:text-smoke"
                )}
              >
                {filter === c && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 bg-gold"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
        </div>

        <div key={filter} className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <motion.figure
              key={g.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 6) * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-5 break-inside-avoid overflow-hidden"
              data-cursor="view"
              onClick={() => setLightbox(g.id)}
            >
              <div className={clsx("w-full overflow-hidden", g.tall ? "aspect-[3/4]" : "aspect-[4/3]")}>
                <img
                  src={g.image}
                  alt={`${g.title} — ${g.caption}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
              </div>
              <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-[9px] uppercase tracking-lux text-gold">{g.category}</span>
                <span className="h-display mt-1 text-xl text-smoke">{g.title}</span>
                <span className="mt-1 text-[13px] text-smoke/70">{g.caption}</span>
              </figcaption>
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-smoke/30 bg-ink/40 text-[8px] uppercase tracking-lux text-smoke/80 backdrop-blur-sm" aria-hidden="true">
                +
              </span>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title} image`}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-line text-smoke transition-colors hover:border-gold hover:text-gold"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute right-[4.5rem] top-5 z-10 hidden h-11 w-11 items-center justify-center border border-line text-smoke transition-colors hover:border-gold hover:text-gold sm:flex"
              onClick={(e) => {
                e.stopPropagation();
                setFs((v) => !v);
              }}
              aria-label={fs ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {fs ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>

            <button
              type="button"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-ink/50 text-smoke backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-ink/50 text-smoke backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={current.id}
              className="relative w-full max-w-6xl px-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={clsx("relative mx-auto w-full overflow-hidden", fs ? "max-h-[90vh] w-auto" : "max-h-[76vh]")}>
                <img
                  src={current.image}
                  alt={`${current.title} — ${current.caption}`}
                  className="mx-auto h-auto max-h-[76vh] w-full object-contain"
                />
              </div>
              <figcaption className="mt-5 flex flex-col items-center text-center">
                <span className="text-[9px] uppercase tracking-lux text-gold">
                  {current.category} · {index + 1} / {items.length}
                </span>
                <span className="h-display mt-2 text-2xl text-smoke sm:text-3xl">{current.title}</span>
                <span className="mt-1 text-sm text-mist">{current.caption}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}