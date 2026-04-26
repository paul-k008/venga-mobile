"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Apple, Check, Info, Loader2, X } from "lucide-react";
import BackButton from "@/components/BackButton";
import StripedBorder from "@/components/StripedBorder";
import Callout from "@/components/Callout";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { haptics } from "@/lib/haptics";
import { toast } from "@/lib/toastStore";
import { formatNumber } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

const PRESETS = [10, 25, 50, 100];

type SavedCard = {
  id: string;
  brand: "Visa" | "Mastercard";
  last4: string;
  expiry: string;
  /** Hex for the brand-color stripe in the chip. */
  stripe: string;
};

const SAVED_CARDS: SavedCard[] = [
  { id: "c1", brand: "Visa",       last4: "4421", expiry: "08/27", stripe: "#1A1F71" },
  { id: "c2", brand: "Mastercard", last4: "7812", expiry: "11/26", stripe: "#EB001B" },
];

const FEE_PCT = 1.5;

export default function DepositApplePayPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [cardId, setCardId] = useState<string>(SAVED_CARDS[0].id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  useBodyScrollLock(confirmOpen);

  const selectedCard = useMemo(
    () => SAVED_CARDS.find((c) => c.id === cardId) ?? SAVED_CARDS[0],
    [cardId],
  );

  const amountNum = parseFloat(amount || "0") || 0;
  const fee = amountNum * (FEE_PCT / 100);
  const total = amountNum + fee;
  const valid = amountNum > 0;

  const onPay = () => {
    if (!valid || paying) return;
    haptics.light();
    setConfirmOpen(true);
  };

  const onConfirmPay = async () => {
    if (paying) return;
    setPaying(true);
    haptics.medium();
    // simulate Apple Pay processing
    await new Promise((r) => setTimeout(r, 900));
    haptics.success();
    setPaying(false);
    setConfirmOpen(false);
    router.replace(
      `/deposit/success?method=card&asset=EUR&amount=${encodeURIComponent(amount)}`,
    );
  };

  const onCancelPay = () => {
    if (paying) return;
    setConfirmOpen(false);
    toast("Payment cancelled");
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
        className="font-display text-[44px] uppercase text-ink px-5 pt-6 pb-4 leading-none"
      >
        Deposit EUR
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
          <div className="px-5 py-5 rounded-[18px]">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-70">
                EUR
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-ink-70 bg-cream-3 rounded-pill px-2 py-0.5">
                <Apple size={10} strokeWidth={2.4} />
                Apple Pay
              </span>
            </div>
            <div className="font-display text-[24px] text-ink mt-1 leading-tight">
              Pay with Apple Pay
            </div>
            <p className="text-[13px] text-ink-70 mt-1">
              Instant · {FEE_PCT}% fee · Confirm with Face ID
            </p>
          </div>
        </StripedBorder>
      </motion.section>

      {/* Amount */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-4 pt-4"
      >
        <div className="bg-cream-2 rounded-[14px] p-4">
          <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-40">
            Amount
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[28px] font-nums text-ink-70">€</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="0.00"
              aria-label="Amount in euros"
              className="flex-1 bg-transparent outline-none text-right font-nums text-[32px] leading-none text-ink placeholder:text-ink-40"
            />
          </div>
          <div className="mt-3 flex gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setAmount(String(p))}
                className="flex-1 h-9 rounded-pill bg-cream-3 active:bg-cream text-[13px] font-semibold text-ink"
              >
                €{formatNumber(p, 0)}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Saved cards */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.12 }}
        className="px-4 pt-4"
      >
        <div className="px-1 pb-2 text-[12px] uppercase tracking-wide font-semibold text-ink-40">
          Card in Apple Wallet
        </div>
        <div className="bg-cream-2 rounded-[14px] overflow-hidden">
          {SAVED_CARDS.map((c, i) => {
            const active = c.id === cardId;
            const last = i === SAVED_CARDS.length - 1;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCardId(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
                  last ? "" : "border-b border-hair"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="w-8 h-5 rounded-[4px] inline-flex items-center justify-center text-cream text-[10px] font-display"
                  style={{ background: c.stripe }}
                >
                  {c.brand === "Visa" ? "VISA" : "MC"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-ink leading-tight">
                    {c.brand} <span className="font-nums">•••• {c.last4}</span>
                  </div>
                  <div className="text-[12px] text-ink-70 mt-0.5 font-nums">
                    Expires {c.expiry}
                  </div>
                </div>
                <span
                  className={`w-5 h-5 rounded-full inline-flex items-center justify-center transition-colors ${
                    active ? "bg-mint-deep" : "bg-cream-3"
                  }`}
                >
                  {active && <Check size={12} strokeWidth={3} className="text-cream" />}
                </span>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* Cost summary */}
      {valid && (
        <motion.section
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="px-4 pt-4"
        >
          <div className="bg-cream-2 rounded-[14px] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-ink-70">Amount</span>
              <span className="text-[13px] font-nums text-ink">€{formatNumber(amountNum, 2)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[13px] text-ink-70">Card fee ({FEE_PCT}%)</span>
              <span className="text-[13px] font-nums text-ink">€{formatNumber(fee, 2)}</span>
            </div>
            <div className="h-px bg-hair my-3" />
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-ink">Total</span>
              <span className="text-[14px] font-semibold font-nums text-ink">
                €{formatNumber(total, 2)}
              </span>
            </div>
          </div>
        </motion.section>
      )}

      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.16 }}
        className="px-4 pt-4"
      >
        <Callout tone="cream" icon={<Info size={16} className="text-ink-70" />}>
          Apple Pay uses cards already in your Wallet. Card details never touch Venga.
        </Callout>
      </motion.section>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-cream/90 backdrop-blur px-4 pt-3 z-30"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          disabled={!valid}
          onClick={onPay}
          className={`w-full h-14 rounded-pill font-semibold text-[15px] inline-flex items-center justify-center gap-2 transition-colors ${
            valid
              ? "bg-ink text-cream active:bg-ink/85"
              : "bg-cream-3 text-ink-40 cursor-not-allowed"
          }`}
        >
          <Apple size={18} strokeWidth={2.2} />
          <span className="tracking-tight">Pay</span>
        </button>
      </div>

      {/* Apple Pay confirmation sheet */}
      <AnimatePresence>
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={paying ? undefined : onCancelPay}
              className="absolute inset-0 bg-ink/55"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative w-full max-w-mobile bg-cream rounded-t-[24px] overflow-hidden"
              style={{ paddingBottom: "calc(20px + env(safe-area-inset-bottom))" }}
            >
              {/* Black ApplePay-style header bar */}
              <div className="bg-ink text-cream px-5 pt-4 pb-5 relative">
                <div className="mx-auto w-10 h-1.5 rounded-full bg-cream/30 mb-3" />
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold tracking-tight">
                    <Apple size={16} strokeWidth={2.4} />
                    Pay
                  </span>
                  <button
                    type="button"
                    onClick={onCancelPay}
                    disabled={paying}
                    aria-label="Close"
                    className="w-8 h-8 rounded-full bg-cream/15 active:bg-cream/25 inline-flex items-center justify-center disabled:opacity-50"
                  >
                    <X size={14} className="text-cream" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 pt-5">
                <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-40">
                  Pay
                </div>
                <div className="text-[18px] font-semibold text-ink mt-1">Venga</div>
                <div className="font-display text-[40px] text-ink font-nums mt-3 leading-none">
                  €{formatNumber(total, 2)}
                </div>
                <div className="text-[12px] text-ink-40 font-nums mt-1">
                  €{formatNumber(amountNum, 2)} + €{formatNumber(fee, 2)} fee
                </div>

                {/* Card row */}
                <div className="mt-5 bg-cream-2 rounded-[14px] p-3 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-9 h-6 rounded-[4px] inline-flex items-center justify-center text-cream text-[10px] font-display"
                    style={{ background: selectedCard.stripe }}
                  >
                    {selectedCard.brand === "Visa" ? "VISA" : "MC"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-ink leading-tight">
                      {selectedCard.brand}{" "}
                      <span className="font-nums">•••• {selectedCard.last4}</span>
                    </div>
                    <div className="text-[12px] text-ink-70 font-nums mt-0.5">
                      Expires {selectedCard.expiry}
                    </div>
                  </div>
                </div>

                {/* Face ID hint */}
                <div className="mt-5 text-center">
                  <div
                    className="mx-auto w-12 h-12 rounded-[12px] border-[1.5px] border-ink inline-flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {paying ? (
                      <Loader2 size={20} className="text-ink animate-spin" />
                    ) : (
                      <FaceIdGlyph />
                    )}
                  </div>
                  <p className="mt-2 text-[12px] text-ink-70 font-semibold">
                    {paying ? "Processing…" : "Confirm with Face ID"}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={onConfirmPay}
                    disabled={paying}
                    className="w-full h-12 rounded-pill bg-ink text-cream font-semibold text-[15px] active:bg-ink/85 disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    {paying ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing
                      </>
                    ) : (
                      <>
                        <Apple size={16} strokeWidth={2.4} />
                        Confirm
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onCancelPay}
                    disabled={paying}
                    className="w-full h-12 rounded-pill bg-cream-2 active:bg-cream-3 text-ink font-semibold text-[14px] disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-ink-40 text-center">
                  Apple Pay confirmation is simulated — no real payment is processed.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Minimalist Face ID glyph (for the prototype confirmation sheet). */
function FaceIdGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 8V6a2 2 0 0 1 2-2h2"      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 8V6a2 2 0 0 0-2-2h-2"    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 16v2a2 2 0 0 0 2 2h2"     stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 16v2a2 2 0 0 1-2 2h-2"   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 11v1.5"                   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 11v1.5"                  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 10v3.5"                  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 16c.8.6 1.8 1 3 1s2.2-.4 3-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
