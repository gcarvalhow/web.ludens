'use client';

import type { FormEventHandler } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type { SessionFormValues } from '@catalog/server/types';

interface SessionFormProps {
  form: UseFormReturn<SessionFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  isPending: boolean;
  mode: 'create' | 'edit';
  ticketsSold: number;
}

export function SessionForm({
  form,
  onSubmit,
  onCancel,
  isPending,
  mode,
  ticketsSold,
}: SessionFormProps) {
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-gray-200 p-4"
    >
      <h3 className="text-base font-semibold">
        {mode === 'create'
          ? 'Nova sessão'
          : 'Editar sessão'}
      </h3>

      {mode === 'edit' && ticketsSold > 0 ? (
        <p className="rounded-md bg-amber-50 p-2 text-sm text-amber-800">
          Esta sessão já vendeu {ticketsSold} ingresso(s).
          Alterar data/horário notifica os compradores. A
          capacidade não pode ficar abaixo do total já
          comprometido.
        </p>
      ) : null}

      <div className="flex flex-col gap-1">
        <label
          htmlFor="session-starts"
          className="text-sm font-medium"
        >
          Data e hora
        </label>

        <input
          id="session-starts"
          type="datetime-local"
          {...register('starts_at')}
          className="min-h-11 rounded-md border border-gray-300 px-3"
        />

        {errors.starts_at ? (
          <p className="text-sm text-red-600">
            {errors.starts_at.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="session-venue"
          className="text-sm font-medium"
        >
          Local
        </label>

        <input
          id="session-venue"
          type="text"
          {...register('venue')}
          className="min-h-11 rounded-md border border-gray-300 px-3"
        />

        {errors.venue ? (
          <p className="text-sm text-red-600">
            {errors.venue.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="session-capacity"
          className="text-sm font-medium"
        >
          Capacidade
        </label>

        <input
          id="session-capacity"
          type="number"
          min={1}
          {...register('capacity', {
            valueAsNumber: true,
          })}
          className="min-h-11 rounded-md border border-gray-300 px-3"
        />

        {errors.capacity ? (
          <p className="text-sm text-red-600">
            {errors.capacity.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="session-price"
          className="text-sm font-medium"
        >
          Preço da inteira (R$)
        </label>

        <input
          id="session-price"
          type="number"
          min={0}
          step="0.01"
          {...register('full_price', {
            valueAsNumber: true,
          })}
          className="min-h-11 rounded-md border border-gray-300 px-3"
        />

        {errors.full_price ? (
          <p className="text-sm text-red-600">
            {errors.full_price.message}
          </p>
        ) : null}

        <p className="text-xs text-gray-500">
          A meia-entrada é sempre 50% da inteira
          (calculada pelo sistema).
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="min-h-11 rounded-md bg-gray-900 px-4 text-sm font-medium text-white disabled:opacity-60"
        >
          {isPending ? 'Salvando...' : 'Salvar'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="min-h-11 rounded-md border border-gray-300 px-4 text-sm font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
