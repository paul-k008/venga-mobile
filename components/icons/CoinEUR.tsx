export default function CoinEUR({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#1E4FA0" />
      <path
        d="M25.2 14.2c-1-1-2.5-1.6-4.1-1.6-2.8 0-5.2 1.8-6.2 4.3h-1.4v1.7h1c0 .3-.1.6-.1.9s0 .6.1.9h-1v1.7h1.4c1 2.5 3.4 4.3 6.2 4.3 1.6 0 3.1-.6 4.1-1.6l-1.3-1.3c-.7.7-1.7 1.1-2.8 1.1-1.8 0-3.3-1-4.2-2.5h4.7v-1.7h-5.2c-.1-.3-.1-.6-.1-.9s0-.6.1-.9h5.2v-1.7h-4.7c.9-1.5 2.4-2.5 4.2-2.5 1.1 0 2.1.4 2.8 1.1l1.3-1.3z"
        fill="#fff"
      />
    </svg>
  );
}
