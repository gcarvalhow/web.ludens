import { queryOptions } from '@tanstack/react-query';

import { authService } from '@account/services/auth.service';

export const accountQueryKeys = {
  all: ['account'] as const,
  me: () => [...accountQueryKeys.all, 'me'] as const,
};

export const accountQueryOptions = {
  me: () =>
    queryOptions({
      queryKey: accountQueryKeys.me(),
      queryFn: () => authService.fetchMe(),
    }),
};