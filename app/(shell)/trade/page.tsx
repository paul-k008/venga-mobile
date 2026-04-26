"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";
import TradeAssetField from "@/components/TradeAssetField";
import SlideToConfirm from "@/components/SlideToConfirm";
import RateTickerPill from "@/components/RateTickerPill";
import FeeSheet from "@/components/FeeSheet";
import { ASSETS, computeRate, type Asset } from "@/lib/mocks";
import { useTradeStore } from "@/lib/tradeStore";
import { formatCrypto, formatMoney, formatNumber } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

const findAsset = (symbol: string): Asset | undefined =>
  ASSETS.find((a) => a.symbol === symbol);

function TradeFormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialised = useRef(false);

  const from = useTradeStore((s) => s.from);
  const to = useTradeStore((s) => s.to);
  const feePct = useTradeStore((s) => s.feePct);
  const ratePulseTick = useTradeStore((s) => s.ratePulseTick);
  const setFrom = useTradeStore((s) => s.setFrom);
  const setTo = useTradeStore((s) => s.setTo);
  const setAmount = useTradeStore((s) => s.setAmount);
  const swapDirection = useTradeStore((s) => s.swapDirection);
  const bumpPulseTick = useTradeStore((s) => s.bumpPulseTick);

  /* --- query-param hydration (deeplinks) --- */
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;
    const fromParam = (params.get("from") ?? "").toUpperCase();
    const intent = (params.get("intent") ?? "").toLowerCase();

    if (intent === "buy" && fromParam) {
      setFrom("EUR");
      setTo(fromParam);
    } else if (intent === "sell" && fromParam) {
      setFrom(fromParam);
      setTo("EUR");
    } else if (fromParam) {
      setFrom(fromParam);
      // pick a sensible counter so we don't end up with same-asset
      setTo(fromParam === "EUR" ? "BTC" : "EUR");
    }
    // toParam (used by Pair Detail Buy/Sell)
    const toParam = (params.get("to") ?? "").toUpperCase();
    if (toParam) setTo(toParam);
  }, [params, setFrom, setTo]);

  /* --- 10s rate pulse --- */
  useEffect(() => {
    const id = window.setInterval(() => bumpPulseTick(), 10_000);
    return () => window.clearInterval(id);
  }, [bumpPulseTick]);

  /* --- derive --- */
  const fromAsset = findAsset(from.symbol);
  const toAsset = findAsset(to.symbol);

  const baseRate = useMemo(
    () => (fromAsset && toAsset ? computeRate(fromAsset, toAsset) : 0),
    [fromAsset, toAsset],
  );

  const amountNum = parseFloat(from.amount || "0") || 0;
  const fromValueUSD = amountNum * (fromAsset?.priceUSD ?? 0);
  const toAmount = baseRate ? amountNum * baseRate : 0;
  const toAmountStr = toAmount > 0 ? formatNumber(toAmount, 6).replace(/\.?0+$/, "") : "";
  const toValueUSD = toAmount * (toAsset?.priceUSD ?? 0);
  const feeQuoteUSD = fromValueUSD * feePct;

  const sameAsset = from.symbol === to.symbol;
  const insufficient =
    !!fromAsset && amountNum > 0 && amountNum * (1 + feePct) > fromAsset.balance;
  const validAmount = amountNum > 0 && Number.isFinite(amountNum);
  const sliderDisabled = !validAmount || sameAsset || insufficient;
  const sliderDisabledLabel = sameAsset
    ? "Pick a different asset"
    : insufficient
      ? `Insufficient ${from.symbol}`
      : "Enter an amount";

  /* --- percent chips --- */
  const onPercent = (pct: 0.25 | 0.5 | 0.75 | 1) => {
    if (!fromAsset || fromAsset.balance === 0) return;
    // leave fee headroom so MAX doesn't auto-fail
    const usable = pct === 1 ? fromAsset.balance / (1 + feePct) : fromAsset.balance * pct;
    const decimals = from.symbol === "EUR" ? 2 : 8;
    setAmount(usable.toFixed(decimals).replace(/\.?0+$/, ""));
  };

  /* --- fee sheet state --- */
  const [feeOpen, setFeeOpen] = useFeeSheet();

  /* --- review entry --- */
  const goReview = () => router.push("/trade/review");

  /* --- asset picker entry --- */
  const openPicker = (role: "from" | "to") =>
    router.push(`/trade/select-asset?role=${role}`);

  return (
    <div className="flex flex-col pb-32">
      {/* Header */}
      <div className="relative flex items-center justify-between px-5 pt-5">
        <span className="w-11" aria-hidden="true" />
        <h1 className="font-display text-[20px] uppercase text-ink leading-none">
          Trade
        </h1>
        <Link
          href="/trade/markets"
          className="h-8 px-3 rounded-pill bg-cream-2 active:bg-cream-3 inline-flex items-center text-[13px] font-semibold text-orange"
        >
          Browse →
        </Link>
      </div>

      {/* From */}
      <motion.section
        layout
        layoutId="trade-from"
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="px-4 pt-4"
        initial="hidden"
        animate="show"
        variants={fade}
      >
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-[12px] font-semibold text-ink-40 uppercase tracking-wide">
            You pay
          </span>
          <div className="flex gap-1.5">
            {([0.25, 0.5, 0.75, 1] as const).map((p) => {
              const disabled = !fromAsset || fromAsset.balance === 0;
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
        <TradeAssetField
          role="from"
          symbol={from.symbol}
          amount={from.amount}
          valueUSD={fromValueUSD}
          onTapAsset={() => openPicker("from")}
          onAmountChange={setAmount}
        />
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[13px] font-nums text-ink-70">
            {fromAsset
              ? `Available: ${formatCrypto(fromAsset.balance, fromAsset.symbol)}`
              : "—"}
          </span>
          <span className="text-[13px] font-nums text-ink-40">
            {fromAsset ? formatMoney(fromAsset.valueUSD, "USD") : ""}
          </span>
        </div>
        {insufficient && (
          <p className="mt-1.5 px-1 text-[12px] text-red font-semibold">
            Insufficient {from.symbol}
          </p>
        )}
      </motion.section>

      {/* Direction button + ticker */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.05 }}
        className="px-4 my-3 flex items-center justify-center gap-3"
      >
        <SwapButton onClick={swapDirection} />
        {baseRate > 0 && (
          <RateTickerPill
            fromSymbol={from.symbol}
            toSymbol={to.symbol}
            rate={baseRate}
            pulseTick={ratePulseTick}
          />
        )}
      </motion.div>

      {/* To */}
      <motion.section
        layout
        layoutId="trade-to"
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="px-4"
        initial="hidden"
        animate="show"
        variants={fade}
        custom={1}
      >
        <div className="px-1 mb-2">
          <span className="text-[12px] font-semibold text-ink-40 uppercase tracking-wide">
            You get
          </span>
        </div>
        <TradeAssetField
          role="to"
          symbol={to.symbol}
          amount={toAmountStr}
          valueUSD={toValueUSD}
          onTapAsset={() => openPicker("to")}
          readOnly
        />
        <div className="mt-2 px-1 text-[13px] font-nums text-ink-40 text-right">
          ≈ {formatMoney(toValueUSD, "USD")} estimated
        </div>
      </motion.section>

      {/* Cost summary */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.1 }}
        className="px-4 pt-4"
      >
        <div className="bg-cream-2 rounded-[14px] p-4">
          <button
            type="button"
            onClick={() => setFeeOpen(true)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="text-[13px] text-ink-70">Fee</span>
            <span className="text-[13px] font-nums text-ink">
              {formatNumber(feePct * 100, 2)}%
              {fromValueUSD > 0 && (
                <>
                  {" · "}
                  {formatMoney(feeQuoteUSD, "USD")}
                </>
              )}
              <span className="ml-1 text-ink-40">›</span>
            </span>
          </button>
          <div className="h-px bg-hair my-3" />
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-ink-70">Estimated arrival</span>
            <span className="text-[13px] font-nums text-ink">Instant</span>
          </div>
        </div>
      </motion.section>

      {/* Slide to review */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.14 }}
        className="px-4 pt-6"
      >
        <SlideToConfirm
          label="Slide to review"
          disabled={sliderDisabled}
          disabledLabel={sliderDisabledLabel}
          onConfirm={goReview}
        />
      </motion.section>

      <FeeSheet
        open={feeOpen}
        onClose={() => setFeeOpen(false)}
        quoteSymbol="USD"
        feeQuote={feeQuoteUSD}
        feePct={feePct}
      />
    </div>
  );
}

function SwapButton({ onClick }: { onClick: () => void }) {
  const rotation = useRef(0);
  return (
    <motion.button
      type="button"
      onClick={() => {
        rotation.current += 180;
        onClick();
      }}
      whileTap={{ scale: 0.92 }}
      animate={{ rotate: rotation.current }}
      transition={{ type: "spring", stiffness: 360, damping: 20 }}
      aria-label="Swap From and To"
      className="w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center"
      style={{ boxShadow: "0 4px 14px rgba(14,17,22,0.12)" }}
    >
      <ArrowDownUp size={20} strokeWidth={2.2} />
    </motion.button>
  );
}

/* tiny local hook so we don't need a separate file */
import { useState } from "react";
function useFeeSheet() {
  const [open, setOpen] = useState(false);
  return [open, setOpen] as const;
}

export default function TradePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <TradeFormInner />
    </Suspense>
  );
}
