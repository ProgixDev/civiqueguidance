import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteBackground from "./components/SiteBackground";
import CookieBanner from "./components/CookieBanner";

export const metadata: Metadata = {
  title: "DÉMARCHES CIVIQUES | Accompagnement Administratif d'Excellence",
  description:
    "Expertise juridique et administrative dédiée à la réussite de votre parcours républicain en France.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000091",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="antialiased">
      <head>
        {/* Préchargement explicite des poids Marianne critiques (Regular + Bold) */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.13.0/dist/fonts/Marianne-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.13.0/dist/fonts/Marianne-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.13.0/dist/fonts/Marianne-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-screen selection:bg-french-blue selection:text-white">
        <SiteBackground />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
