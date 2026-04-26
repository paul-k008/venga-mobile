import Link from "next/link";
import { Check } from "lucide-react";
import { USER } from "@/lib/mocks";

export default function ProfileCard() {
  return (
    <div className="relative bg-cream-2 rounded-md p-5 mt-4 mx-5">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-lime flex items-center justify-center shrink-0">
          <span className="font-display text-ink text-[18px] leading-none">
            {USER.initials}
          </span>
        </div>
        <div className="flex-1 min-w-0 pr-20">
          <div className="text-[17px] font-semibold text-ink leading-tight">
            {USER.fullName}
          </div>
          <div className="text-[13px] text-ink-70 mt-0.5 truncate">
            {USER.email}
          </div>
          <div className="mt-2 inline-flex items-center gap-1 bg-mint text-mint-deep px-2 py-1 rounded-pill text-[11px] font-semibold">
            <Check size={12} strokeWidth={3} />
            Verified · Level {USER.kycLevel}
          </div>
        </div>
      </div>
      <Link
        href="/rewards/claim"
        className="absolute top-4 right-4 h-8 px-3 rounded-pill border-[1.5px] border-orange text-orange text-[12px] font-semibold inline-flex items-center gap-1"
      >
        Claim €5 →
      </Link>
    </div>
  );
}
