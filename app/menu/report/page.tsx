"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Paperclip } from "lucide-react";
import BackButton from "@/components/BackButton";
import PickerRow from "@/components/PickerRow";
import TextInput from "@/components/TextInput";
import Textarea from "@/components/Textarea";
import HintSheet from "@/components/HintSheet";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

const CATEGORIES = [
  { value: "login",        label: "Login issues" },
  { value: "deposits",     label: "Deposits"     },
  { value: "withdrawals",  label: "Withdrawals"  },
  { value: "trading",      label: "Trading"      },
  { value: "verification", label: "Verification" },
  { value: "other",        label: "Other"        },
];

export default function ReportPage() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState<{ ref: string } | null>(null);

  const valid =
    category.length > 0 && subject.trim().length > 2 && description.trim().length > 5;

  const onSend = () => {
    if (!valid) return;
    const ref = `${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmitted({ ref });
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
        Report a problem
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <motion.p
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-5 text-[14px] text-ink-70"
        style={{ lineHeight: 1.5 }}
      >
        Describe the issue and we&rsquo;ll get back to you within 24 hours. Include screenshots from your device&rsquo;s gallery if helpful.
      </motion.p>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-5 pt-4 flex flex-col gap-3"
      >
        <PickerRow
          label="Category"
          value={category}
          options={CATEGORIES}
          onChange={setCategory}
          placeholder="Choose a category"
        />
        <TextInput
          label="Subject"
          value={subject}
          onChange={setSubject}
          placeholder="One-line summary"
        />
        <Textarea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="What happened?"
          rows={5}
        />
        <button
          type="button"
          onClick={() => undefined}
          className="h-12 rounded-pill bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center gap-2 text-ink-70 font-semibold text-[14px]"
        >
          <Paperclip size={16} />
          Choose images (up to 3)
        </button>
      </motion.div>

      {/* Bottom action bar */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-cream/90 backdrop-blur px-4 pt-3 z-30"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          disabled={!valid}
          onClick={onSend}
          className={`w-full h-14 rounded-pill font-semibold text-[15px] transition-colors ${
            valid
              ? "bg-orange text-white active:opacity-90"
              : "bg-orange-soft text-ink-40 cursor-not-allowed"
          }`}
        >
          Send report
        </button>
      </div>

      <HintSheet
        open={!!submitted}
        onClose={() => router.replace("/menu")}
        title="Report submitted"
        confirmLabel="Done"
        body={
          <p>
            Your report was submitted (prototype).{" "}
            {submitted && (
              <>
                Reference:{" "}
                <span className="font-nums font-semibold text-ink">
                  #PROD-{submitted.ref}
                </span>
              </>
            )}
            . We&rsquo;ll follow up by email within 24 hours.
          </p>
        }
      />
    </div>
  );
}
