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

export const catalogService = {
  listAdminShows() {
    return fetcher<AdminShow[]>(
      endpoints.catalog.admin.shows.list,
      {
        method: 'GET',
      },
    );
  },

  createShow(values: ShowFormValues) {
    return fetcher<AdminShow>(
      endpoints.catalog.admin.shows.create,
      {
        method: 'POST',
        body: JSON.stringify(values),
      },
    );
  },

  updateShow(id: string, values: ShowFormValues) {
    return fetcher<AdminShow>(
      endpoints.catalog.admin.shows.byId(id),
      {
        method: 'PUT',
        body: JSON.stringify(values),
      },
    );
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

  createSession(
    showId: string,
    values: SessionFormValues,
  ) {
    return fetcher<AdminSession>(
      endpoints.catalog.admin.shows.sessions(showId),
      {
        method: 'POST',
        body: JSON.stringify(toSessionPayload(values)),
      },
    );
  },

  updateSession(
    sessionId: string,
    values: SessionFormValues,
  ) {
    return fetcher<AdminSession>(
      endpoints.catalog.admin.sessions.byId(sessionId),
      {
        method: 'PUT',
        body: JSON.stringify(toSessionPayload(values)),
      },
    );
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