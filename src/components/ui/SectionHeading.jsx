import clsx from "clsx";
import Reveal from "../Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}) {
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <div
          className={clsx(
            "mb-5 flex items-center gap-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
          {align === "center" && <span className="h-px w-10 bg-gold" aria-hidden="true" />}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={clsx(
            "h-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
            light ? "text-smoke" : "text-smoke"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-mist">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}