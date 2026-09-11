const AUTH_BASE = '/auth';
const USERS_BASE = '/users';
const ADMIN_SHOWS_BASE = '/admin/shows';
const ADMIN_SESSIONS_BASE = '/admin/sessions';

export const endpoints = {
  auth: {
    login: `${AUTH_BASE}/login`,
    refresh: `${AUTH_BASE}/refresh`,
    logout: `${AUTH_BASE}/logout`,
    changePassword: `${AUTH_BASE}/password/change`,
    passwordForgot: `${AUTH_BASE}/password/forgot`,
    passwordReset: `${AUTH_BASE}/password/reset`,
  },

  users: {
    register: `${USERS_BASE}/register`,
    list: USERS_BASE,
    byId: (id: string) => `${USERS_BASE}/${id}`,
  },

  catalog: {
    shows: '/shows',
    genres: '/genres',

    admin: {
      shows: {
        list: ADMIN_SHOWS_BASE,
        create: ADMIN_SHOWS_BASE,
        byId: (id: string) => `${ADMIN_SHOWS_BASE}/${id}`,
        publish: (id: string) =>
          `${ADMIN_SHOWS_BASE}/${id}/publish`,
        unpublish: (id: string) =>
          `${ADMIN_SHOWS_BASE}/${id}/unpublish`,
        sessions: (id: string) =>
          `${ADMIN_SHOWS_BASE}/${id}/sessions`,
      },

      sessions: {
        byId: (id: string) =>
          `${ADMIN_SESSIONS_BASE}/${id}`,
        cancel: (id: string) =>
          `${ADMIN_SESSIONS_BASE}/${id}/cancel`,
      },
    },
  },
} as const;
