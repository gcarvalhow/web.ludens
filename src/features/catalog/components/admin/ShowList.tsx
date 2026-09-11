'use client';

import {
  CalendarPlus,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
} from 'lucide-react';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@components/ui/card';
import { Separator } from '@components/ui/separator';

import { SHOW_STATUS_BADGE_VARIANT, SHOW_STATUS_LABELS } from '@catalog/constants';

import { SessionRow } from './SessionRow';

import type {
  AdminSession,
  AdminShow,
} from '@catalog/server/types';

interface ShowListProps {
  shows: AdminShow[];
  onEditShow: (show: AdminShow) => void;
  onPublish: (show: AdminShow) => void;
  onUnpublish: (show: AdminShow) => void;
  onDeleteShow: (show: AdminShow) => void;
  onNewSession: (showId: string) => void;
  onEditSession: (
    showId: string,
    session: AdminSession,
  ) => void;
  onCancelSession: (session: AdminSession) => void;
  onDeleteSession: (session: AdminSession) => void;
}

export function ShowList({
  shows,
  onEditShow,
  onPublish,
  onUnpublish,
  onDeleteShow,
  onNewSession,
  onEditSession,
  onCancelSession,
  onDeleteSession,
}: ShowListProps) {
  return (
    <div className="flex flex-col gap-5">
      {shows.map((show) => (
        <Card
          key={show.id}
          className="border-t-2 border-t-primary/70"
        >
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-lg font-semibold">
                    {show.title}
                  </h2>

                  <Badge variant={SHOW_STATUS_BADGE_VARIANT[show.status]}>
                    {SHOW_STATUS_LABELS[show.status]}
                  </Badge>
                </div>

                <span className="text-sm text-muted-foreground">
                  {show.genre}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="min-h-11"
                  onClick={() => onEditShow(show)}
                >
                  <Pencil />
                  Editar
                </Button>

                {show.status === 'draft' ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="min-h-11 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                    onClick={() => onPublish(show)}
                  >
                    <Eye />
                    Publicar
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="min-h-11"
                    onClick={() => onUnpublish(show)}
                  >
                    <EyeOff />
                    Despublicar
                  </Button>
                )}

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="min-h-11"
                  onClick={() => onDeleteShow(show)}
                >
                  <Trash2 />
                  Excluir
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {show.synopsis}
            </p>
          </CardHeader>

          <Separator />

          <CardContent className="flex flex-col gap-2 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                Sessões
              </h3>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="min-h-11"
                onClick={() => onNewSession(show.id)}
              >
                <CalendarPlus />
                Nova sessão
              </Button>
            </div>

            {show.sessions.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
                Nenhuma sessão. Um espetáculo sem sessão futura
                não aparece na vitrine.
              </p>
            ) : (
              <ul>
                {show.sessions.map((session) => (
                  <SessionRow
                    key={session.id}
                    session={session}
                    onEdit={() =>
                      onEditSession(show.id, session)
                    }
                    onCancel={() =>
                      onCancelSession(session)
                    }
                    onDelete={() =>
                      onDeleteSession(session)
                    }
                  />
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
