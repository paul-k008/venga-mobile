export default function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 h-8 px-4 rounded-pill text-[13px] transition-colors active:scale-[0.96] ${
        active
          ? "bg-lime text-ink font-semibold"
          : "bg-cream-2 text-ink-70 font-medium"
      }`}
    >
      {label}
    </button>
  );
}
