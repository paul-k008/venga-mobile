export function formatMoney(value: number, currency: "USD" | "EUR" = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(value: number): string {
  const abs = Math.abs(value).toFixed(2);
  if (value > 0) return `+${abs}%`;
  if (value < 0) return `\u2212${abs}%`;
  return `${abs}%`;
}

export function formatCrypto(value: number, symbol: string): string {
  const fixed = value.toFixed(8);
  const trimmed = fixed.replace(/\.?0+$/, "");
  const display = trimmed === "" || trimmed === "-" ? "0" : trimmed;
  return `${display} ${symbol}`;
}

export function maskAmount(amount: string): string {
  return amount.replace(/[0-9.,]/g, "\u2022");
}

/** Localized number with fixed decimals; pairs well with `font-nums` (tabular). */
export function formatNumber(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "\u2014";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Compact notation: `1.54T`, `280B`, `16M`. Pass `currency: 'USD'` to prefix `$`. */
export function formatCompact(n: number, currency?: "USD"): string {
  if (!Number.isFinite(n) || n === 0) return currency === "USD" ? "$0" : "0";
  const formatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(n);
  return currency === "USD" ? `$${formatted}` : formatted;
}

/** Currency formatter that picks decimals by magnitude (large prices \u2192 2dp, small \u2192 up to 6dp). */
export function formatPrice(value: number, currency: "USD" | "EUR" = "EUR"): string {
  if (!Number.isFinite(value)) return "\u2014";
  const abs = Math.abs(value);
  const decimals = abs >= 100 ? 2 : abs >= 1 ? 2 : abs >= 0.01 ? 4 : 6;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Trim a numeric string for display: drops trailing zero decimals and stray dot. */
export function trimAmount(s: string): string {
  if (!s) return s;
  if (!s.includes(".")) return s;
  return s.replace(/0+$/, "").replace(/\.$/, "");
}

/** DD/MM/YY (matches source). Useful for staking dates. */
export function formatShortDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear() % 100).padStart(2, "0");
  return `${dd}/${mm}/${yy}`;
}

/** Returns a size×size boolean grid representing a faux QR. Deterministic by seed. */
export function fauxQR(seed: string, size = 21): boolean[][] {
  let s = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const grid: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => rand() > 0.5),
  );
  const finder = (x0: number, y0: number) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const onBorder = x === 0 || x === 6 || y === 0 || y === 6;
        const onCenter = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        grid[y0 + y][x0 + x] = onBorder || onCenter;
      }
    }
  };
  finder(0, 0);
  finder(size - 7, 0);
  finder(0, size - 7);
  return grid;
}
