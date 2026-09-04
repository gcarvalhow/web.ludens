'use client';

import { useRegisterForm } from '@account/hooks/forms/useRegisterForm';
import { useAuthMutations } from '@account/hooks/mutations/useAuthMutations';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useRegisterForm();

  const { registerMutation } = useAuthMutations();

  const cpfValue = watch('cpf') ?? '';

  function formatCpf(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);

    if (digits.length <= 3) {
      return digits;
    }

    if (digits.length <= 6) {
      return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    }

    if (digits.length <= 9) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    }

    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch {
      // O toast de erro já é tratado na mutation.
    }
  });

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="form-header">
        <span>🎭</span>
        <h2>CRIAR CONTA</h2>
        <p>Cadastre-se para continuar</p>
      </div>

      <div className="input-group">
        <label htmlFor="name">Nome</label>

        <input
          id="name"
          type="text"
          placeholder="Seu nome"
          autoComplete="name"
          disabled={registerMutation.isPending}
          {...register('name')}
        />

        {errors.name && (
          <div className="login-error">
            {errors.name.message}
          </div>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="cpf">CPF</label>

        <input
          id="cpf"
          type="text"
          inputMode="numeric"
          placeholder="000.000.000-00"
          autoComplete="off"
          disabled={registerMutation.isPending}
          value={formatCpf(cpfValue)}
          onChange={(event) => {
            const digits = event.target.value
              .replace(/\D/g, '')
              .slice(0, 11);

            setValue('cpf', digits, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />

        {errors.cpf && (
          <div className="login-error">
            {errors.cpf.message}
          </div>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="email">E-mail</label>

        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          disabled={registerMutation.isPending}
          {...register('email')}
        />

        {errors.email && (
          <div className="login-error">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="password">Senha</label>

        <input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          disabled={registerMutation.isPending}
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
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <span className="loading">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <>
            CRIAR CONTA
            <span>→</span>
          </>
        )}
      </button>
    </form>
  );
}