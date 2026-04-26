"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, Info, Lock, ArrowDownToLine } from "lucide-react";
import BackButton from "@/components/BackButton";
import StubScreen from "@/components/StubScreen";
import { CoinIcon } from "@/components/icons";
import RainbowChip from "@/components/RainbowChip";
import Toggle from "@/components/Toggle";
import HintSheet from "@/components/HintSheet";
import {
  ASSETS,
  findEarnable,
  iconVarFor,
} from "@/lib/mocks";
import { useEarnStore } from "@/lib/earnStore";
import {
  formatCrypto,
  formatMoney,
  formatNumber,
  formatShortDate,
  trimAmount,
} from "@/lib/utils";
import { useState } from "react";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};
const stagger = (i: number) => ({ delay: 0.04 + i * 0.04 });

export default function StakeFormPage() {
  const router = useRouter();
  const params = useParams<{ symbol: string }>();
  const symbol = (params?.symbol ?? "").toString().toUpperCase();

  const earnable = findEarnable(symbol);
  const asset = useMemo(() => ASSETS.find((a) => a.symbol === symbol), [symbol]);

  const setSymbol = useEarnStore((s) => s.setSymbol);
  const formSymbol = useEarnStore((s) => s.symbol);
  const amount = useEarnStore((s) => s.amount);
  const setAmount = useEarnStore((s) => s.setAmount);
  const autoRenew = useEarnStore((s) => s.autoRenew);
  const setAutoRenew = useEarnStore((s) => s.setAutoRenew);

  // hydrate form symbol on mount; clear amount if symbol changed
  useEffect(() => {
    if (formSymbol !== symbol) {
      setSymbol(symbol);
      // also clear amount when entering for a different symbol
      setAmount("");
    }
  }, [formSymbol, symbol, setSymbol, setAmount]);

  const [hintOpen, setHintOpen] = useState(false);

  if (!earnable) {
    return <StubScreen title={`Stake ${symbol}`} />;
  }

  const balance = asset?.balance ?? 0;
  const priceUSD = asset?.priceUSD ?? 0;
  const amountNum = parseFloat(amount || "0") || 0;
  const valueUSD = amountNum * priceUSD;
  const insufficient = amountNum > balance;
  const valid = amountNum > 0 && !insufficient;
  const noBalance = balance === 0;

  const lockDays = earnable.lockDays;
  const rpyPct = earnable.rpyPct;
  const processingDays = earnable.processingDays;

  const today = new Date();
  const endDate = new Date(today.getTime() + lockDays * 86_400_000);

  const annualRewards = amountNum * (rpyPct / 100);
  const periodRewards = annualRewards * (lockDays / 365);

  const onPercent = (pct: 0.25 | 0.5 | 0.75 | 1) => {
    if (balance === 0) return;
    const usable = balance * pct;
    setAmount(trimAmount(usable.toFixed(8)));
  };

  const onContinue = () => {
    if (!valid) return;
    router.push(`/earn/stake/${symbol}/review`);
  };

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col pb-32">
      {/* Top chrome */}
      <div className="relative px-5 pt-5 flex items-center">
        <BackButton />
        <h1 className="absolute left-1/2 -translate-x-1/2 top-6 text-[16px] font-semibold text-ink">
          Earn / Stake {symbol}
        </h1>
      </div>

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(0)}
        className="px-4 pt-5"
      >
        <div className="bg-cream-2 rounded-[14px] p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CoinIcon variant={iconVarFor(symbol)} size={32} />
              <span className="font-display text-[22px] text-ink">{symbol}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <RainbowChip>
                <span className="font-nums text-[12px] text-ink font-semibold">
                  {formatNumber(rpyPct, 1)}%
                </span>
                <span className="text-[10px] text-ink-70 font-semibold uppercase tracking-wide">
                  RPY
                </span>
              </RainbowChip>
              <span className="inline-flex items-center gap-1 h-7 px-3 rounded-pill bg-cream-3 text-[11px] font-semibold uppercase tracking-wide text-ink-70">
                <Lock size={11} strokeWidth={2.5} />
                Fixed · {lockDays}d
              </span>
            </div>
          </div>
          <div
            className="shrink-0"
            style={{
              transform: "rotate(6deg)",
              filter: "drop-shadow(0 6px 14px rgba(14,17,22,0.12))",
            }}
          >
            <CoinIcon variant={iconVarFor(symbol)} size={96} />
          </div>
        </div>
      </motion.section>

      {/* Insufficient balance prompt */}
      {noBalance && (
        <motion.section
          initial="hidden"
          animate="show"
          variants={fade}
          transition={stagger(1)}
          className="px-4 pt-4"
        >
          <div className="rounded-[14px] bg-yellow/20 border border-yellow p-3 flex items-start gap-3">
            <Info size={16} className="text-ink shrink-0 mt-0.5" />
            <div className="flex-1 text-[13px] text-ink leading-snug">
              <div className="font-semibold">
                You don&rsquo;t have any {symbol} yet
              </div>
              <p className="text-ink-70 mt-0.5">
                Deposit some {symbol} to your wallet to start staking.
              </p>
            </div>
            <Link
              href={`/deposit/asset/${symbol}`}
              className="inline-flex items-center gap-1 h-8 px-3 rounded-pill bg-orange text-white text-[12px] font-semibold shrink-0"
            >
              <ArrowDownToLine size={12} />
              Deposit
            </Link>
          </div>
        </motion.section>
      )}

      {/* Amount section — moved ABOVE the lockup details */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(2)}
        className="px-4 pt-5"
      >
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-[12px] font-semibold text-ink-40 uppercase tracking-wide">
            Amount
          </span>
          <div className="flex gap-1.5">
            {([0.25, 0.5, 0.75, 1] as const).map((p) => {
              const disabled = balance === 0;
              return (
                <button
                  key={p}
                  type="button"
                  disabled={disabled}
                  onClick={() => onPercent(p)}
                  className={`h-7 px-3 rounded-pill text-[12px] font-semibold ${
                    disabled
                      ? "bg-cream-3 text-ink-40 cursor-not-allowed"
                      : "bg-cream-2 text-ink-70 active:bg-cream-3"
                  }`}
                >
                  {p === 1 ? "MAX" : `${p * 100}%`}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`bg-cream-2 rounded-[14px] px-3.5 py-3 h-20 flex items-center gap-3 ${
            insufficient ? "ring-1 ring-red" : ""
          }`}
        >
          <CoinIcon variant={iconVarFor(symbol)} size={36} />
          <span className="text-[15px] font-semibold text-ink shrink-0">
            {symbol}
          </span>
          <div className="flex-1 min-w-0 flex flex-col items-end justify-center">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              aria-label="Stake amount"
              className="w-full bg-transparent outline-none text-right font-nums text-[28px] leading-none text-ink placeholder:text-ink-40"
            />
            <div className="text-[12px] text-ink-40 font-nums mt-1 truncate max-w-full">
              ≈ {formatMoney(valueUSD, "USD")}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[13px] font-nums text-ink-70">
            {asset
              ? `Available: ${formatCrypto(balance, symbol)}`
              : "—"}
          </span>
          <span className="text-[13px] font-nums text-ink-40">
            {asset ? formatMoney((asset.balance) * priceUSD, "USD") : ""}
          </span>
        </div>
        {insufficient && (
          <p className="mt-1.5 px-1 text-[13px] text-red font-semibold">
            Insufficient balance
          </p>
        )}
      </motion.section>

      {/* Approximate rewards */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(3)}
        className="px-4 pt-5"
      >
        <div className="bg-cream-2 rounded-[14px] p-4">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-ink-40">
            Approximate rewards
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] text-ink-70">After {lockDays} days</span>
            <span className="text-[13px] text-ink font-nums text-right">
              + {trimAmount(periodRewards.toFixed(8))} {symbol}
              <span className="block text-[11px] text-ink-40">
                ≈ {formatMoney(periodRewards * priceUSD, "USD")}
              </span>
            </span>
          </div>
          <div className="h-px bg-hair my-3" />
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-ink-70">Per year</span>
            <span className="text-[13px] text-ink font-nums text-right">
              + {trimAmount(annualRewards.toFixed(8))} {symbol}
              <span className="block text-[11px] text-ink-40">
                ≈ {formatMoney(annualRewards * priceUSD, "USD")}
              </span>
            </span>
          </div>
        </div>
      </motion.section>

      {/* Lockup details */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(4)}
        className="px-4 pt-4"
      >
        <div className="bg-cream-2 rounded-[14px]">
          <DetailRow icon={<Lock size={18} strokeWidth={1.75} />} label="Lockup period" value={`${lockDays} days`} />
          <Hairline />
          <DetailRow icon={<Calendar size={18} strokeWidth={1.75} />} label="Start date" value={formatShortDate(today)} />
          <Hairline />
          <DetailRow icon={<Calendar size={18} strokeWidth={1.75} />} label="End of lockup" value={formatShortDate(endDate)} />
          <Hairline />
          <DetailRow
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
            value={`${processingDays} day${processingDays === 1 ? "" : "s"}`}
          />
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
              onChange={setAutoRenew}
              ariaLabel="Auto-renew this stake"
            />
          </div>
          <p className="mt-2 text-[13px] text-ink-70" style={{ lineHeight: 1.5 }}>
            Automatically continue staking for another {lockDays} days at the rate available then. You can turn this off any time before the period ends.
          </p>
        </div>
      </motion.section>

      {/* Bottom action bar */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-cream/90 backdrop-blur px-4 pt-3 z-30"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          disabled={!valid}
          onClick={onContinue}
          className={`w-full h-14 rounded-pill font-semibold text-[15px] transition-colors ${
            valid
              ? "bg-orange text-white active:opacity-90"
              : "bg-orange-soft text-ink-40 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>

      <HintSheet
        open={hintOpen}
        onClose={() => setHintOpen(false)}
        title="Processing time"
        body={
          <p>
            After your lockup ends, we need {processingDays} day
            {processingDays === 1 ? "" : "s"} to release funds back to your wallet.
            During this window your tokens are no longer accruing rewards.
          </p>
        }
      />
    </div>
  );
}

function DetailRow({
  icon,
  label,
  labelTrailing,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  labelTrailing?: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="text-ink shrink-0">{icon}</span>
      <span className="flex-1 text-[14px] text-ink-70 inline-flex items-center">
        {label}
        {labelTrailing}
      </span>
      <span className="text-[14px] text-ink font-semibold font-nums">{value}</span>
    </div>
  );
}
function Hairline() {
  return <div className="h-px bg-hair mx-4" />;
}
