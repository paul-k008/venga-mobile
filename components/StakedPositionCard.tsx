import Link from "next/link";
import { CoinIcon } from "./icons";
import RainbowChip from "./RainbowChip";
import RainbowProgress from "./RainbowProgress";
import {
  daysElapsed,
  endOfLockup,
  iconVarFor,
  type StakedPosition,
} from "@/lib/mocks";
import { formatCrypto, formatNumber, formatShortDate } from "@/lib/utils";

type Props = {
  position: StakedPosition;
  href?: string;
};

/** Row card for the Earn overview "Staked" segment. Includes inline rainbow progress. */
export default function StakedPositionCard({ position, href }: Props) {
  const finalHref = href ?? `/earn/staked/${position.positionId}`;
  const elapsed = daysElapsed(position);
  const fraction = position.lockDays > 0 ? elapsed / position.lockDays : 0;
  const endDate = formatShortDate(endOfLockup(position));

  return (
    <Link
      href={finalHref}
      className="block bg-cream-2 active:bg-cream-3 rounded-[14px] p-3.5 transition-transform active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <CoinIcon variant={iconVarFor(position.symbol)} size={44} />
        <div className="flex-1 min-w-0">
          <div className="text-[16px] font-semibold text-ink leading-tight">
            {position.symbol}
          </div>
          <div className="mt-0.5 text-[13px] text-ink-70 font-nums">
            {formatCrypto(position.amount, position.symbol)}
          </div>
        </div>
        <RainbowChip>
          <span className="font-nums text-[13px] text-ink font-semibold">
            {formatNumber(position.rpyPct, 1)}%
          </span>
          <span className="text-[10px] text-ink-70 font-semibold uppercase tracking-wide">
            RPY
          </span>
        </RainbowChip>
      </div>

      <div className="mt-3">
        <RainbowProgress value={fraction} height={4} />
        <div className="mt-1.5 flex items-center justify-between text-[12px] text-ink-70 font-nums">
          <span>
            {elapsed}/{position.lockDays} days
          </span>
          <span>Ends {endDate}</span>
        </div>
      </div>
    </Link>
  );
}
