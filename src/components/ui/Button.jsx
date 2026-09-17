import clsx from "clsx";

export default function Button({
  children,
  variant = "gold",
  href,
  onClick,
  className,
  type = "button",
  ariaLabel,
}) {
  const base =
    "btn-lux group/btn " +
    clsx({
      "btn-gold": variant === "gold",
      "btn-outline": variant === "outline",
      "bg-smoke/10 backdrop-blur-sm text-smoke hover:bg-gold hover:text-ink": variant === "ghost",
    });

  const Comp = href ? "a" : "button";
  const inner = (
    <>
      {variant === "ghost" && <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover/btn:translate-x-0" style={{ zIndex: -1 }} />}
      <span className="relative z-10">{children}</span>
      <svg
        className="relative z-10 h-3 w-3 transition-transform duration-500 group-hover/btn:translate-x-1"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 6h9M7 3l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </>
  );

  return (
    <Comp
      type={Comp === "button" ? type : undefined}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor="cta"
      className={clsx(base, className)}
    >
      {inner}
    </Comp>
  );
}