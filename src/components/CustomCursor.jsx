import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 350, mass: 0.5 });
  const sy = useSpring(y, { damping: 30, stiffness: 350, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        setActive(true);
        setLabel(t.dataset.cursor === "view" ? "VIEW" : "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[998] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-gold/5 backdrop-blur-sm"
          animate={{ width: label ? 84 : active ? 54 : 30, height: label ? 84 : active ? 54 : 30 }}
          transition={{ duration: 0.25 }}
        >
          {label && (
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-gold">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}