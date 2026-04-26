"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, FileClock } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import StripedBorder from "@/components/StripedBorder";
import SegmentedControl from "@/components/SegmentedControl";
import EarnableAssetCard from "@/components/EarnableAssetCard";
import StakedPositionCard from "@/components/StakedPositionCard";
import {
  EARNABLE_ASSETS,
  EARN_BALANCE_DELTA_USD_TODAY,
  EARN_BALANCE_USD,
  STAKED_POSITIONS,
  STAKED_POSITIONS_LOCAL,
} from "@/lib/mocks";
import { useEarnStore } from "@/lib/earnStore";
import { formatMoney, maskAmount } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

const TABS = ["Available", "Staked"] as const;
type Tab = (typeof TABS)[number];

function EarnInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [hidden, setHidden] = useState(false);
  const [tab, setTab] = useState<Tab>("Available");

  // subscribing to stakeRevision so the Staked list re-renders after a new stake
  const stakeRevision = useEarnStore((s) => s.stakeRevision);

  // --- redirect for /earn?asset=<symbol>
  useEffect(() => {
    const asset = (params.get("asset") ?? "").toUpperCase();
    if (!asset) return;
    const isEarnable = EARNABLE_ASSETS.some((e) => e.symbol === asset);
    if (isEarnable) {
      router.replace(`/earn/stake/${asset}`);
    }
  }, [params, router]);

  const positions = useMemo(() => {
    void stakeRevision; // ensure dependency
    return [...STAKED_POSITIONS, ...STAKED_POSITIONS_LOCAL];
  }, [stakeRevision]);

  const totalLabel = formatMoney(EARN_BALANCE_USD, "USD");
  const deltaLabel = `+ $${EARN_BALANCE_DELTA_USD_TODAY.toFixed(8).replace(/0+$/, "").replace(/\.$/, "")} today`;

  return (
    <div className="flex flex-col">
      <TopHeader title="Earn" />

      {/* Earn Balance */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        className="px-4 pt-2"
      >
        <StripedBorder variant="yellow-orange" radius={20}>
          <div className="bg-cream rounded-[18px] px-6 py-7 text-center relative">
            <div className="text-[14px] text-ink-70">Earn balance</div>
            <div className="mt-2 font-display text-[44px] text-ink font-nums leading-none">
              {hidden ? maskAmount(totalLabel) : totalLabel}
            </div>
            <div className="mt-2 text-[12px] text-mint-deep font-nums">
              {hidden ? maskAmount(deltaLabel) : deltaLabel}
            </div>

            <button
              type="button"
              onClick={() => setHidden((h) => !h)}
              aria-label={hidden ? "Show earn balance" : "Hide earn balance"}
              className="absolute right-4 bottom-4 w-8 h-8 rounded-full inline-flex items-center justify-center"
            >
              {hidden ? (
                <EyeOff size={16} className="text-ink-40" />
              ) : (
                <Eye size={16} className="text-ink-40" />
              )}
            </button>
          </div>
        </StripedBorder>
      </motion.section>

      {/* Section heading */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-6 flex items-center justify-between"
      >
        <h2 className="font-display text-[22px] uppercase text-ink">Assets</h2>
        <Link
          href="/earn/history"
          aria-label="Earn history"
          className="w-8 h-8 rounded-full bg-cream-2 inline-flex items-center justify-center"
        >
          <FileClock size={16} className="text-ink" />
        </Link>
      </motion.div>

      {/* Segmented */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="pt-3"
      >
        <SegmentedControl
          options={TABS as unknown as string[]}
          value={tab}
          onChange={(v) => setTab(v as Tab)}
          layoutId="earnSeg"
          style="underline"
        />
      </motion.div>

      {/* List */}
      <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
        {tab === "Available" ? (
          EARNABLE_ASSETS.length === 0 ? (
            <EmptyState>No earnable assets right now.</EmptyState>
          ) : (
            EARNABLE_ASSETS.map((e, i) => (
              <motion.div
                key={e.symbol}
                initial="hidden"
                animate="show"
                variants={fade}
                transition={{ delay: 0.12 + i * 0.04 }}
              >
                <EarnableAssetCard
                  symbol={e.symbol}
                  rpyPct={e.rpyPct}
                  lockDays={e.lockDays}
                />
              </motion.div>
            ))
          )
        ) : positions.length === 0 ? (
          <EmptyState
            cta={{ label: "Browse assets to stake", onClick: () => setTab("Available") }}
          >
            No active positions yet.
          </EmptyState>
        ) : (
          positions.map((p, i) => (
            <motion.div
              key={p.positionId}
              initial="hidden"
              animate="show"
              variants={fade}
              transition={{ delay: 0.12 + i * 0.04 }}
            >
              <StakedPositionCard position={p} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function EmptyState({
  children,
  cta,
}: {
  children: React.ReactNode;
  cta?: { label: string; onClick: () => void };
}) {
  return (
    <div className="bg-cream-2 rounded-[14px] p-6 text-center">
      <p className="text-[14px] text-ink-70">{children}</p>
      {cta && (
        <button
          type="button"
          onClick={cta.onClick}
          className="mt-3 inline-flex h-9 px-4 rounded-pill bg-orange text-white text-[13px] font-semibold items-center"
        >
          {cta.label}
        </button>
      )}
    </div>
  );
}

export default function EarnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <EarnInner />
    </Suspense>
  );
}
