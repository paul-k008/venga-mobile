export default function CoinGRT({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#6747ED" />
      <circle cx="17" cy="17" r="4.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <path d="M21 21l5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="26" cy="26" r="1.6" fill="#fff" />
    </svg>
  );
}
