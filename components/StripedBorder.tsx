type Variant = "orange-sky" | "yellow-orange" | "rainbow";

const BG: Record<Variant, string> = {
  "orange-sky": `repeating-linear-gradient(115deg, var(--orange) 0 18px, var(--sky) 18px 36px)`,
  "yellow-orange": `repeating-linear-gradient(115deg, var(--yellow) 0 18px, var(--orange) 18px 36px)`,
  rainbow: `repeating-linear-gradient(115deg, var(--mint) 0 18px, var(--yellow) 18px 36px, var(--sky) 36px 54px)`,
};

export default function StripedBorder({
  variant = "orange-sky",
  radius = 20,
  children,
  className = "",
  innerClassName = "",
}: {
  variant?: Variant;
  /** Outer border radius in px. Inner radius = radius - 2. */
  radius?: number;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`p-[3px] ${className}`}
      style={{ background: BG[variant], borderRadius: radius }}
    >
      <div
        className={`bg-cream ${innerClassName}`}
        style={{ borderRadius: Math.max(0, radius - 2) }}
      >
        {children}
      </div>
    </div>
  );
}
