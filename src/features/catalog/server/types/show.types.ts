import type { z } from 'zod';

import type {
  genreListSchema,
  pagedShowsSchema,
  showCardSchema,
} from '@catalog/schemas';

export type ShowCardModel = z.infer<typeof showCardSchema>;
export type PagedShows = z.infer<typeof pagedShowsSchema>;
export type GenreList = z.infer<typeof genreListSchema>;
