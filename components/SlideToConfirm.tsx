"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { haptics } from "@/lib/haptics";

type Props = {
  label: string;
  disabled?: boolean;
  disabledLabel?: string;
  onConfirm: () => void;
  /** Fraction of the track that must be crossed before confirming (0-1). Default 0.85. */
  threshold?: number;
};

const TRACK_HEIGHT = 56;
const THUMB = 48;
const PAD = 4;

/**
 * Drag the thumb past `threshold * track-width`. On release past threshold:
 *   - thumb snaps to the right end
 *   - track fills with orange behind it
 *   - vibrates 40ms (where supported)
 *   - calls `onConfirm()`
 * Below threshold: spring back to start.
 */
export default function SlideToConfirm({
  label,
  disabled = false,
  disabledLabel,
  onConfirm,
  threshold = 0.85,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Reset position whenever disabled state flips
  useEffect(() => {
    if (disabled) {
      animate(x, 0, { type: "spring", stiffness: 360, damping: 32 });
      setConfirmed(false);
    }
  }, [disabled, x]);

  const maxX = Math.max(0, trackWidth - THUMB - PAD * 2);
  const fillWidth = useTransform(x, (v) =>
    Math.min(trackWidth, v + THUMB + PAD * 2),
  );
  const labelOpacity = useTransform(x, [0, Math.max(maxX * 0.5, 1)], [1, 0]);

  const onDragEnd = () => {
    if (disabled || confirmed) return;
    const past = x.get() >= maxX * threshold;
    if (past) {
      setConfirmed(true);
      animate(x, maxX, {
        type: "spring",
        stiffness: 360,
        damping: 32,
        onComplete: () => {
          haptics.success();
          onConfirm();
        },
      });
    } else {
      animate(x, 0, { type: "spring", stiffness: 360, damping: 28 });
    }
  };

  const trackBg = disabled ? "bg-orange-soft" : "bg-cream-3";
  const thumbBg = disabled ? "bg-ink-40" : "bg-ink";
  const fillBg = "bg-orange";

  return (
    <div
      ref={trackRef}
      className={`relative w-full overflow-hidden rounded-pill ${trackBg}`}
      style={{ height: TRACK_HEIGHT, touchAction: "pan-y" }}
    >
      {/* Orange fill that follows the thumb */}
      <motion.div
        aria-hidden="true"
        className={`absolute top-0 left-0 h-full rounded-pill ${fillBg}`}
        style={{ width: fillWidth, opacity: disabled ? 0 : 1 }}
      />

      {/* Centered label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: disabled ? 1 : labelOpacity }}
      >
        <span
          className={`text-[14px] font-semibold ${
            disabled ? "text-ink-40" : "text-ink-40"
          }`}
        >
          {disabled ? disabledLabel ?? label : label}
        </span>
      </motion.div>

      {/* Thumb */}
      <motion.button
        type="button"
        aria-label={label}
        drag={disabled ? false : "x"}
        dragConstraints={{ left: 0, right: maxX }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        style={{ x, top: PAD, left: PAD, width: THUMB, height: THUMB }}
        className={`absolute rounded-full ${thumbBg} flex items-center justify-center text-cream`}
      >
        <ArrowRight size={20} strokeWidth={2.4} />
      </motion.button>
    </div>
  );
}
