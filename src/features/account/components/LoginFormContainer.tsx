'use client';

import { useRouter } from 'next/navigation';

import { LoginForm } from '@account/components/forms';
import { useLoginForm } from '@account/hooks/forms';
import { useAuthMutations } from '@account/hooks/mutations';

export function LoginFormContainer() {
  const router = useRouter();

  const form = useLoginForm();
  const { loginMutation } = useAuthMutations();

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync(data);

      router.push('/');
    } catch {
      // O toast de erro já é tratado na mutation.
    }
  });

  return <LoginForm form={form} onSubmit={onSubmit} isPending={loginMutation.isPending} />;
}
