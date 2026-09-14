'use client';

import { useShowDetail } from '@catalog/hooks/queries';
import { ShowSessionsView } from '@catalog/components/ui';

interface ShowSessionsProps {
  showId: string;
}

export function ShowSessions({
  showId,
}: ShowSessionsProps) {
  const {
    data: show,
    isLoading,
    isError,
  } = useShowDetail(showId);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p>Carregando espetáculo...</p>
      </main>
    );
  }

  if (isError || !show) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p>Não foi possível carregar o espetáculo.</p>
      </main>
    );
  }

  return <ShowSessionsView show={show} />;
}
