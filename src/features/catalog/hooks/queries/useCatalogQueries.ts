'use client';

import { useQuery } from '@tanstack/react-query';

import { catalogQueryOptions } from './query-options';

export function useAdminShowList() {
  return useQuery(
    catalogQueryOptions.adminShowList(),
  );
}

export function useAdminShow(id: string | null) {
  return useQuery({
    ...catalogQueryOptions.adminShow(id ?? ''),
    enabled: id !== null,
  });
}
