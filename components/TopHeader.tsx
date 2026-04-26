import Link from "next/link";
import { USER } from "@/lib/mocks";

type Props = {
  title?: string;
};

export default function TopHeader({ title }: Props) {
  const heading = title ?? `Hi ${USER.firstName.toUpperCase()}`;
  return (
    <header className="flex items-center justify-between px-5 pt-5 pb-3">
      <div className="w-10" />
      <h1 className="font-display text-[20px] text-ink tracking-tight">
        {heading}
      </h1>
      <Link
        href="/menu"
        aria-label="Open menu"
        className="w-10 h-10 rounded-full bg-lime flex items-center justify-center shadow-[0_2px_8px_rgba(14,17,22,0.10)]"
      >
        <span className="font-display text-ink text-[14px] leading-none">
          {USER.initials}
        </span>
      </Link>
    </header>
  );
}
