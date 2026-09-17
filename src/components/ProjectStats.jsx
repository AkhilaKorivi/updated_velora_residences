import { statsBg } from "../lib/images";
import { stats } from "../data/sitecontent";
import Reveal from "./Reveal";
import AnimatedCounter from "./ui/AnimatedCounter";

export default function ProjectStats() {
  return (
    <section aria-label="Project highlights" className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={statsBg}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0e0d0b_0%,rgba(14,13,11,0.6)_50%,#0e0d0b_100%)]" />
      </div>

      <div className="container-lux relative py-20 sm:py-24">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="h-display text-3xl leading-tight text-smoke sm:text-5xl">
            Numbers that tell the <span className="italic text-gold-light">story</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-charcoal/80 backdrop-blur-sm">
              <div className="group flex h-full flex-col justify-between px-6 py-10 text-center transition-colors duration-500 hover:bg-graphite">
                <p className="h-display text-4xl text-smoke transition-colors duration-500 group-hover:text-gold-light sm:text-5xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-lux text-gold">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-mist">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}