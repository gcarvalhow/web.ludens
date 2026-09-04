import '@account/styles/LoginPage.css';
import { ForgotPasswordForm } from '@account/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="login-page">
      <div className="login-stage">
        <div className="login-content">
          <div className="login-logo">
            <span className="logo-symbol">✦</span>
            <h1>SEU PROJETO</h1>
            <span className="logo-line" />
            <p>Recupere o acesso à sua conta</p>
          </div>

          <ForgotPasswordForm />

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
