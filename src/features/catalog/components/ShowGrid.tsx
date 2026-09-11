'use client';

import {
  Pagination,
  ShowCard,
} from '@catalog/components/ui';
import { useShowFilters } from '@catalog/hooks';
import { useShowList } from '@catalog/hooks/queries';

import { ShowFilters } from './ShowFilters';

export function ShowGrid() {
  const { filters, setFilters } = useShowFilters();
  const query = useShowList(filters);

  return (
    <section className="mx-auto max-w-5xl space-y-6 p-6">
      <ShowFilters />

      {query.isLoading ? (
        <p className="text-sm text-gray-500">
          Carregando espetáculos...
        </p>
      ) : query.isError ? (
        <div className="text-sm">
          <p className="text-red-600">
            Não foi possível carregar os espetáculos.
          </p>

          <button
            type="button"
            onClick={() => void query.refetch()}
            className="mt-2 min-h-11 rounded-md border border-gray-300 px-4"
          >
            Tentar de novo
          </button>
        </div>
      ) : query.data &&
        query.data.items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
          Nenhum espetáculo em cartaz para esse filtro.
        </p>
      ) : query.data ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {query.data.items.map((show) => (
              <ShowCard
                key={show.id}
                show={show}
              />
            ))}
          </div>

          <Pagination
            page={query.data.page}
            size={query.data.size}
            total={query.data.total}
            onPageChange={(page) =>
              setFilters({ page })
            }
          />
        </>
      ) : null}
    </section>
  );
}
