import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment aider lors des incendies — Guide complet | AideIci",
  description:
    "Toutes les façons d'aider pendant les incendies en Gironde : agriculteur, kiné, food-truck, pompier volontaire, don. Légal, sécurisé, efficace.",
  alternates: { canonical: "/comment-aider" },
};

type HelpCategory = {
  id: string;
  icon: string;
  title: string;
  who: string;
  how: string;
  legal: string;
  link?: { url: string; label: string };
};

const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: "devenir-pompier-volontaire",
    icon: "🚒",
    title: "Devenir sapeur-pompier volontaire",
    who: "Toute personne de 16 à 67 ans, apte physiquement, casier judiciaire vierge.",
    how: "Adressez un courrier au SDIS de votre département. Engagement de 5 ans, formation initiale de 30 jours répartis sur 3 ans. Vous exercerez les mêmes missions que les pompiers professionnels : lutte contre les incendies, secours aux personnes, protection des biens.",
    legal: "Loi n° 2004-811 du 13 août 2004. Indemnités horaires de 8,61 € à 12,96 € selon le grade. Protection sociale en cas d'accident de service.",
    link: {
      url: "https://www.pompiers.fr/devenir-sapeur-pompier/devenir-sapeur-pompier-volontaire",
      label: "Déposer sa candidature sur pompiers.fr",
    },
  },
  {
    id: "agriculteur-citerne",
    icon: "🚜",
    title: "Agriculteurs : apporter de l'eau avec vos citernes",
    who: "Agriculteurs équipés de tonnes à eau (12 000 à 25 000 litres) et de tracteurs.",
    how: "Contactez la Chambre d'agriculture de votre département ou le SDIS. Votre citerne contient 3 à 4 fois la capacité d'un camion de pompiers. Les tracteurs peuvent pénétrer en forêt là où les camions ne passent pas. Vous pouvez aussi labourer des bandes pare-feu pour priver le feu de combustible. 500 agriculteurs mobilisés en Gironde — gain de 3h/jour pour les pompiers.",
    legal: "Passez impérativement par la Chambre d'agriculture ou le SDIS. Ne vous rendez pas spontanément sur le front des flammes. La préfète de Gironde rappelle : « la générosité, c'est très bien, à condition que ce soit organisé ».",
    link: {
      url: "https://gironde.chambre-agriculture.fr/",
      label: "Contacter la Chambre d'agriculture de Gironde",
    },
  },
  {
    id: "soignant-kine-massage",
    icon: "💆",
    title: "Kinés, ostéopathes, masseurs : soulager les secours",
    who: "Kinésithérapeutes, ostéopathes, masseurs-kinésithérapeutes diplômés, médecins du sport.",
    how: "Proposez des séances de 20 minutes aux pompiers et personnels engagés. Priorité : épaules, dos, cervicales — les zones les plus sollicitées par le port de charges lourdes et le manque de sommeil. Au Cosec de Lacanau, des kinés bénévoles se sont relayés spontanément. Un médecin du sport coordonnait le dispositif.",
    legal: "Vous devez être diplômé et assuré. Contactez le SDIS ou la Protection Civile pour être intégré au dispositif officiel. Ne vous installez pas sur une base de vie sans autorisation.",
    link: {
      url: "https://www.ordremk.fr/",
      label: "Ordre des Masseurs-Kinésithérapeutes",
    },
  },
  {
    id: "food-truck-repas",
    icon: "🍲",
    title: "Food-trucks, traiteurs, restaurateurs : nourrir les pompiers",
    who: "Traiteurs, restaurateurs, propriétaires de food-trucks, cuisiniers.",
    how: "Cédric et Jennifer, deux traiteurs réunionnais, ont distribué près de 500 caris par jour aux pompiers sur le terrain. Si vous voulez faire de même : contactez la Protection Civile ou le SDIS pour connaître les besoins et les points de distribution autorisés. Une cagnotte GoFundMe (5 € = 1 repas) peut financer les denrées.",
    legal: "Respectez les normes d'hygiène alimentaire (HACCP). Passez par une association agréée (Protection Civile, Croix-Rouge) pour être intégré au dispositif officiel. Ne distribuez pas de nourriture sans coordination — les pompiers ont des besoins nutritionnels spécifiques.",
    link: {
      url: "https://www.protection-civile.org/faire-du-benevolat/",
      label: "Contacter la Protection Civile",
    },
  },
  {
    id: "reserve-communale",
    icon: "🏛️",
    title: "Rejoindre la réserve communale de sécurité civile",
    who: "Tout citoyen majeur souhaitant s'engager ponctuellement pour sa commune.",
    how: "Contrat de 1 à 5 ans renouvelable, 15 jours maximum par an. Missions : soutien aux populations, appui logistique, aide à la gestion des centres d'accueil. Bordeaux Métropole a mobilisé sa réserve citoyenne de 200 personnes formées depuis 2 ans.",
    legal: "Articles L. 724-1 à L. 724-14 du Code de la sécurité intérieure. Protection sociale et réparation des dommages prévues par la loi. Contactez votre mairie pour connaître la réserve existante.",
    link: {
      url: "https://www.bordeaux-metropole.fr/a-votre-service/participer-a-vie-metropole/reserve-citoyenne-metropolitaine",
      label: "Réserve citoyenne de Bordeaux Métropole",
    },
  },
  {
    id: "hebergement-solidaire",
    icon: "🏠",
    title: "Proposer un hébergement solidaire",
    who: "Tout particulier disposant d'une chambre, d'un logement vacant ou d'une résidence secondaire.",
    how: "Plus de 3 000 logements ont été proposés par des particuliers lors des incendies en Gironde. Appelez le Numéro Vert Solidarité 0 800 006 090 ou utilisez la plateforme jeprotegemonlogement.gouv.fr. Airbnb.org propose aussi des hébergements d'urgence gratuits via son programme.",
    legal: "Aucune obligation légale particulière pour un hébergement solidaire gratuit. Passez par les canaux officiels pour être mis en relation avec les personnes évacuées.",
    link: {
      url: "https://www.bordeaux-metropole.fr/actualites/incendies-en-gironde-accueil-personnes-evacuees",
      label: "Proposer un hébergement via Bordeaux Métropole",
    },
  },
  {
    id: "don-argent",
    icon: "💰",
    title: "Faire un don financier",
    who: "Toute personne souhaitant contribuer financièrement.",
    how: "Les dons financiers sont souvent plus utiles que les dons matériels : ils permettent d'acheter exactement ce qui manque, là où il faut, quand il faut. Déduction fiscale de 66 % à 75 % selon l'organisme. Privilégiez les organismes reconnus : Croix-Rouge, Secours Populaire, Protection Civile, Fondation de France, Œuvre des Pupilles.",
    legal: "Vérifiez que l'organisme est bien une association reconnue d'utilité publique ou d'intérêt général. Méfiez-vous des cagnottes non officielles sur les réseaux sociaux.",
    link: {
      url: "https://macagnotte.croix-rouge.fr/donner-dt33",
      label: "Don à la Croix-Rouge — Délégation Gironde",
    },
  },
  {
    id: "collecte-locale",
    icon: "📦",
    title: "Organiser une collecte locale",
    who: "Mairies, associations, collectifs de quartier, entreprises.",
    how: "De nombreuses communes (La Rochelle, Caen, Villedieu-sur-Indre, Saintes, Bayonne) ont organisé des collectes de produits de première nécessité : eau, denrées non périssables, produits d'hygiène, couches, nourriture pour animaux. Contactez votre mairie pour savoir si une collecte existe déjà. Sinon, proposez-lui d'en organiser une.",
    legal: "Coordonnez-vous avec votre mairie et les associations agréées. Ne lancez pas de collecte sauvage. Les dons matériels sont désormais suffisants pour la phase d'urgence — privilégiez les dons financiers pour la reconstruction.",
    link: {
      url: "https://www.lesparre-medoc.fr/2026/07/incendies-juillet-2026-numeros-durgence-fiables/",
      label: "Numéros d'urgence et contacts officiels",
    },
  },
  {
    id: "benevole-association",
    icon: "🤝",
    title: "Rejoindre une association agréée de sécurité civile",
    who: "Toute personne majeure souhaitant s'engager durablement.",
    how: "La Protection Civile (300 bénévoles mobilisés), la Croix-Rouge (300 volontaires de 60 départements), le Secours Populaire recrutent en continu. Missions : évacuation, centres d'hébergement, soutien psychologique, logistique, distribution. Formation assurée. Inscription en ligne sur leurs sites.",
    legal: "Seules les associations agréées de sécurité civile (AASC) sont habilitées à encadrer les bénévoles lors des opérations de secours (article L. 725-3 du Code de la sécurité intérieure). Vous serez protégé en tant que collaborateur occasionnel du service public.",
    link: {
      url: "https://www.protection-civile.org/faire-du-benevolat/",
      label: "Rejoindre la Protection Civile",
    },
  },
  {
    id: "benevole-spontane",
    icon: "⚡",
    title: "Bénévolat spontané : ce qu'il faut savoir",
    who: "Toute personne souhaitant aider sans être affiliée à une structure.",
    how: "Ne vous rendez JAMAIS spontanément sur le front des flammes ou dans un centre d'accueil sans y avoir été invité. Appelez d'abord le Numéro Vert Solidarité 0 800 006 090. Vous serez orienté vers une association qui encadrera votre action. Le bénévolat spontané est précieux, mais il doit être canalisé pour ne pas gêner les secours.",
    legal: "En cas d'urgence, la jurisprudence du collaborateur occasionnel du service public vous protège (arrêt Pinguet, 1953). Mais cette protection ne s'applique que si votre action est coordonnée. Une action isolée et non sollicitée peut engager votre responsabilité.",
    link: {
      url: "https://www.lesparre-medoc.fr/2026/07/incendies-juillet-2026-numeros-durgence-fiables/",
      label: "Numéro Vert Solidarité : 0 800 006 090 (appel gratuit)",
    },
  },
];

