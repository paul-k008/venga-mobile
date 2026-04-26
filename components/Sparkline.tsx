type Props = {
  points: number[];
  width?: number;
  height?: number;
  color?: string;
  highLabel?: string;
  lowLabel?: string;
};

/**
 * Smooth cubic-bezier sparkline with a soft cream-2 fill underneath.
 * No axes, no labels (besides optional high/low markers passed in).
 */
export default function Sparkline({
  points,
  width = 400,
  height = 140,
  color = "var(--ink)",
  highLabel,
  lowLabel,
}: Props) {
  if (points.length < 2) return null;

  const padX = 4;
  const padY = 12;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const xs = points.map((_, i) => padX + (i / (points.length - 1)) * innerW);
  const ys = points.map((p) => padY + innerH - ((p - min) / range) * innerH);

  // Smooth path via cubic Beziers (Catmull-Rom-ish with k=0.5)
  const path: string[] = [`M ${xs[0].toFixed(2)} ${ys[0].toFixed(2)}`];
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = i === 0 ? xs[i] : xs[i - 1];
    const y0 = i === 0 ? ys[i] : ys[i - 1];
    const x1 = xs[i];
    const y1 = ys[i];
    const x2 = xs[i + 1];
    const y2 = ys[i + 1];
    const x3 = i + 2 < xs.length ? xs[i + 2] : xs[i + 1];
    const y3 = i + 2 < xs.length ? ys[i + 2] : ys[i + 1];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    path.push(
      `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(
        2,
      )}, ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    );
  }

  const linePath = path.join(" ");
  const areaPath = `${linePath} L ${xs[xs.length - 1].toFixed(2)} ${height} L ${xs[0].toFixed(
    2,
  )} ${height} Z`;

  // Endpoint
  const lastX = xs[xs.length - 1];
  const lastY = ys[ys.length - 1];

  // High/low x positions
  const highIdx = points.indexOf(max);
  const lowIdx = points.indexOf(min);
  const highX = xs[highIdx];
  const highY = ys[highIdx];
  const lowX = xs[lowIdx];
  const lowY = ys[lowIdx];

  const gradId = `spark-fill-${Math.round(points[0] * 1000)}`;

  return (
    <div className="relative w-full" style={{ height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        className="block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cream-2)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--cream-2)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={lastX} cy={lastY} r="3" fill="var(--sky)" />
      </svg>

      {highLabel && (
        <span
          className="absolute text-[10px] text-ink-70 font-nums"
          style={{
            left: `${(highX / width) * 100}%`,
            top: Math.max(0, highY - 14),
            transform: "translateX(-50%)",
          }}
        >
          ↑ {highLabel}
        </span>
      )}
      {lowLabel && (
        <span
          className="absolute text-[10px] text-ink-70 font-nums"
          style={{
            left: `${(lowX / width) * 100}%`,
            top: Math.min(height - 12, lowY + 6),
            transform: "translateX(-50%)",
          }}
        >
          ↓ {lowLabel}
        </span>
      )}
    </div>
  );
}
