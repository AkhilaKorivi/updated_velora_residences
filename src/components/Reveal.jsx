import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  y = 44,
  x = 0,
  className,
  amount = 0.25,
  once = true,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y, x }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: reduce ? 0 : amount }}
      transition={{ duration: 0.9, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}