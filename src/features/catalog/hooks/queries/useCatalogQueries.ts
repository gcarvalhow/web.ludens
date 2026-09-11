'use client';

import { useQuery } from '@tanstack/react-query';

import type { ShowFilterParams } from '@catalog/services';

import { catalogQueryOptions } from './query-options';

export function useShowList(
  filters: ShowFilterParams,
) {
  return useQuery(
    catalogQueryOptions.showList(filters),
  );
}

export function useGenreList() {
  return useQuery(
    catalogQueryOptions.genreList(),
  );
}

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
