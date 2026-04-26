"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import BackButton from "@/components/BackButton";
import { StatusDot } from "@/components/MenuRow";
import HintSheet from "@/components/HintSheet";
import ConfirmModal from "@/components/ConfirmModal";
import { Toast, useToast } from "@/components/Toast";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

const BACKUP_CODES = [
  "8R3K-9PQA",
  "4ZT2-VL07",
  "K6W1-Q3FX",
  "M9DH-2EUB",
  "B5LO-7TR4",
  "JF80-A1C6",
  "X4Y5-NPQE",
  "C2RT-8V9D",
];

export default function TwoFaPage() {
  const [backupOpen, setBackupOpen] = useState(false);
  const [confirmOff, setConfirmOff] = useState(false);
  const { message, showToast } = useToast();

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
        Two-factor auth
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      {/* Status */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-5"
      >
        <div className="bg-cream-2 rounded-[14px] p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-mint-deep" />
            <span className="text-[16px] font-semibold text-ink">2FA is on</span>
            <span className="ml-auto">
              <StatusDot color="mint" />
            </span>
          </div>
          <p className="mt-2 text-[13px] text-ink-70">
            Authenticator app · Google Authenticator
          </p>
        </div>
      </motion.section>

      {/* Methods */}
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
          Methods
        </h2>
        <div className="bg-cream-2 rounded-[14px] overflow-hidden">
          <Method
            label="Authenticator app"
            trailing={
              <span className="inline-flex items-center gap-1.5 text-[13px] text-mint-deep font-semibold">
                <StatusDot color="mint" />
                Active
              </span>
            }
          />
          <Method
            label="SMS"
            trailing={
              <button
                type="button"
                onClick={() => showToast("Set up SMS 2FA — prototype")}
                className="inline-flex items-center gap-2"
              >
                <span className="text-[13px] text-ink-40">Off</span>
                <span className="text-[13px] text-orange font-semibold">Set up →</span>
              </button>
            }
          />
          <Method
            last
            label="Email"
            trailing={
              <button
                type="button"
                onClick={() => showToast("Set up email 2FA — prototype")}
                className="inline-flex items-center gap-2"
              >
                <span className="text-[13px] text-ink-40">Off</span>
                <span className="text-[13px] text-orange font-semibold">Set up →</span>
              </button>
            }
          />
        </div>
      </motion.section>

      {/* Backup */}
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
          Backup
        </h2>
        <button
          type="button"
          onClick={() => setBackupOpen(true)}
          className="w-full bg-cream-2 active:bg-cream-3 rounded-[14px] flex items-center justify-between px-4 py-3.5 text-left"
        >
          <span className="text-[15px] font-semibold text-ink">Backup codes</span>
          <span className="text-[18px] text-ink-40">›</span>
        </button>
      </motion.section>

      {/* Destructive */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.16 }}
        className="px-5 pt-6"
      >
        <button
          type="button"
          onClick={() => setConfirmOff(true)}
          className="w-full bg-cream-2 active:bg-cream-3 rounded-[14px] px-4 py-3.5 text-left text-[15px] font-semibold text-red"
        >
          Turn off 2FA
        </button>
      </motion.section>

      <HintSheet
        open={backupOpen}
        onClose={() => setBackupOpen(false)}
        title="Backup codes"
        body={
          <div>
            <p className="mb-3 text-[13px] text-ink-70">
              Save these one-time codes somewhere safe. Each can be used exactly once.
            </p>
            <div className="grid grid-cols-2 gap-2 font-nums text-[13px] font-semibold text-ink">
              {BACKUP_CODES.map((c) => (
                <div
                  key={c}
                  className="bg-cream-2 rounded-[10px] px-3 py-2 text-center"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <ConfirmModal
        open={confirmOff}
        title="Turn off 2FA?"
        description="Turning off two-factor authentication makes your account less secure. We strongly recommend keeping it on."
        cancelLabel="Cancel"
        confirmLabel="Turn off"
        destructive
        onCancel={() => setConfirmOff(false)}
        onConfirm={() => {
          setConfirmOff(false);
          showToast("2FA turned off — prototype");
        }}
      />

      <Toast message={message} />
    </div>
  );
}

function Method({
  label,
  trailing,
  last,
}: {
  label: string;
  trailing: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3.5 ${
        last ? "" : "border-b border-hair"
      }`}
    >
      <span className="text-[15px] font-semibold text-ink">{label}</span>
      {trailing}
    </div>
  );
}
