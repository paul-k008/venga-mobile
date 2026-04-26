"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

type Props = {
  open: boolean;
  title: string;
  children?: ReactNode;
  /** Label of the checkbox the user must tick before confirming. */
  requireConfirmLabel: string;
  /**
   * If provided, renders a secondary "Don't show again" checkbox below the
   * required-confirmation one. The toggled state is forwarded to `onConfirm`
   * via its `remember` argument.
   */
  rememberLabel?: string;
  confirmLabel?: string;
  onConfirm: (opts: { remember: boolean }) => void;
};

/**
 * Non-dismissible bottom-sheet that gates an underlying screen.
 * No backdrop tap to close — user must tick the required checkbox and tap Confirm.
 */
export default function ComplianceSheet({
  open,
  title,
  children,
  requireConfirmLabel,
  rememberLabel,
  confirmLabel = "Continue",
  onConfirm,
}: Props) {
  const [checked, setChecked] = useState(false);
  const [remember, setRemember] = useState(false);
  useBodyScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/40 pointer-events-auto"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative w-full max-w-mobile bg-cream rounded-t-[24px] p-6 pointer-events-auto"
            style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto w-10 h-1.5 rounded-full bg-cream-3 mb-4" />
            <h3 className="text-[16px] font-semibold text-ink">{title}</h3>
            {children && <div className="mt-3">{children}</div>}

            <button
              type="button"
              onClick={() => setChecked((c) => !c)}
              className="mt-5 w-full flex items-start gap-3 text-left"
            >
              <span
                className={`mt-0.5 w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 border-[1.5px] transition-colors ${
                  checked ? "bg-orange border-orange" : "bg-cream-2 border-hair"
                }`}
              >
                {checked && <Check size={14} strokeWidth={3} className="text-white" />}
              </span>
              <span className="text-[14px] text-ink leading-snug">
                {requireConfirmLabel}
              </span>
            </button>

            {rememberLabel && (
              <button
                type="button"
                onClick={() => setRemember((r) => !r)}
                className="mt-3 w-full flex items-start gap-3 text-left"
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 border-[1.5px] transition-colors ${
                    remember ? "bg-ink border-ink" : "bg-cream-2 border-hair"
                  }`}
                >
                  {remember && <Check size={14} strokeWidth={3} className="text-cream" />}
                </span>
                <span className="text-[13px] text-ink-70 leading-snug">
                  {rememberLabel}
                </span>
              </button>
            )}

            <button
              type="button"
              disabled={!checked}
              onClick={() => onConfirm({ remember })}
              className={`mt-6 w-full h-12 rounded-pill font-semibold text-[15px] transition-colors ${
                checked
                  ? "bg-orange text-white"
                  : "bg-orange-soft text-ink-40 cursor-not-allowed"
              }`}
            >
              {confirmLabel}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
