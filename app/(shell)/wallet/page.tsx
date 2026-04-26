"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Wallet as WalletIcon } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import PortfolioCard from "@/components/PortfolioCard";
import SegmentedControl from "@/components/SegmentedControl";
import MarketRow from "@/components/MarketRow";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import { ASSETS, PORTFOLIO_DELTA_USD_24H, type Asset } from "@/lib/mocks";
import { toast } from "@/lib/toastStore";

const SEGMENTS = ["All", "EUR", "Crypto"] as const;
type Segment = (typeof SEGMENTS)[number];

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

function applySegment(assets: Asset[], seg: Segment): Asset[] {
  switch (seg) {
    case "All":
      return assets;
    case "EUR":
      return assets.filter((a) => a.symbol === "EUR");
    case "Crypto":
      return assets.filter((a) => a.symbol !== "EUR");
  }
}

function sortAssets(assets: Asset[]): Asset[] {
  return [...assets].sort((a, b) => {
    const aZero = a.balance === 0 ? 1 : 0;
    const bZero = b.balance === 0 ? 1 : 0;
    if (aZero !== bZero) return aZero - bZero;
    return b.valueUSD - a.valueUSD;
  });
}

export default function WalletPage() {
  const [segment, setSegment] = useState<Segment>("All");

  // brief skeleton on first mount — simulates a real product fetching wallet data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 400);
    return () => window.clearTimeout(id);
  }, []);

  const totalUSD = useMemo(
    () => ASSETS.reduce((sum, a) => sum + a.valueUSD, 0),
    [],
  );

  const rows = useMemo(
    () => sortAssets(applySegment(ASSETS, segment)),
    [segment],
  );

  return (
    <div
      className="flex flex-col"
      style={{ paddingBottom: "calc(80px + env(safe-area-inset-bottom))" }}
    >
      <TopHeader title="WALLET" />

      <motion.div initial="hidden" animate="show" variants={fade}>
        <PortfolioCard total={totalUSD} deltaUSD={PORTFOLIO_DELTA_USD_24H} />
      </motion.div>

      <motion.div
        className="mt-4"
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
      >
        <SegmentedControl
          options={SEGMENTS as unknown as string[]}
          value={segment}
          onChange={(v) => setSegment(v as Segment)}
        />
      </motion.div>

      <motion.div
        className="px-5 pt-7 pb-2 flex items-center justify-between"
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
      >
        <h2 className="font-display text-[22px] text-ink">Assets</h2>
        <button
          type="button"
          aria-label="Sort and filter"
          onClick={() =>
            toast("Sort & filter coming soon")
          }
          className="w-9 h-9 rounded-full bg-cream-2 flex items-center justify-center"
        >
          <SlidersHorizontal size={16} className="text-ink" />
        </button>
      </motion.div>

      <div className="px-5">
        {loading ? (
          <SkeletonRows count={5} />
        ) : rows.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              icon={<WalletIcon size={22} />}
              title={`No ${segment.toLowerCase()} yet`}
              description="Add funds to start tracking this segment."
              cta={{ label: "Deposit", href: "/deposit" }}
            />
          </div>
        ) : (
          rows.map((asset, i) => (
            <motion.div
              key={asset.symbol}
              initial="hidden"
              animate="show"
              variants={fade}
              transition={{ delay: 0.12 + i * 0.03 }}
            >
              <MarketRow asset={asset} variant="wallet" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function SkeletonRows({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-1 pt-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4 border-b border-hair">
          <Skeleton width={44} height={44} radius={22} />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton width="40%" height={14} />
            <Skeleton width="22%" height={12} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Skeleton width={72} height={14} />
            <Skeleton width={48} height={12} />
          </div>
        </div>
      ))}
    </div>
  );
}
