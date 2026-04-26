"use client";

import { ChevronDown } from "lucide-react";
import { CoinIcon } from "./icons";
import { iconVarFor } from "@/lib/mocks";
import { formatMoney } from "@/lib/utils";

type Props = {
  role: "from" | "to";
  symbol: string;
  amount: string;
  /** Live USD-equivalent of `amount`. */
  valueUSD: number;
  onTapAsset: () => void;
  onAmountChange?: (next: string) => void;
  readOnly?: boolean;
};

/**
 * 72px-tall cream-2 raised box used in the Trade form for both From and To rows.
 * - Asset chip on the left (CoinIcon + symbol + chevron, tap = open picker)
 * - Right: large amount input (Geist Mono 28px, right-aligned)
 * - Below the input: tiny `≈ $X.XX` USD echo (right-aligned, ink-40)
 */
export default function TradeAssetField({
  role,
  symbol,
  amount,
  valueUSD,
  onTapAsset,
  onAmountChange,
  readOnly,
}: Props) {
  const placeholder = readOnly ? "0" : "0.00";
  const value = amount || (readOnly ? "0" : "");

  return (
    <div className="bg-cream-2 rounded-[18px] px-3 py-3 h-[72px] flex items-center gap-3">
      <button
        type="button"
        onClick={onTapAsset}
        aria-label={`Change ${role === "from" ? "source" : "destination"} asset`}
        className="shrink-0 h-12 pl-1.5 pr-2 rounded-pill bg-cream flex items-center gap-2 active:bg-cream-3"
      >
        <CoinIcon variant={iconVarFor(symbol)} size={28} />
        <span className="text-[15px] font-semibold text-ink">{symbol}</span>
        <ChevronDown size={16} className="text-ink-40" />
      </button>

      <div className="flex-1 min-w-0 flex flex-col items-end justify-center">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          readOnly={readOnly}
          onChange={(e) => onAmountChange?.(e.target.value)}
          placeholder={placeholder}
          aria-label={role === "from" ? "Amount you pay" : "Amount you get"}
          className={`w-full bg-transparent outline-none text-right font-nums text-[28px] leading-none ${
            readOnly ? "text-ink-70 pointer-events-none" : "text-ink"
          } placeholder:text-ink-40`}
        />
        <div className="text-[12px] text-ink-40 font-nums mt-1 truncate max-w-full">
          ≈ {formatMoney(valueUSD || 0, "USD")}
        </div>
      </div>
    </div>
  );
}
