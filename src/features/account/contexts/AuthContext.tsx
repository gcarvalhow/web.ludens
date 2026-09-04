'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '@web/lib/fetcher';

import { authService } from '@account/services/auth.service';

import type {
  Buyer,
  LoginRequest,
} from '@account/server/types/auth.types';

type AuthContextValue = {
  buyer: Buyer | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  setSession: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [accessToken, setAccessTokenState] = useState<string | null>(
    getAccessToken(),
  );

  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadBuyer = useCallback(async () => {
    const data = await authService.fetchMe();
    setBuyer(data);
  }, []);

  const setSession = useCallback(
    async (token: string) => {
      setAccessToken(token);
      setAccessTokenState(token);

      await loadBuyer();
    },
    [loadBuyer],
  );

  const refreshSession = useCallback(async () => {
    try {
      const response = await authService.refresh();

      await setSession(response.accessToken);

      return true;
    } catch {
      clearAccessToken();
      setAccessTokenState(null);
      setBuyer(null);

      return false;
    }
  }, [setSession]);

  const login = useCallback(
    async (data: LoginRequest) => {
      const response = await authService.login(data);

      await setSession(response.accessToken);
    },
    [setSession],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearAccessToken();
      setAccessTokenState(null);
      setBuyer(null);
    }
  }, []);

  useEffect(() => {
    async function bootstrapAuth() {
      try {
        await refreshSession();
      } finally {
        setIsLoading(false);
      }
    }

    void bootstrapAuth();
  }, [refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      buyer,
      accessToken,
      isAuthenticated: Boolean(accessToken && buyer),
      isLoading,
      login,
      logout,
      refreshSession,
      setSession,
    }),
    [
      buyer,
      accessToken,
      isLoading,
      login,
      logout,
      refreshSession,
      setSession,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser usado dentro de AuthProvider.',
    );
  }

  return context;
}