import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { intro } from "../lib/images";
import Reveal from "./Reveal";

export default function ProjectIntro() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative" y={0}>
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
              <img
                src={intro}
                alt="The cinematic living room interior of a Velora Residences apartment"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" aria-hidden="true" />
          </div>

          <motion.div
            style={{ y: badgeY }}
            className="absolute -right-4 bottom-10 hidden h-40 w-40 flex-col items-center justify-center border border-gold/40 bg-ink/80 text-center backdrop-blur-md md:flex lg:-right-10"
          >
            <span className="h-display text-4xl text-gold-light">36</span>
            <span className="mt-1 text-[10px] uppercase tracking-lux text-mist">
              Floors of Craft
            </span>
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow">Introducing Velora Residences</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="h-display text-4xl leading-[1.1] text-smoke sm:text-5xl lg:text-[3.2rem]">
              A contemporary residential
              <span className="text-gradient-gold italic"> landmark </span>
              in the sky
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-mist sm:text-base">
              Velora Residences is a contemporary residential landmark designed for people who
              expect more from urban living. Every residence combines thoughtful planning, refined
              interiors and expansive views with a carefully curated lifestyle experience.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist sm:text-base">
              Rising in Madhapur, the residence is built around light, air and proportion —
              three ingredients that turn an apartment into a way of life.
            </p>
          </Reveal>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden border border-line bg-line">
            {[
              { k: "Typologies", v: "3 & 4 BHK" },
              { k: "Residences", v: "500+" },
              { k: "Amenities", v: "25+" },
              { k: "Tower Height", v: "36 Floors" },
            ].map((s) => (
              <div key={s.k} className="bg-charcoal px-6 py-5">
                <p className="h-display text-2xl text-smoke">{s.v}</p>
                <p className="mt-1 text-[10px] uppercase tracking-lux text-gold">{s.k}</p>
              </div>
            ))}
          </div>

          <Reveal delay={0.34}>
            <a
              href="#residences"
              className="group mt-10 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-lux text-smoke transition-colors hover:text-gold"
            >
              <span className="relative">
                Discover the project
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <span className="text-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}