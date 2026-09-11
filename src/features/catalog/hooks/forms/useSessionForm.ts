'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toDateTimeLocalValue } from '@catalog/lib';
import { sessionFormSchema } from '@catalog/schemas';

import type {
  AdminSession,
  SessionFormValues,
} from '@catalog/server/types';

const EMPTY: SessionFormValues = {
  starts_at: '',
  venue: '',
  capacity: 0,
  full_price: 0,
};

export function useSessionForm(
  editing: AdminSession | null,
) {
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionFormSchema),
    mode: 'onSubmit',
    defaultValues: EMPTY,
  });

  useEffect(() => {
    if (editing) {
      form.reset({
        starts_at:
          toDateTimeLocalValue(
            editing.starts_at,
          ),
        venue: editing.venue,
        capacity: editing.capacity,
        full_price: editing.full_price,
      });
    } else {
      form.reset(EMPTY);
    }
  }, [editing, form]);

  return form;
}
