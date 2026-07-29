import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";

const TITLE = "AideIci — Radar local des besoins utiles près de chez toi | Bordeaux Métropole";
const DESCRIPTION =
  "Chaque jour, retrouve les besoins bénévoles et solidaires près de chez toi à Bordeaux et en Gironde. Vérifiés, sourcés, actionnables en 2 minutes. Inscris-toi aux alertes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "bénévolat Bordeaux",
    "aide locale Gironde",
    "bénévole près de chez moi",
    "mission bénévolat Bordeaux Métropole",
    "solidarité locale",
    "besoin bénévole urgence",
    "comment aider Bordeaux",
    "devenir bénévole Gironde",
    "alerte bénévolat locale",
    "radar besoins solidaires",
  ],
  authors: [{ name: "AideIci" }],
  creator: "AideIci",
  publisher: "AideIci",
  metadataBase: new URL("https://aideici.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AideIci — Aide utile près de chez toi",
    description: DESCRIPTION,
    url: "https://aideici.fr",
    siteName: "AideIci",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AideIci — Radar local des besoins utiles près de chez toi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AideIci — Aide utile près de chez toi",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  other: {
    "geo.region": "FR-NAQ",
    "geo.placename": "Bordeaux",
    "geo.position": "44.8378;-0.5795",
    "ICBM": "44.8378, -0.5795",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin="anonymous"
        />
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
