'use client';

import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@account/contexts/AuthContext';
import { accountQueryOptions } from './query-options';

export function useMeQuery() {
  const { accessToken } = useAuth();

  return useQuery({
    ...accountQueryOptions.me(),
    enabled: Boolean(accessToken),
  });
}