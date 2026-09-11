import { fetcher } from '@web/lib/fetcher';
import { endpoints } from '@web/routes/endpoints';

import type {
  AdminSession,
  AdminShow,
  SessionFormValues,
  ShowFormValues,
} from '@catalog/server/types';

// O <input type="datetime-local"> devolve hora local sem fuso;
// o backend exige ISO 8601 com offset.
function toSessionPayload(values: SessionFormValues) {
  return {
    starts_at: new Date(values.starts_at).toISOString(),
    venue: values.venue,
    capacity: values.capacity,
    full_price: values.full_price,
  };
}

// O fetcher não valida a resposta em runtime (contrato da feature —
// ver issue #11), então o JSON chega com `starts_at` como string ISO
// mesmo o tipo dizendo `Date` (via z.coerce.date()). Revive só esse
// campo, sem pagar o custo de um `.parse()` completo do schema.
function reviveSession(session: AdminSession): AdminSession {
  return {
    ...session,
    starts_at: new Date(session.starts_at),
  };
}

function reviveShow(show: AdminShow): AdminShow {
  return {
    ...show,
    sessions: show.sessions.map(reviveSession),
  };
}

export const catalogService = {
  async listAdminShows() {
    const shows = await fetcher<AdminShow[]>(
      endpoints.catalog.admin.shows.list,
      {
        method: 'GET',
      },
    );

    return shows.map(reviveShow);
  },

  async createShow(values: ShowFormValues) {
    const show = await fetcher<AdminShow>(
      endpoints.catalog.admin.shows.create,
      {
        method: 'POST',
        body: JSON.stringify(values),
      },
    );

    return reviveShow(show);
  },

  async updateShow(id: string, values: ShowFormValues) {
    const show = await fetcher<AdminShow>(
      endpoints.catalog.admin.shows.byId(id),
      {
        method: 'PUT',
        body: JSON.stringify(values),
      },
    );

    return reviveShow(show);
  },

  publishShow(id: string) {
    return fetcher<void>(
      endpoints.catalog.admin.shows.publish(id),
      {
        method: 'POST',
      },
    );
  },

  unpublishShow(id: string) {
    return fetcher<void>(
      endpoints.catalog.admin.shows.unpublish(id),
      {
        method: 'POST',
      },
    );
  },

  deleteShow(id: string) {
    return fetcher<void>(
      endpoints.catalog.admin.shows.byId(id),
      {
        method: 'DELETE',
      },
    );
  },

  async createSession(
    showId: string,
    values: SessionFormValues,
  ) {
    const session = await fetcher<AdminSession>(
      endpoints.catalog.admin.shows.sessions(showId),
      {
        method: 'POST',
        body: JSON.stringify(toSessionPayload(values)),
      },
    );

    return reviveSession(session);
  },

  async updateSession(
    sessionId: string,
    values: SessionFormValues,
  ) {
    const session = await fetcher<AdminSession>(
      endpoints.catalog.admin.sessions.byId(sessionId),
      {
        method: 'PUT',
        body: JSON.stringify(toSessionPayload(values)),
      },
    );

    return reviveSession(session);
  },

  cancelSession(sessionId: string) {
    return fetcher<void>(
      endpoints.catalog.admin.sessions.cancel(sessionId),
      {
        method: 'POST',
      },
    );
  },

  deleteSession(sessionId: string) {
    return fetcher<void>(
      endpoints.catalog.admin.sessions.byId(sessionId),
      {
        method: 'DELETE',
      },
    );
  },
};