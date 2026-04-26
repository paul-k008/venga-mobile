"use client";

import { Copy } from "lucide-react";
import { toast } from "@/lib/toastStore";
import { haptics } from "@/lib/haptics";

type Props = {
  value: string;
  label?: string;
  variant?: "icon" | "pill";
  size?: number;
};

export default function CopyButton({
  value,
  label,
  variant = "icon",
  size = 32,
}: Props) {
  const onClick = async () => {
    try {
      await navigator.clipboard?.writeText(value);
    } catch {
      toast.error("Couldn't copy — please copy manually");
      return;
    }
    haptics.light();
    const what = label && label.length < 20 ? label : "Value";
    toast.success(`${what} copied`);
  };

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Copy ${label ?? "value"}`}
        className="flex-1 h-11 px-3 rounded-pill bg-cream-2 active:bg-cream-3 inline-flex items-center justify-center gap-2 text-ink font-semibold text-[14px]"
      >
        <Copy size={16} />
        {label ?? "Copy"}
      </button>
    );
  }

  // ensure 44×44 hit-area regardless of visual size (iter 7 a11y)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Copy ${label ?? "value"}`}
      className="relative rounded-full bg-cream-3 flex items-center justify-center shrink-0 active:bg-cream"
      style={{ width: size, height: size }}
    >
      {size < 44 && (
        <span aria-hidden="true" className="absolute" style={{ inset: -((44 - size) / 2) }} />
      )}
      <Copy size={size === 40 ? 18 : 16} className="text-ink" />
    </button>
  );
}
