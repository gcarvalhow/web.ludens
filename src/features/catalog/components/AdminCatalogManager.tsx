'use client';

import { useState } from 'react';

import {
  SessionForm,
  ShowForm,
  ShowList,
} from '@catalog/components/admin';
import { ConfirmCancelSessionDialog } from '@catalog/components/ui';
import {
  useSessionForm,
  useShowForm,
} from '@catalog/hooks/forms';
import { useAdminCatalogMutations } from '@catalog/hooks/mutations';
import { useAdminShowList } from '@catalog/hooks/queries';
import { formatDateTime } from '@catalog/lib';

import type {
  AdminSession,
  AdminShow,
} from '@catalog/server/types';

type ShowPanel =
  | { mode: 'create' }
  | { mode: 'edit'; show: AdminShow }
  | null;

type SessionPanel = {
  showId: string;
  session: AdminSession | null;
} | null;

export function AdminCatalogManager() {
  const query = useAdminShowList();

  const {
    createShowMutation,
    updateShowMutation,
    publishShowMutation,
    unpublishShowMutation,
    deleteShowMutation,
    createSessionMutation,
    updateSessionMutation,
    cancelSessionMutation,
    deleteSessionMutation,
  } = useAdminCatalogMutations();

  const [showPanel, setShowPanel] =
    useState<ShowPanel>(null);

  const [sessionPanel, setSessionPanel] =
    useState<SessionPanel>(null);

  const [cancelTarget, setCancelTarget] =
    useState<AdminSession | null>(null);

  const showForm = useShowForm(
    showPanel?.mode === 'edit'
      ? showPanel.show
      : null,
  );

  const sessionForm = useSessionForm(
    sessionPanel?.session ?? null,
  );

  const showPending =
    createShowMutation.isPending ||
    updateShowMutation.isPending;

  const sessionPending =
    createSessionMutation.isPending ||
    updateSessionMutation.isPending;

  const submitShow = showForm.handleSubmit(
    (values) => {
      if (showPanel?.mode === 'edit') {
        updateShowMutation.mutate(
          {
            id: showPanel.show.id,
            values,
          },
          {
            onSuccess: () =>
              setShowPanel(null),
          },
        );
      } else {
        createShowMutation.mutate(
          values,
          {
            onSuccess: () =>
              setShowPanel(null),
          },
        );
      }
    },
  );

  const submitSession =
    sessionForm.handleSubmit((values) => {
      if (!sessionPanel) return;

      if (sessionPanel.session) {
        updateSessionMutation.mutate(
          {
            id: sessionPanel.session.id,
            values,
          },
          {
            onSuccess: () =>
              setSessionPanel(null),
          },
        );
      } else {
        createSessionMutation.mutate(
          {
            showId: sessionPanel.showId,
            values,
          },
          {
            onSuccess: () =>
              setSessionPanel(null),
          },
        );
      }
    });

  const confirmCancel = () => {
    if (!cancelTarget) return;

    cancelSessionMutation.mutate(
      cancelTarget.id,
      {
        onSuccess: () =>
          setCancelTarget(null),
      },
    );
  };

  if (query.isLoading) {
    return (
      <p className="p-6 text-sm text-gray-500">
        Carregando espetáculos...
      </p>
    );
  }

  if (query.isError) {
    return (
      <div className="p-6 text-sm">
        <p className="text-red-600">
          Não foi possível carregar os espetáculos.
        </p>

        <button
          type="button"
          onClick={() => void query.refetch()}
          className="mt-2 min-h-11 rounded-md border border-gray-300 px-4"
        >
          Tentar de novo
        </button>
      </div>
    );
  }

  const shows = query.data ?? [];

  const editingSessionTicketsSold =
    sessionPanel?.session?.tickets_sold ?? 0;

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Espetáculos e sessões
        </h1>

        <button
          type="button"
          onClick={() =>
            setShowPanel({
              mode: 'create',
            })
          }
          className="min-h-11 rounded-md bg-gray-900 px-4 text-sm font-medium text-white"
        >
          Novo espetáculo
        </button>
      </div>

      {showPanel ? (
        <ShowForm
          form={showForm}
          onSubmit={submitShow}
          onCancel={() =>
            setShowPanel(null)
          }
          isPending={showPending}
          mode={showPanel.mode}
        />
      ) : null}

      {sessionPanel ? (
        <SessionForm
          form={sessionForm}
          onSubmit={submitSession}
          onCancel={() =>
            setSessionPanel(null)
          }
          isPending={sessionPending}
          mode={
            sessionPanel.session
              ? 'edit'
              : 'create'
          }
          ticketsSold={
            editingSessionTicketsSold
          }
        />
      ) : null}

      {shows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
          Nenhum espetáculo cadastrado ainda.
          Crie o primeiro para começar a montar
          o catálogo.
        </p>
      ) : (
        <ShowList
          shows={shows}
          onEditShow={(show) =>
            setShowPanel({
              mode: 'edit',
              show,
            })
          }
          onPublish={(show) =>
            publishShowMutation.mutate(
              show.id,
            )
          }
          onUnpublish={(show) =>
            unpublishShowMutation.mutate(
              show.id,
            )
          }
          onDeleteShow={(show) =>
            deleteShowMutation.mutate(
              show.id,
            )
          }
          onNewSession={(showId) =>
            setSessionPanel({
              showId,
              session: null,
            })
          }
          onEditSession={(
            showId,
            session,
          ) =>
            setSessionPanel({
              showId,
              session,
            })
          }
          onCancelSession={(session) =>
            setCancelTarget(session)
          }
          onDeleteSession={(session) =>
            deleteSessionMutation.mutate(
              session.id,
            )
          }
        />
      )}

      <ConfirmCancelSessionDialog
        open={cancelTarget !== null}
        sessionLabel={
          cancelTarget
            ? `${formatDateTime(
                cancelTarget.starts_at,
              )} · ${cancelTarget.venue}`
            : ''
        }
        ticketsSold={
          cancelTarget?.tickets_sold ?? 0
        }
        isPending={
          cancelSessionMutation.isPending
        }
        onConfirm={confirmCancel}
        onClose={() =>
          setCancelTarget(null)
        }
      />
    </main>
  );
}	
