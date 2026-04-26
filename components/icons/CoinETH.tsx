export default function CoinETH({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#0E1116" />
      <path d="M20 8L12.5 20.3 20 24.7l7.5-4.4L20 8z" fill="#fff" fillOpacity=".95" />
      <path d="M20 8l-7.5 12.3L20 17V8z" fill="#fff" fillOpacity=".65" />
      <path d="M20 26.1l-7.5-4.4L20 32l7.5-10.3L20 26.1z" fill="#fff" fillOpacity=".9" />
      <path d="M20 32v-5.9l-7.5-4.4L20 32z" fill="#fff" fillOpacity=".7" />
    </svg>
  );
}
