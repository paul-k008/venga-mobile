"use client";

import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import Radio from "@/components/Radio";

type Option = { value: string; label: string; sublabel?: string };

type Props = {
  title: string;
  options: Option[];
  /** Controlled selected value. */
  value: string;
  onChange: (next: string) => void;
};

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

/** Single-select list scaffold. Controlled — parent owns state. */
export default function RadioListScreen({ title, options, value, onChange }: Props) {
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
        {title}
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-5"
      >
        <ul className="bg-cream-2 rounded-[14px] overflow-hidden">
          {options.map((o, i) => {
            const last = i === options.length - 1;
            const active = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => onChange(o.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
                    last ? "" : "border-b border-hair"
                  }`}
                >
                  <span className="flex-1 min-w-0">
                    <span
                      className={`block text-[15px] font-semibold leading-tight ${
                        active ? "text-ink" : "text-ink"
                      }`}
                    >
                      {o.label}
                    </span>
                    {o.sublabel && (
                      <span className="block text-[12px] text-ink-70 mt-0.5">
                        {o.sublabel}
                      </span>
                    )}
                  </span>
                  <Radio checked={active} />
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
