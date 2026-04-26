"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

/** Circular 24×24 radio indicator. Mint-filled with check when checked. */
export default function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      role="radio"
      aria-checked={checked}
      className={`inline-flex w-6 h-6 rounded-full items-center justify-center transition-colors ${
        checked ? "bg-mint-deep border-mint-deep" : "bg-cream-2 border border-hair"
      }`}
    >
      {checked && (
        <motion.span
          key="dot"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          className="inline-flex"
        >
          <Check size={14} strokeWidth={3} className="text-cream" />
        </motion.span>
      )}
    </span>
  );
}
