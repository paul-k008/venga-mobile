"use client";

import { useEffect } from "react";

/**
 * Locks document body scroll while `locked` is true. Restores prior overflow on
 * unmount or when locked flips back to false. Apply in any bottom-sheet
 * component to prevent iOS Safari scroll-through.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked || typeof document === "undefined") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}
