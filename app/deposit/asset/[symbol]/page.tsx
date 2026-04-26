"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Bookmark, Share2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import CopyButton from "@/components/CopyButton";
import FauxQR from "@/components/FauxQR";
import ComplianceSheet from "@/components/ComplianceSheet";
import { CoinIcon } from "@/components/icons";
import {
  ASSETS,
  ASSET_NETWORKS,
  generateMockAddress,
  type Asset,
} from "@/lib/mocks";
import { formatMoney, formatPct } from "@/lib/utils";
import { toast } from "@/lib/toastStore";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};
const stagger = (i: number) => ({ delay: 0.04 + i * 0.04 });

export default function DepositAssetPage() {
  const params = useParams<{ symbol: string }>();
  const rawSymbol = (params?.symbol ?? "").toString().toUpperCase();

  const asset: Asset | undefined = useMemo(
    () => ASSETS.find((a) => a.symbol === rawSymbol),
    [rawSymbol],
  );
  const network = ASSET_NETWORKS[rawSymbol];
  const address = useMemo(() => generateMockAddress(rawSymbol), [rawSymbol]);

  const ackKey = `venga.compliance.${rawSymbol}`;
  const [confirmed, setConfirmed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(ackKey) === "1") {
        setConfirmed(true);
      }
    } catch {
      // ignore — Safari private mode etc.
    }
    setHydrated(true);
  }, [ackKey]);


  if (!asset || !network) {
    return (
      <div className="min-h-screen w-full bg-cream flex flex-col">
        <div className="px-5 pt-5">
          <BackButton />
        </div>
        <div className="flex-1 flex items-center justify-center px-8 text-center">
          <div>
            <div className="font-display text-[28px] text-ink leading-tight">
              Unknown asset
            </div>
            <p className="text-[14px] text-ink-70 mt-2">
              {rawSymbol
                ? `We don't support ${rawSymbol} deposits yet.`
                : "Pick an asset to continue."}
            </p>
            <Link
              href="/deposit/method/crypto"
              className="inline-flex mt-5 h-11 px-5 rounded-pill bg-orange text-white font-semibold text-[14px] items-center justify-center"
            >
              Choose another asset
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onSave = async () => {
    try {
      const blob = new Blob(
        [
          `Venga ${asset.symbol} deposit\nNetwork: ${network.network}\nAddress: ${address}\n`,
        ],
        { type: "text/plain" },
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `venga-${asset.symbol.toLowerCase()}-address.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Address saved");
    } catch {
      toast.error("Couldn't save");
    }
  };

  const onShare = async () => {
    const text = `My Venga ${asset.symbol} deposit address (${network.network}):\n${address}`;
    try {
      const nav = navigator as Navigator & {
        share?: (data: { title?: string; text?: string }) => Promise<void>;
      };
      if (typeof nav.share === "function") {
        await nav.share({ title: `Venga ${asset.symbol} address`, text });
        toast.success("Shared");
        return;
      }
      await navigator.clipboard?.writeText(text);
      toast.success("Address copied");
    } catch {
      toast.error("Couldn't share");
    }
  };

  return (
    <div className="min-h-screen w-full bg-cream flex flex-col pb-32">
      <div className="px-5 pt-5">
        <BackButton />
      </div>

      <motion.h1
        initial="hidden"
        animate="show"
        variants={fade}
        className="font-display text-[44px] text-ink px-5 pt-6 pb-4 leading-none"
      >
        DEPOSIT {asset.symbol}
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      {/* Asset summary */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(0)}
        className="px-5 pt-5"
      >
        <div className="rounded-[20px] bg-cream-2 p-4 flex items-center gap-4">
          <CoinIcon variant={asset.iconVar} size={48} />
          <div className="flex-1 min-w-0">
            <div className="text-[16px] font-semibold text-ink leading-tight">
              {asset.name}
            </div>
            <div className="text-[12px] text-ink-70 mt-0.5">
              On {network.network} network
            </div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-semibold text-ink font-nums">
              {formatMoney(asset.priceUSD, "USD")}
            </div>
            <div
              className={`text-[12px] font-semibold font-nums mt-0.5 ${
                asset.price24hPct >= 0 ? "text-mint-deep" : "text-red"
              }`}
            >
              {formatPct(asset.price24hPct)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* QR in striped border */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(1)}
        className="px-5 pt-5 flex justify-center"
      >
        <StripedBorder variant="orange-sky" radius={24}>
          <div className="p-4">
            <FauxQR seed={`${asset.symbol}:${address}`} size={224} cells={25} />
          </div>
        </StripedBorder>
      </motion.div>

      {/* Warning card */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(2)}
        className="px-5 pt-5"
      >
        <div className="rounded-[16px] bg-red-tint p-4 flex gap-3">
          <AlertTriangle size={18} className="text-red shrink-0 mt-0.5" />
          <div className="text-[13px] text-ink leading-snug">
            <div className="font-semibold">Send only {asset.symbol} on {network.network}</div>
            <p className="text-ink-70 mt-0.5">
              Coins sent on the wrong network will be lost permanently. Double-check the
              destination network in your sending wallet.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Address card */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(3)}
        className="px-5 pt-4"
      >
        <div className="rounded-[20px] bg-cream-2 p-4">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-ink-70">
            Your {asset.symbol} address
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 min-w-0 text-[13px] font-nums font-semibold text-ink break-all leading-snug">
              {address}
            </div>
            <CopyButton value={address} label="address" size={40} />
          </div>
          <div className="h-px bg-hair my-3" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-ink-70">Network</span>
            <span className="text-[13px] font-semibold text-ink">{network.network}</span>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(4)}
        className="text-[12px] text-ink-40 px-5 mt-6"
      >
        Most {asset.symbol} deposits arrive after a few network confirmations (~10 min).
      </motion.p>

      {/* Bottom action bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-mobile px-5 pt-3 bg-cream/90 backdrop-blur"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSave}
            className="flex-1 h-12 rounded-pill bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center gap-2 text-ink font-semibold text-[14px]"
          >
            <Bookmark size={16} />
            Save
          </button>
          <button
            type="button"
            onClick={onShare}
            className="flex-1 h-12 rounded-pill bg-orange text-white inline-flex items-center justify-center gap-2 font-semibold text-[14px] active:opacity-90"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* Gating compliance sheet */}
      <ComplianceSheet
        open={hydrated && !confirmed}
        title={`Send only ${asset.symbol} on ${network.network}`}
        requireConfirmLabel={`I'll send ${asset.symbol} on the ${network.network} network only.`}
        rememberLabel={`Don't show this again for ${asset.symbol}`}
        confirmLabel="Show address"
        onConfirm={({ remember }) => {
          if (remember) {
            try {
              window.localStorage.setItem(ackKey, "1");
            } catch {
              // ignore
            }
          }
          setConfirmed(true);
        }}
      >
        <div className="text-[14px] text-ink-70 leading-snug">
          Sending the wrong asset or using the wrong network will result in a permanent
          loss of funds — Venga can&rsquo;t recover them.
        </div>
        <div className="mt-3 rounded-[14px] bg-cream-2 p-3 flex items-center gap-3">
          <CoinIcon variant={asset.iconVar} size={36} />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-ink leading-tight">
              {asset.name}{" "}
              <span className="text-ink-70 font-normal">({asset.symbol})</span>
            </div>
            <div className="text-[12px] text-ink-70 mt-0.5">
              {network.network} network
            </div>
          </div>
          <ArrowRight size={16} className="text-ink-40" />
        </div>
      </ComplianceSheet>
    </div>
  );
}
