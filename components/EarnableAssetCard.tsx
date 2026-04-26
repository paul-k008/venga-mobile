import Link from "next/link";
import { Lock } from "lucide-react";
import { CoinIcon } from "./icons";
import RainbowChip from "./RainbowChip";
import { iconVarFor, ASSETS } from "@/lib/mocks";
import { formatNumber } from "@/lib/utils";

type Props = {
  symbol: string;
  rpyPct: number;
  lockDays: number;
  href?: string;
};

/** Row card for the Earn overview "Available" segment. */
export default function EarnableAssetCard({
  symbol,
  rpyPct,
  lockDays,
  href,
}: Props) {
  const finalHref = href ?? `/earn/stake/${symbol}`;
  const asset = ASSETS.find((a) => a.symbol === symbol);
  const name = asset?.name ?? symbol;

  return (
    <Link
      href={finalHref}
      className="block bg-cream-2 active:bg-cream-3 rounded-[14px] p-3.5 transition-transform active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <CoinIcon variant={iconVarFor(symbol)} size={44} />
        <div className="flex-1 min-w-0">
          <div className="text-[16px] font-semibold text-ink leading-tight">
            {name}
          </div>
          <div className="mt-1 inline-flex items-center gap-1 h-5 px-2 rounded-pill bg-cream-3 text-[11px] font-semibold uppercase tracking-wide text-ink-70">
            <Lock size={11} strokeWidth={2.5} />
            Fixed · {lockDays}d
          </div>
        </div>
        <RainbowChip>
          <span className="font-nums text-[13px] text-ink font-semibold">
            {formatNumber(rpyPct, 1)}%
          </span>
          <span className="text-[10px] text-ink-70 font-semibold uppercase tracking-wide">
            RPY
          </span>
        </RainbowChip>
      </div>
    </Link>
  );
}
