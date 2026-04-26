"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/utils";

type Props = {
  fromSymbol: string;
  toSymbol: string;
  /** How many `to` per 1 `from`. */
  rate: number;
  /** Increments every 10s — drives the brief flash animation. */
  pulseTick: number;
};

/**
 * Compact pill: "1 BTC ≈ 43,917.12 EUR  · ● Live".
 * The "Live" dot pulses opacity continuously; the whole pill flashes
 * cream-2 → cream-3 → cream-2 for ~200ms whenever `pulseTick` increments.
 */
export default function RateTickerPill({
  fromSymbol,
  toSymbol,
  rate,
  pulseTick,
}: Props) {
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    setFlashKey((n) => n + 1);
  }, [pulseTick]);

  const decimals = rate >= 100 ? 2 : rate >= 1 ? 4 : 6;

  return (
    <motion.div
      key={flashKey}
      initial={{ backgroundColor: "var(--cream-3)" }}
      animate={{ backgroundColor: "var(--cream-2)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-8 px-3 rounded-pill inline-flex items-center gap-2 text-[12px] text-ink"
    >
      <span className="font-nums">
        1 {fromSymbol} ≈{" "}
        <span className="font-semibold">{formatNumber(rate, decimals)}</span>{" "}
        {toSymbol}
      </span>
      <span className="inline-flex items-center gap-1 text-ink-70">
        <motion.span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-mint-deep inline-block"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        Live
      </span>
    </motion.div>
  );
}
