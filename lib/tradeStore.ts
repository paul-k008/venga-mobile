import { create } from "zustand";
import { TRADE_FEE_PCT } from "./mocks";

export type TradeSide = { symbol: string; amount: string };

export type LastTrade = {
  from: { symbol: string; amount: string };
  to: { symbol: string; amount: string };
  rate: number;
  feePct: number;
  feeQuote: number;
  quoteSymbol: string;
  executedAt: string; // ISO
};

type TradeState = {
  /** Source side. `amount` is kept as a string so we preserve user input exactly. */
  from: TradeSide;
  /** Destination side. The amount is always derived (price-based), never user-entered. */
  to: { symbol: string };
  /** 0.5 == 0.5%. Stored as a fraction (0.005). */
  feePct: number;
  /** Increments every 10s while the trade flow is mounted; drives "live" pulse + jitter. */
  ratePulseTick: number;
  /** Snapshot of the last confirmed trade — read by `/trade/success`. */
  lastTrade: LastTrade | null;

  setFrom: (symbol: string) => void;
  setTo: (symbol: string) => void;
  setAmount: (amount: string) => void;
  swapDirection: () => void;
  bumpPulseTick: () => void;
  commitTrade: (snapshot: LastTrade) => void;
  reset: () => void;
};

const initial = {
  from: { symbol: "EUR", amount: "" } satisfies TradeSide,
  to: { symbol: "BTC" },
  feePct: TRADE_FEE_PCT,
  ratePulseTick: 0,
  lastTrade: null as LastTrade | null,
};

export const useTradeStore = create<TradeState>((set) => ({
  ...initial,
  setFrom: (symbol) =>
    set((s) => ({
      // when the user picks a new From, clear the typed amount — old value is misleading
      from: { symbol, amount: s.from.symbol === symbol ? s.from.amount : "" },
    })),
  setTo: (symbol) => set({ to: { symbol } }),
  setAmount: (amount) =>
    set((s) => ({ from: { ...s.from, amount: sanitizeAmount(amount) } })),
  swapDirection: () =>
    set((s) => ({
      from: { symbol: s.to.symbol, amount: "" },
      to: { symbol: s.from.symbol },
    })),
  bumpPulseTick: () => set((s) => ({ ratePulseTick: s.ratePulseTick + 1 })),
  commitTrade: (snapshot) => set({ lastTrade: snapshot }),
  reset: () => set({ ...initial }),
}));

/** Strip non-numeric characters; keep one decimal point. */
function sanitizeAmount(input: string): string {
  let cleaned = input.replace(/[^\d.]/g, "");
  // collapse multiple dots: keep only the first
  const firstDot = cleaned.indexOf(".");
  if (firstDot !== -1) {
    cleaned =
      cleaned.slice(0, firstDot + 1) +
      cleaned.slice(firstDot + 1).replace(/\./g, "");
  }
  // trim leading zeros, but allow "0." prefix
  if (cleaned.length > 1 && cleaned.startsWith("0") && cleaned[1] !== ".") {
    cleaned = cleaned.replace(/^0+/, "");
    if (cleaned === "" || cleaned.startsWith(".")) cleaned = "0" + cleaned;
  }
  return cleaned;
}

/** Deterministic ±0.3% jitter applied to a rate, keyed by `tick`. */
export function jitterRate(baseRate: number, tick: number): number {
  let s = (Math.abs(tick) * 9301 + 49297) % 233280;
  s = (s * 9301 + 49297) % 233280;
  const r = s / 233280; // 0..1
  const factor = 1 + (r - 0.5) * 2 * 0.003; // ±0.3%
  return baseRate * factor;
}
