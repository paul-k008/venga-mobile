"use client";

import type { ReactNode } from "react";

type Props = {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel" | "decimal" | "numeric";
  disabled?: boolean;
  /** Renders inside the input box on the left. */
  leading?: ReactNode;
  /** Renders inside the input box on the right (e.g. icon button). */
  trailing?: ReactNode;
};

export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  disabled,
  leading,
  trailing,
}: Props) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[12px] uppercase tracking-wide font-semibold text-ink-40 px-1 mb-1.5">
          {label}
        </span>
      )}
      <span
        className={`flex items-center gap-2 h-12 px-3 rounded-[14px] bg-cream-2 ${
          disabled ? "opacity-60" : "focus-within:ring-1 focus-within:ring-orange"
        }`}
      >
        {leading}
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-[16px] text-ink placeholder:text-ink-40"
        />
        {trailing}
      </span>
    </label>
  );
}
