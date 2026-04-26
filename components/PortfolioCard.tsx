"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatMoney, maskAmount } from "@/lib/utils";

type Props = {
  total: number;
  deltaUSD?: number;
};

export default function PortfolioCard({ total, deltaUSD = 0 }: Props) {
  const [hidden, setHidden] = useState(false);
  const totalFormatted = formatMoney(total, "USD");
  const display = hidden ? maskAmount(totalFormatted) : totalFormatted;

  const positive = deltaUSD >= 0;
  const sign = positive ? "+" : "\u2212";
  const deltaAbs = Math.abs(deltaUSD).toFixed(2);
  const DeltaIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="relative bg-cream-2 rounded-md mx-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[13px] text-ink-70 font-medium">Total portfolio</div>
          <div className="font-display text-ink text-[36px] leading-none mt-2 font-nums">
            {display}
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 text-[13px] font-semibold font-nums ${
                positive ? "text-mint-deep" : "text-red"
              }`}
            >
              <DeltaIcon size={14} strokeWidth={2.25} />
              {sign}${deltaAbs}
            </span>
            <span className="text-[13px] text-ink-40">today</span>
          </div>
        </div>
        <button
          type="button"
          aria-label={hidden ? "Show balance" : "Hide balance"}
          onClick={() => setHidden((h) => !h)}
          className="p-2 -m-2"
        >
          {hidden ? (
            <EyeOff size={18} className="text-ink-40" />
          ) : (
            <Eye size={18} className="text-ink-40" />
          )}
        </button>
      </div>
    </div>
  );
}
