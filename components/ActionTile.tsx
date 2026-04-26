import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Props = {
  href: string;
  label: string;
  color: string;
  rotate?: number;
  icon: LucideIcon;
  iconRotate?: number;
};

export default function ActionTile({
  href,
  label,
  color,
  rotate = 0,
  icon: Icon,
  iconRotate = 0,
}: Props) {
  return (
    <Link href={href} className="flex flex-col items-center gap-2 flex-1 group">
      <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-cream-2">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{ color, transform: `rotate(${rotate}deg)` }}
          aria-hidden="true"
        >
          <path
            d="M50 5 C75 5 95 20 95 50 C95 75 75 95 50 95 C20 95 5 75 5 50 C5 20 20 5 50 5 Z M20 30 Q30 15 50 18 Q80 25 82 50 Q78 80 50 82 Q20 78 18 50 Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${iconRotate}deg)` }}
        >
          <Icon size={32} strokeWidth={1.75} className="text-ink" />
        </div>
      </div>
      <span className="text-[14px] font-semibold text-ink">{label}</span>
    </Link>
  );
}
