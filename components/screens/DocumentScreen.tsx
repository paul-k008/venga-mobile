"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import BackButton from "@/components/BackButton";
import Callout from "@/components/Callout";

type Props = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

/** Long-form prose scaffold for legal docs. Always shows a "Prototype copy" callout. */
export default function DocumentScreen({ title, lastUpdated, children }: Props) {
  return (
    <div className="min-h-screen w-full bg-cream flex flex-col pb-16">
      <div className="px-5 pt-5">
        <BackButton />
      </div>
      <motion.h1
        initial="hidden"
        animate="show"
        variants={fade}
        className="font-display text-[44px] uppercase text-ink px-5 pt-6 pb-2 leading-none"
      >
        {title}
      </motion.h1>
      <div className="px-5 text-[12px] text-ink-40">Last updated {lastUpdated}</div>
      <div className="h-px bg-hair mx-5 mt-3" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.04 }}
        className="px-5 pt-5"
      >
        <Callout tone="yellow" icon={<AlertCircle size={16} />}>
          <strong className="font-semibold">Prototype copy.</strong> Not legally binding.
        </Callout>
      </motion.div>

      <motion.article
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ delay: 0.08 }}
        className="px-5 pt-5"
      >
        {children}
      </motion.article>
    </div>
  );
}

/** Heading + paragraphs section for use inside DocumentScreen children. */
export function DocSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-7">
      <h3 className="font-display text-[18px] text-ink mb-2">{heading}</h3>
      <div className="text-[14px] text-ink-70 space-y-2.5" style={{ lineHeight: 1.6 }}>
        {children}
      </div>
    </section>
  );
}
