"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarCheck,
  Clock,
  Coins,
  Info,
  Lock,
  Plus,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import StubScreen from "@/components/StubScreen";
import StripedBorder from "@/components/StripedBorder";
import RainbowChip from "@/components/RainbowChip";
import RainbowProgress from "@/components/RainbowProgress";
import HintSheet from "@/components/HintSheet";
import Toggle from "@/components/Toggle";
import { CoinIcon } from "@/components/icons";
import {
  ASSETS,
  assetsAvailableDate,
  daysElapsed,
  endOfLockup,
  findStakedPosition,
  iconVarFor,
} from "@/lib/mocks";
import {
  formatCrypto,
  formatMoney,
  formatNumber,
  formatShortDate,
  trimAmount,
} from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: "easeOut" } },
};
const stagger = (i: number) => ({ delay: 0.03 * i });

export default function StakedPositionDetailPage() {
  const params = useParams<{ positionId: string }>();
  const positionId = (params?.positionId ?? "").toString();
  const position = useMemo(
    () => findStakedPosition(positionId),
    [positionId],
  );

  const [autoRenew, setAutoRenew] = useState(position?.autoRenew ?? true);
  const [hintOpen, setHintOpen] = useState(false);

  if (!position) {
    return <StubScreen title="Stake" />;
  }

  const asset = ASSETS.find((a) => a.symbol === position.symbol);
  const priceUSD = asset?.priceUSD ?? 0;

  const elapsed = daysElapsed(position);
  const remaining = Math.max(0, position.lockDays - elapsed);
  const fraction = position.lockDays > 0 ? elapsed / position.lockDays : 0;

  const start = formatShortDate(position.startedAt);
  const end = formatShortDate(endOfLockup(position));
  const available = formatShortDate(assetsAvailableDate(position));

  const projected =
    position.amount * (position.rpyPct / 100) * (position.lockDays / 365);

  const earnedUSD = position.earnedRewards * priceUSD;
  const projectedUSD = projected * priceUSD;

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col pb-24">
      <div className="relative px-5 pt-5 flex items-center">
        <BackButton />
        <h1 className="absolute left-1/2 -translate-x-1/2 top-6 text-[16px] font-semibold text-ink">
          Earn / Staked {position.symbol}
        </h1>
      </div>

      {/* Hero amount */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(1)}
        className="px-4 pt-5"
      >
        <div className="bg-cream-2 rounded-[14px] p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-ink-40">
              Amount
            </div>
            <div className="mt-1 font-display text-[24px] text-ink font-nums leading-none">
              {trimAmount(position.amount.toFixed(8))}{" "}
              <span className="text-ink-70 font-normal">{position.symbol}</span>
            </div>
            <div className="mt-1 text-[14px] text-ink-70 font-nums">
              ≈ {formatMoney(position.amount * priceUSD, "USD")}
            </div>
          </div>
          <div
            className="shrink-0"
            style={{
              transform: "rotate(6deg)",
              filter: "drop-shadow(0 6px 14px rgba(14,17,22,0.12))",
            }}
          >
            <CoinIcon variant={iconVarFor(position.symbol)} size={96} />
          </div>
        </div>
      </motion.section>

      {/* Rewards card with rainbow border */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(2)}
        className="px-4 pt-4"
      >
        <StripedBorder variant="rainbow" radius={20}>
          <div className="px-4 py-4 rounded-[18px] flex items-stretch gap-3">
            <div className="flex-1 min-w-0 text-center">
              <div className="text-[12px] text-ink-70">Earned rewards</div>
              <div className="mt-1 font-display text-[22px] text-ink font-nums leading-none">
                {trimAmount(position.earnedRewards.toFixed(8))}
                <span className="text-[14px] text-ink-70 font-normal">
                  {" "}
                  {position.symbol}
                </span>
              </div>
              <div className="mt-1 text-[12px] text-ink-40 font-nums">
                ≈ {formatMoney(earnedUSD, "USD")}
              </div>
            </div>

            <div className="w-px bg-hair self-stretch" />

            <div className="flex-1 min-w-0 text-center">
              <div className="text-[12px] text-ink-70">
                {position.lockDays} days rewards
              </div>
              <div className="mt-1 font-display text-[22px] text-ink font-nums leading-none">
                {trimAmount(projected.toFixed(8))}
                <span className="text-[14px] text-ink-70 font-normal">
                  {" "}
                  {position.symbol}
                </span>
              </div>
              <div className="mt-1 text-[12px] text-ink-40 font-nums">
                ≈ {formatMoney(projectedUSD, "USD")}
              </div>
            </div>
          </div>
        </StripedBorder>
      </motion.section>

      {/* Progress card */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(3)}
        className="px-4 pt-4"
      >
        <div className="bg-cream-2 rounded-[14px] p-4">
          <RainbowProgress value={fraction} height={6} />
          <div className="mt-2 flex items-center justify-between text-[13px] text-ink-70 font-nums">
            <span>
              {elapsed} / {position.lockDays}
            </span>
            <span>{remaining} days left</span>
          </div>
        </div>
      </motion.section>

      {/* Stat list */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(4)}
        className="px-4 pt-4"
      >
        <div className="bg-cream-2 rounded-[14px]">
          <StatRow icon={<Coins size={18} strokeWidth={1.75} />} label="RPY">
            <RainbowChip>
              <span className="font-nums text-[12px] text-ink font-semibold">
                {formatNumber(position.rpyPct, 1)}%
              </span>
            </RainbowChip>
          </StatRow>
          <Hairline />
          <StatRow
            icon={<Coins size={18} strokeWidth={1.75} />}
            label="Cumulative rewards"
          >
            <div className="flex flex-col items-end gap-1">
              <RainbowChip>
                <span className="font-nums text-[12px] text-ink font-semibold">
                  + {trimAmount(position.earnedRewards.toFixed(8))} {position.symbol}
                </span>
              </RainbowChip>
              <span className="text-[11px] text-ink-40 font-nums">
                ≈ {formatMoney(earnedUSD, "USD")}
              </span>
            </div>
          </StatRow>
          <Hairline />
          <StatRow
            icon={<Lock size={18} strokeWidth={1.75} />}
            label="Lockup period"
          >
            <Value>{position.lockDays} days</Value>
          </StatRow>
          <Hairline />
          <StatRow
            icon={<Calendar size={18} strokeWidth={1.75} />}
            label="Start date"
          >
            <Value>{start}</Value>
          </StatRow>
          <Hairline />
          <StatRow
            icon={<CalendarCheck size={18} strokeWidth={1.75} />}
            label="End of lockup"
          >
            <Value>{end}</Value>
          </StatRow>
          <Hairline />
          <StatRow
            icon={<Clock size={18} strokeWidth={1.75} />}
            label="Processing time"
            labelTrailing={
              <button
                type="button"
                onClick={() => setHintOpen(true)}
                aria-label="What is processing time?"
                className="ml-1 inline-flex items-center"
              >
                <Info size={13} className="text-ink-40" />
              </button>
            }
          >
            <Value>
              {position.processingDays} day
              {position.processingDays === 1 ? "" : "s"}
            </Value>
          </StatRow>
          <Hairline />
          <StatRow
            icon={<Calendar size={18} strokeWidth={1.75} />}
            label="Assets available"
          >
            <Value>{available}</Value>
          </StatRow>
        </div>
      </motion.section>

      {/* Auto-renew */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(5)}
        className="px-4 pt-4"
      >
        <div className="bg-cream-2 rounded-[14px] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-ink">Auto-renew</span>
            <Toggle
              checked={autoRenew}
              onChange={(next) => {
                setAutoRenew(next);
                position.autoRenew = next; // mutate for prototype
              }}
              ariaLabel="Auto-renew this position"
            />
          </div>
          <p className="mt-2 text-[13px] text-ink-70" style={{ lineHeight: 1.5 }}>
            Continues for another {position.lockDays} days when this period ends.
          </p>
        </div>
      </motion.section>

      {/* Stake more */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(6)}
        className="px-4 pt-5"
      >
        <Link
          href={`/earn/stake/${position.symbol}`}
          className="w-full h-12 rounded-pill bg-cream-2 active:bg-cream-3 text-ink font-semibold text-[14px] inline-flex items-center justify-center gap-2"
        >
          <Plus size={16} strokeWidth={2.4} />
          Stake more {position.symbol}
        </Link>
      </motion.section>

      <HintSheet
        open={hintOpen}
        onClose={() => setHintOpen(false)}
        title="Processing time"
        body={
          <p>
            After your lockup ends, we need {position.processingDays} day
            {position.processingDays === 1 ? "" : "s"} to release funds back to your wallet. During this window your tokens are no longer accruing rewards.
          </p>
        }
      />
    </div>
  );
}

function StatRow({
  icon,
  label,
  labelTrailing,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  labelTrailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="text-ink shrink-0">{icon}</span>
      <span className="flex-1 text-[14px] text-ink-70 inline-flex items-center">
        {label}
        {labelTrailing}
      </span>
      <div className="text-right">{children}</div>
    </div>
  );
}
function Value({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[14px] text-ink font-semibold font-nums">
      {children}
    </span>
  );
}
function Hairline() {
  return <div className="h-px bg-hair mx-4" />;
}
