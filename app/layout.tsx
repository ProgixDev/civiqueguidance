import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteBackground from "./components/SiteBackground";
import CookieBanner from "./components/CookieBanner";

const SITE_URL = "https://demarchesciviques.fr";
const SITE_TITLE = "DÉMARCHES CIVIQUES | Accompagnement Administratif d'Excellence";
const SITE_DESCRIPTION =
  "DÉMARCHES CIVIQUES accompagne vos démarches administratives en France : demande d'asile, titre de séjour, naturalisation, regroupement familial, régularisation, logement, CV. Premier échange gratuit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "démarches civiques",
    "démarches administratives France",
    "titre de séjour",
    "naturalisation française",
    "demande d'asile",
    "regroupement familial",
    "régularisation administrative",
    "aide au logement",
    "OFPRA",
    "préfecture",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "DÉMARCHES CIVIQUES",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/hero.png", width: 1200, height: 630, alt: "DÉMARCHES CIVIQUES" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/hero.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DÉMARCHES CIVIQUES",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/hero.png`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "138 Avenue Victor Hugo",
    postalCode: "75016",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  telephone: "+33751252309",
  email: "support@demarchesciviques.fr",
  areaServed: "FR",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
