"use client";

import { useState, useMemo } from "react";
import { Logo } from "@/components/Logo";
import { ASSOCIATIONS, type Association } from "@/lib/associations";

const PROFESSIONS = [
  "Agriculteur / Éleveur / Forestier",
  "Animateur / Éducateur",
  "Artisan / BTP",
  "Avocat / Juriste",
  "Chauffeur / Logisticien",
  "Cuisinier / Traiteur",
  "Enseignant / Formateur",
  "Infirmier / Soignant",
  "Informaticien / Tech",
  "Kiné / Ostéopathe / Masseur",
  "Médecin / Pharmacien",
  "Pompier / Secouriste",
  "Psychologue / Psychiatre / Travailleur social",
  "Traducteur / Interprète",
  "Vétérinaire / Soigneur animalier",
  "Autre",
];

const ZONES = [
  "Bordeaux",
  "Bordeaux Métropole",
  "Mérignac",
  "Pessac",
  "Talence",
  "Bègles",
  "Gradignan",
  "Arcachon",
  "Libourne",
  "Langon",
  "Lesparre-Médoc",
  "Soulac-sur-Mer",
  "Gironde (autre)",
  "Landes",
  "Je ne suis pas dans le Sud-Ouest",
];

const PROFESSION_KEYWORDS: Record<string, string[]> = {
  "Agriculteur": ["agriculteur", "éleveur", "forestier", "sylviculteur", "vigneron", "tracteur"],
  "Animateur": ["animateur", "enseignant", "formateur", "étudiant", "aide"],
  "Artisan": ["artisan", "btp", "ouvrier", "conducteur", "mécanicien"],
  "Avocat": ["avocat", "juriste", "droit", "conseil"],
  "Chauffeur": ["chauffeur", "logisticien", "transport", "livraison"],
  "Cuisinier": ["cuisinier", "traiteur", "restaurant", "alimentation"],
  "Enseignant": ["enseignant", "formateur", "professeur", "animateur"],
  "Infirmier": ["infirmier", "soignant", "secouriste", "médecin", "aide-soignant"],
  "Informaticien": ["informatique", "tech", "développeur", "réseau"],
  "Kiné": ["kiné", "ostéopathe", "masseur", "physiothérapeute", "soignant"],
  "Médecin": ["médecin", "pharmacien", "soignant", "secouriste", "infirmier"],
  "Pompier": ["pompier", "secouriste", "chauffeur", "logisticien"],
  "Psychologue": ["psy", "psychologue", "psychiatre", "travailleur social", "soignant"],
  "Traducteur": ["traducteur", "interprète", "langue", "communication"],
  "Vétérinaire": ["vétérinaire", "soigneur animalier", "naturaliste", "écologue", "biologiste"],
  "Autre": ["aide", "bénévole", "étudiant", "retraité"],
};

function matchAssociations(profession: string, zone: string, skills: string): Association[] {
  const profKey = Object.keys(PROFESSION_KEYWORDS).find((k) => profession.includes(k)) || "Autre";
  const keywords = PROFESSION_KEYWORDS[profKey] || [];
  const extra = skills.toLowerCase().split(/[,;.]/).map((s) => s.trim()).filter(Boolean);
  const allTerms = [...keywords, ...extra];

  return ASSOCIATIONS.map((a) => {
    const keywordHits = allTerms.filter((t) =>
      a.keywords.some((k) => k.includes(t) || t.includes(k))
    ).length;

    const zoneMatch =
      a.zone.toLowerCase().includes(zone.toLowerCase()) ||
      zone.toLowerCase().includes(a.zone.toLowerCase()) ||
      a.zone === "Toute la France" ||
      a.zone === "Aquitaine" ||
      a.zone === "France" ||
      a.zone.includes("Gironde") ||
      a.zone.includes("Charente-Maritime");

    let score = keywordHits * 2;
    if (zoneMatch) score += 3;
    if (a.zone === zone || zone.includes(a.zone)) score += 5;

    return { assoc: a, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ assoc }) => assoc);
}

