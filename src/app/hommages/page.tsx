import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { HeroAvatar } from "@/components/HeroAvatar";

export const metadata: Metadata = {
  title: "Hommages aux héros des incendies — Gironde 2026 | AideIci",
  description:
    "Hommage aux pompiers disparus et aux héros de la solidarité lors des incendies de juillet 2026 en Gironde. Agriculteurs, bénévoles, soignants — leurs visages et leurs actions.",
  alternates: { canonical: "/hommages" },
};

type Fallen = {
  name: string;
  role: string;
  date: string;
  location: string;
  story: string;
};

type Hero = {
  name: string;
  role: string;
  location: string;
  story: string;
  sourceUrl: string;
};

const FALLEN: Fallen[] = [
  {
    name: "Anthony Berthome",
    role: "Sapeur-pompier",
    date: "21 juillet 2026",
    location: "Mérignac (Gironde)",
    story:
      "Anthony Berthome, 34 ans, est mort avec deux de ses camarades, piégé par les flammes dans leur véhicule alors qu'ils intervenaient sur un feu dans une zone d'activité de Mérignac, près de l'aéroport de Bordeaux. Il était l'un des quatre soldats du feu tombés en service en juillet 2026.",
  },
  {
    name: "Wilfried Schmitter",
    role: "Sapeur-pompier",
    date: "21 juillet 2026",
    location: "Mérignac (Gironde)",
    story:
      "Wilfried Schmitter, 34 ans, est mort aux côtés d'Anthony et Baptiste, piégé par les flammes dans leur véhicule d'intervention. Il faisait partie de la même unité qui luttait contre l'incendie de la zone d'activité de Mérignac.",
  },
  {
    name: "Baptiste Gerfaud-Valentin",
    role: "Sapeur-pompier",
    date: "21 juillet 2026",
    location: "Mérignac (Gironde)",
    story:
      "Baptiste Gerfaud-Valentin, 34 ans, est tombé avec Anthony et Wilfried dans le même véhicule, piégé par la violence du feu à Mérignac. Leur sacrifice a marqué le début d'un été meurtrier pour les sapeurs-pompiers français.",
  },
  {
    name: "Laurent Manson",
    role: "Caporal, sapeur-pompier volontaire",
    date: "27 juillet 2026",
    location: "Arles (Bouches-du-Rhône)",
    story:
      "Le caporal Laurent Manson, 38 ans, sapeur-pompier volontaire, est décédé dans un accident de la route lors d'une mission de ravitaillement pour les incendies. Il revenait de plusieurs jours de lutte contre les flammes quand son véhicule a eu un accident.",
  },
];

