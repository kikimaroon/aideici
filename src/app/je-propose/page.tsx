"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Logo } from "@/components/Logo";

const supabase = createClient(
  "https://pgobbkvtubjaguxqztss.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnb2Jia3Z0dWJqYWd1eHF6dHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTc4MTcsImV4cCI6MjEwMDQ5MzgxN30.GsOeYRmmq4UCK8pOCLf54yep-mgC0tFzTTiNj_vY3FQ"
);

const PROFESSIONS = [
  "Agriculteur / Éleveur",
  "Artisan / BTP",
  "Cuisinier / Traiteur",
  "Enseignant / Formateur",
  "Infirmier / Soignant",
  "Informaticien / Tech",
  "Kiné / Ostéopathe",
  "Logisticien / Chauffeur",
  "Médecin / Pharmacien",
  "Psy / Travailleur social",
  "Traducteur / Interprète",
  "Vétérinaire / Soigneur animalier",
  "Autre",
];

const ZONES = [
  "Bordeaux",
  "Mérignac",
  "Pessac",
  "Talence",
  "Bègles",
  "Gradignan",
  "Saint-Médard-en-Jalles",
  "Arcachon",
  "Libourne",
  "Langon",
  "Lesparre-Médoc",
  "Soulac-sur-Mer",
  "Gironde (autre)",
  "Landes",
  "Autre département",
];

export default function JeProposePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [zone, setZone] = useState("");
  const [availability, setAvailability] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("offers").insert({
      name,
      email,
      profession,
      skills,
      zone,
      availability,
      message,
    });
    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
      setName("");
      setEmail("");
      setProfession("");
      setSkills("");
      setZone("");
      setAvailability("");
      setMessage("");
    }
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
        <h1 className="text-[32px] font-extrabold tracking-[-0.03em] text-foreground mb-3">Je propose mon aide</h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground mb-10">
          Vous avez des compétences et du temps ? Remplissez ce formulaire. Nous transmettons
          votre proposition aux structures qui en ont besoin dans votre zone. Ce n&apos;est pas
          une inscription publique — votre offre est visible uniquement des organisations
          partenaires.
        </p>

        {status === "sent" ? (
          <div className="border-2 border-green-200 bg-green-50 rounded-sm p-8 text-center">
            <p className="text-[20px] font-bold text-green-800 mb-2">Merci !</p>
            <p className="text-[14px] text-green-700">Votre proposition a bien été enregistrée. Les structures partenaires de votre zone pourront vous contacter si un besoin correspond à votre profil.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-border bg-card rounded-sm p-6 sm:p-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Nom</label>
                <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground" />
              </div>
              <div>
                <label htmlFor="email" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Email</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="prenom@email.fr" className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground" />
              </div>
              <div>
                <label htmlFor="profession" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Profession</label>
                <select id="profession" required value={profession} onChange={(e) => setProfession(e.target.value)} className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground">
                  <option value="">Choisir…</option>
                  {PROFESSIONS.map((p) => (<option key={p} value={p}>{p}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="zone" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Zone</label>
                <select id="zone" required value={zone} onChange={(e) => setZone(e.target.value)} className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground">
                  <option value="">Choisir…</option>
                  {ZONES.map((z) => (<option key={z} value={z}>{z}</option>))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="skills" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Compétences spécifiques</label>
                <input id="skills" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Ex: conduite d'engins, soins vétérinaires, cuisine en grande quantité…" className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="availability" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Disponibilité</label>
                <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} className="h-[48px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none focus:border-foreground">
                  <option value="">Choisir…</option>
                  <option value="Immédiate (dès aujourd'hui)">Immédiate (dès aujourd&apos;hui)</option>
                  <option value="Cette semaine">Cette semaine</option>
                  <option value="Les week-ends">Les week-ends</option>
                  <option value="Ponctuelle (1-2 jours par mois)">Ponctuelle (1-2 jours par mois)</option>
                  <option value="Régulière (plusieurs jours par semaine)">Régulière (plusieurs jours par semaine)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70 mb-2">Message (optionnel)</label>
                <textarea id="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Précisez ce que vous pouvez apporter…" className="w-full rounded-sm border border-border bg-secondary px-4 py-3 text-[15px] text-foreground outline-none focus:border-foreground resize-none" />
              </div>
            </div>

            {status === "error" && (<p className="text-[14px] text-red-600">Une erreur est survenue. Réessayez.</p>)}

            <button type="submit" className="group inline-flex h-[56px] w-full items-center justify-center gap-2.5 rounded-sm bg-primary px-8 text-[16.5px] font-bold tracking-[-0.015em] text-primary-foreground shadow-[0_10px_24px_-18px_rgba(17,17,17,0.7)] transition-[background-color,transform] duration-200 hover:-translate-y-[1px] hover:bg-primary-hover">
              Envoyer ma proposition
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
            </button>

            <p className="text-[12px] text-muted-foreground text-center">Vos données ne sont pas publiées. Elles sont transmises uniquement aux structures partenaires de votre zone.</p>
          </form>
        )}
      </main>
    </div>
  );
}
