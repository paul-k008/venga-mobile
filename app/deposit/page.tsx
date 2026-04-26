"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Landmark, Apple, Bitcoin, Wallet } from "lucide-react";
import BackButton from "@/components/BackButton";
import DepositMethodCard from "@/components/DepositMethodCard";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

function DepositPicker() {
  const router = useRouter();
  const params = useSearchParams();
  const asset = params.get("asset");

  useEffect(() => {
    if (!asset) return;
    if (asset.toUpperCase() === "EUR") {
      router.replace("/deposit/method/sepa");
    } else {
      router.replace(`/deposit/asset/${asset.toUpperCase()}`);
    }
  }, [asset, router]);

  // While redirecting, render nothing visible
  if (asset) return <div className="min-h-screen bg-cream" />;

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      <div className="px-5 pt-5">
        <BackButton />
      </div>

      <motion.h1
        initial="hidden"
        animate="show"
        variants={fade}
        className="font-display text-[44px] text-ink px-5 pt-6 pb-4 leading-none"
      >
        Deposit
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <div className="px-4 pt-5 flex flex-col gap-3">
        {[
          {
            icon: <Landmark size={22} strokeWidth={1.75} />,
            title: "Bank transfer",
            subtitle: "Free · Send EUR via SEPA",
            speed: { label: "~10 sec instant", tone: "mint" as const },
            href: "/deposit/method/sepa",
          },
          {
            icon: <Apple size={22} strokeWidth={1.75} />,
            title: "Apple Pay",
            subtitle: "1.5% fee · Use cards in your Wallet",
            speed: { label: "Instant", tone: "mint" as const },
            href: "/deposit/method/card",
          },
          {
            icon: <Bitcoin size={22} strokeWidth={1.75} />,
            title: "Crypto deposit",
            subtitle: "Network fee · Receive any supported coin",
            speed: { label: "~10 min", tone: "yellow" as const },
            href: "/deposit/method/crypto",
          },
          {
            icon: <Wallet size={22} strokeWidth={1.75} />,
            title: "From an external wallet",
            subtitle: "Connect MetaMask, Trust, Ledger",
            speed: { label: "~10 min", tone: "yellow" as const },
            href: "/deposit/method/external",
          },
        ].map((m, i) => (
          <motion.div
            key={m.title}
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.04 + i * 0.04 }}
          >
            <DepositMethodCard {...m} />
          </motion.div>
        ))}
      </div>

      <motion.p
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.24 }}
        className="text-[12px] text-ink-40 px-5 mt-8 mb-10 truncate"
      >
        All deposits are insured up to your KYC limit.
      </motion.p>
    </div>
  );
}

export default function DepositPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <DepositPicker />
    </Suspense>
  );
}