const HEROES: Hero[] = [
  {
    name: "Théo Hernandez",
    role: "Président des Jeunes Agriculteurs de Gironde",
    location: "Gironde",
    story:
      "Non-stop depuis quatre jours, dormant deux à trois heures par nuit, il sillonnait les routes avec son tracteur chargé d'eau pour ravitailler les pompiers au plus près des flammes. « On a l'impression que ça va jamais s'arrêter », témoignait-il.",
    sourceUrl:
      "https://www.sudouest.fr/gironde/bordeaux/incendie-en-gironde-on-donne-un-coup-de-main-aux-copains-le-monde-paysan-a-la-rescousse-30096370.php",
  },
  {
    name: "Damien Cruzin",
    role: "Céréalier médocain",
    location: "Médoc, Gironde",
    story:
      "Il a installé une citerne de 25 000 litres pour ravitailler les camions de pompiers au plus près des flammes. « Je viens ici pour donner un coup de main aux copains », expliquait-il. Une cuve agricole contient 3 à 4 fois la capacité d'un camion de pompiers.",
    sourceUrl:
      "https://www.sudouest.fr/gironde/bordeaux/incendie-en-gironde-on-donne-un-coup-de-main-aux-copains-le-monde-paysan-a-la-rescousse-30096370.php",
  },
  {
    name: "Blanche & Dorian",
    role: "Bénévoles de la Protection Civile",
    location: "Gironde",
    story:
      "Blanche, 20 ans, étudiante infirmière, et Dorian, 21 ans, travaillaient nuit et jour pour la Protection Civile. « C'est mieux d'être ici que devant la télévision à regarder sans rien pouvoir faire », confiaient-ils. Ils incarnaient l'engagement de la jeunesse face à la catastrophe.",
    sourceUrl:
      "https://www.france24.com/fr/france/20260729-animateurs-agriculteurs-b%C3%A9n%C3%A9voles-ces-visages-de-la-solidarit%C3%A9-face-aux-incendies-en-gironde",
  },
  {
    name: "Chris",
    role: "Animateur bénévole",
    location: "Parc des Expositions, Bordeaux",
    story:
      "Chris confectionnait des chiens en ballon pour distraire les enfants évacués au centre d'expositions de Bordeaux. Dans un hall immense où des milliers de personnes attendaient, son geste simple apportait un moment de légèreté aux plus jeunes.",
    sourceUrl:
      "https://www.france24.com/fr/france/20260729-animateurs-agriculteurs-b%C3%A9n%C3%A9voles-ces-visages-de-la-solidarit%C3%A9-face-aux-incendies-en-gironde",
  },
  {
    name: "Thibaut Pinot",
    role: "Ancien cycliste du Tour de France, agriculteur",
    location: "Mélisey (Haute-Saône)",
    story:
      "L'ex-star du Tour de France, reconverti dans l'élevage, a spontanément rejoint une dizaine d'agriculteurs pour acheminer de l'eau avec son quad afin d'aider les pompiers à protéger les habitations et une sapinière menacée.",
    sourceUrl:
      "https://www.rtl.fr/actu/debats-societe/c-est-notre-pays-on-defend-notre-territoire-agriculteurs-forestiers-benevoles-la-solidarite-indispensable-pour-aider-les-pompiers-a-lutter-contre-les-feux-en-gironde-7900657584",
  },
  {
    name: "Alexandre Delaunay (Mascarade)",
    role: "Artiste",
    location: "Le Havre",
    story:
      "Il a créé une illustration intitulée « Héros » montrant un pompier luttant contre les flammes. Vendue en cinquante exemplaires numérotés, elle a récolté 1 500 euros intégralement reversés à l'Œuvre des Pupilles des Sapeurs-Pompiers.",
    sourceUrl:
      "https://www.tendanceouest.com/actualite-441379-incendies-en-gironde-l-oeuvre-solidaire-de-l-artiste-havrais-mascarade-pour-les-pompiers-ecoulee-en-quelques-heures",
  },
  {
    name: "Cédric & Jennifer",
    role: "Traiteurs réunionnais",
    location: "Gironde",
    story:
      "Ces deux traiteurs ont suspendu leur activité professionnelle pour cuisiner bénévolement près de 500 caris par jour pour les soldats du feu, directement sur le terrain. Leur food-truck est devenu un repère de chaleur humaine au milieu des flammes.",
    sourceUrl:
      "https://freedom.fr/incendies-en-gironde-lassociation-surs-lance-une-cagnotte-pour-aider-cedric-et-jennifer-les-traiteurs-reunionnais-a-nourrir-les-pompiers/",
  },
  {
    name: "Nabil Kara",
    role: "Sapeur-pompier",
    location: "Gironde",
    story:
      "Il a filmé l'enfer du mégafeu avec ses lunettes connectées Meta, remerciant les agriculteurs « qui nous aident en nous alimentant en eau » et les habitants qui préparaient des repas. Ses images ont permis au grand public de mesurer l'intensité du combat sur le front.",
    sourceUrl:
      "https://h24info.ma/monde/bismillahi-rahmani-rahim-un-pompier-francais-filme-au-plus-pres-le-megafeu-en-gironde-video/",
  },
];

