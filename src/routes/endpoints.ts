const AUTH_BASE = '/auth';

export const endpoints = {
  auth: {
    register: `${AUTH_BASE}/register`,
    login: `${AUTH_BASE}/login`,
    refresh: `${AUTH_BASE}/refresh`,
    logout: `${AUTH_BASE}/logout`,
    me: `${AUTH_BASE}/me`,
    changePassword: `${AUTH_BASE}/password/change`,
    passwordForgot: `${AUTH_BASE}/password/forgot`,
    passwordReset: `${AUTH_BASE}/password/reset`,
  },
} as const;   