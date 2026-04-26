import { fauxQR } from "@/lib/utils";

type Props = {
  seed: string;
  /** Pixel size of the rendered SVG. */
  size?: number;
  /** Cells per side. Default 21 (small QR-ish). */
  cells?: number;
};

export default function FauxQR({ seed, size = 240, cells = 21 }: Props) {
  const grid = fauxQR(seed, cells);
  const cell = size / cells;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <rect x="0" y="0" width={size} height={size} fill="#fff" rx="4" ry="4" />
      {grid.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill="#0E1116"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
