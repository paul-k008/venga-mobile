import type { ReactNode } from "react";

type Tone = "yellow" | "mint" | "red" | "cream";

const TONES: Record<Tone, string> = {
  yellow: "bg-yellow/20 border border-yellow",
  mint:   "bg-mint/40 border border-mint-deep/30",
  red:    "bg-red-tint border border-red/30",
  cream:  "bg-cream-3 border border-hair",
};

type Props = {
  tone?: Tone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Soft callout box used for notices/disclaimers/warnings. */
export default function Callout({
  tone = "cream",
  icon,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-[14px] p-3.5 flex gap-3 items-start ${TONES[tone]} ${className}`}
    >
      {icon && <span className="shrink-0 mt-0.5 text-ink">{icon}</span>}
      <div className="text-[13px] text-ink leading-snug flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
