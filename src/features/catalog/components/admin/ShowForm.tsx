'use client';

import type { FormEventHandler } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type { ShowFormValues } from '@catalog/server/types';

interface ShowFormProps {
  form: UseFormReturn<ShowFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  isPending: boolean;
  mode: 'create' | 'edit';
}

export function ShowForm({
  form,
  onSubmit,
  onCancel,
  isPending,
  mode,
}: ShowFormProps) {
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-gray-200 p-4"
    >
      <h3 className="text-base font-semibold">
        {mode === 'create'
          ? 'Novo espetáculo'
          : 'Editar espetáculo'}
      </h3>

      {mode === 'create' ? (
        <p className="text-xs text-gray-500">
          A imagem de capa é atribuída automaticamente.
        </p>
      ) : null}

      <div className="flex flex-col gap-1">
        <label
          htmlFor="show-title"
          className="text-sm font-medium"
        >
          Título
        </label>

        <input
          id="show-title"
          type="text"
          {...register('title')}
          className="min-h-11 rounded-md border border-gray-300 px-3"
        />

        {errors.title ? (
          <p className="text-sm text-red-600">
            {errors.title.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="show-synopsis"
          className="text-sm font-medium"
        >
          Sinopse
        </label>

        <textarea
          id="show-synopsis"
          rows={4}
          {...register('synopsis')}
          className="rounded-md border border-gray-300 px-3 py-2"
        />

        {errors.synopsis ? (
          <p className="text-sm text-red-600">
            {errors.synopsis.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="show-genre"
          className="text-sm font-medium"
        >
          Categoria / gênero
        </label>

        <input
          id="show-genre"
          type="text"
          {...register('genre')}
          className="min-h-11 rounded-md border border-gray-300 px-3"
        />

        {errors.genre ? (
          <p className="text-sm text-red-600">
            {errors.genre.message}
          </p>
        ) : null}
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
