'use client';

import { SHOW_STATUS_LABELS } from '@catalog/constants';

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
    <div className="space-y-6">
      {shows.map((show) => (
        <section
          key={show.id}
          className="rounded-lg border border-gray-200 p-4"
        >
          <header className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">
                {show.title}
              </h2>

              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                {SHOW_STATUS_LABELS[show.status]}
              </span>

              <span className="text-sm text-gray-500">
                {show.genre}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEditShow(show)}
                className="min-h-11 rounded-md border border-gray-300 px-3 text-sm"
              >
                Editar
              </button>

              {show.status === 'draft' ? (
                <button
                  type="button"
                  onClick={() => onPublish(show)}
                  className="min-h-11 rounded-md border border-green-300 px-3 text-sm text-green-700"
                >
                  Publicar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onUnpublish(show)}
                  className="min-h-11 rounded-md border border-gray-300 px-3 text-sm"
                >
                  Despublicar
                </button>
              )}

              <button
                type="button"
                onClick={() => onDeleteShow(show)}
                className="min-h-11 rounded-md border border-red-300 px-3 text-sm text-red-700"
              >
                Excluir
              </button>
            </div>
          </header>

          <p className="mt-2 text-sm text-gray-600">
            {show.synopsis}
          </p>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                Sessões
              </h3>

              <button
                type="button"
                onClick={() => onNewSession(show.id)}
                className="min-h-11 rounded-md border border-gray-300 px-3 text-sm"
              >
                Nova sessão
              </button>
            </div>

            {show.sessions.length === 0 ? (
              <p className="mt-2 text-sm text-gray-500">
                Nenhuma sessão. Um espetáculo sem sessão
                futura não aparece na vitrine.
              </p>
            ) : (
              <ul className="mt-2">
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
          </div>
        </section>
      ))}
    </div>
  );
}
