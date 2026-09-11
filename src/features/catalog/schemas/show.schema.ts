import { z } from 'zod';

export const showCardSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  synopsis_short: z.string(),
  image_url: z.string(),
  genre: z.string(),
  upcoming_dates: z.array(z.coerce.date()),
  price_min: z.number(),
  price_max: z.number(),
});

export const pagedShowsSchema = z.object({
  items: z.array(showCardSchema),
  page: z.number().int(),
  size: z.number().int(),
  total: z.number().int(),
});

export const genreListSchema = z.array(
  z.string(),
);
