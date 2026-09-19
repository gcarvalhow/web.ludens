import { CalendarDays, MapPin, Ticket } from 'lucide-react';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Separator } from '@components/ui/separator';

import { formatPriceBRL } from '@catalog/lib';

import type { SessionDetail } from '@catalog/server/types';

interface SessionDetailViewProps {
  session: SessionDetail;
}

const DATE_TIME_FULL = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'full',
  timeStyle: 'short',
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

const STATUS_BADGE_VARIANT: Record<
  SessionDetail['status'],
  'success' | 'secondary' | 'destructive' | 'warning'
> = {
  on_sale: 'success',
  sold_out: 'warning',
  closed: 'secondary',
  cancelled: 'destructive',
};

export function SessionDetailView({
  session,
}: SessionDetailViewProps) {
  const canReserve =
    session.status === 'on_sale' &&
    session.available_count > 0;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {session.show.title}
            </p>

            <h1 className="flex items-center gap-2 font-heading text-2xl font-semibold tracking-tight">
              <CalendarDays className="size-5 text-primary" />
              {DATE_TIME_FULL.format(session.starts_at)}
            </h1>

            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {session.venue}
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={STATUS_BADGE_VARIANT[session.status]}>
              {STATUS_LABEL[session.status]}
            </Badge>

            {session.status === 'on_sale' ? (
              <span className="text-sm text-muted-foreground">
                {session.available_count} ingresso(s) disponível(is)
              </span>
            ) : null}
          </div>

          <Separator />

          <ul className="flex flex-col gap-2">
            {session.ticket_types.map((ticket) => (
              <li
                key={ticket.type}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2">
                  <Ticket className="size-4 text-muted-foreground" />
                  {ticket.type === 'full'
                    ? 'Inteira'
                    : 'Meia-entrada'}
                </span>

                <span className="font-medium">
                  {formatPriceBRL(ticket.price)}
                </span>
              </li>
            ))}
          </ul>

          {/* Slot do TicketPicker (booking-reservation) —
              esta fatia só exibe disponibilidade;
              a reserva é outra feature. */}
          <Button
            type="button"
            disabled={!canReserve}
            className="min-h-11 w-full"
          >
            {canReserve
              ? 'Reservar'
              : STATUS_LABEL[session.status]}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
