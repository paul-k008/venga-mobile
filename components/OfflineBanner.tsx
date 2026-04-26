"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloudOff, Wifi } from "lucide-react";

/**
 * Listens to `online`/`offline` events and renders a top-of-screen banner.
 * - Offline: persistent coral banner ("You're offline — prices may be outdated")
 * - Back online: brief mint banner that auto-dismisses after 2s
 *
 * Mounted once in the root layout. z-index above the bottom tab bar.
 */
export default function OfflineBanner() {
  const [online, setOnline] = useState(true); // optimistic; updated in mount effect
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setOnline(navigator.onLine);
    const onOff = () => {
      setOnline(false);
      setShowBack(false);
    };
    const onOn = () => {
      setOnline(true);
      setShowBack(true);
      window.setTimeout(() => setShowBack(false), 2000);
    };
    window.addEventListener("offline", onOff);
    window.addEventListener("online", onOn);
    return () => {
      window.removeEventListener("offline", onOff);
      window.removeEventListener("online", onOn);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 z-[55] flex justify-center pointer-events-none"
      style={{ top: "env(safe-area-inset-top)" }}
    >
      <AnimatePresence>
        {!online && (
          <motion.div
            key="offline"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto inline-flex items-center gap-2 h-8 px-3 rounded-pill bg-red-tint border border-red/30 text-ink text-[12px] font-semibold mt-2"
          >
            <CloudOff size={14} className="text-red" />
            You&rsquo;re offline — prices may be outdated
          </motion.div>
        )}
        {online && showBack && (
          <motion.div
            key="online"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto inline-flex items-center gap-2 h-8 px-3 rounded-pill bg-mint text-mint-deep text-[12px] font-semibold mt-2"
          >
            <Wifi size={14} />
            Back online
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
