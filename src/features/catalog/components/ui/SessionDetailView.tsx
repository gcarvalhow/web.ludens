import type { SessionDetail } from '@catalog/server/types';

interface SessionDetailViewProps {
  session: SessionDetail;
}

const DATE_TIME = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'full',
  timeStyle: 'short',
});

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const STATUS_LABEL: Record<
  SessionDetail['status'],
  string
> = {
  on_sale: 'À venda',
  sold_out: 'Esgotado',
  closed: 'Encerrada',
  cancelled: 'Cancelada',
};

export function SessionDetailView({
  session,
}: SessionDetailViewProps) {
  const canReserve =
    session.status === 'on_sale' &&
    session.available_count > 0;

  return (
    <article className="mx-auto max-w-2xl space-y-6 p-6">
      <header>
        <p className="text-sm text-gray-500">
          {session.show.title}
        </p>

        <h1 className="text-2xl font-bold">
          {DATE_TIME.format(session.starts_at)}
        </h1>

        <p className="text-sm text-gray-600">
          {session.venue}
        </p>
      </header>

      <div className="flex items-center gap-3">
        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
          {STATUS_LABEL[session.status]}
        </span>

        {session.status === 'on_sale' ? (
          <span className="text-sm text-gray-600">
            {session.available_count} ingresso(s) disponível(is)
          </span>
        ) : null}
      </div>

      <ul className="space-y-1 text-sm">
        {session.ticket_types.map((ticket) => (
          <li
            key={ticket.type}
            className="flex justify-between"
          >
            <span>
              {ticket.type === 'full'
                ? 'Inteira'
                : 'Meia-entrada'}
            </span>

            <span>{BRL.format(ticket.price)}</span>
          </li>
        ))}
      </ul>

      {/* Slot do TicketPicker (booking-reservation) —
          esta fatia só exibe disponibilidade;
          a reserva é outra feature. */}
      <button
        type="button"
        disabled={!canReserve}
        className="min-h-11 w-full rounded-md bg-gray-900 px-4 text-sm font-medium text-white disabled:opacity-40"
      >
        {canReserve
          ? 'Reservar'
          : STATUS_LABEL[session.status]}
      </button>
    </article>
  );
}
