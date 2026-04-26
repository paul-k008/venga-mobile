"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import SlideToConfirm from "@/components/SlideToConfirm";
import { ASSETS, findEarnable, type StakedPosition } from "@/lib/mocks";
import { useEarnStore } from "@/lib/earnStore";
import {
  formatMoney,
  formatNumber,
  formatShortDate,
  trimAmount,
} from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

export default function StakeReviewPage() {
  const router = useRouter();
  const params = useParams<{ symbol: string }>();
  const symbol = (params?.symbol ?? "").toString().toUpperCase();

  const earnable = findEarnable(symbol);
  const asset = useMemo(() => ASSETS.find((a) => a.symbol === symbol), [symbol]);

  const amount = useEarnStore((s) => s.amount);
  const autoRenew = useEarnStore((s) => s.autoRenew);
  const recordStake = useEarnStore((s) => s.recordStake);

  // bounce back if we don't have a valid amount
  useEffect(() => {
    const n = parseFloat(amount || "0") || 0;
    if (!earnable || !asset || n <= 0 || n > asset.balance) {
      router.replace(`/earn/stake/${symbol}`);
    }
  }, [amount, earnable, asset, symbol, router]);

  if (!earnable || !asset) return null;

  const amountNum = parseFloat(amount || "0") || 0;
  const valueUSD = amountNum * asset.priceUSD;
  const annualRewards = amountNum * (earnable.rpyPct / 100);
  const periodRewards = annualRewards * (earnable.lockDays / 365);

  const today = new Date();
  const endDate = new Date(today.getTime() + earnable.lockDays * 86_400_000);

  const onConfirm = () => {
    const positionId = `pos_${symbol.toLowerCase()}_${Date.now()}`;
    const position: StakedPosition = {
      positionId,
      symbol,
      amount: amountNum,
      rpyPct: earnable.rpyPct,
      lockDays: earnable.lockDays,
      processingDays: earnable.processingDays,
      startedAt: today,
      autoRenew,
      earnedRewards: 0,
    };
    recordStake({
      positionId,
      symbol,
      amount: amountNum,
      rpyPct: earnable.rpyPct,
      lockDays: earnable.lockDays,
      createdAt: today,
      position,
    });
    router.push(`/earn/stake/${symbol}/success`);
  };

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col pb-32">
      {/* Top chrome */}
      <div className="px-5 pt-5 flex items-center">
        <BackButton />
      </div>
      <motion.h1
        initial="hidden"
        animate="show"
        variants={fade}
        className="font-display text-[28px] uppercase text-ink px-5 pt-4 leading-none"
      >
        Review stake
      </motion.h1>
      <div className="h-px bg-hair mx-5 mt-3" />

      {/* Hero summary */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-4 pt-5"
      >
        <StripedBorder variant="rainbow" radius={20}>
          <div className="px-5 py-6 text-center rounded-[18px]">
            <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-40">
              You&rsquo;re staking
            </div>
            <div className="mt-2 font-display text-[32px] text-ink leading-none font-nums">
              {trimAmount(amountNum.toFixed(8))}{" "}
              <span className="text-ink-70 font-normal">{symbol}</span>
            </div>
            <div className="mt-2 text-[14px] text-ink-70 font-nums">
              ≈ {formatMoney(valueUSD, "USD")}
            </div>
          </div>
        </StripedBorder>
      </motion.section>

      {/* Detail card */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-4 pt-4"
      >
        <div className="bg-cream-2 rounded-[14px]">
          <Row label="Reward rate" value={`${formatNumber(earnable.rpyPct, 1)}% RPY`} />
          <Hairline />
          <Row label="Lockup period" value={`${earnable.lockDays} days`} />
          <Hairline />
          <Row
            label="Approximate rewards"
            value={`+ ${trimAmount(periodRewards.toFixed(8))} ${symbol} · ≈ ${formatMoney(
              periodRewards * asset.priceUSD,
              "USD",
            )}`}
          />
          <Hairline />
          <Row label="End of lockup" value={formatShortDate(endDate)} />
          <Hairline />
          <Row
            label="Auto-renew"
            value={autoRenew ? "On" : "Off"}
            valueClassName={
              autoRenew ? "text-mint-deep" : "text-ink-70"
            }
          />
          <Hairline />
          <Row
            label="Processing time"
            value={`${earnable.processingDays} day${earnable.processingDays === 1 ? "" : "s"}`}
          />
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.12 }}
        className="px-4 pt-4"
      >
        <div className="rounded-[14px] bg-cream-3 p-4">
          <p className="text-[13px] text-ink-70" style={{ lineHeight: 1.5 }}>
            Staked funds are locked until the period ends. Early unstaking is not available. Reward rates are subject to change at renewal.
          </p>
        </div>
      </motion.section>

      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-cream/90 backdrop-blur px-4 pt-3 z-30"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <SlideToConfirm label="Slide to confirm stake" onConfirm={onConfirm} />
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 gap-3">
      <span className="text-[13px] text-ink-70">{label}</span>
      <span
        className={`text-[13px] font-semibold font-nums text-right ${
          valueClassName ?? "text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
function Hairline() {
  return <div className="h-px bg-hair mx-4" />;
}
