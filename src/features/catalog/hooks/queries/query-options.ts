import { queryOptions } from '@tanstack/react-query';

import { catalogService } from '@catalog/services';

export const catalogQueryKeys = {
  all: ['catalog'] as const,

  admin: {
    shows: () =>
      [...catalogQueryKeys.all, 'admin', 'shows'] as const,

    showList: () =>
      [
        ...catalogQueryKeys.admin.shows(),
        'list',
      ] as const,

    show: (id: string) =>
      [
        ...catalogQueryKeys.admin.shows(),
        'detail',
        id,
      ] as const,
  },
};

export const catalogQueryOptions = {
  adminShowList: () =>
    queryOptions({
      queryKey: catalogQueryKeys.admin.showList(),
      queryFn: () => catalogService.listAdminShows(),
      staleTime: 10_000,
    }),

  adminShow: (id: string) =>
    queryOptions({
      queryKey: catalogQueryKeys.admin.show(id),
      queryFn: () => catalogService.getAdminShow(id),
      staleTime: 10_000,
    }),
};