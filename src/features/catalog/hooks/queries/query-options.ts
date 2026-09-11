import { queryOptions } from '@tanstack/react-query';

import { catalogService } from '@catalog/services';

import type { ShowFilterParams } from '@catalog/services/show.service';

export const catalogQueryKeys = {
  all: ['catalog'] as const,

  shows: (filters: ShowFilterParams) =>
    [
      ...catalogQueryKeys.all,
      'shows',
      filters,
    ] as const,

  genres: () =>
    [...catalogQueryKeys.all, 'genres'] as const,

  admin: {
    shows: () =>
      [
        ...catalogQueryKeys.all,
        'admin',
        'shows',
      ] as const,

    showList: () =>
      [
        ...catalogQueryKeys.admin.shows(),
        'list',
      ] as const,
  },
};

export const catalogQueryOptions = {
  showList: (filters: ShowFilterParams) =>
    queryOptions({
      queryKey:
        catalogQueryKeys.shows(filters),
      queryFn: () =>
        catalogService.fetchShows(filters),
    }),

  genreList: () =>
    queryOptions({
      queryKey: catalogQueryKeys.genres(),
      queryFn: () =>
        catalogService.fetchGenres(),
      staleTime: 60_000,
    }),

  adminShowList: () =>
    queryOptions({
      queryKey:
        catalogQueryKeys.admin.showList(),
      queryFn: () =>
        catalogService.listAdminShows(),
      staleTime: 10_000,
    }),
};
