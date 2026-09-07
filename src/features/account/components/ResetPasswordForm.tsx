'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useResetPasswordForm } from '@account/hooks/forms/useResetPasswordForm';
import { useAuthMutations } from '@account/hooks/mutations/useAuthMutations';

export function ResetPasswordForm() {
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useResetPasswordForm();

  const { resetPasswordMutation } = useAuthMutations();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      setValue('token', token);
    }
  }, [token, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPasswordMutation.mutateAsync(data);
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
        <h2>REDEFINIR SENHA</h2>
        <p>Digite sua nova senha</p>
      </div>

      {!token && (
        <div className="login-error">
          Token de recuperação não encontrado.
        </div>
      )}

      <input
        type="hidden"
        {...register('token')}
      />

      <div className="input-group">
        <label htmlFor="password">Nova senha</label>

        <input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          disabled={resetPasswordMutation.isPending || !token}
          {...register('password')}
        />

        {errors.password && (
          <div className="login-error">
            {errors.password.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="login-button"
        disabled={resetPasswordMutation.isPending || !token}
      >
        {resetPasswordMutation.isPending ? (
          <span className="loading">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <>
            REDEFINIR SENHA
            <span>→</span>
          </>
        )}
      </button>
    </form>
  );
}
