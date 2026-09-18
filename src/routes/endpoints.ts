const API_BASE = '/api';
const IDENTITY_BASE = `${API_BASE}/identity`;
const CATALOG_BASE = `${API_BASE}/catalog`;

export const endpoints = {
  auth: {
    login: `${IDENTITY_BASE}/login`,
    refresh: `${IDENTITY_BASE}/refresh`,
    logout: `${IDENTITY_BASE}/logout`,
    changePassword: `${IDENTITY_BASE}/password/change`,
    passwordForgot: `${IDENTITY_BASE}/password/forgot`,
    passwordReset: `${IDENTITY_BASE}/password/reset`,
  },

  users: {
    register: `${IDENTITY_BASE}/users`,
    list: `${IDENTITY_BASE}/users`,
    byId: (id: string) => `${IDENTITY_BASE}/users/${id}`,
  },

  // api.ludens unificou leitura admin/pública (#45/#47): não existe mais
  // um namespace /admin separado — é a mesma URL pra público e admin,
  // o backend decide o formato da resposta pelo token do usuário.
  catalog: {
    shows: `${CATALOG_BASE}/shows/`,
    showById: (id: string) => `${CATALOG_BASE}/shows/${id}`,
    showPublish: (id: string) =>
      `${CATALOG_BASE}/shows/${id}/publish`,
    showUnpublish: (id: string) =>
      `${CATALOG_BASE}/shows/${id}/unpublish`,
    genres: `${CATALOG_BASE}/genres`,
    sessions: `${CATALOG_BASE}/sessions/`,
    sessionById: (id: string) => `${CATALOG_BASE}/sessions/${id}`,
    sessionCancel: (id: string) =>
      `${CATALOG_BASE}/sessions/${id}/cancel`,
  },
} as const;