export default function HommagesPage() {
  return (
    <div id="top" className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-[6px]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-3">
          <a
            href="/"
            className="inline-flex items-center font-bold tracking-[-0.02em] text-foreground text-[17px]"
          >
            <Logo />
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
        <section className="max-w-[62ch] mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[7px] w-[7px] rounded-[1px] bg-foreground" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Mémoire
            </span>
          </div>
          <h1 className="text-[36px] font-extrabold leading-[1.06] tracking-[-0.032em] text-foreground sm:text-[48px]">
            Celles et ceux qui ont sauvé des vies
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Juillet 2026. 42 000 hectares brûlés, 220 000 personnes évacuées, 4 pompiers morts en
            service. Au milieu du chaos, des milliers d&apos;hommes et de femmes ont donné leur
            temps, leurs forces, parfois leur vie, pour protéger les autres. Cette page leur rend
            hommage.
          </p>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Mis à jour le 29 juillet 2026.
          </p>
        </section>

        {/* Fallen */}
        <section className="mb-16">
          <div className="border-l-4 border-foreground bg-muted/40 rounded-sm p-6 sm:p-8 mb-8">
            <h2 className="text-[22px] font-bold tracking-[-0.02em] text-foreground mb-2">
              Tombés en service
            </h2>
            <p className="text-[14px] leading-relaxed text-muted-foreground mb-1">
              Quatre sapeurs-pompiers ont perdu la vie en juillet 2026 en luttant contre les
              incendies. Ils avaient entre 34 et 38 ans.
            </p>
            <p className="text-[12px] text-muted-foreground">
              Leurs noms méritent d&apos;être connus. Leurs familles méritent notre soutien.
            </p>
          </div>

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {FALLEN.map((f) => (
              <div key={f.name} className="bg-card p-6 sm:p-7 img-warm-overlay">
                <div className="flex items-start gap-4 mb-2">
                  <HeroAvatar name={f.name} size={64} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-[5px] w-[5px] rounded-[1px] bg-foreground" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {f.date}
                      </span>
                    </div>
                    <h3 className="text-[20px] font-bold tracking-[-0.018em] text-foreground">
                      {f.name}
                    </h3>
                    <p className="mt-0.5 text-[13px] font-semibold text-muted-foreground">
                      {f.role} — {f.location}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{f.story}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Memorial actions */}
        <section className="mb-16">
          <div className="border-2 border-foreground bg-card rounded-sm p-6 sm:p-8">
            <h2 className="text-[20px] font-bold tracking-[-0.018em] text-foreground mb-3">
              Soutenir leurs familles
            </h2>
            <p className="text-[14px] leading-relaxed text-muted-foreground mb-5">
              L&apos;Œuvre des Pupilles des Sapeurs-Pompiers (ODP) accompagne plus de 1 785
              orphelins de pompiers décédés en service. Créée en 1926, elle fête son centenaire
              cette année. Allocation trimestrielle, soutien scolaire, aide au permis, soutien
              psychologique — chaque don compte.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.onparticipe.fr/c/sVeUmP47"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-foreground px-5 py-2.5 text-[14px] font-semibold text-background transition-colors hover:opacity-85"
              >
                Cagnotte officielle Œuvre des Pupilles →
              </a>
              <a
                href="https://www.oeuvredespupilles.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-foreground px-5 py-2.5 text-[14px] font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                En savoir plus sur l&apos;ODP →
              </a>
            </div>
          </div>
        </section>

        {/* Living heroes */}
        <section className="mb-14">
          <h2 className="text-[24px] font-bold tracking-[-0.022em] text-foreground mb-2">
            Les visages de la solidarité
          </h2>
          <p className="text-[14px] leading-relaxed text-muted-foreground mb-8">
            Agriculteurs, bénévoles, soignants, artistes — ces femmes et ces hommes incarnent ce que
            la France a de meilleur.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {HEROES.map((h) => (
              <div key={h.name} className="img-warm-overlay border border-border bg-card rounded-sm p-6">
                <div className="flex items-start gap-4 mb-3">
                  <HeroAvatar name={h.name} size={56} />
                  <div>
                    <h3 className="text-[16px] font-bold text-foreground">{h.name}</h3>
                    <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                      {h.role}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{h.location}</p>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed text-muted-foreground mb-3">{h.story}</p>
                <a
                  href={h.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  Lire l&apos;article source →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="border-t border-border pt-10 mb-10">
          <blockquote className="max-w-[48ch] mx-auto text-center">
            <p className="text-[20px] font-semibold leading-relaxed text-foreground italic">
              &ldquo;Au milieu des fumées et des flammes, il y a une lueur d&apos;espoir et
              d&apos;humanité qui ne doit pas s&apos;éteindre.&rdquo;
            </p>
            <footer className="mt-4 text-[13px] text-muted-foreground">
              — Éditorial de la presse régionale, 27 juillet 2026
            </footer>
          </blockquote>
        </section>

        {/* Chiffres */}
        <section className="border-t border-border pt-10">
          <h2 className="text-[18px] font-bold tracking-[-0.018em] text-foreground mb-6">
            En chiffres
          </h2>
          <dl className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            <div className="bg-card px-5 py-5">
              <dd className="text-[32px] font-extrabold tabular-nums tracking-[-0.03em] text-foreground">4</dd>
              <dt className="mt-1 text-[12px] text-muted-foreground">Pompiers morts en service</dt>
            </div>
            <div className="bg-card px-5 py-5">
              <dd className="text-[32px] font-extrabold tabular-nums tracking-[-0.03em] text-foreground">93</dd>
              <dt className="mt-1 text-[12px] text-muted-foreground">Pompiers blessés</dt>
            </div>
            <div className="bg-card px-5 py-5">
              <dd className="text-[32px] font-extrabold tabular-nums tracking-[-0.03em] text-foreground">500+</dd>
              <dt className="mt-1 text-[12px] text-muted-foreground">Agriculteurs mobilisés</dt>
            </div>
            <div className="bg-card px-5 py-5">
              <dd className="text-[32px] font-extrabold tabular-nums tracking-[-0.03em] text-foreground">14 000+</dd>
              <dt className="mt-1 text-[12px] text-muted-foreground">Volontaires inscrits</dt>
            </div>
          </dl>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-foreground/85 mt-14">
        <div className="mx-auto max-w-[1120px] px-5 py-12">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <a href="/" className="inline-flex items-center">
                <Logo />
              </a>
              <p className="mt-3 max-w-[42ch] text-[13px] leading-relaxed text-muted-foreground">
                Cette page est un hommage. Pour les aider concrètement, rendez-vous sur{" "}
                <a href="/" className="underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">
                  le radar des besoins
                </a>
                {" "}ou{" "}
                <a href="/comment-aider" className="underline decoration-primary decoration-2 underline-offset-4 hover:text-primary">
                  le guide Comment aider
                </a>.
              </p>
            </div>
          </div>
          <div className="mt-9 border-t border-border pt-5">
            <p className="text-[12px] leading-[1.6] text-muted-foreground">
              Informations sourcées auprès de la presse française (juillet 2026). Si vous constatez
              une erreur ou souhaitez compléter cet hommage, écrivez à contact@aideici.fr.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
