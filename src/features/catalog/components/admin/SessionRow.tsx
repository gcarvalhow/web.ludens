'use client';

import { SESSION_STATUS_LABELS } from '@catalog/constants';
import {
  formatDateTime,
  formatPriceBRL,
} from '@catalog/lib';

import type { AdminSession } from '@catalog/server/types';

interface SessionRowProps {
  session: AdminSession;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export function SessionRow({
  session,
  onEdit,
  onCancel,
  onDelete,
}: SessionRowProps) {
  const canCancel = session.status === 'on_sale';

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 py-2 text-sm">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-medium">
          {formatDateTime(session.starts_at)}
        </span>

        <span className="text-gray-600">
          {session.venue}
        </span>

        <span className="text-gray-600">
          Cap. {session.capacity}
        </span>

        <span className="text-gray-600">
          Inteira {formatPriceBRL(session.full_price)} · Meia{' '}
          {formatPriceBRL(session.half_price)}
        </span>

        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
          {SESSION_STATUS_LABELS[session.status]}
        </span>

        <span className="text-gray-600">
          Vendidos: {session.tickets_sold}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="min-h-11 rounded-md border border-gray-300 px-3 text-sm"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={!canCancel}
          title={
            canCancel
              ? undefined
              : 'Só sessões à venda podem ser canceladas'
          }
          className="min-h-11 rounded-md border border-amber-300 px-3 text-sm text-amber-800 disabled:opacity-40"
        >
          Cancelar sessão
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={!session.can_delete}
          title={
            session.can_delete
              ? undefined
              : 'Sessão com ingressos vendidos não pode ser excluída — cancele em vez disso'
          }
          className="min-h-11 rounded-md border border-red-300 px-3 text-sm text-red-700 disabled:opacity-40"
        >
          Excluir
        </button>
      </div>
    </li>
  );
}
