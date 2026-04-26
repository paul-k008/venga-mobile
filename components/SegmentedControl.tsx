"use client";

import { motion } from "framer-motion";

type Style = "pill" | "underline";

type Props = {
  options: readonly string[] | string[];
  value: string;
  onChange: (v: string) => void;
  layoutId?: string;
  /** `pill` (default): cream-2 track with sliding pill. `underline`: orange bar. */
  style?: Style;
};

export default function SegmentedControl({
  options,
  value,
  onChange,
  layoutId = "segPill",
  style = "pill",
}: Props) {
  if (style === "underline") {
    return (
      <div className="mx-4 relative">
        <div className="flex">
          {options.map((opt) => {
            const active = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className="relative flex-1 h-11 text-[16px]"
              >
                <span
                  className={`relative ${
                    active ? "text-ink font-semibold" : "text-ink-70 font-medium"
                  }`}
                >
                  {opt}
                </span>
                {active && (
                  <motion.span
                    layoutId={layoutId}
                    className="absolute left-3 right-3 -bottom-px h-[2px] rounded-pill bg-orange"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <div className="absolute left-0 right-0 -bottom-px h-px bg-hair" />
      </div>
    );
  }

  return (
    <div className="mx-4 bg-cream-2 rounded-pill p-1 flex">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="relative flex-1 h-9 rounded-pill text-[13px]"
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-pill bg-cream"
                style={{ boxShadow: "0 1px 3px rgba(14,17,22,0.08)" }}
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
              />
            )}
            <span
              className={`relative ${
                active ? "text-ink font-semibold" : "text-ink-70 font-medium"
              }`}
            >
              {opt}
            </span>
          </button>
        );
      })}
    </div>
  );
}
