"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Trophy } from "lucide-react";
import StripedBorder from "./StripedBorder";
import { BALANCE } from "@/lib/mocks";
import { formatMoney, maskAmount } from "@/lib/utils";

export default function BalanceCard() {
  const [hidden, setHidden] = useState(false);
  const formatted = formatMoney(BALANCE.totalUSD, "USD");
  const display = hidden ? maskAmount(formatted) : formatted;

  return (
    <StripedBorder variant="orange-sky">
      <div className="relative px-7 py-7 flex flex-col items-center">
        <span className="text-[13px] text-ink-70 font-medium">Total Balance</span>
        <span className="font-display text-ink text-[44px] leading-none mt-2 font-nums">
          {display}
        </span>
        {BALANCE.hasRewardsChallenge && (
          <Link
            href="/rewards/claim"
            className="mt-4 inline-flex items-center gap-2 h-9 px-4 rounded-pill border-[1.5px] border-orange text-orange text-[13px] font-semibold"
          >
            <Trophy size={14} strokeWidth={2} />
            Challenge: Claim Reward
          </Link>
        )}
        <button
          type="button"
          aria-label={hidden ? "Show balance" : "Hide balance"}
          onClick={() => setHidden((h) => !h)}
          className="absolute bottom-3 right-3 p-2"
        >
          {hidden ? (
            <EyeOff size={18} className="text-ink-40" />
          ) : (
            <Eye size={18} className="text-ink-40" />
          )}
        </button>
      </div>
    </StripedBorder>
  );
}
