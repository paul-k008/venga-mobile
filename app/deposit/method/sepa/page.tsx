"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, QrCode, Share2, X, Info } from "lucide-react";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import CopyButton from "@/components/CopyButton";
import FauxQR from "@/components/FauxQR";
import { VENGA_IBAN } from "@/lib/mocks";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { toast } from "@/lib/toastStore";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

const stagger = (i: number) => ({ delay: 0.04 + i * 0.04 });

export default function DepositSepaPage() {
  const [qrOpen, setQrOpen] = useState(false);
  useBodyScrollLock(qrOpen);

  const onShare = async () => {
    const text = `IBAN: ${VENGA_IBAN.iban}\nBIC: ${VENGA_IBAN.bic}\nHolder: ${VENGA_IBAN.holder}\nRef: ${VENGA_IBAN.ref}`;
    try {
      const nav = navigator as Navigator & {
        share?: (data: { title?: string; text?: string }) => Promise<void>;
      };
      if (typeof nav.share === "function") {
        await nav.share({ title: "Venga deposit details", text });
        toast.success("Shared");
        return;
      }
      await navigator.clipboard?.writeText(text);
      toast.success("Details copied");
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
        DEPOSIT EUR
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      {/* Hero card */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(0)}
        className="px-5 pt-5"
      >
        <StripedBorder variant="orange-sky" radius={24}>
          <div className="p-5">
            <div className="text-[12px] font-semibold uppercase tracking-wide text-ink-70">
              SEPA bank transfer
            </div>
            <div className="font-display text-[32px] text-ink leading-tight mt-1">
              Free · ~10 sec
            </div>
            <p className="text-[13px] text-ink-70 mt-2 leading-snug">
              Send EUR from your own bank to the IBAN below. Funds arrive instantly during banking hours.
            </p>
          </div>
        </StripedBorder>
      </motion.div>

      {/* IBAN card */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(1)}
        className="px-5 pt-4"
      >
        <div className="rounded-[20px] bg-cream-2 p-4">
          <Row label="IBAN" value={VENGA_IBAN.iban} mono />
          <div className="h-px bg-hair my-3" />
          <Row label="BIC / SWIFT" value={VENGA_IBAN.bic} mono />
          <div className="h-px bg-hair my-3" />
          <Row label="Account holder" value={VENGA_IBAN.holder} />
          <div className="h-px bg-hair my-3" />
          <Row label="Reference" value={VENGA_IBAN.ref} mono highlight />
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(2)}
        className="px-5 pt-3 flex gap-2"
      >
        <CopyButton value={VENGA_IBAN.iban} label="Copy IBAN" variant="pill" />
        <button
          type="button"
          onClick={onShare}
          className="flex-1 h-11 px-3 rounded-pill bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center gap-2 text-ink font-semibold text-[14px]"
        >
          <Share2 size={16} />
          Share
        </button>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          aria-label="Show QR code"
          className="h-11 w-11 rounded-pill bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center text-ink shrink-0"
        >
          <QrCode size={18} />
        </button>
      </motion.div>

      {/* Compliance card */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(3)}
        className="px-5 pt-5"
      >
        <div className="rounded-[16px] bg-orange-soft p-4 flex gap-3">
          <Info size={18} className="text-orange shrink-0 mt-0.5" />
          <div className="text-[13px] text-ink leading-snug">
            <div className="font-semibold">Use your own bank account</div>
            <p className="text-ink-70 mt-0.5">
              Transfers from third parties will be returned. Always include the reference{" "}
              <span className="font-nums font-semibold text-ink">{VENGA_IBAN.ref}</span>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* How to send */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(4)}
        className="px-5 pt-6"
      >
        <h2 className="text-[14px] font-semibold text-ink-70 uppercase tracking-wide">
          How to send
        </h2>
        <ol className="mt-3 flex flex-col gap-3">
          {[
            "Open your bank app and start a new SEPA transfer.",
            "Paste Venga's IBAN, BIC, and the reference.",
            "Confirm the transfer — funds arrive in seconds.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-ink text-cream font-semibold text-[12px] inline-flex items-center justify-center shrink-0 font-nums">
                {i + 1}
              </span>
              <span className="text-[14px] text-ink leading-snug pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.p
        initial="hidden"
        animate="show"
        variants={fade}
        transition={stagger(5)}
        className="text-[12px] text-ink-40 px-5 mt-8"
      >
        Banking hours apply. Outside SEPA Instant windows, transfers may take up to 1 business day.
      </motion.p>

      {/* Bottom action bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-mobile px-5 pt-3 bg-cream/90 backdrop-blur"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <Link
          href="/deposit/success?method=sepa&asset=EUR&amount=pending"
          className="w-full h-12 rounded-pill bg-orange text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 active:opacity-90"
        >
          I&rsquo;ve sent the transfer
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* QR bottom sheet */}
      <AnimatePresence>
        {qrOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setQrOpen(false)}
              className="absolute inset-0 bg-ink/40"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative w-full max-w-mobile bg-cream rounded-t-[24px] p-6"
              style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-ink">SEPA QR code</h3>
                <button
                  type="button"
                  onClick={() => setQrOpen(false)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-[13px] text-ink-70 mt-1">
                Scan with your bank app to prefill the transfer.
              </p>
              <div className="mt-4 flex justify-center">
                <StripedBorder variant="orange-sky" radius={20}>
                  <div className="p-3">
                    <FauxQR seed={VENGA_IBAN.iban} size={224} cells={25} />
                  </div>
                </StripedBorder>
              </div>
              <div className="mt-4 rounded-[14px] bg-cream-2 p-3 text-center">
                <div className="text-[11px] uppercase tracking-wide text-ink-70 font-semibold">
                  IBAN
                </div>
                <div className="text-[14px] font-nums font-semibold text-ink mt-0.5">
                  {VENGA_IBAN.iban}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                className="mt-5 w-full h-12 rounded-pill bg-ink text-cream font-semibold text-[15px] inline-flex items-center justify-center gap-2 active:opacity-90"
              >
                <Copy size={16} className="hidden" />
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({
  label,
  value,
  mono = false,
  highlight = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wide font-semibold text-ink-70">
          {label}
        </div>
        <div
          className={`mt-0.5 text-[15px] text-ink truncate ${
            mono ? "font-nums font-semibold" : "font-semibold"
          } ${highlight ? "text-orange" : ""}`}
        >
          {value}
        </div>
      </div>
      <CopyButton value={value} label={label} size={36} />
    </div>
  );
}
