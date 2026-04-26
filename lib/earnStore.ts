import { create } from "zustand";
import {
  STAKED_POSITIONS_LOCAL,
  type StakedPosition,
} from "./mocks";

type LastStake = {
  positionId: string;
  symbol: string;
  amount: number;
  rpyPct: number;
  lockDays: number;
  createdAt: Date;
};

type EarnState = {
  /** The asset currently being staked. Set when entering /earn/stake/[symbol]. */
  symbol: string;
  /** User-typed amount, kept as a string to preserve raw input. */
  amount: string;
  /** Whether auto-renew is checked on the current stake form. Defaults true. */
  autoRenew: boolean;
  /** Bumped every time a new stake is recorded — drives re-renders in lists that
   *  read from the (mutable) `STAKED_POSITIONS_LOCAL` array. */
  stakeRevision: number;
  /** Snapshot of the most recently confirmed stake — read by /success. */
  lastStake: LastStake | null;

  setSymbol: (symbol: string) => void;
  setAmount: (amount: string) => void;
  setAutoRenew: (next: boolean) => void;
  recordStake: (snapshot: LastStake & { position: StakedPosition }) => void;
  reset: () => void;
};

const initial = {
  symbol: "",
  amount: "",
  autoRenew: true,
  stakeRevision: 0,
  lastStake: null as LastStake | null,
};

export const useEarnStore = create<EarnState>((set) => ({
  ...initial,
  setSymbol: (symbol) => set({ symbol }),
  setAmount: (amount) => set({ amount: sanitizeAmount(amount) }),
  setAutoRenew: (autoRenew) => set({ autoRenew }),
  recordStake: ({ position, ...snapshot }) =>
    set((s) => {
      // append to the prototype-only mutable list so future reads of
      // STAKED_POSITIONS_LOCAL include this entry
      STAKED_POSITIONS_LOCAL.push(position);
      return {
        lastStake: snapshot,
        stakeRevision: s.stakeRevision + 1,
      };
    }),
  reset: () =>
    set((s) => ({
      ...initial,
      // preserve revision so other components don't think positions vanished
      stakeRevision: s.stakeRevision,
    })),
}));

function sanitizeAmount(input: string): string {
  let cleaned = input.replace(/[^\d.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot !== -1) {
    cleaned =
      cleaned.slice(0, firstDot + 1) +
      cleaned.slice(firstDot + 1).replace(/\./g, "");
  }
  if (cleaned.length > 1 && cleaned.startsWith("0") && cleaned[1] !== ".") {
    cleaned = cleaned.replace(/^0+/, "");
    if (cleaned === "" || cleaned.startsWith(".")) cleaned = "0" + cleaned;
  }
  return cleaned;
}
