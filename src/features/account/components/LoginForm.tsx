'use client';

import { useRouter } from 'next/navigation';

import { useLoginForm } from '@account/hooks/forms/useLoginForm';
import { useAuthMutations } from '@account/hooks/mutations/useAuthMutations';

type LoginFormProps = {
  onSuccess: () => void;
};

export function LoginForm({
  onSuccess,
}: LoginFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const { loginMutation } = useAuthMutations();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync(data);

      onSuccess();
    } catch {
      // O toast de erro já é tratado pela mutation.
    }
  });

  return (
    <form
      className="login-form"
      onSubmit={onSubmit}
    >
      <div className="form-header">
        <span>🎭</span>

        <h2>ENTRAR</h2>

        <p>Acesse sua conta</p>
      </div>

      <div className="input-group">
        <label htmlFor="email">
          E-mail
        </label>

        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          disabled={loginMutation.isPending}
          {...register('email')}
        />

        {errors.email && (
          <div className="login-error">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="password">
          Senha
        </label>

        <input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={loginMutation.isPending}
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
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <span className="loading">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <>
            ENTRAR
            <span>→</span>
          </>
        )}
      </button>

      <div className="login-links">
        <button
          type="button"
          disabled={loginMutation.isPending}
          onClick={() =>
            router.push('/recuperar-senha')
          }
        >
          Esqueci minha senha
        </button>
      </div>
    </form>
  );
}