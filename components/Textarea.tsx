"use client";

type Props = {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
};

export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  disabled,
}: Props) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[12px] uppercase tracking-wide font-semibold text-ink-40 px-1 mb-1.5">
          {label}
        </span>
      )}
      <span
        className={`block rounded-[14px] bg-cream-2 px-3 py-2 ${
          disabled ? "opacity-60" : "focus-within:ring-1 focus-within:ring-orange"
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className="block w-full bg-transparent outline-none resize-none text-[16px] text-ink leading-snug placeholder:text-ink-40"
        />
      </span>
    </label>
  );
}
