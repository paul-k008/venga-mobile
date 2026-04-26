"use client";

/**
 * Backwards-compat shim for the iter-6 inline `useToast()` API.
 *
 * Iter 7 replaces local toast state with a global Zustand store + a single
 * `<ToastViewport />` mounted in the root layout. Existing screens that
 * imported `useToast` and rendered `<Toast message={…} />` keep working —
 * `useToast` now delegates to the global store, and `<Toast>` is a no-op
 * (the real UI is in ToastViewport).
 *
 * New code should import `toast` from `@/lib/toastStore` directly.
 */
import { useCallback } from "react";
import { useToastStore, type ToastTone } from "@/lib/toastStore";

/** No-op renderer kept for backwards-compat. The real UI is `<ToastViewport />`. */
export function Toast(_: { message: string | null }) {
  void _;
  return null;
}

export function useToast() {
  const show = useToastStore((s) => s.show);
  const current = useToastStore((s) => s.current);
  const showToast = useCallback(
    (msg: string, ms = 1400, tone: ToastTone = "default") => {
      show(msg, { tone, durationMs: ms });
    },
    [show],
  );
  return { message: current?.message ?? null, showToast };
}
