import type { ReactNode } from "react";

type Stat = { label: string; value: string | ReactNode };

export default function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-5">
      {stats.map((s) => (
        <div key={s.label} className="bg-cream-2 rounded-md p-4">
          <div
            className="text-[11px] text-ink-40 font-semibold uppercase"
            style={{ letterSpacing: "0.08em" }}
          >
            {s.label}
          </div>
          <div className="mt-1.5 text-[16px] text-ink font-semibold font-nums">
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
