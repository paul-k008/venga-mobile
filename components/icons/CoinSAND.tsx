export default function CoinSAND({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#00ADEF" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="22"
        letterSpacing="-1"
      >
        S
      </text>
    </svg>
  );
}
