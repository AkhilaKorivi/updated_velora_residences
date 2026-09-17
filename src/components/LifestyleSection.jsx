import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { lifestylePanels } from "../data/sitecontent";
import Reveal from "./Reveal";

function Panel({ panel, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-14%", "14%"]);

  return (
    <div ref={ref} className="relative h-[78vh] min-h-[520px] overflow-hidden">
      <motion.div className="absolute inset-0 -top-[12%] -bottom-[12%]" style={{ y: bgY }}>
        <img
          src={panel.image}
          alt={`${panel.time} at Velora Residences — ${panel.heading}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60" aria-hidden="true" />

      <div className="container-lux absolute inset-x-0 top-1/2 -translate-y-1/2">
        <Reveal y={30}>
          <p className="eyebrow mb-4">0{index + 1} · {panel.time}</p>
          <h3 className="max-w-2xl h-display text-4xl leading-[1.1] text-smoke sm:text-6xl">
            {panel.heading}
          </h3>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-smoke/75">{panel.desc}</p>
        </Reveal>
      </div>

      <span className="absolute bottom-8 left-1/2 h-px w-10 -translate-x-1/2 bg-gold/70" aria-hidden="true" />
    </div>
  );
}

export default function LifestyleSection() {
  return (
    <section aria-label="Designed around your lifestyle" className="relative bg-ink">
      <div className="container-lux pt-24 sm:pt-32">
        <Reveal className="text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="eyebrow">The Velora Day</span>
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
          </div>
          <h2 className="h-display text-4xl leading-tight text-smoke sm:text-5xl lg:text-6xl">
            Designed around
            <span className="text-gradient-gold italic"> your lifestyle</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 space-y-10 sm:space-y-16">
        {lifestylePanels.map((p, i) => (
          <Panel key={p.id} panel={p} index={i} />
        ))}
      </div>
    </section>
  );
}