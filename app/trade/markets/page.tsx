"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import FilterChip from "@/components/FilterChip";
import MarketRow from "@/components/MarketRow";
import {
  FAVOURITE_PAIR_SLUGS,
  MARKETS,
  getGainers,
  getLosers,
  getPopularMarkets,
  pairToSlug,
  type Market,
} from "@/lib/mocks";

const FILTERS = ["All", "Favourites", "Popular", "Gainers", "Losers"] as const;
type Filter = (typeof FILTERS)[number];

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

function applyFilter(filter: Filter): Market[] {
  switch (filter) {
    case "All":
      return [...MARKETS].sort((a, b) => {
        if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
        return a.base.localeCompare(b.base);
      });
    case "Favourites":
      return MARKETS.filter((m) => FAVOURITE_PAIR_SLUGS.includes(pairToSlug(m)));
    case "Popular":
      return getPopularMarkets();
    case "Gainers":
      return getGainers(10);
    case "Losers":
      return getLosers(10);
  }
}

export default function MarketsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const filtered = applyFilter(filter);
    const q = query.trim().toLowerCase();
    if (!q) return filtered;
    return filtered.filter((m) => {
      const slug = pairToSlug(m).toLowerCase();
      return (
        slug.includes(q) ||
        m.base.toLowerCase().includes(q) ||
        m.quote.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col pb-12">
      <div className="px-5 pt-5">
        <BackButton />
      </div>

      <motion.h1
        initial="hidden"
        animate="show"
        variants={fade}
        className="font-display text-[44px] uppercase text-ink px-5 pt-6 pb-4 leading-none"
      >
        Markets
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-5"
      >
        <StripedBorder variant="orange-sky" radius={28}>
          <div className="h-12 px-4 flex items-center gap-3 bg-cream rounded-[26px]">
            <Search size={18} className="text-ink-70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pair (e.g. BTC, EUR, AAVE/EUR)"
              className="flex-1 bg-transparent outline-none text-[16px] text-ink placeholder:text-ink-40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear"
                className="w-7 h-7 rounded-full bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </StripedBorder>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-5 pt-4"
      >
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((tab) => (
            <FilterChip
              key={tab}
              label={tab}
              active={filter === tab}
              onClick={() => setFilter(tab)}
            />
          ))}
        </div>
      </motion.div>

      <div className="px-5 pt-5 flex items-center justify-between text-[12px] text-ink-40 font-semibold uppercase tracking-wide">
        <span>Trade pair</span>
        <span>24h change</span>
      </div>

      <div className="px-5 pt-2">
        {list.length === 0 ? (
          <div className="mt-8 rounded-[16px] bg-cream-2 p-6 text-center">
            <div className="text-[14px] font-semibold text-ink">No matches</div>
            <p className="text-[12px] text-ink-70 mt-1">
              Try a different filter or search term.
            </p>
          </div>
        ) : (
          list.map((m, i) => (
            <motion.div
              key={pairToSlug(m)}
              initial="hidden"
              animate="show"
              variants={fade}
              transition={{ delay: 0.1 + i * 0.02 }}
            >
              <MarketRow market={m} variant="pair" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
