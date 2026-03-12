"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "default",
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-[20px] border border-grey/10 bg-white p-6 shadow-lg">
        <h2
          id="confirm-modal-title"
          className="text-lg font-semibold text-grey recoleta mb-2"
        >
          {title}
        </h2>
        <p className="text-sm text-grey/70 mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] border border-grey/20 px-4 py-2 text-sm font-medium text-grey hover:bg-grey/5 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-[12px] px-4 py-2 text-sm font-semibold text-white transition-colors ${
              variant === "danger"
                ? "bg-red hover:bg-red-700"
                : "bg-brown hover:bg-brown/90"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
