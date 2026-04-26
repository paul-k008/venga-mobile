"use client";

import { motion } from "framer-motion";

type Props = {
  /** 0–1 progress fraction. Clamped. */
  value: number;
  /** Track height in px. Default 6. */
  height?: number;
};

/**
 * Cream-3 track with a mint→sky→yellow→orange gradient fill. Animates
 * fill width on mount over ~600ms with a soft spring.
 */
export default function RainbowProgress({ value, height = 6 }: Props) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <div
      className="w-full bg-cream-3 rounded-pill overflow-hidden"
      style={{ height }}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={pct}
      role="progressbar"
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct * 100}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-full rounded-pill"
        style={{
          background:
            "linear-gradient(90deg, var(--mint), var(--sky), var(--yellow), var(--orange))",
        }}
      />
    </div>
  );
}
