const AUTH_BASE = '/auth';
const USERS_BASE = '/users';

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
} as const;
