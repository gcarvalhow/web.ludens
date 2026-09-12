import Link from 'next/link';

import type { ShowDetail } from '@catalog/server/types';

interface ShowSessionsViewProps {
  show: ShowDetail;
}

const DATE_TIME = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

export function ShowSessionsView({
  show,
}: ShowSessionsViewProps) {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
      <section className="grid gap-6 md:grid-cols-[280px_1fr]">
        <img
          src={show.image_url}
          alt={show.title}
          className="w-full rounded-lg object-cover"
        />

        <div className="flex flex-col gap-3">
          <span className="text-sm text-gray-500">
            {show.genre}
          </span>

          <h1 className="text-3xl font-bold">
            {show.title}
          </h1>

          <p className="text-gray-700">
            {show.synopsis}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">
          Sessões
        </h2>

        {show.sessions.length === 0 ? (
          <p className="text-gray-500">
            Nenhuma sessão disponível.
          </p>
        ) : (
          <div className="grid gap-3">
            {show.sessions.map((session) => (
              <Link
                key={session.id}
                href={`/sessoes/${session.id}`}
                className="rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
              >
                <p className="font-medium">
                  {DATE_TIME.format(session.starts_at)}
                </p>

                <p className="text-sm text-gray-500">
                  {session.venue}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
