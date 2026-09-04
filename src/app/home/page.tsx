"use client";

import { useRouter } from "next/navigation";

import Curtain from "@components/curtain/Curtain";
import "../Homeview.css";

export default function HomePage() {
  const router = useRouter();

  function handleLogout() {
    router.push("/login");
  }

  return (
    <div className="home-scene">
      {/* Cortinas abertas nas laterais */}
      <Curtain
        open={true}
        animate={false}
        showStage={false}
      />

      <main className="home-page">

        {/* NAVBAR */}
        <header className="home-navbar">
          <div className="home-brand">
            <span>✦</span>
            <strong>SEU PROJETO</strong>
          </div>

          <nav>
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </nav>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Sair
          </button>
        </header>

        {/* HERO */}
        <section
          id="inicio"
          className="home-hero"
        >
          <div className="hero-light" />

          <div className="hero-content">
            <span className="hero-overline">
              BEM-VINDO
            </span>

            <h1>
              O espetáculo
              <br />
              <em>começou.</em>
            </h1>

            <p>
              Este é o seu espaço. Explore,
              descubra e aproveite a experiência.
            </p>

            <button
              type="button"
              className="hero-button"
            >
              COMEÇAR
              <span>→</span>
            </button>
          </div>
        </section>

        {/* SOBRE */}
        <section
          id="sobre"
          className="home-section"
        >
          <span className="section-label">
            O PALCO É SEU
          </span>

          <h2>
            Uma experiência diferente.
          </h2>

          <p>
            Construímos este espaço pensando em
            transformar cada interação em uma
            experiência especial.
          </p>
        </section>

        {/* FOOTER */}
        <footer
          id="contato"
          className="home-footer"
        >
          <span>✦</span>

          <p>
            © 2026 — Seu Projeto
          </p>
        </footer>

      </main>
    </div>
  );
}