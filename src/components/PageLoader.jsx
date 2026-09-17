import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = "VELORA".split("");
const sub = "RESIDENCES".split("");

export default function PageLoader({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 1750);
    return () => clearTimeout(t1);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="relative text-center">
            <div className="flex overflow-hidden">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="h-display text-4xl tracking-[0.2em] text-smoke sm:text-5xl"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ marginRight: i === letters.length - 1 ? "0.2em" : undefined }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <div className="mt-2 flex justify-center overflow-hidden">
              {sub.map((l, i) => (
                <motion.span
                  key={i}
                  className="text-[10px] font-medium uppercase tracking-lux text-mist"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="relative mt-10 h-px w-44 overflow-hidden bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 bg-gold"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <motion.span
            className="absolute bottom-10 text-[10px] uppercase tracking-lux text-mist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Madhapur · Hyderabad
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}