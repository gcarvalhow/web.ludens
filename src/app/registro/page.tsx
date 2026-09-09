import { AuthShell } from '@account/components/ui';
import { RegisterFormContainer } from '@account/components';

export default function RegisterPage() {
  return (
    <AuthShell title="Criar conta" description="Cadastre-se para continuar">
      <RegisterFormContainer />
    </AuthShell>
  );
}
