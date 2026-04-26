"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import BackButton from "@/components/BackButton";
import HintSheet from "@/components/HintSheet";
import { Toast, useToast } from "@/components/Toast";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

type Field = {
  label: string;
  value: string;
  trailing?: string;
  editable: boolean;
  hint?: { title: string; body: string };
  toast?: string;
};

const FIELDS: Field[] = [
  {
    label: "Full name",
    value: "Maria Venga",
    editable: true,
    hint: {
      title: "Name change",
      body: "Your legal name is used for KYC and can't be edited from here. Contact support and we'll update it after a quick review.",
    },
  },
  {
    label: "Email",
    value: "maria@venga.com",
    editable: true,
    toast: "Email change coming soon",
  },
  {
    label: "Phone",
    value: "+34 ••• ••• 421",
    editable: true,
    toast: "Phone change coming soon",
  },
  { label: "Date of birth",        value: "12 / 04 / 1995", editable: false },
  { label: "Country of residence", value: "Spain", trailing: "🇪🇸", editable: false },
  { label: "Tax residency",        value: "Spain", editable: false },
];

export default function PersonalInfoPage() {
  const [hint, setHint] = useState<{ title: string; body: string } | null>(null);
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
        Personal info
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-5"
      >
        <div className="bg-cream-2 rounded-[14px] overflow-hidden">
          {FIELDS.map((f, i) => {
            const last = i === FIELDS.length - 1;
            return (
              <div
                key={f.label}
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  last ? "" : "border-b border-hair"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-40">
                    {f.label}
                  </div>
                  <div className="mt-0.5 text-[15px] font-semibold text-ink truncate">
                    {f.value}
                    {f.trailing && <span className="ml-1.5">{f.trailing}</span>}
                  </div>
                </div>
                {f.editable && (
                  <button
                    type="button"
                    onClick={() => {
                      if (f.hint) setHint(f.hint);
                      else if (f.toast) showToast(f.toast);
                    }}
                    aria-label={`Edit ${f.label}`}
                    className="w-8 h-8 rounded-full bg-cream-3 inline-flex items-center justify-center shrink-0 active:bg-cream"
                  >
                    <Pencil size={14} className="text-ink" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>

      <p className="px-5 mt-3 text-[12px] text-ink-40">
        Some fields are locked once your identity is verified. Contact support to update.
      </p>

      <HintSheet
        open={!!hint}
        onClose={() => setHint(null)}
        title={hint?.title ?? ""}
        body={<p>{hint?.body}</p>}
      />
      <Toast message={message} />
    </div>
  );
}
