import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, Play, Film, Compass, X, BadgeInfo } from "lucide-react";
import { lobby, nightCity } from "../lib/images";
import SectionHeading from "./ui/SectionHeading";
import { useEnquiry } from "./EnquiryContext";

const tiles = [
  { id: "360", label: "360° Experience", icon: Orbit, image: lobby, desc: "Step inside an immersive 360° view of the residence." },
  { id: "tour", label: "Virtual Tour", icon: Compass, image: lobby, desc: "A narrated walk-through of towers, lobbies and routes." },
  { id: "film", label: "Watch Film", icon: Film, image: nightCity, desc: "A cinematic film on the Velora vision." },
  { id: "residence", label: "Explore Residence", icon: Compass, image: lobby, desc: "Interactive room-by-room residence walkthrough." },
];

export default function VirtualTour() {
  const [active, setActive] = useState(null);
  const { openEnquiry } = useEnquiry();
  const tile = tiles.find((t) => t.id === active);

  return (
    <section aria-label="Experience Velora" className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Experience Velora"
          title={
            <>
              See it before it's
              <span className="italic text-gold-light"> yours</span>
            </>
          }
          description="Immersive previews of the residence — designed to be experienced, not just described."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {tiles.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.button
                key={t.id}
                type="button"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(t.id)}
                data-cursor="view"
                className="group relative aspect-[3/4] overflow-hidden border border-line text-left"
                aria-label={`Open ${t.label}`}
              >
                <img
                  src={t.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" aria-hidden="true" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-ink/40 text-gold backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="h-display block text-2xl text-smoke">{t.label}</span>
                  <span className="mt-2 block text-[13px] leading-relaxed text-mist opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                    {t.desc}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {tile && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={tile.label}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-line text-smoke transition-colors hover:border-gold hover:text-gold"
              onClick={() => setActive(null)}
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              key={tile.id}
              className="relative w-full max-w-4xl overflow-hidden border border-line bg-ink"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={tile.image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ animation: "kenburns 14s ease-in-out infinite alternate" }}
                />
                <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />
                <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-gold text-ink">
                  <tile.icon className="h-8 w-8" aria-hidden="true" />
                </span>
                <span className="absolute inset-x-0 top-0 flex items-center justify-center gap-2 bg-gold/90 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-lux text-ink">
                  Demo preview
                </span>
              </div>
              <div className="p-8 text-center">
                <p className="h-display text-3xl text-smoke">{tile.label}</p>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-mist">{tile.desc}</p>
                <p className="mx-auto mt-3 flex max-w-lg items-center justify-center gap-2 text-[12px] text-mist">
                  <BadgeInfo className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  The full 360°/virtual tour will be revealed on launch. Meanwhile, request a private site preview.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActive(null);
                    openEnquiry();
                  }}
                  className="btn-lux btn-gold mt-7"
                >
                  Request a Private Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}