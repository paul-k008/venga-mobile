"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Send, ArrowLeftRight, Coins } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import BalanceCard from "@/components/BalanceCard";
import ActionTile from "@/components/ActionTile";
import FilterChip from "@/components/FilterChip";
import MarketRow from "@/components/MarketRow";
import {
  ASSETS,
  MARKET_FILTER_TABS,
  type MarketFilter,
  type Asset,
} from "@/lib/mocks";

function applyFilter(assets: Asset[], filter: MarketFilter): Asset[] {
  const nonEur = assets.filter((a) => a.symbol !== "EUR");
  switch (filter) {
    case "All":
      return nonEur.slice(0, 5);
    case "Favourites":
      return nonEur.filter((a) => ["BTC", "ETH", "AAVE"].includes(a.symbol));
    case "Popular":
      return nonEur.slice(0, 3);
    case "Gainers":
      return [...nonEur].sort((a, b) => b.price24hPct - a.price24hPct).slice(0, 5);
    case "Losers":
      return [...nonEur].sort((a, b) => a.price24hPct - b.price24hPct).slice(0, 5);
  }
}

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

export default function HomePage() {
  const [filter, setFilter] = useState<MarketFilter>("All");
  const rows = useMemo(() => applyFilter(ASSETS, filter), [filter]);

  return (
    <div className="flex flex-col">
      <TopHeader />

      <div className="px-5 pt-2">
        <motion.div initial="hidden" animate="show" variants={fade}>
          <BalanceCard />
        </motion.div>
      </div>

      <div className="px-5 pt-6">
        <div className="flex items-start gap-3">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.04 }}
          >
            <ActionTile
              href="/deposit"
              label="Deposit"
              color="var(--blob-blue)"
              rotate={12}
              icon={Send}
              iconRotate={-20}
            />
          </motion.div>
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.08 }}
          >
            <ActionTile
              href="/trade"
              label="Trade"
              color="var(--blob-mint)"
              rotate={-8}
              icon={ArrowLeftRight}
            />
          </motion.div>
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.12 }}
          >
            <ActionTile
              href="/earn"
              label="Earn"
              color="var(--blob-yellow)"
              rotate={24}
              icon={Coins}
            />
          </motion.div>
        </div>
      </div>

      <div className="px-5 pt-8 pb-2 flex items-center justify-between">
        <motion.h2
          className="font-display text-[22px] text-ink"
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.16 }}
        >
          Market
        </motion.h2>
        <button
          type="button"
          aria-label="Filter markets"
          className="w-9 h-9 rounded-full bg-cream-2 flex items-center justify-center"
        >
          <SlidersHorizontal size={16} className="text-ink" />
        </button>
      </div>

      <div className="px-5 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {MARKET_FILTER_TABS.map((tab) => (
            <FilterChip
              key={tab}
              label={tab}
              active={filter === tab}
              onClick={() => setFilter(tab)}
            />
          ))}
        </div>
      </div>

      <div className="px-5 pb-4">
        {rows.map((asset, i) => (
          <motion.div
            key={asset.symbol}
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.2 + i * 0.02 }}
          >
            <MarketRow asset={asset} />
          </motion.div>
        ))}
        {rows.length === 0 && (
          <p className="text-ink-70 text-[14px] py-8 text-center">
            No assets match this filter.
          </p>
        )}
      </div>
    </div>
  );
}
