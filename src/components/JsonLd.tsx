export function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AideIci",
    url: "https://aideici.fr",
    description:
      "Radar local des besoins utiles — trouvez où être utile près de chez vous à Bordeaux et en Gironde.",
    areaServed: {
      "@type": "City",
      name: "Bordeaux",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Gironde",
      },
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment trouver une mission de bénévolat près de chez moi à Bordeaux ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AideIci agrège chaque jour les besoins bénévoles publiés par des sources fiables (collectivités, associations, plateformes publiques) sur Bordeaux Métropole et la Gironde. Consultez la section Besoins du jour, cliquez sur un besoin et vous êtes redirigé vers la source officielle pour vous inscrire.",
        },
      },
      {
        "@type": "Question",
        name: "Comment être alerté des nouveaux besoins bénévoles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Inscrivez-vous gratuitement aux alertes AideIci. Indiquez votre email, votre zone géographique et vos catégories d'intérêt. Vous recevrez un email maximum par jour avec les nouveaux besoins vérifiés dans votre zone.",
        },
      },
      {
        "@type": "Question",
        name: "Les besoins affichés sont-ils vérifiés ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Chaque besoin affiché sur AideIci est vérifié manuellement avant publication. La date de vérification et la source d'origine sont indiquées sur chaque fiche. AideIci ne publie aucun besoin sans l'avoir vérifié au préalable.",
        },
      },
    ],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AideIci",
    url: "https://aideici.fr",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://aideici.fr/#besoins",
      "query-input": "required name=search_term",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
