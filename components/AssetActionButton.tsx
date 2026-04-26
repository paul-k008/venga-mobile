import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  href: string;
};

export default function AssetActionButton({ icon, label, href }: Props) {
  return (
    <Link
      href={href}
      className="flex-1 flex flex-col items-center justify-center gap-2 py-3.5 rounded-md bg-cream-2 active:bg-cream-3 active:scale-[0.96] transition"
    >
      <span className="text-ink">{icon}</span>
      <span className="text-[13px] font-semibold text-ink">{label}</span>
    </Link>
  );
}
