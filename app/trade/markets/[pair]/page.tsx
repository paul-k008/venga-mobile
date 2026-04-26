"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ListOrdered, Star } from "lucide-react";
import BackButton from "@/components/BackButton";
import Sparkline from "@/components/Sparkline";
import StatGrid from "@/components/StatGrid";
import SegmentedControl from "@/components/SegmentedControl";
import { CoinIcon } from "@/components/icons";
import {
  ASSET_DETAILS,
  findMarket,
  generatePairSparkline,
  iconVarFor,
} from "@/lib/mocks";
import {
  formatCompact,
  formatNumber,
  formatPct,
  formatPrice,
} from "@/lib/utils";

const TIMEFRAMES = ["1D", "1W", "1M", "1Y", "5Y"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

const TABS = ["Information", "Orders"] as const;

export default function PairDetailPage() {
  const params = useParams<{ pair: string }>();
  const slug = (params?.pair ?? "").toUpperCase();
  const market = findMarket(slug);

  const [favorite, setFavorite] = useState(false);
  const [timeframe, setTimeframe] = useState<Timeframe>("1D");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Information");

  const points = useMemo(() => generatePairSparkline(slug), [slug]);

  if (!market) {
    return (
      <div className="min-h-screen w-full bg-cream flex flex-col">
        <div className="px-5 pt-5">
          <BackButton />
        </div>
        <div className="flex-1 flex items-center justify-center px-8 text-center">
          <div>
            <div className="font-display text-[24px] text-ink leading-tight">
              Pair not found
            </div>
            <Link
              href="/trade/markets"
              className="inline-flex mt-5 h-11 px-5 rounded-pill bg-orange text-white font-semibold text-[14px] items-center"
            >
              Back to markets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const positive = market.change24hPct >= 0;
  const detail = ASSET_DETAILS[market.base];
  const high = Math.max(...points);
  const low = Math.min(...points);

  const stats = detail
    ? [
        { label: "Market cap", value: formatCompact(detail.marketCapUSD, "USD") },
        {
          label: "Total supply",
          value: `${formatCompact(detail.totalSupply)} ${market.base}`,
        },
        {
          label: "Circulating",
          value: `${formatCompact(detail.totalSupply * 0.97)} ${market.base}`,
        },
        {
          label: "24h volume",
          value: formatCompact(market.price * 1_000_000, "USD"),
        },
        {
          label: "All-time high",
          value: formatPrice(detail.ath, "USD"),
        },
        {
          label: "All-time low",
          value: formatPrice(detail.atl, "USD"),
        },
      ]
    : [];

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      {/* Top chrome */}
      <div className="relative px-5 pt-5 flex items-center justify-between">
        <BackButton />
        <h1 className="absolute left-1/2 -translate-x-1/2 top-6 text-[16px] font-semibold text-ink">
          {market.base}
          <span className="text-ink-70 font-normal">/{market.quote}</span>
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
            <div className="font-display text-[24px] text-ink leading-none">
              {market.base}
              <span className="text-ink-70 font-normal">/{market.quote}</span>
            </div>
            <div className="mt-3 font-display text-[36px] text-ink font-nums leading-none">
              {formatNumber(market.price, market.price >= 100 ? 2 : 4)}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span
                className={`text-[14px] font-semibold font-nums ${
                  positive ? "text-mint-deep" : "text-red"
                }`}
              >
                {formatPct(market.change24hPct)}
              </span>
              <span className="text-[12px] text-ink-40">24h change</span>
            </div>
          </div>

          <div
            className="shrink-0"
            style={{
              transform: "rotate(6deg)",
              filter: "drop-shadow(0 8px 18px rgba(14,17,22,0.12))",
            }}
          >
            <CoinIcon variant={iconVarFor(market.base)} size={140} />
          </div>
        </section>

        {/* Sparkline */}
        <section className="mt-5 px-5">
          <Sparkline
            points={points}
            height={140}
            highLabel={formatNumber(high, market.price >= 100 ? 2 : 4)}
            lowLabel={formatNumber(low, market.price >= 100 ? 2 : 4)}
          />
        </section>

        {/* Timeframe */}
        <section className="mt-3 px-5 flex gap-2 overflow-x-auto no-scrollbar">
          {TIMEFRAMES.map((t) => {
            const active = t === timeframe;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTimeframe(t)}
                className={`shrink-0 h-8 px-4 rounded-pill text-[13px] font-semibold transition-colors ${
                  active ? "border-[1.5px] border-orange text-orange" : "text-ink"
                }`}
              >
                {t}
              </button>
            );
          })}
        </section>

        {/* Tabs */}
        <section className="mt-6">
          <SegmentedControl
            options={TABS as unknown as string[]}
            value={tab}
            onChange={(v) => setTab(v as (typeof TABS)[number])}
            layoutId="pairTab"
          />
        </section>

        {/* Tab content */}
        <section className="mt-5">
          {tab === "Information" ? (
            stats.length > 0 ? (
              <StatGrid stats={stats} />
            ) : (
              <p className="px-5 text-[14px] text-ink-70 text-center">
                Detail data not available for this asset.
              </p>
            )
          ) : (
            <div className="px-5">
              <div className="rounded-[16px] bg-cream-2 p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-cream-3 inline-flex items-center justify-center">
                  <ListOrdered size={20} className="text-ink-70" />
                </div>
                <div className="mt-3 text-[15px] font-semibold text-ink">
                  No orders yet
                </div>
                <p className="text-[13px] text-ink-70 mt-1">
                  Your trades on this pair will appear here. Place your first trade to see history.
                </p>
              </div>
            </div>
          )}
        </section>

        {detail && (
          <section className="mt-7 px-5">
            <h2 className="font-display text-[20px] text-ink">
              About {market.base}
            </h2>
            <p className="mt-3 text-[15px] text-ink-70" style={{ lineHeight: 1.6 }}>
              {detail.description}
            </p>
          </section>
        )}
      </div>

      {/* Bottom Sell / Buy bar */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-cream px-5 pt-3"
        style={{
          boxShadow: "0 -4px 16px rgba(14,17,22,0.06)",
          paddingBottom: "calc(20px + env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex gap-3">
          <Link
            href={`/trade?from=${market.base}&to=${market.quote}&intent=sell`}
            className="flex-[0.85] h-12 rounded-pill bg-cream-3 text-ink font-semibold text-[15px] flex items-center justify-center"
          >
            Sell
          </Link>
          <Link
            href={`/trade?from=${market.quote}&to=${market.base}&intent=buy`}
            className="flex-[1.15] h-12 rounded-pill bg-orange text-white font-semibold text-[15px] flex items-center justify-center"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}
