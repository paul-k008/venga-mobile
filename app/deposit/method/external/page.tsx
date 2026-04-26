"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import HintSheet from "@/components/HintSheet";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

type Wallet = {
  id: string;
  name: string;
  chains: string;
  monogram: string;
  bg: string;
  fg: string;
};

const WALLETS: Wallet[] = [
  { id: "metamask",  name: "MetaMask",        chains: "Ethereum, Polygon, BSC",   monogram: "M", bg: "#F6851B", fg: "#fff" },
  { id: "trust",     name: "Trust Wallet",    chains: "Ethereum, Bitcoin, BNB",   monogram: "T", bg: "#0500FF", fg: "#fff" },
  { id: "ledger",    name: "Ledger Live",     chains: "Bitcoin, Ethereum, +20",   monogram: "L", bg: "#0E1116", fg: "#fff" },
  { id: "coinbase",  name: "Coinbase Wallet", chains: "Ethereum, Bitcoin, +",     monogram: "C", bg: "#0052FF", fg: "#fff" },
  { id: "wc",        name: "WalletConnect",   chains: "Any WC-compatible wallet", monogram: "W", bg: "#3B99FC", fg: "#fff" },
  { id: "phantom",   name: "Phantom",         chains: "Solana, Ethereum",         monogram: "P", bg: "#AB9FF2", fg: "#0E1116" },
];

export default function DepositExternalPage() {
  const router = useRouter();
  const [active, setActive] = useState<Wallet | null>(null);

  const goCrypto = () => {
    setActive(null);
    router.push("/deposit/method/crypto");
  };

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
        From wallet
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <motion.p
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-4 text-[14px] text-ink-70"
        style={{ lineHeight: 1.5 }}
      >
        Connect a wallet to send crypto directly. Your private keys stay on your device.
      </motion.p>

      <div className="px-4 pt-5 flex flex-col gap-2.5">
        {WALLETS.map((w, i) => (
          <motion.button
            key={w.id}
            type="button"
            onClick={() => setActive(w)}
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.08 + i * 0.03 }}
            className="bg-cream-2 active:bg-cream-3 rounded-[14px] p-4 flex items-center gap-3 text-left"
          >
            <span
              className="w-11 h-11 rounded-[12px] inline-flex items-center justify-center font-display text-[18px] shrink-0"
              style={{ background: w.bg, color: w.fg }}
              aria-hidden="true"
            >
              {w.monogram}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold text-ink leading-tight">
                {w.name}
              </div>
              <div className="text-[12px] text-ink-70 mt-0.5">{w.chains}</div>
            </div>
            <span className="inline-flex items-center h-7 px-3 rounded-pill border-[1.5px] border-orange text-orange text-[12px] font-semibold shrink-0">
              Connect →
            </span>
          </motion.button>
        ))}
      </div>

      <HintSheet
        open={!!active}
        onClose={goCrypto}
        title={active ? `Connect ${active.name}` : ""}
        confirmLabel="Use crypto deposit"
        body={
          <p>
            External wallet integration is coming in a future release. For now, use Venga&rsquo;s on-chain address — copy it into your wallet and send any supported coin.
          </p>
        }
      />
    </div>
  );
}
