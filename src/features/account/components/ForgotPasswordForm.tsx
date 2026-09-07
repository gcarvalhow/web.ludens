	'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { forgotSchema } from '@account/schemas/auth.schema';
import { useAuthMutations } from '@account/hooks/mutations/useAuthMutations';
import type { ForgotPasswordRequest } from '@account/server/types/auth.types';

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: '',
    },
  });

  const { forgotPasswordMutation } = useAuthMutations();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPasswordMutation.mutateAsync(data);
    } catch {
      // O toast de erro já é tratado na mutation.
    }
  });

  return (
    <form
      className="login-form"
      onSubmit={onSubmit}
    >
      <div className="form-header">
        <span>🎭</span>
        <h2>RECUPERAR SENHA</h2>
        <p>Informe seu e-mail para receber as instruções</p>
      </div>

      <div className="input-group">
        <label htmlFor="email">E-mail</label>

        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          disabled={forgotPasswordMutation.isPending}
          {...register('email')}
        />

        {errors.email && (
          <div className="login-error">
            {errors.email.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="login-button"
        disabled={forgotPasswordMutation.isPending}
      >
        {forgotPasswordMutation.isPending ? (
          <span className="loading">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <>
            ENVIAR
            <span>→</span>
          </>
        )}
      </button>
    </form>
  );
}
