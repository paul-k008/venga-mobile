import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export type MenuRowProps = {
  icon?: ReactNode;
  label: string;
  /** Secondary line under `label`. Optional. (iter 6) */
  sublabel?: string;
  value?: string;
  valueTone?: "default" | "mint";
  badge?: ReactNode;
  /** Custom node rendered to the right; replaces the auto-chevron when provided. (iter 6) */
  trailing?: ReactNode;
  href?: string;
  onClick?: () => void;
  tone?: "default" | "destructive";
  isLast?: boolean;
};

export default function MenuRow({
  icon,
  label,
  sublabel,
  value,
  valueTone = "default",
  badge,
  trailing,
  href,
  onClick,
  tone = "default",
  isLast = false,
}: MenuRowProps) {
  const destructive = tone === "destructive";
  const interactive = !!(href || onClick);
  // grow vertically when sublabel is present
  const heightClass = sublabel ? "min-h-[60px] py-3" : "h-14";

  const content = (
    <div
      className={`flex items-center gap-3 px-4 ${heightClass} ${
        isLast ? "" : "border-b border-hair"
      }`}
    >
      {icon && (
        <span className={`shrink-0 ${destructive ? "text-red" : "text-ink"}`}>
          {icon}
        </span>
      )}
      <span className="flex-1 min-w-0 flex flex-col">
        <span
          className={`text-[16px] font-semibold leading-tight ${
            destructive ? "text-red" : "text-ink"
          }`}
        >
          {label}
        </span>
        {sublabel && (
          <span className="text-[12px] text-ink-70 mt-0.5 truncate">
            {sublabel}
          </span>
        )}
      </span>
      {badge && <span className="flex items-center shrink-0">{badge}</span>}
      {value && (
        <span
          className={`text-[15px] font-nums shrink-0 ${
            valueTone === "mint" ? "text-mint-deep font-semibold" : "text-ink-70"
          }`}
        >
          {value}
        </span>
      )}
      {trailing ? (
        <span className="shrink-0 inline-flex items-center">{trailing}</span>
      ) : (
        interactive && <ChevronRight size={18} className="text-ink-40 shrink-0" />
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return content;
}

export function StatusDot({ color }: { color: "mint" | "orange" | "red" }) {
  const bg =
    color === "mint" ? "bg-mint-deep" : color === "orange" ? "bg-orange" : "bg-red";
  return <span className={`inline-block w-2 h-2 rounded-full ${bg}`} />;
}
