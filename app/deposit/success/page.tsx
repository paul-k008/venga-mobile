"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SuccessCheck from "@/components/SuccessCheck";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

type Method = "sepa" | "card" | "crypto" | "external";

function methodCopy(method: Method, asset: string) {
  switch (method) {
    case "sepa":
      return {
        headline: "Transfer received",
        sub: "We&rsquo;ll mark your EUR balance the moment your bank releases the funds — usually within seconds.",
      };
    case "card":
      return {
        headline: "Payment confirmed",
        sub: `Your ${asset || "EUR"} balance has been topped up.`,
      };
    case "crypto":
      return {
        headline: "Address ready",
        sub: `We're watching for incoming ${asset || "crypto"} transfers. You'll get a notification on the first confirmation.`,
      };
    case "external":
      return {
        headline: "Wallet connected",
        sub: "You can now move funds from your external wallet straight into Venga.",
      };
  }
}

function DepositSuccessContent() {
  const params = useSearchParams();
  const methodParam = (params.get("method") ?? "sepa").toLowerCase() as Method;
  const method: Method = ["sepa", "card", "crypto", "external"].includes(methodParam)
    ? methodParam
    : "sepa";
  const asset = (params.get("asset") ?? "").toUpperCase();

  const copy = methodCopy(method, asset);

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <SuccessCheck size={104} />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.18 }}
          className="font-display text-[36px] text-ink leading-tight mt-6"
        >
          {copy.headline}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.24 }}
          className="text-[15px] text-ink-70 mt-3 max-w-[320px] leading-snug"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: copy.sub }}
        />

        {asset && method !== "sepa" && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.28 }}
            className="mt-5 inline-flex items-center h-8 px-3 rounded-pill bg-cream-2 text-[12px] font-semibold text-ink"
          >
            Asset · <span className="ml-1 font-nums">{asset}</span>
          </motion.div>
        )}
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.32 }}
        className="px-5 pb-8 flex flex-col gap-3"
        style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom))" }}
      >
        <Link
          href="/wallet"
          className="w-full h-12 rounded-pill bg-orange text-white font-semibold text-[15px] inline-flex items-center justify-center active:opacity-90"
        >
          Go to wallet
        </Link>
        <Link
          href="/"
          className="w-full h-12 rounded-pill bg-cream-2 active:bg-cream-3 text-ink font-semibold text-[15px] inline-flex items-center justify-center"
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}

export default function DepositSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <DepositSuccessContent />
    </Suspense>
  );
}
