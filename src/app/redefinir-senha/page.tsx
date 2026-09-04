import { ResetPasswordForm } from '@account/components/ResetPasswordForm';
import '@account/styles/LoginPage.css';

export default function ResetPasswordPage() {
  return (
    <main className="login-page">
      <div className="login-stage">
        <div className="login-content">
          <div className="login-logo">
            <span className="logo-symbol">✦</span>
            <h1>SEU PROJETO</h1>
            <span className="logo-line" />
            <p>Crie uma nova senha para sua conta</p>
          </div>

          <ResetPasswordForm />

          <div className="login-footer">
            <span />
            <p>Bem-vindo ao espetáculo</p>
            <span />
          </div>
        </div>
      </div>
    </main>
  );
}
