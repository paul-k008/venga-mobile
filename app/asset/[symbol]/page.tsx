"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Coins,
  Star,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import StubScreen from "@/components/StubScreen";
import Sparkline from "@/components/Sparkline";
import StatGrid from "@/components/StatGrid";
import AssetActionButton from "@/components/AssetActionButton";
import { CoinIcon } from "@/components/icons";
import {
  ASSETS,
  ASSET_DETAILS,
  ASSETS_EARNABLE,
  generateSparkline,
} from "@/lib/mocks";
import { formatMoney, formatPct, formatCrypto } from "@/lib/utils";

const TIMEFRAMES = ["1D", "1W", "1M", "1Y", "5Y"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

function formatCompactUSD(n: number): string {
  if (n === 0) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(n);
}

function formatCompactNumber(n: number, suffix?: string): string {
  if (n === 0) return "—";
  const s = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(n);
  return suffix ? `${s} ${suffix}` : s;
}

export default function AssetDetailPage() {
  const params = useParams<{ symbol: string }>();
  const symbol = (params?.symbol ?? "").toUpperCase();

  const asset = useMemo(() => ASSETS.find((a) => a.symbol === symbol), [symbol]);
  const detail = ASSET_DETAILS[symbol];
  const points = useMemo(() => generateSparkline(symbol), [symbol]);

  const [favorite, setFavorite] = useState(false);
  const [timeframe, setTimeframe] = useState<Timeframe>("1D"); // iter 2: tab state is visual only

  if (!asset || !detail) {
    return <StubScreen title={symbol || "Asset"} />;
  }

  const positive = asset.price24hPct >= 0;
  const earnable = ASSETS_EARNABLE.has(symbol);

  const high = Math.max(...points);
  const low = Math.min(...points);

  const stats = [
    { label: "Price", value: formatMoney(asset.priceUSD, "USD") },
    {
      label: "24h change",
      value: (
        <span className={positive ? "text-mint-deep" : "text-red"}>
          {formatPct(asset.price24hPct)}
        </span>
      ),
    },
    { label: "Market cap", value: formatCompactUSD(detail.marketCapUSD) },
    {
      label: "Total supply",
      value: formatCompactNumber(detail.totalSupply, symbol),
    },
    { label: "All-time high", value: formatMoney(detail.ath, "USD") },
    { label: "All-time low", value: formatMoney(detail.atl, "USD") },
  ];

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      {/* Top chrome */}
      <div className="relative px-5 pt-5 flex items-center justify-between">
        <BackButton />
        <h1 className="absolute left-1/2 -translate-x-1/2 font-display text-[18px] text-ink top-6">
          {symbol}
        </h1>
        <button
          type="button"
          aria-label={favorite ? "Unfavorite" : "Favorite"}
          onClick={() => setFavorite((f) => !f)}
          className="w-11 h-11 rounded-full bg-cream flex items-center justify-center"
          style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
        >
          <Star
            size={20}
            strokeWidth={2}
            className={favorite ? "text-orange" : "text-ink"}
            fill={favorite ? "var(--orange)" : "none"}
          />
        </button>
      </div>

      <div
        className="flex-1"
        style={{ paddingBottom: "calc(96px + env(safe-area-inset-bottom))" }}
      >
        {/* Hero */}
        <section className="px-5 pt-6 flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-display text-[28px] text-ink leading-none">
              {asset.name}
            </div>
            <div className="text-[13px] text-ink-70 mt-1">{asset.symbol}</div>

            <div className="mt-4">
              <div
                className="text-[11px] text-ink-40 font-semibold uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                Your holdings
              </div>
              <div className="mt-1 text-[32px] text-ink font-semibold font-nums leading-none">
                {asset.balance === 0
                  ? `0 ${symbol}`
                  : formatCrypto(asset.balance, symbol)}
              </div>
              <div className="text-[16px] text-ink-70 font-nums mt-1">
                ≈ {formatMoney(asset.valueUSD, "USD")}
              </div>
            </div>

            <span
              className={`inline-block mt-3 text-[12px] font-semibold px-2 py-0.5 rounded-pill font-nums ${
                positive ? "bg-mint text-mint-deep" : "bg-red-tint text-red"
              }`}
            >
              {formatPct(asset.price24hPct)} 24h
            </span>
          </div>

          <div
            className="shrink-0"
            style={{
              transform: "rotate(6deg)",
              filter: "drop-shadow(0 8px 18px rgba(14,17,22,0.12))",
            }}
          >
            <CoinIcon variant={asset.iconVar} size={120} />
          </div>
        </section>

        {/* Sparkline */}
        <section className="mt-7 px-5">
          <Sparkline
            points={points}
            height={140}
            highLabel={formatMoney(high, "USD")}
            lowLabel={formatMoney(low, "USD")}
          />
        </section>

        {/* Timeframe tabs */}
        <section className="mt-3 px-5 flex gap-2 overflow-x-auto no-scrollbar">
          {TIMEFRAMES.map((t) => {
            const active = t === timeframe;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTimeframe(t)}
                className={`shrink-0 h-8 px-4 rounded-pill text-[13px] font-semibold transition-colors ${
                  active
                    ? "border-[1.5px] border-orange text-orange"
                    : "text-ink"
                }`}
              >
                {t}
              </button>
            );
          })}
        </section>

        {/* Action buttons */}
        <section className="mt-6 px-5 flex gap-3">
          <AssetActionButton
            icon={<ArrowDownToLine size={22} strokeWidth={1.75} />}
            label="Deposit"
            href={`/deposit?asset=${symbol}`}
          />
          <AssetActionButton
            icon={<ArrowUpFromLine size={22} strokeWidth={1.75} />}
            label="Withdraw"
            href={`/asset/${symbol}/withdraw`}
          />
          <AssetActionButton
            icon={<ArrowLeftRight size={22} strokeWidth={1.75} />}
            label="Trade"
            href={`/trade?from=${symbol}`}
          />
          {earnable && (
            <AssetActionButton
              icon={<Coins size={22} strokeWidth={1.75} />}
              label="Earn"
              href={`/earn?asset=${symbol}`}
            />
          )}
        </section>

        {/* Stats */}
        <section className="mt-6">
          <StatGrid stats={stats} />
        </section>

        {/* About */}
        <section className="mt-8 px-5">
          <h2 className="font-display text-[20px] text-ink">
            About {asset.name}
          </h2>
          <p className="mt-3 text-[15px] text-ink-70 leading-[1.6]">
            {detail.description}
          </p>
          <a
            href="#"
            className="inline-block mt-2 text-[14px] font-semibold text-orange"
          >
            Read more →
          </a>
        </section>

        {/* Activity placeholder */}
        <section className="mt-8 px-5">
          <h2 className="font-display text-[20px] text-ink">Recent activity</h2>
          <div className="mt-3 bg-cream-2 rounded-md p-5 text-center">
            <p className="text-[14px] text-ink-70">
              Activity comes in the next iteration.
            </p>
          </div>
        </section>
      </div>

      {/* Bottom buy/sell bar */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-cream px-5 pt-3"
        style={{
          boxShadow: "0 -4px 16px rgba(14,17,22,0.06)",
          paddingBottom: "calc(20px + env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex gap-3">
          <Link
            href={`/trade?from=${symbol}&intent=sell`}
            className="flex-1 h-12 rounded-pill bg-cream-3 text-ink font-semibold text-[15px] flex items-center justify-center"
          >
            Sell
          </Link>
          <Link
            href={`/trade?from=${symbol}&intent=buy`}
            className="flex-1 h-12 rounded-pill bg-orange text-white font-semibold text-[15px] flex items-center justify-center"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}
