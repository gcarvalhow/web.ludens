'use client';

import { useRouter } from 'next/navigation';

import { LoginForm } from './LoginForm';

import '../styles/LoginPage.css';

export default function LoginView() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/');
  };

  return (
    <main className="login-page">
      <div className="login-stage">
        <div className="login-content">

          <div className="login-logo">
            <span className="logo-symbol">✦</span>

            <h1>SEU PROJETO</h1>

            <span className="logo-line" />

            <p>
              O espetáculo está prestes a começar
            </p>
          </div>

          <LoginForm
            onSuccess={handleLoginSuccess}
          />

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
