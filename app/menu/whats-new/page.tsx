"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Shield, Sparkles, Zap } from "lucide-react";
import BackButton from "@/components/BackButton";
import HintSheet from "@/components/HintSheet";
import { CHANGELOG, type ChangelogEntry, type ChangelogTag } from "@/lib/mocks";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

function tagIcon(tag: ChangelogTag) {
  switch (tag) {
    case "feature":     return <Sparkles size={18} className="text-orange" />;
    case "fix":         return <Bug size={18} className="text-ink-70" />;
    case "security":    return <Shield size={18} className="text-mint-deep" />;
    case "improvement": return <Zap size={18} className="text-yellow" />;
  }
}

export default function WhatsNewPage() {
  const [active, setActive] = useState<ChangelogEntry | null>(null);

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
        What&rsquo;s new
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <div className="px-5 pt-5 flex flex-col gap-2.5">
        {CHANGELOG.map((c, i) => (
          <motion.button
            key={c.id}
            type="button"
            onClick={() => setActive(c)}
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.04 + i * 0.03 }}
            className="bg-cream-2 active:bg-cream-3 rounded-[14px] p-4 flex gap-3 text-left"
          >
            <span className="w-9 h-9 rounded-full bg-cream-3 inline-flex items-center justify-center shrink-0 mt-0.5">
              {tagIcon(c.tag)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-semibold text-ink leading-tight">
                {c.title}
              </div>
              <div className="text-[12px] text-ink-40 mt-0.5">{c.date}</div>
              <p className="mt-1.5 text-[13px] text-ink-70" style={{ lineHeight: 1.45 }}>
                {c.summary}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <HintSheet
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title ?? ""}
        body={
          <div>
            <div className="text-[12px] uppercase tracking-wide text-ink-40 font-semibold">
              {active?.date}
            </div>
            <p className="mt-2 text-[14px] text-ink-70" style={{ lineHeight: 1.55 }}>
              {active?.body}
            </p>
          </div>
        }
      />
    </div>
  );
}
