'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { showFormSchema } from '@catalog/schemas';

import type {
  AdminShow,
  ShowFormValues,
} from '@catalog/server/types';

const EMPTY: ShowFormValues = {
  title: '',
  synopsis: '',
  genre: '',
};

export function useShowForm(
  editing: AdminShow | null,
) {
  const form = useForm<ShowFormValues>({
    resolver: zodResolver(showFormSchema),
    mode: 'onSubmit',
    defaultValues: EMPTY,
  });

  useEffect(() => {
    if (editing) {
      form.reset({
        title: editing.title,
        synopsis: editing.synopsis,
        genre: editing.genre,
      });
    } else {
      form.reset(EMPTY);
    }
  }, [editing, form]);

  return form;
}
