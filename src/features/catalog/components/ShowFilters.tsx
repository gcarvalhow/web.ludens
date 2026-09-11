'use client';

import { useGenreList } from '@catalog/hooks/queries';
import { useShowFilters } from '@catalog/hooks';

export function ShowFilters() {
  const { filters, setFilters } = useShowFilters();
  const genresQuery = useGenreList();

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="filter-from-date"
          className="text-sm font-medium"
        >
          A partir de
        </label>

        <input
          id="filter-from-date"
          type="date"
          value={filters.fromDate ?? ''}
          onChange={(event) =>
            setFilters({
              fromDate:
                event.target.value || undefined,
            })
          }
          className="min-h-11 rounded-md border border-gray-300 px-3"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="filter-genre"
          className="text-sm font-medium"
        >
          Gênero
        </label>

        <select
          id="filter-genre"
          value={filters.genre ?? ''}
          onChange={(event) =>
            setFilters({
              genre:
                event.target.value || undefined,
            })
          }
          className="min-h-11 rounded-md border border-gray-300 px-3"
        >
          <option value="">Todos</option>

          {(genresQuery.data ?? []).map(
            (genre) => (
              <option
                key={genre}
                value={genre}
              >
                {genre}
              </option>
            ),
          )}
        </select>
      </div>
    </div>
  );
}
