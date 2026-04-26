"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SuccessCheck from "@/components/SuccessCheck";
import { useEarnStore } from "@/lib/earnStore";
import { formatNumber, trimAmount } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

export default function StakeSuccessPage() {
  const router = useRouter();
  const lastStake = useEarnStore((s) => s.lastStake);
  const reset = useEarnStore((s) => s.reset);

  useEffect(() => {
    if (!lastStake) router.replace("/earn");
  }, [lastStake, router]);

  if (!lastStake) return null;

  const amt = trimAmount(lastStake.amount.toFixed(8));

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      <div className="flex justify-end px-5 pt-5">
        <button
          type="button"
          onClick={() => router.replace("/earn")}
          aria-label="Close"
          className="w-11 h-11 rounded-full bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center"
          style={{ boxShadow: "0 2px 8px rgba(14,17,22,0.08)" }}
        >
          <X size={18} className="text-ink" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-8 px-5 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <SuccessCheck size={96} />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.18 }}
          className="font-display text-[28px] uppercase text-ink leading-tight mt-6"
        >
          Staking active
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.24 }}
          className="text-[15px] text-ink-70 mt-3 max-w-[320px] leading-snug"
        >
          You staked{" "}
          <span className="font-semibold text-ink font-nums">
            {amt} {lastStake.symbol}
          </span>{" "}
          for{" "}
          <span className="font-semibold text-ink font-nums">
            {lastStake.lockDays} days
          </span>{" "}
          at{" "}
          <span className="font-semibold text-ink font-nums">
            {formatNumber(lastStake.rpyPct, 1)}% RPY
          </span>
          .
        </motion.p>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.3 }}
          className="text-[13px] text-ink-40 mt-2"
        >
          First reward accrues in 24 hours.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.36 }}
        className="px-4 pb-8 flex flex-col gap-3"
        style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={() => router.replace(`/earn/staked/${lastStake.positionId}`)}
          className="w-full h-14 rounded-pill bg-orange text-white font-semibold text-[15px] active:opacity-90"
        >
          View position →
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            router.replace("/earn");
          }}
          className="w-full h-14 rounded-pill bg-cream-2 active:bg-cream-3 text-ink font-semibold text-[15px]"
        >
          Stake more
        </button>
      </motion.div>
    </div>
  );
}
