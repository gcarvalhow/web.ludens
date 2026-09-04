'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Curtain from '@components/curtain/Curtain';
import { LoginForm } from './LoginForm';

import '../styles/LoginPage.css';

export default function LoginView() {
  const router = useRouter();

  const [curtainOpen, setCurtainOpen] = useState(false);
  const [hideLogin, setHideLogin] = useState(false);

  const handleLoginSuccess = () => {
    setHideLogin(true);
    setCurtainOpen(true);

    setTimeout(() => {
      router.push('/home');
    }, 1800);
  };

  return (
    <>
      <Curtain
        open={curtainOpen}
        animate={true}
        showStage={true}
      />

      <main
        className={`login-page ${
          hideLogin ? 'login-hidden' : ''
        }`}
      >
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
    </>
  );
}