export default function CoinAAVE({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="aave-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B6509E" />
          <stop offset="100%" stopColor="#8457D9" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#aave-grad)" />
      {/* ghost-face: two white eyes + subtle smile arc */}
      <circle cx="15.5" cy="18" r="2.3" fill="#fff" />
      <circle cx="24.5" cy="18" r="2.3" fill="#fff" />
      <path
        d="M14 25 Q20 29 26 25"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
