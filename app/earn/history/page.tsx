"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Coins, Lock, Unlock } from "lucide-react";
import BackButton from "@/components/BackButton";
import FilterChip from "@/components/FilterChip";
import { EARN_HISTORY, type EarnHistoryEvent, type EarnHistoryKind } from "@/lib/mocks";
import { formatMoney, trimAmount } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

const FILTERS = ["All", "Rewards", "Stakes", "Unstakes"] as const;
type Filter = (typeof FILTERS)[number];

function eventIcon(kind: EarnHistoryKind) {
  if (kind === "reward") return <Coins size={20} className="text-mint-deep" />;
  if (kind === "stake") return <Lock size={20} className="text-ink" />;
  return <Unlock size={20} className="text-ink-70" />;
}

function eventTitle(e: EarnHistoryEvent) {
  if (e.kind === "reward") return `Reward · ${e.symbol}`;
  if (e.kind === "stake") return `Staked · ${e.symbol}`;
  return `Unstaked · ${e.symbol}`;
}

function applyFilter(events: EarnHistoryEvent[], filter: Filter) {
  switch (filter) {
    case "All":      return events;
    case "Rewards":  return events.filter((e) => e.kind === "reward");
    case "Stakes":   return events.filter((e) => e.kind === "stake");
    case "Unstakes": return events.filter((e) => e.kind === "unstake");
  }
}

export default function EarnHistoryPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const groups = useMemo(() => {
    const filtered = applyFilter(EARN_HISTORY, filter)
      .slice()
      .sort((a, b) => b.iso.localeCompare(a.iso));
    const out: Array<{ month: string; events: EarnHistoryEvent[] }> = [];
    filtered.forEach((e) => {
      const last = out[out.length - 1];
      if (last && last.month === e.monthLabel) last.events.push(e);
      else out.push({ month: e.monthLabel, events: [e] });
    });
    return out;
  }, [filter]);

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
        Earn history
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-4 flex gap-2 overflow-x-auto no-scrollbar"
      >
        {FILTERS.map((f) => (
          <FilterChip
            key={f}
            label={f}
            active={filter === f}
            onClick={() => setFilter(f)}
          />
        ))}
      </motion.div>

      {groups.length === 0 ? (
        <div className="px-5 mt-8">
          <div className="bg-cream-2 rounded-[14px] p-6 text-center">
            <div className="text-[14px] font-semibold text-ink">No matching events</div>
            <p className="text-[12px] text-ink-70 mt-1">
              Try a different filter.
            </p>
          </div>
        </div>
      ) : (
        groups.map((g, gi) => (
          <section key={g.month} className={gi === 0 ? "pt-2" : "pt-4"}>
            <h2
              className="px-5 pt-4 pb-2 text-[11px] font-semibold text-ink-40 uppercase"
              style={{ letterSpacing: "0.08em" }}
            >
              {g.month}
            </h2>
            <div className="px-5">
              <div className="bg-cream-2 rounded-[14px] overflow-hidden">
                {g.events.map((e, i) => {
                  const last = i === g.events.length - 1;
                  const signed =
                    e.kind === "reward"
                      ? `+${trimAmount(e.amount.toFixed(8))}`
                      : trimAmount(e.amount.toFixed(8));
                  const tone = e.kind === "reward" ? "text-mint-deep" : "text-ink";
                  return (
                    <div
                      key={e.id}
                      className={`flex items-center gap-3 px-4 py-3.5 ${
                        last ? "" : "border-b border-hair"
                      }`}
                    >
                      <span className="shrink-0">{eventIcon(e.kind)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold text-ink leading-tight">
                          {eventTitle(e)}
                        </div>
                        <div className="text-[12px] text-ink-70 mt-0.5">{e.when}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[14px] font-semibold font-nums ${tone}`}>
                          {signed} {e.symbol}
                        </div>
                        <div className="text-[11px] text-ink-40 font-nums mt-0.5">
                          ≈ {formatMoney(e.valueUSD, "USD")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
}
