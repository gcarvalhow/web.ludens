interface PaginationProps {
  page: number;
  size: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  size,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(
    1,
    Math.ceil(total / size),
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="min-h-11 rounded-md border border-gray-300 px-3 text-sm disabled:opacity-40"
      >
        Anterior
      </button>

      <span className="text-sm text-gray-600">
        Página {page} de {totalPages}
      </span>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="min-h-11 rounded-md border border-gray-300 px-3 text-sm disabled:opacity-40"
      >
        Próxima
      </button>
    </div>
  );
}
