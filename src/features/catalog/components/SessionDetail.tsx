'use client';

import { useSessionDetail } from '@catalog/hooks/queries';
import { SessionDetailView } from '@catalog/components/ui';

interface SessionDetailProps {
  sessionId: string;
}

export function SessionDetailComponent({
  sessionId,
}: SessionDetailProps) {
  const {
    data: session,
    isLoading,
    isError,
  } = useSessionDetail(sessionId);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <p>Carregando sessão...</p>
      </main>
    );
  }

  if (isError || !session) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <p>Não foi possível carregar a sessão.</p>
      </main>
    );
  }

  return <SessionDetailView session={session} />;
}