const BAD_EXAMPLES = [
  "Se rendre spontanément sur le front des flammes sans y avoir été invité.",
  "Publier des offres d'aide sur les réseaux sociaux sans passer par un canal officiel.",
  "Lancer une cagnotte personnelle sans l'adosser à une association reconnue.",
  "Apporter des dons matériels sans vérifier ce qui est réellement nécessaire.",
  "Contacter directement les pompiers ou les secours sur le terrain — ils sont en mission.",
];

const GOOD_EXAMPLES = [
  "Appeler le Numéro Vert Solidarité (0 800 006 090) avant toute action.",
  "Rejoindre une association agréée (Protection Civile, Croix-Rouge, Secours Populaire).",
  "Proposer ses compétences spécifiques (kiné, vétérinaire, cuisinier) via les canaux officiels.",
  "Faire un don financier à un organisme reconnu (déduction fiscale 66-75 %).",
  "Partager les informations officielles (préfecture, mairie) et non les rumeurs.",
];

export default function CommentAiderPage() {
  return (
    <div id="top" className="min-h-screen bg-background">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-[6px]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-3">
          <a
            href="/"
            className="inline-flex items-center font-bold tracking-[-0.02em] text-foreground text-[17px]"
          >
            Aide<span className="text-primary">Ici</span>
            <span className="ml-[5px] mt-[-8px] h-[5px] w-[5px] rounded-[1px] bg-primary" />
          </a>
          <a
            href="/"
            className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Retour au radar
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] px-5 py-12 sm:py-16">
        {/* Hero */}
        <section className="max-w-[62ch] mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[7px] w-[7px] rounded-[1px] bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Guide complet
            </span>
          </div>
          <h1 className="text-[36px] font-extrabold leading-[1.06] tracking-[-0.032em] text-foreground sm:text-[48px]">
            Comment aider, concrètement et légalement
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Vous voulez aider mais ne savez pas comment ? Agriculteur, kiné, cuisinier, retraité,
            étudiant — ce guide recense toutes les façons d&apos;être utile, dans le respect des
            règles et de la sécurité de tous.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
            Mis à jour le 29 juillet 2026 · Basé sur les retours d&apos;expérience des incendies en
            Gironde et dans les Landes.
          </p>
        </section>

        {/* ⚠️ Golden rules */}
        <section className="mb-14 border-2 border-red-200 bg-red-50/60 rounded-sm p-6 sm:p-8">
          <h2 className="text-[18px] font-bold text-red-700 mb-3">⚠️ Les 3 règles d&apos;or avant d&apos;agir</h2>
          <ol className="space-y-3 text-[14.5px] leading-relaxed text-foreground">
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold shrink-0 w-6">1.</span>
              <span>
                <strong>Ne jamais se rendre sur place sans avoir été contacté.</strong> Les zones
                sinistrées sont dangereuses. Les centres d&apos;accueil ont des capacités limitées.
                Votre présence non sollicitée peut gêner les secours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold shrink-0 w-6">2.</span>
              <span>
                <strong>Toujours passer par un canal officiel.</strong> Numéro Vert Solidarité,
                mairie, association agréée de sécurité civile. Votre générosité est précieuse — elle
                doit être canalisée pour être utile.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold shrink-0 w-6">3.</span>
              <span>
                <strong>Offrir une compétence spécifique, pas juste de la présence.</strong> Les
                besoins les plus critiques sont ceux qui manquent sur place : eau, soins, repas,
                logistique, animaux. Identifiez ce que vous savez faire que les autres ne font pas.
              </span>
            </li>
          </ol>
        </section>

        {/* Timeline — types d'aide */}
        <section className="mb-14">
          <h2 className="text-[24px] font-bold tracking-[-0.022em] text-foreground mb-8">
            Toutes les façons d&apos;aider
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {HELP_CATEGORIES.map((c) => (
              <div
                key={c.id}
                id={c.id}
                className="border border-border bg-card rounded-sm p-6 scroll-mt-20"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-[28px]">{c.icon}</span>
                  <div>
                    <h3 className="text-[16px] font-bold text-foreground">{c.title}</h3>
                    <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Pour qui : {c.who}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Comment :</strong> {c.how}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground border-l-2 border-primary/30 pl-3">
                  <strong className="text-foreground">Cadre légal :</strong> {c.legal}
                </p>
                {c.link && (
                  <a
                    href={c.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-sm bg-foreground px-4 py-2 text-[13px] font-semibold text-background transition-colors hover:opacity-85"
                  >
                    {c.link.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Do / Don't */}
        <section className="mb-14 grid gap-6 sm:grid-cols-2">
          <div className="border-2 border-red-200 bg-white rounded-sm p-6 sm:p-8">
            <h2 className="text-[18px] font-bold text-red-700 mb-4">
              ❌ Ce qu&apos;il ne faut PAS faire
            </h2>
            <ul className="space-y-2.5">
              {BAD_EXAMPLES.map((ex) => (
                <li key={ex} className="flex items-start gap-2.5 text-[14px] text-foreground">
                  <span className="text-red-600 mt-[2px] shrink-0">✕</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-2 border-green-200 bg-white rounded-sm p-6 sm:p-8">
            <h2 className="text-[18px] font-bold text-green-700 mb-4">
              ✅ Ce qu&apos;il faut faire
            </h2>
            <ul className="space-y-2.5">
              {GOOD_EXAMPLES.map((ex) => (
                <li key={ex} className="flex items-start gap-2.5 text-[14px] text-foreground">
                  <span className="text-green-600 mt-[2px] shrink-0">✓</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contacts rapides */}
        <section className="border-t border-border pt-10">
          <h2 className="text-[24px] font-bold tracking-[-0.022em] text-foreground mb-6">
            Contacts utiles en un coup d&apos;œil
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-semibold text-foreground">Qui contacter</th>
                  <th className="py-3 pr-4 font-semibold text-foreground">Pour quoi</th>
                  <th className="py-3 font-semibold text-foreground">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 pr-4 font-medium">Numéro Vert Solidarité</td>
                  <td className="py-3 pr-4 text-muted-foreground">Bénévolat, hébergement, logistique</td>
                  <td className="py-3 font-semibold whitespace-nowrap">0 800 006 090</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Cellule information publique</td>
                  <td className="py-3 pr-4 text-muted-foreground">Infos officielles, évacuations</td>
                  <td className="py-3 font-semibold whitespace-nowrap">09 70 80 90 40</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">CUMP (soutien psychologique)</td>
                  <td className="py-3 pr-4 text-muted-foreground">Détresse psychologique, 24h/24</td>
                  <td className="py-3 font-semibold whitespace-nowrap">0800 719 912</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Barreau de Bordeaux</td>
                  <td className="py-3 pr-4 text-muted-foreground">Aide juridique gratuite sinistrés</td>
                  <td className="py-3 font-semibold whitespace-nowrap">05 57 77 41 58</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">SDIS Gironde</td>
                  <td className="py-3 pr-4 text-muted-foreground">Candidature pompier volontaire</td>
                  <td className="py-3">
                    <a href="https://www.sdis33.fr" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">sdis33.fr</a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Protection Civile</td>
                  <td className="py-3 pr-4 text-muted-foreground">Rejoindre comme bénévole</td>
                  <td className="py-3">
                    <a href="https://www.protection-civile.org/faire-du-benevolat/" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">protection-civile.org</a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Croix-Rouge Gironde</td>
                  <td className="py-3 pr-4 text-muted-foreground">Don ou engagement bénévole</td>
                  <td className="py-3">
                    <a href="https://macagnotte.croix-rouge.fr/donner-dt33" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">macagnotte.croix-rouge.fr/donner-dt33</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-foreground/85">
        <div className="mx-auto max-w-[1120px] px-5 py-12">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <a href="/" className="inline-flex items-center font-bold tracking-[-0.02em] text-foreground text-[15px]">
                Aide<span className="text-primary">Ici</span>
                <span className="ml-[5px] mt-[-8px] h-[5px] w-[5px] rounded-[1px] bg-primary" />
              </a>
              <p className="mt-3 max-w-[38ch] text-[13px] leading-relaxed text-muted-foreground">
                Radar local des besoins utiles à Bordeaux et en Gironde.
              </p>
            </div>
          </div>
          <div className="mt-9 border-t border-border pt-5">
            <p className="text-[12px] leading-[1.6] text-muted-foreground">
              AideIci oriente — il ne coordonne pas. Ce guide est informatif. Pour toute action,
              contactez les organismes officiels listés ci-dessus.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
