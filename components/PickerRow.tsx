"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Radio from "./Radio";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

type Option = { value: string; label: string };

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (next: string) => void;
  /** Optional placeholder shown when value matches no option. */
  placeholder?: string;
};

/**
 * Tappable cream-2 row that opens a bottom-sheet single-select picker.
 * Used by the Report-a-problem form for the Category field.
 */
export default function PickerRow({
  label,
  value,
  options,
  onChange,
  placeholder = "Select…",
}: Props) {
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);
  const current = options.find((o) => o.value === value);
  const valueLabel = current?.label ?? placeholder;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between h-12 px-3 rounded-[14px] bg-cream-2 active:bg-cream-3"
      >
        <span className="text-[12px] uppercase tracking-wide font-semibold text-ink-40">
          {label}
        </span>
        <span className="flex items-center gap-2">
          <span
            className={`text-[14px] ${
              current ? "text-ink-70" : "text-ink-40"
            }`}
          >
            {valueLabel}
          </span>
          <ChevronDown size={14} className="text-ink-40" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/40"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative w-full max-w-mobile bg-cream rounded-t-[24px] p-5"
              style={{ paddingBottom: "calc(20px + env(safe-area-inset-bottom))" }}
            >
              <div className="mx-auto w-10 h-1.5 rounded-full bg-cream-3 mb-4" />
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-ink">{label}</h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
              <ul className="mt-3 bg-cream-2 rounded-[14px] overflow-hidden">
                {options.map((o, i) => (
                  <li key={o.value}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-left ${
                        i < options.length - 1 ? "border-b border-hair" : ""
                      }`}
                    >
                      <span className="text-[14px] text-ink">{o.label}</span>
                      <Radio checked={o.value === value} />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
