type Props = {
  width?: number | string;
  height?: number | string;
  radius?: number;
  className?: string;
};

/**
 * Skeleton loader. Cream-3 base with a shimmer sweep that respects
 * `prefers-reduced-motion` (falls back to static cream-3).
 */
export default function Skeleton({
  width = "100%",
  height = 16,
  radius = 8,
  className = "",
}: Props) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block skeleton-shimmer ${className}`}
      style={{ width, height, borderRadius: radius }}
    />
  );
}