export default function JeProposePage() {
  const [profession, setProfession] = useState("");
  const [zone, setZone] = useState("");
  const [skills, setSkills] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(
    () => (submitted ? matchAssociations(profession, zone, skills) : []),
    [submitted, profession, zone, skills]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-[6px]">
        <div className="mx-auto flex max-w-[720px] items-center justify-between px-5 py-3">
          <a href="/" className="inline-flex items-center"><Logo /></a>
          <a href="/" className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors">← Retour</a>
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-5 py-12 sm:py-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-[7px] w-[7px] rounded-[1px] bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Je propose</span>
        </div>
        <h1 className="text-[32px] font-extrabold tracking-[-0.03em] text-foreground mb-3">Trouvez qui contacter</h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground mb-2">
          Remplissez votre profil. Nous vous indiquons les associations et structures
          qui recherchent des personnes comme vous. <strong>Aucune donnée n&apos;est stockée</strong> —
          vous contactez directement les structures qui vous correspondent.
        </p>
        <p className="text-[12px] text-muted-foreground mb-10">
          Répertoire de 14 structures vérifiées · Mis à jour le 29 juillet 2026
        </p>

        <form onSubmit={handleSubmit} className="border border-border bg-card rounded-sm p-6 sm:p-8 space-y-5 mb-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="profession" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Votre profession</label>
              <select id="profession" required value={profession} onChange={(e) => { setProfession(e.target.value); setSubmitted(false); }} className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground">
                <option value="">Choisir…</option>
                {PROFESSIONS.map((p) => (<option key={p} value={p}>{p}</option>))}
              </select>
            </div>
            <div>
              <label htmlFor="zone" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Votre zone</label>
              <select id="zone" required value={zone} onChange={(e) => { setZone(e.target.value); setSubmitted(false); }} className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground">
                <option value="">Choisir…</option>
                {ZONES.map((z) => (<option key={z} value={z}>{z}</option>))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="skills" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Compétences spécifiques <span className="font-normal normal-case tracking-normal text-muted-foreground">(optionnel — séparez par des virgules)</span></label>
              <input id="skills" type="text" value={skills} onChange={(e) => { setSkills(e.target.value); setSubmitted(false); }} placeholder="Ex: conduite d'engins, soins vétérinaires, cuisine en grande quantité…" className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground" />
            </div>
          </div>

          <button type="submit" className="group inline-flex h-[56px] w-full items-center justify-center gap-2.5 rounded-sm bg-primary px-8 text-[16.5px] font-bold tracking-[-0.015em] text-primary-foreground shadow-[0_10px_24px_-18px_rgba(17,17,17,0.7)] transition-[background-color,transform] duration-200 hover:-translate-y-[1px] hover:bg-primary-hover">
            Trouver les structures correspondantes
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
          </button>

          <p className="text-[12px] text-muted-foreground text-center">
            Aucune donnée n&apos;est envoyée ni stockée. Le matching est fait dans votre navigateur.
          </p>
        </form>

        {/* Results */}
        {submitted && (
          <section>
            <h2 className="text-[20px] font-bold tracking-[-0.018em] text-foreground mb-1">
              {results.length > 0
                ? `${results.length} structure${results.length > 1 ? "s" : ""} correspondent à votre profil`
                : "Aucune correspondance exacte"}
            </h2>
            <p className="text-[14px] text-muted-foreground mb-6">
              {results.length > 0
                ? "Contactez-les directement. Cliquez sur le lien pour accéder à leur page."
                : "Essayez d'élargir votre zone ou d'ajouter des compétences spécifiques."}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((a) => (
                <div key={a.id} className="border border-border bg-card rounded-sm p-5">
                  <h3 className="text-[16px] font-bold text-foreground">{a.name}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{a.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {a.categories.map((c) => (
                      <span key={c} className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm">{c}</span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.url && (
                      <a href={a.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-sm bg-foreground px-3.5 py-1.5 text-[12px] font-semibold text-background transition-colors hover:opacity-85">
                        Site web →
                      </a>
                    )}
                    {a.phone && (
                      <a href={`tel:${a.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3.5 py-1.5 text-[12px] font-semibold text-foreground transition-colors hover:bg-secondary">
                        {a.phone}
                      </a>
                    )}
                    {a.email && (
                      <a href={`mailto:${a.email}`}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3.5 py-1.5 text-[12px] font-semibold text-foreground transition-colors hover:bg-secondary">
                        Email
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No results fallback */}
            {results.length === 0 && (
              <div className="border border-border bg-card rounded-sm p-6 text-center">
                <p className="text-[16px] font-semibold text-foreground mb-2">Contacts généraux</p>
                <p className="text-[14px] text-muted-foreground mb-4">
                  Ces structures acceptent tous les profils. Contactez-les pour proposer votre aide.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <a href="tel:08000060090" className="rounded-sm bg-foreground px-4 py-2 text-[13px] font-semibold text-background hover:opacity-85">Numéro Vert · 0 800 006 090</a>
                  <a href="https://www.protection-civile.org/faire-du-benevolat/" target="_blank" rel="noopener noreferrer" className="rounded-sm border border-border px-4 py-2 text-[13px] font-semibold text-foreground hover:bg-secondary">Protection Civile</a>
                  <a href="https://www.diffuz.com/defi/urgence-incendies-12488311" target="_blank" rel="noopener noreferrer" className="rounded-sm border border-border px-4 py-2 text-[13px] font-semibold text-foreground hover:bg-secondary">Diffuz Urgence Incendies</a>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
