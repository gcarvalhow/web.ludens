import { fetcher } from '@web/lib/fetcher';
import { endpoints } from '@web/routes/endpoints';

import type {
  Buyer,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  TokenResponse,
} from '@account/server/types/auth.types';

export const authService = {
  register(data: RegisterRequest) {
    return fetcher<TokenResponse>(endpoints.users.register, {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  login(data: LoginRequest) {
    return fetcher<TokenResponse>(endpoints.auth.login, {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  refresh() {
    return fetcher<TokenResponse>(endpoints.auth.refresh, {
      method: 'POST',
      skipAuth: true,
      skipRefresh: true,
    });
  },

  logout() {
    return fetcher<void>(endpoints.auth.logout, {
      method: 'POST',
    });
  },

  fetchUserById(id: string) {
    return fetcher<Buyer>(endpoints.users.byId(id), {
      method: 'GET',
    });
  },

  changePassword(data: ChangePasswordRequest) {
    return fetcher<void>(endpoints.auth.changePassword, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  forgotPassword(data: ForgotPasswordRequest) {
    return fetcher<{ message: string }>(
      endpoints.auth.passwordForgot,
      {
        method: 'POST',
        body: JSON.stringify(data),
        skipAuth: true,
      },
    );
  },

  resetPassword(data: ResetPasswordRequest) {
    return fetcher<void>(endpoints.auth.passwordReset, {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },
};