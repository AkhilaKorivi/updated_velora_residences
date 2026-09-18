import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { hero, heroMobile } from "../lib/images";

const stagger = (reduce) => ({
  hidden: {},
  show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } },
});
const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const infoBar = ["3 & 4 BHK", "Premium Residences", "Madhapur", "Hyderabad"];

export default function Hero({ intro }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "24%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={hero}
          srcSet={`${hero} 1400w, ${heroMobile} 640w`}
          sizes="100vw"
          alt="Velora Residences — a premium luxury apartment tower at dusk"
          className="h-[118%] w-full object-cover"
          style={{ animation: reduce ? "none" : "kenburns 20s ease-in-out infinite alternate" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/35 to-ink" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_40%,transparent_30%,rgba(14,13,11,0.55)_100%)]" aria-hidden="true" />

      <span className="absolute right-[8%] top-[22%] hidden h-2 w-2 rounded-full bg-gold/60 blur-[1px] md:block animate-floaty" aria-hidden="true" />
      <span className="absolute left-[12%] top-[38%] hidden h-1.5 w-1.5 rounded-full border border-gold/70 md:block animate-floaty" style={{ animationDelay: "1.4s" }} aria-hidden="true" />
      <span className="absolute bottom-[34%] right-[16%] hidden h-2 w-2 rounded-full bg-smoke/40 md:block animate-floaty" style={{ animationDelay: "2.2s" }} aria-hidden="true" />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          variants={stagger(reduce)}
          initial={reduce ? "show" : "hidden"}
          animate={intro ? "show" : reduce ? "show" : "hidden"}
        >
          <motion.p variants={item} className="eyebrow mb-6">
            Madhapur · Hyderabad
          </motion.p>

          <motion.p
            variants={item}
            className="mb-4 font-display text-lg italic tracking-wide text-gold-light sm:text-xl"
          >
            A Life Above Ordinary
          </motion.p>

          <motion.h1 variants={item} className="mb-6">
            <span className="h-display block text-[13vw] leading-[0.95] tracking-[0.08em] text-smoke sm:text-7xl lg:text-8xl xl:text-[7rem]">
              VELORA
            </span>
            <span className="mt-2 block font-body text-[3vw] font-light uppercase tracking-[0.5em] text-smoke/90 sm:text-xl sm:tracking-[0.62em]">
              Residences
            </span>
          </motion.h1>

          <motion.p variants={item} className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-smoke/75 sm:text-base">
            Premium 3 & 4 BHK residences crafted for a life of quiet luxury in the heart of Madhapur.
          </motion.p>

          <motion.div variants={item} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#residences"
              className="btn-lux btn-gold w-full sm:w-auto"
              data-cursor="cta"
            >
              Explore Residences
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: intro ? 1 : 0 }}
        transition={{ delay: reduce ? 0 : 1, duration: 1 }}
      >
        <div className="border-t border-line bg-ink/55 backdrop-blur-md">
          <ul className="container-lux flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-[10px] uppercase tracking-lux text-smoke/70 sm:justify-between sm:text-[11px]">
            {infoBar.map((t) => (
              <li key={t} className="flex items-center gap-8">
                <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute bottom-24 left-1/2 z-10 -ml-3 flex h-12 w-6 flex-col items-center justify-start border border-smoke/30 pt-1.5 transition-colors hover:border-gold"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: intro ? 1 : 0 }}
        transition={{ delay: reduce ? 0 : 1.2 }}
      >
        <span
          className="block h-1.5 w-1.5 rounded-full bg-gold"
          style={{ animation: reduce ? "none" : "scrollDot 2s ease-in-out infinite" }}
          aria-hidden="true"
        />
        <ArrowDown className="mt-1 h-3 w-3 text-smoke/50" aria-hidden="true" />
      </motion.a>
    </section>
  );
}