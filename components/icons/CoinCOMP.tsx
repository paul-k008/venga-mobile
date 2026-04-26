export default function CoinCOMP({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#00D395" />
      <path
        d="M11 24.5v-4.3l9.5-5.4c.6-.3 1.3-.3 1.9 0l6.6 3.8v4.3l-8.5-4.9-9.5 6.5zm0 3.5v-2.1l9.5-6.5 8.5 4.9v2.1l-8.5-4.9L11 28z"
        fill="#fff"
      />
    </svg>
  );
}
