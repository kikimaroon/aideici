import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AideIci — Le radar local des besoins utiles près de chez toi",
  description:
    "AideIci repère chaque jour les besoins utiles publiés par des sources locales fiables, les résume et te redirige vers la bonne structure.",
  openGraph: {
    title: "AideIci — Aide utile près de chez toi",
    description:
      "Les besoins locaux du jour, vérifiés et actionnables en 2 minutes. Reçois les alertes près de chez toi.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
