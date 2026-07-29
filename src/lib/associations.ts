// Verified association directory — real contacts, no scraping needed
// Matched by profession + zone against user profile

export interface Association {
  id: string;
  name: string;
  url: string;
  email?: string;
  phone?: string;
  zone: string;
  keywords: string[]; // profession keywords that match this association
  categories: string[];
  description: string;
}

export const ASSOCIATIONS: Association[] = [
  {
    id: "protection-civile-33",
    name: "Protection Civile de la Gironde",
    url: "https://www.protection-civile.org/faire-du-benevolat/",
    phone: "0 800 006 090",
    zone: "Gironde",
    keywords: ["secouriste", "logisticien", "soignant", "infirmier", "médecin", "chauffeur", "cuisinier", "aide", "bénévole", "étudiant"],
    categories: ["Solidarité", "Logistique"],
    description: "300 bénévoles mobilisés. Recherche secouristes, logisticiens, équipiers. Formation assurée. Inscription en ligne.",
  },
  {
    id: "croix-rouge-33",
    name: "Croix-Rouge française — Délégation de Gironde",
    url: "https://macagnotte.croix-rouge.fr/donner-dt33",
    phone: "0 800 006 090",
    zone: "Gironde",
    keywords: ["infirmier", "médecin", "secouriste", "logisticien", "psy", "travailleur social", "aide", "bénévole"],
    categories: ["Solidarité", "Logistique"],
    description: "300 volontaires venus de 60 départements. Recherche secouristes, infirmiers, logisticiens, équipiers d'urgence.",
  },
  {
    id: "secours-populaire-33",
    name: "Secours Populaire — Fédération de Gironde",
    url: "https://www.secourspopulaire.fr/agir-avec-nous/etre-benevole/devenir-benevole/",
    zone: "Gironde",
    keywords: ["aide", "bénévole", "étudiant", "retraité", "cuisinier", "chauffeur", "enseignant", "formateur"],
    categories: ["Solidarité", "Éducation"],
    description: "Aide alimentaire, tri des dons, accompagnement des sinistrés. Inscription en ligne directe.",
  },
  {
    id: "cump-33",
    name: "CUMP — Cellule d'Urgence Médico-Psychologique Gironde",
    url: "https://www.lesparre-medoc.fr/2026/07/incendies-juillet-2026-numeros-durgence-fiables/",
    phone: "0800 719 912",
    zone: "Gironde",
    keywords: ["psy", "psychologue", "psychiatre", "travailleur social", "infirmier", "médecin"],
    categories: ["Solidarité"],
    description: "Soutien psychologique aux 220 000 évacués. Psychologues, psychiatres, infirmiers psy recherchés. Appel gratuit 24h/24.",
  },
  {
    id: "barreau-bordeaux",
    name: "Barreau de Bordeaux — Aide juridique gratuite",
    url: "https://www.lesparre-medoc.fr/2026/07/incendies-juillet-2026-numeros-durgence-fiables/",
    phone: "05 57 77 41 58",
    zone: "Bordeaux",
    keywords: ["avocat", "juriste", "droit", "conseil juridique"],
    categories: ["Solidarité"],
    description: "Permanence juridique gratuite pour les sinistrés (assurance, indemnisation, relogement). Avocats bénévoles recherchés. 9h-20h.",
  },
  {
    id: "chambre-agriculture-33",
    name: "Chambre d'Agriculture de la Gironde",
    url: "https://gironde.chambre-agriculture.fr/",
    zone: "Gironde",
    keywords: ["agriculteur", "éleveur", "forestier", "sylviculteur", "vigneron", "tracteur", "citerne"],
    categories: ["Logistique", "Environnement"],
    description: "500 agriculteurs mobilisés avec citernes et tracteurs. Coordination des renforts agricoles pour le front des incendies.",
  },
  {
    id: "lpo-aquitaine",
    name: "LPO Aquitaine — Centre de soins de la faune sauvage",
    url: "https://www.lpo.fr/la-lpo-en-actions/mobilisation-citoyenne/devenir-benevole",
    zone: "Aquitaine",
    keywords: ["vétérinaire", "soigneur animalier", "naturaliste", "écologue", "biologiste", "aide", "bénévole"],
    categories: ["Animaux", "Environnement"],
    description: "120 animaux sauvages évacués d'Audenge vers Tonneins. Recherche vétérinaires, soigneurs, bénévoles pour nourrissage et soins.",
  },
  {
    id: "refuge-oleronais",
    name: "Refuge Oléronais — Animaux sinistrés",
    url: "https://www.sudouest.fr/charente-maritime/ile-d-oleron/ile-d-oleron-le-refuge-oleronais-accueille-les-animaux-sinistres-suite-aux-incendies-en-gironde-et-lance-un-appel-aux-dons-et-aux-benevoles-30082987.php",
    zone: "Charente-Maritime, Gironde",
    keywords: ["vétérinaire", "soigneur animalier", "aide", "bénévole", "chauffeur", "logisticien"],
    categories: ["Animaux"],
    description: "Accueille les animaux évacués des zones incendiées. Recherche familles d'accueil, bénévoles, vétérinaires.",
  },
  {
    id: "sdis-33",
    name: "SDIS 33 — Sapeurs-Pompiers de la Gironde",
    url: "https://www.sdis33.fr",
    zone: "Gironde",
    keywords: ["pompier", "secouriste", "chauffeur", "logisticien", "mécanicien"],
    categories: ["Solidarité", "Logistique"],
    description: "Candidature sapeur-pompier volontaire. 16-67 ans, apte physiquement, engagement 5 ans. Formation assurée.",
  },
  {
    id: "fondation-patrimoine",
    name: "Fondation du Patrimoine — Reforestation",
    url: "https://www.fondation-patrimoine.org/",
    zone: "Toute la France",
    keywords: ["forestier", "écologue", "naturaliste", "agriculteur", "paysagiste", "biologiste", "environnement"],
    categories: ["Environnement"],
    description: "Collecte pour la reforestation post-incendie. Chantiers de plantation à l'automne. Dons et bénévolat.",
  },
  {
    id: "diffuz-urgence",
    name: "Diffuz — Défi Urgence Incendies (Macif)",
    url: "https://www.diffuz.com/defi/urgence-incendies-12488311",
    zone: "Toute la France",
    keywords: ["aide", "bénévole", "étudiant", "retraité", "animateur", "enseignant", "formateur", "cuisinier"],
    categories: ["Solidarité"],
    description: "150 bénévoles recherchés. Défi solidaire : soutien au Secours Populaire, Croix-Rouge, pompiers, LPO. Inscription en 1 clic.",
  },
  {
    id: "bordeaux-metropole-reserve",
    name: "Bordeaux Métropole — Réserve Citoyenne",
    url: "https://www.bordeaux-metropole.fr/a-votre-service/participer-a-vie-metropole/reserve-citoyenne-metropolitaine",
    email: "reserve.citoyenne@bordeaux-metropole.fr",
    zone: "Bordeaux Métropole",
    keywords: ["aide", "bénévole", "logisticien", "étudiant", "retraité", "animateur", "enseignant", "formateur"],
    categories: ["Solidarité", "Logistique"],
    description: "200 réservistes formés depuis 2 ans. Missions : soutien aux populations, appui logistique, centres d'accueil. Contact par email.",
  },
  {
    id: "erina-animaux",
    name: "Association Erina — Sauvetage animaux",
    url: "https://www.lepopulaire.fr/razes-87640/faits-divers/l-association-erina-envoie-du-materiel-en-gironde-pour-sauver-les-animaux-blesses-dans-les-incendies_15025708/",
    zone: "Gironde, France",
    keywords: ["vétérinaire", "soigneur animalier", "chauffeur", "logisticien", "aide", "bénévole"],
    categories: ["Animaux"],
    description: "Envoi de matériel et coordination des sauvetages d'animaux blessés dans les incendies. Recherche bénévoles et dons de matériel vétérinaire.",
  },
  {
    id: "ordre-kines",
    name: "Ordre des Masseurs-Kinésithérapeutes — Mobilisation incendies",
    url: "https://www.ordremk.fr/",
    zone: "Gironde",
    keywords: ["kiné", "ostéopathe", "masseur", "soignant", "médecin du sport", "physiothérapeute"],
    categories: ["Solidarité"],
    description: "Kinés et ostéopathes recherchés pour soulager les pompiers et secours (séances de 20 min). Contactez le SDIS ou la Protection Civile pour intégrer le dispositif.",
  },
];
