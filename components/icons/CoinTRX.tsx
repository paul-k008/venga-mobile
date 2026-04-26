export default function CoinTRX({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#FF060A" />
      <path
        d="M11.5 12.5L28 15.8 23.4 29 11.5 12.5zm3.1 1.9l7.4 10.3 1-7.9-8.4-2.4zm9.8 2.8l-.9 7 3.1-8.8-2.2 1.8zm-2.3 9L14.5 16l7.6 10.2z"
        fill="#fff"
      />
    </svg>
  );
}
