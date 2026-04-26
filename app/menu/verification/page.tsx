"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import HintSheet from "@/components/HintSheet";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

type LevelState = "done" | "active" | "available";

const LEVELS: Array<{
  level: number;
  title: string;
  sub: string;
  state: LevelState;
}> = [
  { level: 1, title: "Level 1", sub: "Email + phone",                state: "done" },
  { level: 2, title: "Level 2", sub: "ID + selfie",                  state: "active" },
  { level: 3, title: "Level 3", sub: "Address proof + source of funds", state: "available" },
];

const LIMITS: Array<{ label: string; value: string }> = [
  { label: "Monthly deposit limit", value: "€10,000" },
  { label: "Monthly trade limit",   value: "€50,000" },
  { label: "Yearly limit",          value: "€100,000" },
];

export default function VerificationPage() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

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
        Verification
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-4 pt-5"
      >
        <StripedBorder variant="orange-sky" radius={20}>
          <div className="px-6 py-7 text-center rounded-[18px]">
            <div className="mx-auto inline-flex items-center justify-center w-12 h-12 rounded-full bg-mint">
              <CheckCircle2 size={24} className="text-mint-deep" />
            </div>
            <div className="mt-3 font-display text-[24px] uppercase text-ink leading-none">
              Level 2 verified
            </div>
            <p className="mt-2 text-[14px] text-ink-70">
              You can deposit, trade, and earn up to €10,000 per month.
            </p>
          </div>
        </StripedBorder>
      </motion.section>

      {/* Limits */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-5 pt-6"
      >
        <h2
          className="text-[11px] font-semibold text-ink-40 uppercase pb-2"
          style={{ letterSpacing: "0.08em" }}
        >
          Limits
        </h2>
        <div className="bg-cream-2 rounded-[14px]">
          {LIMITS.map((l, i) => (
            <div
              key={l.label}
              className={`flex items-center justify-between px-4 py-3.5 ${
                i < LIMITS.length - 1 ? "border-b border-hair" : ""
              }`}
            >
              <span className="text-[14px] text-ink-70">{l.label}</span>
              <span className="text-[14px] font-semibold text-ink font-nums">
                {l.value}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Levels */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.12 }}
        className="px-5 pt-6"
      >
        <h2
          className="text-[11px] font-semibold text-ink-40 uppercase pb-2"
          style={{ letterSpacing: "0.08em" }}
        >
          Levels
        </h2>
        <div className="flex flex-col gap-2.5">
          {LEVELS.map((lv) => {
            const isActive = lv.state === "active";
            const isDone = lv.state === "done";
            const isAvailable = lv.state === "available";
            return (
              <div
                key={lv.level}
                className={`rounded-[14px] p-4 flex items-center gap-3 ${
                  isActive
                    ? "bg-cream-2 border-2 border-mint-deep"
                    : isDone
                      ? "bg-cream-2"
                      : "bg-cream-2"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-[15px] font-semibold leading-tight ${
                      isDone ? "text-ink-40" : "text-ink"
                    }`}
                  >
                    {lv.title}
                  </div>
                  <div
                    className={`text-[12px] mt-0.5 ${
                      isDone ? "text-ink-40" : "text-ink-70"
                    }`}
                  >
                    {lv.sub}
                  </div>
                </div>
                {isActive && (
                  <CheckCircle2 size={20} className="text-mint-deep" />
                )}
                {isAvailable && (
                  <button
                    type="button"
                    onClick={() => setUpgradeOpen(true)}
                    className="text-[13px] font-semibold text-orange"
                  >
                    Upgrade →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>

      <HintSheet
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        title="Level 3 upgrade"
        body={
          <p>
            Level 3 unlocks higher monthly limits but requires proof of address and source-of-funds documentation. The full review screen is coming in a future release.
          </p>
        }
      />
    </div>
  );
}
