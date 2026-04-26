import Link from "next/link";
import type { ReactNode } from "react";

type CTA =
  | { label: string; href: string; onClick?: never }
  | { label: string; onClick: () => void; href?: never };

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  cta?: CTA;
  className?: string;
};

/** Standardized empty-state card. Use anywhere a list/filter yields zero results. */
export default function EmptyState({
  icon,
  title,
  description,
  cta,
  className = "",
}: Props) {
  return (
    <div
      className={`bg-cream-2 rounded-[16px] p-8 text-center flex flex-col items-center gap-3 ${className}`}
    >
      {icon && (
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-3 text-ink-40">
          {icon}
        </span>
      )}
      <div className="text-[16px] font-semibold text-ink leading-tight">
        {title}
      </div>
      {description && (
        <p className="text-[14px] text-ink-70 max-w-[280px]" style={{ lineHeight: 1.45 }}>
          {description}
        </p>
      )}
      {cta &&
        (cta.href ? (
          <Link
            href={cta.href}
            className="mt-1 inline-flex items-center h-11 px-5 rounded-pill bg-orange active:bg-orange-deep text-white font-semibold text-[14px]"
          >
            {cta.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={cta.onClick}
            className="mt-1 inline-flex items-center h-11 px-5 rounded-pill bg-orange active:bg-orange-deep text-white font-semibold text-[14px]"
          >
            {cta.label}
          </button>
        ))}
    </div>
  );
}
