"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Check } from "lucide-react";
import { useToastStore, type ToastTone } from "@/lib/toastStore";

const TONE_ICON: Record<ToastTone, React.ReactNode> = {
  default: null,
  success: <Check size={16} className="text-mint-deep" />,
  warning: <AlertTriangle size={16} className="text-yellow" />,
  error:   <AlertCircle size={16} className="text-red" />,
};

/**
 * Global toast viewport. Mount ONCE in the root layout. Reads the singleton
 * Zustand store, so any component can call `toast(...)` without a provider.
 *
 * One toast visible at a time; newer toasts replace older with a 220ms exit.
 */
export default function ToastViewport() {
  const current = useToastStore((s) => s.current);
  const dismiss = useToastStore((s) => s.dismiss);

  useEffect(() => {
    if (!current) return;
    const id = window.setTimeout(() => dismiss(), current.durationMs);
    return () => window.clearTimeout(id);
  }, [current, dismiss]);

  return (
    <div
      className="fixed inset-x-0 z-[60] flex justify-center pointer-events-none"
      style={{
        bottom: "calc(80px + env(safe-area-inset-bottom) + 12px)",
      }}
      role="status"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28, duration: 0.22 }}
            className="pointer-events-auto relative inline-flex items-center gap-2.5 h-12 px-4 rounded-pill bg-cream-2 border border-hair text-ink shadow-[0_4px_20px_rgba(14,17,22,0.12)] overflow-hidden"
          >
            {TONE_ICON[current.tone]}
            <span className="text-[14px] font-semibold leading-none">
              {current.message}
            </span>
            {/* progress bar — drains left-to-right */}
            <motion.div
              key={`${current.id}-progress`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: current.durationMs / 1000, ease: "linear" }}
              className="absolute left-0 bottom-0 h-px bg-ink-40"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
