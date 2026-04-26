export default function CoinUSDC({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#2775CA" />
      <circle cx="20" cy="20" r="13" fill="none" stroke="#fff" strokeWidth="1.5" />
      <path
        d="M20 12v1.4c2.2.2 3.7 1.4 3.7 3.2 0 1.4-.8 2.4-2.5 2.8v.1c2 .4 3 1.5 3 3.2 0 2-1.7 3.3-4.2 3.5V28h-1.2v-1.6c-2.3-.2-4-1.4-4.2-3.5h1.9c.2 1.1 1.1 1.9 2.3 2v-3.5c-2.3-.5-3.6-1.5-3.6-3.3 0-1.8 1.4-3 3.6-3.3V12H20zm-.6 3c-1.1.1-1.9.6-1.9 1.6 0 .9.6 1.3 1.9 1.6v-3.2zm1.2 4.4v3.6c1.3-.1 2-.7 2-1.8 0-1-.7-1.5-2-1.8z"
        fill="#fff"
      />
    </svg>
  );
}
