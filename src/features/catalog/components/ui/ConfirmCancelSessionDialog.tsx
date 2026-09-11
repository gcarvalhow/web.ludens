'use client';

import { useEffect } from 'react';

interface ConfirmCancelSessionDialogProps {
  open: boolean;
  sessionLabel: string;
  ticketsSold: number;
  isPending: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmCancelSessionDialog({
  open,
  sessionLabel,
  ticketsSold,
  isPending,
  onConfirm,
  onClose,
}: ConfirmCancelSessionDialogProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);

    return () =>
      window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="cancel-session-title"
        aria-describedby="cancel-session-desc"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <h2
          id="cancel-session-title"
          className="text-lg font-semibold"
        >
          Cancelar a sessão?
        </h2>

        <p
          id="cancel-session-desc"
          className="mt-2 text-sm text-gray-700"
        >
          {sessionLabel}
        </p>

        <p className="mt-3 text-sm text-gray-700">
          {ticketsSold > 0
            ? `Esta sessão já vendeu ${ticketsSold} ingresso(s). Ao cancelar, todos os compradores entram na fila de 
reembolso conforme a política vigente, e as reservas em aberto são liberadas. A ação não pode ser desfeita.`
            : 'A sessão sai da vitrine imediatamente. A ação não pode ser desfeita.'}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="min-h-11 rounded-md border border-gray-300 px-4 text-sm font-medium"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="min-h-11 rounded-md bg-red-600 px-4 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending
              ? 'Cancelando...'
              : 'Cancelar a sessão'}
          </button>
        </div>
      </div>
    </div>
  );
}
