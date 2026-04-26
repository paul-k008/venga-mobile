"use client";

import { motion } from "framer-motion";

export default function SuccessCheck({ size = 96 }: { size?: number }) {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="rounded-full bg-mint-deep flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
      >
        <motion.path
          d="M5 12.5 L10 17.5 L19 7.5"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}
