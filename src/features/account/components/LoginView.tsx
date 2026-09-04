"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Curtain from "@components/curtain/Curtain";
import "../styles/LoginPage.css";

export default function LoginView() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [curtainOpen, setCurtainOpen] = useState(false);
  const [hideLogin, setHideLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Preencha seu e-mail e sua senha.");
      return;
    }

    setLoading(true);

    // Some com o login imediatamente
    setHideLogin(true);

    // Abre as cortinas
    setCurtainOpen(true);

    // Aguarda a animação e entra na Home
    setTimeout(() => {
      router.push("/home");
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
          hideLogin ? "login-hidden" : ""
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

            <form
              className="login-form"
              onSubmit={handleSubmit}
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
                  value={email}
                  disabled={loading}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">
                  Senha
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  disabled={loading}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? (
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
                  disabled={loading}
                  onClick={() =>
                    alert(
                      "Página de recuperação em breve."
                    )
                  }
                >
                  Esqueci minha senha
                </button>
              </div>
            </form>

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