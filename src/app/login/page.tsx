import { AuthShell } from '@account/components/ui';
import { LoginFormContainer } from '@account/components';

export default function LoginPage() {
  return (
    <AuthShell title="Entrar" description="Acesse sua conta">
      <LoginFormContainer />
    </AuthShell>
  );
}
