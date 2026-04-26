"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import MarketRow from "@/components/MarketRow";
import { ASSETS } from "@/lib/mocks";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

export default function DepositCryptoPickerPage() {
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const cryptos = ASSETS.filter((a) => a.symbol !== "EUR")
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    const q = query.trim().toLowerCase();
    if (!q) return cryptos;
    return cryptos.filter(
      (a) => a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      <div className="px-5 pt-5">
        <BackButton />
      </div>

      <motion.h1
        initial="hidden"
        animate="show"
        variants={fade}
        className="font-display text-[44px] text-ink px-5 pt-6 pb-2 leading-none"
      >
        Choose asset
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="text-[14px] text-ink-70 px-5 pb-4"
      >
        Pick the coin you&rsquo;d like to deposit from another wallet.
      </motion.p>

      {/* Search bar in striped border */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-5"
      >
        <StripedBorder variant="orange-sky" radius={28}>
          <div className="h-12 px-4 flex items-center gap-3 bg-cream rounded-[26px]">
            <Search size={18} className="text-ink-70 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search coins"
              className="flex-1 bg-transparent outline-none text-[16px] text-ink placeholder:text-ink-40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="w-7 h-7 rounded-full bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center shrink-0"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </StripedBorder>
      </motion.div>

      {/* List */}
      <div className="px-5 pt-4 pb-12">
        {list.length === 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.12 }}
            className="mt-10 text-center"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-cream-2 inline-flex items-center justify-center">
              <Search size={20} className="text-ink-40" />
            </div>
            <div className="mt-3 text-[15px] font-semibold text-ink">No matches</div>
            <p className="text-[13px] text-ink-70 mt-1">
              Try a different name or symbol — Venga supports a curated list of coins.
            </p>
          </motion.div>
        ) : (
          <ul>
            {list.map((asset, i) => (
              <motion.li
                key={asset.symbol}
                initial="hidden"
                animate="show"
                variants={fade}
                transition={{ delay: 0.1 + i * 0.03 }}
              >
                <MarketRow asset={asset} variant="deposit" />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
