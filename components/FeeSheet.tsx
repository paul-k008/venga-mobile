"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Display: e.g. "EUR" or "USD". */
  quoteSymbol: string;
  /** Total fee in `quoteSymbol`. */
  feeQuote: number;
  /** Total fee % shown in headline. */
  feePct: number;
};

/**
 * Bottom-sheet showing the fee breakdown for a trade. Tap-out / X to close.
 */
export default function FeeSheet({
  open,
  onClose,
  quoteSymbol,
  feeQuote,
  feePct,
}: Props) {
  useBodyScrollLock(open);
  const network = 0; // prototype: in-app exchange, no on-chain fee
  const spreadPct = 0.3;
  const servicePct = Math.max(0, feePct * 100 - spreadPct);

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
              <h3 className="text-[16px] font-semibold text-ink">Fee breakdown</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 rounded-[16px] bg-cream-2 px-4">
              <Row label="Network" value="$0.00" hint="In-app exchange — no on-chain fee" />
              <Divider />
              <Row
                label="Spread"
                value={`${formatNumber(spreadPct, 2)}%`}
                hint="Difference vs the indicative mid-market rate"
              />
              <Divider />
              <Row
                label="Service"
                value={`${formatNumber(servicePct, 2)}%`}
                hint="Covers infrastructure, custody and KYC"
              />
              <Divider />
              <Row
                label="You pay"
                value={`${formatNumber(feeQuote, 2)} ${quoteSymbol}`}
                strong
              />
            </div>

            <p className="mt-4 text-[12px] text-ink-40 leading-snug">
              Total fee · {formatNumber(feePct * 100, 2)}% — applied to the equivalent {quoteSymbol} value of your trade.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full h-12 rounded-pill bg-ink text-cream font-semibold text-[15px]"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  hint,
  strong,
}: {
  label: string;
  value: string;
  hint?: string;
  strong?: boolean;
}) {
  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        <span
          className={`text-[14px] ${
            strong ? "text-ink font-semibold" : "text-ink-70"
          }`}
        >
          {label}
        </span>
        <span
          className={`font-nums text-[14px] ${
            strong ? "text-ink font-semibold" : "text-ink"
          }`}
        >
          {value}
        </span>
      </div>
      {hint && <p className="text-[11px] text-ink-40 mt-0.5">{hint}</p>}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-hair" />;
}
