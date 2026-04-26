import StripedBorder from "./StripedBorder";

type Props = {
  children: React.ReactNode;
  /** Vertical padding shorthand. Default 0 (relies on inner content). */
  className?: string;
};

/**
 * Rainbow-bordered pill. Used for RPY chips throughout the Earn flow.
 * Wraps StripedBorder(rainbow) at radius 999 (full pill) with a cream-inner
 * pill. Content slot is small + tabular, e.g. "5% RPY".
 */
export default function RainbowChip({ children, className = "" }: Props) {
  return (
    <span className={`inline-block ${className}`}>
      <StripedBorder variant="rainbow" radius={999}>
        <span className="inline-flex items-center gap-1 h-7 px-3 text-[12px] font-semibold text-ink rounded-pill">
          {children}
        </span>
      </StripedBorder>
    </span>
  );
}
