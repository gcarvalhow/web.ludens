import { fetcher } from '@web/lib/fetcher';

import { authService } from './auth.service';

jest.mock('@web/lib/fetcher', () => ({
  fetcher: jest.fn(),
}));

const mockedFetcher = fetcher as jest.Mock;

describe('authService', () => {
  beforeEach(() => {
    mockedFetcher.mockReset();
    mockedFetcher.mockResolvedValue({});
  });

  it('register bate em POST /users/register, sem auth', async () => {
    const payload = {
      name: 'Maria',
      cpf: '12345678901',
      email: 'maria@example.com',
      password: 'senha1234',
    };

    await authService.register(payload);

    expect(mockedFetcher).toHaveBeenCalledWith('/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      skipAuth: true,
    });
  });

  it('login bate em POST /auth/login, sem auth', async () => {
    const payload = { email: 'maria@example.com', password: 'senha1234' };

    await authService.login(payload);

    expect(mockedFetcher).toHaveBeenCalledWith('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      skipAuth: true,
    });
  });

  it('refresh bate em POST /auth/refresh, sem auth e sem tentar refresh de novo', async () => {
    await authService.refresh();

    expect(mockedFetcher).toHaveBeenCalledWith('/auth/refresh', {
      method: 'POST',
      skipAuth: true,
      skipRefresh: true,
    });
  });

  it('logout bate em POST /auth/logout, autenticado', async () => {
    await authService.logout();

    expect(mockedFetcher).toHaveBeenCalledWith('/auth/logout', { method: 'POST' });
  });

  it('fetchUserById bate em GET /users/{id}', async () => {
    await authService.fetchUserById('abc-123');

    expect(mockedFetcher).toHaveBeenCalledWith('/users/abc-123', { method: 'GET' });
  });

  it('changePassword bate em POST /auth/password/change, autenticado', async () => {
    const payload = { current_password: 'atual123', new_password: 'nova12345' };

    await authService.changePassword(payload);

    expect(mockedFetcher).toHaveBeenCalledWith('/auth/password/change', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  });

  it('forgotPassword bate em POST /auth/password/forgot, sem auth', async () => {
    const payload = { email: 'maria@example.com' };

    await authService.forgotPassword(payload);

    expect(mockedFetcher).toHaveBeenCalledWith('/auth/password/forgot', {
      method: 'POST',
      body: JSON.stringify(payload),
      skipAuth: true,
    });
  });

  it('resetPassword bate em POST /auth/password/reset, sem auth', async () => {
    const payload = { token: 'tok', password: 'senha1234' };

    await authService.resetPassword(payload);

    expect(mockedFetcher).toHaveBeenCalledWith('/auth/password/reset', {
      method: 'POST',
      body: JSON.stringify(payload),
      skipAuth: true,
    });
  });
});
