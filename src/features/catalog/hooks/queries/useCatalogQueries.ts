'use client';

import { useQuery } from '@tanstack/react-query';

import { catalogQueryOptions } from './query-options';

export function useAdminShowList() {
  return useQuery(
    catalogQueryOptions.adminShowList(),
  );
}
