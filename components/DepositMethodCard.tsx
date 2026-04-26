import Link from "next/link";
import type { ReactNode } from "react";

type Speed = { label: string; tone: "mint" | "yellow" };

type Props = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  speed: Speed;
  href: string;
};

export default function DepositMethodCard({
  icon,
  title,
  subtitle,
  speed,
  href,
}: Props) {
  const speedClasses =
    speed.tone === "mint"
      ? "bg-mint text-mint-deep"
      : "bg-yellow text-ink";

  return (
    <Link
      href={href}
      className="flex items-center gap-3 bg-cream-2 rounded-md p-4 active:bg-cream-3 active:scale-[0.98] transition"
    >
      <div className="w-11 h-11 rounded-md bg-cream-3 flex items-center justify-center shrink-0">
        <span className="text-ink">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[16px] font-semibold text-ink leading-tight">
          {title}
        </div>
        <div className="text-[13px] text-ink-70 mt-0.5 truncate">{subtitle}</div>
      </div>
      <span
        className={`shrink-0 h-[22px] px-2.5 rounded-pill text-[10px] font-semibold uppercase inline-flex items-center ${speedClasses}`}
        style={{ letterSpacing: "0.04em" }}
      >
        {speed.label}
      </span>
    </Link>
  );
}
