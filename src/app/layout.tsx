import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ludens",
  description: "Ingressos do teatro comunitário",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}