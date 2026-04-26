import { create } from "zustand";

export type ToastTone = "default" | "success" | "warning" | "error";

export type ToastEntry = {
  id: string;
  message: string;
  tone: ToastTone;
  durationMs: number;
};

type ToastState = {
  current: ToastEntry | null;
  show: (
    message: string,
    opts?: { tone?: ToastTone; durationMs?: number },
  ) => void;
  dismiss: () => void;
  reset: () => void;
};

let counter = 0;
const nextId = () => `t_${Date.now()}_${++counter}`;

export const useToastStore = create<ToastState>((set) => ({
  current: null,
  show: (message, opts) =>
    set({
      current: {
        id: nextId(),
        message,
        tone: opts?.tone ?? "default",
        durationMs: opts?.durationMs ?? 1800,
      },
    }),
  dismiss: () => set({ current: null }),
  reset: () => set({ current: null }),
}));

/** Convenience API. Call from anywhere — no provider needed. */
export const toast = Object.assign(
  (message: string, opts?: { tone?: ToastTone; durationMs?: number }) =>
    useToastStore.getState().show(message, opts),
  {
    success: (message: string, durationMs?: number) =>
      useToastStore.getState().show(message, { tone: "success", durationMs }),
    warning: (message: string, durationMs?: number) =>
      useToastStore.getState().show(message, { tone: "warning", durationMs }),
    error: (message: string, durationMs?: number) =>
      useToastStore.getState().show(message, { tone: "error", durationMs }),
    dismiss: () => useToastStore.getState().dismiss(),
  },
);
