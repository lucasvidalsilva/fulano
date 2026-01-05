import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "fulano.online",
  description: "Alguém é o impostor. Descubra quem.",
  icons: {
    icon: "/logo-fulano.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}