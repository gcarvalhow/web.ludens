import type {
  AdminSession,
  AdminShow,
} from '@catalog/server/types';

export const SHOW_STATUS_LABELS: Record<
  AdminShow['status'],
  string
> = {
  draft: 'Rascunho',
  published: 'Publicado',
};

export const SESSION_STATUS_LABELS: Record<
  AdminSession['status'],
  string
> = {
  on_sale: 'À venda',
  closed: 'Encerrada',
  cancelled: 'Cancelada',
};