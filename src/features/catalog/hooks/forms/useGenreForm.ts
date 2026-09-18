'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { genreFormSchema } from '@catalog/schemas';

import type {
  Genre,
  GenreFormValues,
} from '@catalog/server/types';

const EMPTY: GenreFormValues = {
  name: '',
};

export function useGenreForm(editing: Genre | null) {
  const form = useForm<GenreFormValues>({
    resolver: zodResolver(genreFormSchema),
    mode: 'onSubmit',
    defaultValues: EMPTY,
  });

  useEffect(() => {
    if (editing) {
      form.reset({ name: editing.name });
    } else {
      form.reset(EMPTY);
    }
  }, [editing, form]);

  return form;
}
