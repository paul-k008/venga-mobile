"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import Toggle from "@/components/Toggle";

export type ToggleItem = {
  key: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
  /** Disabled toggle that always reads as ON (e.g. App PIN). */
  fixedOn?: boolean;
};

type Section = {
  label?: string;
  items: ToggleItem[];
};

type Props = {
  title: string;
  sections: Section[];
  onChange?: (state: Record<string, boolean>) => void;
  footer?: ReactNode;
};

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

export default function TogglesScreen({ title, sections, onChange, footer }: Props) {
  const initial = useMemo(() => {
    const o: Record<string, boolean> = {};
    sections.forEach((s) =>
      s.items.forEach((it) => {
        o[it.key] = it.fixedOn ? true : (it.defaultChecked ?? true);
      }),
    );
    return o;
  }, [sections]);
  const [state, setState] = useState(initial);

  const update = (key: string, next: boolean) => {
    setState((prev) => {
      const merged = { ...prev, [key]: next };
      onChange?.(merged);
      return merged;
    });
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
        {title}
      </motion.h1>
      <div className="h-px bg-hair mx-5" />

      <div className="flex flex-col">
        {sections.map((section, i) => (
          <motion.section
            key={`${section.label ?? "_"}-${i}`}
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.04 + i * 0.04 }}
          >
            {section.label && (
              <h2
                className="px-5 pt-6 pb-2 text-[11px] font-semibold text-ink-40 uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                {section.label}
              </h2>
            )}
            <div className="px-5">
              <div className="bg-cream-2 rounded-[14px] overflow-hidden">
                {section.items.map((it, j) => {
                  const last = j === section.items.length - 1;
                  return (
                    <div
                      key={it.key}
                      className={`flex items-start gap-3 px-4 py-3.5 ${
                        last ? "" : "border-b border-hair"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[15px] font-semibold leading-tight ${
                            it.fixedOn ? "text-ink-40" : "text-ink"
                          }`}
                        >
                          {it.label}
                        </div>
                        {it.description && (
                          <p className="mt-0.5 text-[12px] text-ink-70 leading-snug">
                            {it.description}
                          </p>
                        )}
                      </div>
                      <Toggle
                        checked={state[it.key] ?? false}
                        disabled={it.fixedOn}
                        onChange={(next) => !it.fixedOn && update(it.key, next)}
                        ariaLabel={it.label}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {footer && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.04 + sections.length * 0.04 }}
          className="px-5 pt-6"
        >
          {footer}
        </motion.div>
      )}
    </div>
  );
}
