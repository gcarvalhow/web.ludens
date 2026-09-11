import type { ShowCardModel } from '@catalog/server/types';

interface ShowCardProps {
  show: ShowCardModel;
}

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const SHORT_DATE = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
});

export function ShowCard({ show }: ShowCardProps) {
  const priceLabel =
    show.price_min === show.price_max
      ? BRL.format(show.price_min)
      : `${BRL.format(show.price_min)} – ${BRL.format(show.price_max)}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
      <img
        src={show.image_url}
        alt={show.title}
        className="aspect-[3/4] w-full object-cover"
      />

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="text-base font-semibold">
          {show.title}
        </h3>

        <p className="line-clamp-2 text-sm text-gray-600">
          {show.synopsis_short}
        </p>

        <p className="text-xs text-gray-500">
          {show.upcoming_dates
            .slice(0, 3)
            .map((date) => SHORT_DATE.format(date))
            .join(' · ')}
        </p>

        <p className="mt-auto text-sm font-medium">
          {priceLabel}
        </p>
      </div>
    </article>
  );
}