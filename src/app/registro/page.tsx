import { RegisterForm } from '@account/components/RegisterForm';
import '@account/styles/LoginPage.css';

export default function RegisterPage() {
  return (
    <main className="login-page">
      <div className="login-stage">
        <div className="login-content">
          <div className="login-logo">
            <span className="logo-symbol">✦</span>
            <h1>SEU PROJETO</h1>
            <span className="logo-line" />
            <p>Crie sua conta e participe do espetáculo</p>
          </div>

          <RegisterForm />

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
