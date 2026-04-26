"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import MenuRow, { type MenuRowProps } from "@/components/MenuRow";

type Section = {
  label?: string;
  rows: MenuRowProps[];
};

type Props = {
  title: string;
  /** Optional intro paragraph rendered between the heading and the first section. */
  intro?: ReactNode;
  sections: Section[];
  /** Optional footer slot below the last section (e.g. for CTAs). */
  footer?: ReactNode;
};

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

/** Generic list-of-rows scaffold. Keeps individual settings pages tiny. */
export default function SettingsListScreen({ title, intro, sections, footer }: Props) {
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

      {intro && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.04 }}
          className="px-5 pt-4 text-[13px] text-ink-70"
          style={{ lineHeight: 1.5 }}
        >
          {intro}
        </motion.div>
      )}

      <div className="flex flex-col gap-1">
        {sections.map((section, i) => (
          <motion.section
            key={`${section.label ?? "_"}-${i}`}
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.06 + i * 0.04 }}
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
                {section.rows.map((row, j) => (
                  <MenuRow
                    key={`${row.label}-${j}`}
                    {...row}
                    isLast={j === section.rows.length - 1}
                  />
                ))}
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
          transition={{ delay: 0.06 + sections.length * 0.04 }}
          className="px-5 pt-6"
        >
          {footer}
        </motion.div>
      )}
    </div>
  );
}
