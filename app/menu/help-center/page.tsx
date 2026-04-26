"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import FilterChip from "@/components/FilterChip";
import { FAQS } from "@/lib/mocks";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

const CATEGORIES = ["All", "Account", "Deposits & withdrawals", "Trading", "Earn"] as const;
type Category = (typeof CATEGORIES)[number];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      if (category !== "All" && f.category !== category) return false;
      if (q && !f.q.toLowerCase().includes(q) && !f.a.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, category]);

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
        Help center
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      {/* Search */}
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
              placeholder="Search help articles"
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

      {/* Categories */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-5 pt-4 flex gap-2 overflow-x-auto no-scrollbar"
      >
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c}
            label={c}
            active={category === c}
            onClick={() => setCategory(c)}
          />
        ))}
      </motion.div>

      <div className="px-5 pt-4 flex flex-col gap-2.5 pb-6">
        {list.length === 0 ? (
          <div className="bg-cream-2 rounded-[14px] p-6 text-center">
            <div className="text-[14px] font-semibold text-ink">No matches</div>
            <p className="text-[12px] text-ink-70 mt-1">
              Try a different search or category.
            </p>
          </div>
        ) : (
          list.map((f, i) => {
            const open = openId === f.id;
            return (
              <motion.div
                key={f.id}
                initial="hidden"
                animate="show"
                variants={fade}
                transition={{ delay: 0.08 + i * 0.02 }}
                className="bg-cream-2 rounded-[14px] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : f.id)}
                  className="w-full flex items-start gap-3 px-4 py-3.5 text-left"
                >
                  <span className="flex-1 text-[15px] font-semibold text-ink leading-snug">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-ink-40 mt-0.5"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="px-4 pb-4 text-[14px] text-ink-70"
                        style={{ lineHeight: 1.55 }}
                      >
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
