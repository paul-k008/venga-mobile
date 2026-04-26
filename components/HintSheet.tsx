"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  confirmLabel?: string;
};

/**
 * Generic info bottom-sheet. Tap-out or X to close.
 * Used by Earn for "Processing time" hints; intended to be reused in iter 6+.
 */
export default function HintSheet({
  open,
  onClose,
  title,
  body,
  confirmLabel = "Got it",
}: Props) {
  useBodyScrollLock(open);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
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
            className="relative w-full max-w-mobile bg-cream rounded-t-[24px] p-6"
            style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto w-10 h-1.5 rounded-full bg-cream-3 mb-4" />
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-ink">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-3 text-[14px] text-ink-70 leading-snug">
              {body}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full h-12 rounded-pill bg-ink text-cream font-semibold text-[15px]"
            >
              {confirmLabel}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
