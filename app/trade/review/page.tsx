"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, AlertCircle } from "lucide-react";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import SlideToConfirm from "@/components/SlideToConfirm";
import { CoinIcon } from "@/components/icons";
import {
  ASSETS,
  computeRate,
  iconVarFor,
  type Asset,
} from "@/lib/mocks";
import { jitterRate, useTradeStore } from "@/lib/tradeStore";
import { formatMoney, formatNumber, trimAmount } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};
const findAsset = (s: string): Asset | undefined =>
  ASSETS.find((a) => a.symbol === s);

export default function TradeReviewPage() {
  const router = useRouter();

  const from = useTradeStore((s) => s.from);
  const to = useTradeStore((s) => s.to);
  const feePct = useTradeStore((s) => s.feePct);
  const ratePulseTick = useTradeStore((s) => s.ratePulseTick);
  const bumpPulseTick = useTradeStore((s) => s.bumpPulseTick);
  const commitTrade = useTradeStore((s) => s.commitTrade);

  const fromAsset = findAsset(from.symbol);
  const toAsset = findAsset(to.symbol);

  /* --- guard: amount missing -> bounce back --- */
  useEffect(() => {
    if (!from.amount || parseFloat(from.amount) <= 0 || !fromAsset || !toAsset) {
      router.replace("/trade");
    }
  }, [from.amount, fromAsset, toAsset, router]);

  /* --- countdown 10 → 0 → refresh --- */
  const [secs, setSecs] = useState(10);
  useEffect(() => {
    const id = window.setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          bumpPulseTick();
          return 10;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [bumpPulseTick]);

  /* --- rate (with jitter on each tick) --- */
  const baseRate = useMemo(
    () => (fromAsset && toAsset ? computeRate(fromAsset, toAsset) : 0),
    [fromAsset, toAsset],
  );
  const liveRate = useMemo(
    () => jitterRate(baseRate, ratePulseTick),
    [baseRate, ratePulseTick],
  );

  /* --- mount-time rate, for "rate changed" banner --- */
  const mountRateRef = useRef(0);
  useEffect(() => {
    if (mountRateRef.current === 0 && baseRate > 0) {
      mountRateRef.current = liveRate;
    }
  }, [baseRate, liveRate]);

  const rateChangedSignificantly =
    mountRateRef.current > 0 &&
    Math.abs(liveRate - mountRateRef.current) / mountRateRef.current > 0.005;

  /* --- briefly disable slider after a rate jump --- */
  const [bannerVisibleAt, setBannerVisibleAt] = useState<number>(0);
  const prevRateChangedRef = useRef(false);
  useEffect(() => {
    if (rateChangedSignificantly && !prevRateChangedRef.current) {
      setBannerVisibleAt(Date.now());
    }
    prevRateChangedRef.current = rateChangedSignificantly;
  }, [rateChangedSignificantly]);
  const [sliderTempDisabled, setSliderTempDisabled] = useState(false);
  useEffect(() => {
    if (!bannerVisibleAt) return;
    setSliderTempDisabled(true);
    const id = window.setTimeout(() => setSliderTempDisabled(false), 1500);
    return () => window.clearTimeout(id);
  }, [bannerVisibleAt]);

  if (!fromAsset || !toAsset) return null;

  const amountNum = parseFloat(from.amount || "0") || 0;
  const fromValueUSD = amountNum * fromAsset.priceUSD;
  const toAmount = amountNum * liveRate;
  const toValueUSD = toAmount * toAsset.priceUSD;
  const feeUSD = fromValueUSD * feePct;
  // present fee in EUR if either side is EUR, otherwise USD
  const feeIsEUR = from.symbol === "EUR" || to.symbol === "EUR";
  const eurAsset = ASSETS.find((a) => a.symbol === "EUR");
  const feeEUR =
    eurAsset && eurAsset.priceUSD > 0 ? feeUSD / eurAsset.priceUSD : feeUSD;

  const onConfirm = () => {
    commitTrade({
      from: { symbol: from.symbol, amount: from.amount },
      to: { symbol: to.symbol, amount: trimAmount(toAmount.toFixed(6)) },
      rate: liveRate,
      feePct,
      feeQuote: feeIsEUR ? feeEUR : feeUSD,
      quoteSymbol: feeIsEUR ? "EUR" : "USD",
      executedAt: new Date().toISOString(),
    });
    router.replace("/trade/success");
  };

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col pb-32">
      <div className="flex items-center justify-between px-5 pt-5">
        <BackButton />
        <h1 className="font-display text-[20px] uppercase text-ink">Review</h1>
        <div className="h-8 px-3 rounded-pill bg-cream-2 inline-flex items-center text-[12px] text-ink-70 font-nums">
          Updates in <span className="ml-1 font-semibold text-ink">{secs}s</span>
        </div>
      </div>

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        className="px-4 pt-5"
      >
        <StripedBorder variant="orange-sky" radius={20}>
          <div className="p-4 relative">
            <Side
              symbol={from.symbol}
              amount={trimAmount(from.amount || "0")}
              valueUSD={fromValueUSD}
              role="from"
            />
            <div className="my-3 h-px bg-hair" />
            <Side
              symbol={to.symbol}
              amount={trimAmount(toAmount.toFixed(6))}
              valueUSD={toValueUSD}
              role="to"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink text-cream flex items-center justify-center"
              style={{ boxShadow: "0 4px 14px rgba(14,17,22,0.15)" }}
            >
              <ArrowDown size={16} strokeWidth={2.4} />
            </div>
          </div>
        </StripedBorder>
      </motion.section>

      {/* Detail rows */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.06 }}
        className="px-4 pt-4"
      >
        <div className="bg-cream-2 rounded-[14px]">
          <DetailRow
            label="Rate"
            value={
              <>
                1 {from.symbol} ≈{" "}
                <span className="font-semibold">
                  {formatNumber(liveRate, liveRate >= 100 ? 2 : 4)}
                </span>{" "}
                {to.symbol}
              </>
            }
          />
          <Hairline />
          <DetailRow
            label="Fee"
            value={
              <>
                {formatNumber(feePct * 100, 2)}% ·{" "}
                {feeIsEUR
                  ? `${formatNumber(feeEUR, 2)} EUR`
                  : formatMoney(feeUSD, "USD")}
              </>
            }
          />
          <Hairline />
          <DetailRow
            label="You'll receive"
            strong
            value={
              <>
                ≈{" "}
                <span className="font-semibold">
                  {trimAmount(toAmount.toFixed(6))}
                </span>{" "}
                {to.symbol}
              </>
            }
          />
          <Hairline />
          <DetailRow label="Estimated arrival" value="Instant" />
        </div>
      </motion.section>

      <AnimatePresence>
        {rateChangedSignificantly && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="px-4 pt-3"
          >
            <div className="rounded-[14px] bg-yellow/20 border border-yellow p-3 flex gap-2 items-start">
              <AlertCircle size={16} className="text-ink shrink-0 mt-0.5" />
              <p className="text-[13px] text-ink leading-snug">
                Rate changed — review the new amounts before confirming.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.12 }}
        className="px-4 pt-3"
      >
        <div className="rounded-[14px] bg-cream-3 p-4">
          <p className="text-[13px] text-ink-70" style={{ lineHeight: 1.5 }}>
            Quotes are indicative. The final executed price may differ slightly due to market movement during confirmation.
          </p>
        </div>
      </motion.section>

      {/* Slide to confirm */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-mobile px-4 pt-3 bg-cream/90 backdrop-blur"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <SlideToConfirm
          label="Slide to confirm trade"
          disabled={sliderTempDisabled}
          disabledLabel={sliderTempDisabled ? "Rate just updated…" : undefined}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  );
}

function Side({
  symbol,
  amount,
  valueUSD,
  role,
}: {
  symbol: string;
  amount: string;
  valueUSD: number;
  role: "from" | "to";
}) {
  return (
    <div className="flex items-center gap-3">
      <CoinIcon variant={iconVarFor(symbol)} size={32} />
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold uppercase text-ink-40 tracking-wide">
          {role === "from" ? "You pay" : "You get"}
        </div>
        <div className="text-[16px] font-semibold text-ink">{symbol}</div>
      </div>
      <div className="text-right">
        <div className="font-display text-[24px] text-ink font-nums leading-none">
          {amount || "0"}
        </div>
        <div className="text-[12px] text-ink-70 font-nums mt-1">
          ≈ {formatMoney(valueUSD, "USD")}
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="text-[13px] text-ink-70">{label}</span>
      <span
        className={`text-[13px] font-nums ${
          strong ? "text-ink font-semibold" : "text-ink"
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
