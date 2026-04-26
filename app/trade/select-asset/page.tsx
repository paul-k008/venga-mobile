"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { CoinIcon } from "@/components/icons";
import { ASSETS, type Asset } from "@/lib/mocks";
import { useTradeStore } from "@/lib/tradeStore";
import { formatCrypto, formatMoney, formatPrice } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

function SelectAssetInner() {
  const router = useRouter();
  const params = useSearchParams();
  const role = (params.get("role") ?? "from") === "to" ? "to" : "from";

  const otherSymbol = useTradeStore((s) =>
    role === "from" ? s.to.symbol : s.from.symbol,
  );
  const setFrom = useTradeStore((s) => s.setFrom);
  const setTo = useTradeStore((s) => s.setTo);

  const [query, setQuery] = useState("");

  const allowed = useMemo(
    () => ASSETS.filter((a) => a.symbol !== otherSymbol),
    [otherSymbol],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? allowed.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.symbol.toLowerCase().includes(q),
        )
      : allowed;
    // single sorted list:
    //   1) held value (valueUSD) DESC — non-zero balances at the top
    //   2) then by name asc for the zero-balance tail
    return [...base].sort((a, b) => {
      if (b.valueUSD !== a.valueUSD) return b.valueUSD - a.valueUSD;
      return a.name.localeCompare(b.name);
    });
  }, [query, allowed]);

  const onSelect = (symbol: string) => {
    if (role === "from") setFrom(symbol);
    else setTo(symbol);
    router.back();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      {/* scrim — tap to close */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Close"
        className="absolute inset-0 bg-ink/30"
      />

      {/* sheet — constrained to mobile frame */}
      <div className="relative w-full max-w-mobile bg-cream rounded-t-[24px] flex flex-col h-[88vh]">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-cream-3 mt-2" />

        <div className="flex items-center justify-between px-5 pt-2">
          <span className="w-8" aria-hidden="true" />
          <h1 className="text-[16px] font-semibold text-ink">Select asset</h1>
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pt-3">
          <div className="h-11 px-4 rounded-pill bg-cream-2 flex items-center gap-3">
            <Search size={16} className="text-ink-70" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search asset"
              className="flex-1 bg-transparent outline-none text-[16px] text-ink placeholder:text-ink-40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear"
                className="w-6 h-6 rounded-full bg-cream-3 inline-flex items-center justify-center"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Single sorted list */}
        <div className="flex-1 overflow-y-auto pb-6 mt-3 px-5">
          {filtered.length === 0 ? (
            <div className="mt-6 rounded-[16px] bg-cream-2 p-6 text-center">
              <div className="text-[14px] font-semibold text-ink">No matches</div>
              <p className="text-[12px] text-ink-70 mt-1">
                Try a different name or symbol.
              </p>
            </div>
          ) : (
            filtered.map((asset, i) => (
              <motion.div
                key={asset.symbol}
                initial="hidden"
                animate="show"
                variants={fade}
                transition={{ delay: 0.04 + i * 0.02 }}
              >
                <Row asset={asset} onSelect={onSelect} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  asset,
  onSelect,
}: {
  asset: Asset;
  onSelect: (symbol: string) => void;
}) {
  const owned = asset.balance > 0;
  return (
    <button
      type="button"
      onClick={() => onSelect(asset.symbol)}
      className="w-full flex items-center gap-3 py-3 border-b border-hair text-left"
    >
      <CoinIcon variant={asset.iconVar} size={36} />
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold text-ink leading-tight">
          {asset.name}
        </div>
        <div className="text-[12px] text-ink-70">{asset.symbol}</div>
      </div>
      <div className="text-right">
        {owned ? (
          <>
            <div className="text-[14px] font-semibold text-ink font-nums">
              {formatCrypto(asset.balance, asset.symbol)}
            </div>
            <div className="text-[11px] text-ink-40 font-nums">
              {formatMoney(asset.valueUSD, "USD")}
            </div>
          </>
        ) : (
          <>
            <div className="text-[14px] font-semibold text-ink font-nums">
              {formatPrice(asset.priceUSD, "USD")}
            </div>
            <div className="text-[11px] text-ink-40">Not held</div>
          </>
        )}
      </div>
    </button>
  );
}

export default function SelectAssetPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <SelectAssetInner />
    </Suspense>
  );
}
