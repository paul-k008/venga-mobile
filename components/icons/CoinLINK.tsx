export default function CoinLINK({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#F7F2E7" />
      <circle cx="20" cy="20" r="19" fill="none" stroke="#2A5ADA" strokeWidth="1.2" />
      {/* outer hexagon (hollow) */}
      <path
        d="M20 8 L29.5 13.5 L29.5 26.5 L20 32 L10.5 26.5 L10.5 13.5 Z"
        fill="none"
        stroke="#2A5ADA"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* inner small hexagon filled */}
      <path
        d="M20 15 L24 17.3 L24 22.7 L20 25 L16 22.7 L16 17.3 Z"
        fill="#2A5ADA"
      />
    </svg>
  );
}
