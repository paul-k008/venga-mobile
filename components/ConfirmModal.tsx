"use client";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel: string;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel,
  destructive = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-mobile bg-cream rounded-t-[24px] sm:rounded-[24px] p-6 pb-8 shadow-xl mx-auto">
        <h3 className="font-display text-[22px] text-ink">{title}</h3>
        {description && (
          <p className="text-[14px] text-ink-70 mt-2">{description}</p>
        )}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-12 rounded-pill bg-cream-2 text-ink font-semibold text-[15px]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 h-12 rounded-pill font-semibold text-[15px] text-white ${
              destructive ? "bg-red" : "bg-orange"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
