"use client";

import { motion } from "framer-motion";
import { haptics } from "@/lib/haptics";

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * iOS-style toggle. 32×20 cream-3 track, mint when on, ink thumb sliding.
 * Accessible: keyboard-focusable button with `role="switch"` + `aria-checked`.
 */
export default function Toggle({ checked, onChange, disabled, ariaLabel }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => {
        haptics.light();
        onChange(!checked);
      }}
      className={`relative inline-flex w-8 h-5 rounded-full transition-colors ${
        checked ? "bg-mint-deep" : "bg-cream-3"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <motion.span
        aria-hidden="true"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute top-0.5 w-4 h-4 rounded-full bg-cream"
        style={{
          left: checked ? "calc(100% - 1.125rem)" : "0.125rem",
          boxShadow: "0 1px 3px rgba(14,17,22,0.18)",
        }}
      />
    </button>
  );
}
