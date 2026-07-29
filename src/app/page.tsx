"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Need } from "@/types";

// ── Zone Combobox ───────────────────────────────────────────────────
function ZoneCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [zones, setZones] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(value);

  useEffect(() => {
    supabase
      .from("needs")
      .select("location")
      .eq("status", "verified")
      .gte("expires_at", new Date().toISOString())
      .then(({ data }) => {
        if (data) {
          const unique = [...new Set(data.map((n: { location: string }) => n.location).filter(Boolean))].sort();
          setZones(unique);
        }
      });
  }, []);

  const filtered = zones.filter((z) =>
    z.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        id="zone"
        type="text"
        required
        placeholder="Rechercher une ville ou un code postal"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        autoComplete="off"
        className="mt-2.5 h-[52px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 hover:border-foreground/30 focus:border-foreground"
      />

      {open && filter.length >= 1 && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-30 mt-1 max-h-[200px] overflow-y-auto rounded-sm border border-border bg-card shadow-lg">
          {filtered.map((z) => (
            <li key={z}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setFilter(z);
                  onChange(z);
                  setOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-[14px] text-foreground transition-colors duration-100 hover:bg-primary-soft hover:text-primary"
              >
                {z}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Alert Form ─────────────────────────────────────────────────────
function AlertForm() {
  const [email, setEmail] = useState("");
  const [zone, setZone] = useState("");
  const [category, setCategory] = useState("Social");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setMessage("Vous devez accepter de recevoir les alertes.");
      return;
    }
    const { error } = await supabase.from("subscribers").insert({
      email,
      zone,
      categories: category,
      consent: true,
    });
    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Inscription confirmée ! Vérifiez votre boîte mail.");
      setEmail("");
      setZone("");
      setCategory("Social");
      setConsent(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-border bg-card rounded-sm"
      data-reveal=""
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-foreground">
          Inscription aux alertes
        </span>
        <span className="text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
          Gratuit
        </span>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">
        <div>
          <label
            htmlFor="email"
            className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="prenom@email.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2.5 h-[52px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 hover:border-foreground/30 focus:border-foreground"
          />
        </div>

        <div>
          <label
            htmlFor="zone"
            className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70"
          >
            Zone / ville
          </label>
          <ZoneCombobox value={zone} onChange={setZone} />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="cat"
            className="block text-[11.5px] font-bold uppercase tracking-[0.11em] text-foreground/70"
          >
            Catégorie
          </label>
          <select
            id="cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2.5 h-[52px] w-full rounded-sm border border-border bg-secondary px-4 text-[15px] text-foreground outline-none transition-colors duration-200 hover:border-foreground/30 focus:border-foreground"
          >
            <option>Social</option>
            <option>Environnement</option>
            <option>Logistique</option>
            <option>Solidarité locale</option>
          </select>
        </div>

        <label className="flex items-start gap-3 border-t border-border pt-5 text-[13.5px] leading-[1.55] text-foreground/85 sm:col-span-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-[3px] h-[17px] w-[17px] shrink-0 accent-primary"
          />
          <span>
            J&apos;accepte de recevoir des alertes email sur les besoins utiles près de chez moi.
          </span>
        </label>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="group inline-flex h-[56px] w-full items-center justify-center gap-2.5 rounded-sm bg-primary px-8 text-[16.5px] font-bold tracking-[-0.015em] text-primary-foreground shadow-[0_10px_24px_-18px_rgba(17,17,17,0.7)] transition-[background-color,transform] duration-200 hover:-translate-y-[1px] hover:bg-primary-hover"
          >
            Recevoir les alertes
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-[3px]"
            >
              →
            </span>
          </button>
          <p className="mt-3 text-center text-[12px] text-muted-foreground">
            1 email par jour maximum · Désinscription en un clic
          </p>
        </div>
      </div>

      {message && (
        <p className="border-t border-border bg-muted/50 px-6 py-4 text-[13px] font-medium text-foreground text-center">
          {message}
        </p>
      )}

      <p className="border-t border-border bg-muted/50 px-6 py-4 text-[11.5px] leading-[1.6] text-muted-foreground sm:px-7">
        <span className="font-semibold uppercase tracking-[0.1em] text-foreground/70">
          RGPD ·{" "}
        </span>
        Vos données servent uniquement à l&apos;envoi des alertes locales. Aucun partage à des tiers,
        suppression sur simple demande.
      </p>
    </form>
  );
}

// ── Scroll Reveal Hook ───────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Skeleton ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="border border-border bg-card rounded-sm p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-4">
        <div className="skeleton h-5 w-16 rounded-sm" />
        <div className="skeleton h-4 w-20 rounded-sm" />
      </div>
      <div className="skeleton h-6 w-3/4 rounded-sm mb-2" />
      <div className="skeleton h-4 w-full rounded-sm mb-1" />
      <div className="skeleton h-4 w-2/3 rounded-sm mb-3" />
      <div className="flex gap-3 mt-3">
        <div className="skeleton h-3 w-24 rounded-sm" />
        <div className="skeleton h-3 w-32 rounded-sm" />
      </div>
    </div>
  );
}

function SkeletonSidebar() {
  return (
    <aside className="self-start border border-border bg-card rounded-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <div className="skeleton h-3 w-40 rounded-sm" />
        <div className="skeleton h-3 w-12 rounded-sm" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="px-5 py-3.5 border-b border-border">
          <div className="skeleton h-4 w-5/6 rounded-sm mb-1" />
          <div className="skeleton h-3 w-1/2 rounded-sm" />
        </div>
      ))}
    </aside>
  );
}

// ── Need Card ───────────────────────────────────────────────────────
function NeedCard({ need }: { need: Need }) {
  return (
    <div className="group relative border border-border bg-card rounded-sm p-6 transition-colors duration-200 hover:bg-primary-soft/30 sm:p-7">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
      />

      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary bg-primary/10 px-2.5 py-1 rounded-sm">
          Vérifié
        </span>
        {need.category && (
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
            {need.category}
          </span>
        )}
      </div>

      <h3 className="text-[18px] font-bold leading-[1.2] tracking-[-0.018em] text-foreground">
        {need.title}
      </h3>

      {need.summary && (
        <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
          {need.summary}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
        {need.location && <span>{need.location}</span>}
        {need.verified_at && (
          <span>
            · Vérifié le {new Date(need.verified_at).toLocaleDateString("fr-FR")}
          </span>
        )}
        {need.expires_at && (
          <span>
            · Expire le {new Date(need.expires_at).toLocaleDateString("fr-FR")}
          </span>
        )}
      </div>

      <a
        href={need.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary transition-colors duration-200 hover:text-primary-hover"
      >
        Voir la source
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────

export default function HomePage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString();
    supabase
      .from("needs")
      .select("*")
      .eq("status", "verified")
      .gte("expires_at", today)
      .order("verified_at", { ascending: false })
      .limit(50)
      .then(({ data, error: err }) => {
        if (err) {
          console.error("Supabase fetch error:", err);
          setError(err.message);
        } else {
          setNeeds((data as Need[]) || []);
        }
        setLoading(false);
      });
  }, []);

  const urgentNeeds = needs.filter((n) => n.title.toUpperCase().startsWith("URGENT"));
  const regularNeeds = needs.filter((n) => !n.title.toUpperCase().startsWith("URGENT"));
  const compactNeeds = regularNeeds.slice(0, 3);

  useReveal();

  return (
    <div id="top" className="min-h-screen bg-background">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-[6px]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:flex sm:justify-between">
          <a
            href="#top"
            className="inline-flex items-center font-bold tracking-[-0.02em] text-foreground text-[17px]"
          >
            Aide<span className="text-primary">Ici</span>
            <span className="ml-[5px] mt-[-8px] h-[5px] w-[5px] rounded-[1px] bg-primary" />
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {urgentNeeds.length > 0 && (
              <a
                href="#urgence"
                className="relative py-1 text-[13.5px] font-semibold text-red-600 transition-colors duration-200 hover:text-red-700"
              >
                Urgence incendies
              </a>
            )}
            <a
              href="#besoins"
              className="relative py-1 text-[13.5px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Besoins du jour
            </a>
            <a
              href="#methode"
              className="relative py-1 text-[13.5px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Comment ça marche
            </a>
            <a
              href="#alertes"
              className="relative py-1 text-[13.5px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Alertes
            </a>
          </nav>
          <a
            href="#alertes"
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-sm border border-foreground bg-secondary px-3.5 text-[13px] font-semibold text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
          >
            Recevoir les alertes
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="mx-auto max-w-[1120px] px-5 pb-12 pt-12 sm:pt-16">
          <div className="grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div>
              <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-[7px] w-[7px] rounded-[1px] bg-primary" />
                Radar local des besoins utiles
              </p>
              <h1 className="mt-5 text-[48px] font-extrabold leading-[0.95] tracking-[-0.042em] text-foreground sm:text-[70px] lg:text-[80px]">
                Aide utile près
                <br className="hidden sm:block" /> de chez toi.
              </h1>
              <p className="mt-5 max-w-[34ch] text-[18px] font-semibold leading-[1.4] tracking-[-0.012em] text-foreground sm:text-[21px]">
                Les besoins locaux du jour, vérifiés et sourcés.
              </p>
              <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted-foreground">
                On repère, on vérifie, on redirige vers la bonne structure.
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                <a
                  href="#besoins"
                  className="group inline-flex h-[56px] items-center justify-center gap-2.5 rounded-sm bg-primary px-8 text-[16.5px] font-bold tracking-[-0.015em] text-primary-foreground shadow-[0_10px_24px_-18px_rgba(17,17,17,0.7)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-[1px] hover:bg-primary-hover"
                >
                  Voir les besoins du jour
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-[3px]"
                  >
                    →
                  </span>
                </a>
                <a
                  href="#alertes"
                  className="inline-flex h-[56px] items-center justify-center rounded-sm border border-foreground/25 bg-transparent px-6 text-[15px] font-semibold text-foreground transition-[border-color,background-color] duration-200 hover:border-foreground hover:bg-secondary"
                >
                  Recevoir les alertes
                </a>
              </div>
            </div>

            {/* Sidebar compact */}
            {loading ? (
              <SkeletonSidebar />
            ) : (
              <aside className="self-start border border-border bg-card rounded-sm">
                <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                  <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.13em] text-foreground">
                    <span className="h-[6px] w-[6px] rounded-[1px] bg-primary" />
                    Besoins actifs aujourd&apos;hui
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                    {compactNeeds.length} / {regularNeeds.length}
                  </span>
                </div>

                {compactNeeds.length === 0 ? (
                  <p className="px-5 py-3.5 text-[13px] text-muted-foreground">
                    Aucun besoin pour le moment.
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {compactNeeds.map((need) => (
                      <li key={need.id} className="px-5 py-3.5">
                        <a
                          href={need.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] font-medium text-foreground transition-colors duration-200 hover:text-primary"
                        >
                          {need.title}
                        </a>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {need.category}
                          {need.location ? ` · ${need.location}` : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href="#besoins"
                  className="flex items-center justify-between border-t border-border px-5 py-3 text-[13px] font-semibold text-foreground transition-colors duration-200 hover:bg-primary-soft"
                >
                  Tout voir
                  <span aria-hidden="true">→</span>
                </a>
              </aside>
            )}
          </div>

          {/* Stats bar */}
          <dl className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-5">
            <div className="bg-card px-4 py-3.5">
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Mise à jour</dt>
              <dd className="mt-1 text-[14.5px] font-semibold tabular-nums tracking-[-0.01em] text-foreground">Aujourd&apos;hui</dd>
            </div>
            <div className="bg-card px-4 py-3.5">
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Besoins actifs</dt>
              <dd className="mt-1 text-[14.5px] font-semibold tabular-nums tracking-[-0.01em] text-foreground">{regularNeeds.length}</dd>
            </div>
            <div className="bg-card px-4 py-3.5">
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-red-600">Urgences</dt>
              <dd className="mt-1 text-[14.5px] font-semibold tabular-nums tracking-[-0.01em] text-red-600">{urgentNeeds.length}</dd>
            </div>
            <div className="bg-card px-4 py-3.5">
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Sources vérifiées</dt>
              <dd className="mt-1 text-[14.5px] font-semibold tabular-nums tracking-[-0.01em] text-foreground">3</dd>
            </div>
            <div className="bg-card px-4 py-3.5">
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Zone pilote</dt>
              <dd className="mt-1 text-[14.5px] font-semibold tabular-nums tracking-[-0.01em] text-foreground">Bordeaux Métropole</dd>
            </div>
          </dl>
        </section>

        {/* ── Urgence incendies ── */}
        {!loading && urgentNeeds.length > 0 && (
          <section id="urgence" className="scroll-mt-16 border-t-2 border-red-600">
            {/* Banner */}
            <div className="bg-red-600 text-white">
              <div className="mx-auto max-w-[1120px] px-5 py-8 sm:py-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-[7px] w-[7px] rounded-[1px] bg-white animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">
                    Urgence — Incendies Gironde
                  </span>
                </div>
                <h2 className="text-[28px] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[36px]">
                  Mobilisation incendies
                </h2>
                <p className="mt-2.5 max-w-[62ch] text-[14.5px] leading-relaxed text-white/80">
                  Face aux mégafeux qui ont brûlé 42 000 hectares et évacué 220 000 personnes, des
                  besoins urgents et ciblés émergent. Ne vous rendez pas sur place sans avoir été
                  contacté — passez par les canaux officiels.
                </p>
                <p className="mt-2 text-[13px] font-semibold text-white">
                  Numéro Vert Solidarité : 0 800 006 090 (appel gratuit)
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="mx-auto max-w-[1120px] px-5 py-12 sm:py-14">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {urgentNeeds.map((need, idx) => {
                  const isDon = /don|cagnotte|fondation/i.test(need.title);
                  const tagLabel = isDon ? "Don" : "Bénévole";
                  const tagBg = isDon ? "bg-amber-100" : "bg-red-100";
                  const tagText = isDon ? "text-amber-700" : "text-red-600";
                  const btnBg = isDon ? "bg-amber-600 hover:bg-amber-700" : "bg-red-600 hover:bg-red-700";
                  const btnLabel = isDon ? "Faire un don" : "Agir maintenant";

                  return (
                  <div
                    key={need.id}
                    className={`group relative bg-white p-6 transition-colors duration-200 hover:bg-red-50 sm:p-7 ${
                      idx === 0 ? "sm:col-span-2 border-l-4 border-red-600" : "border border-border rounded-sm"
                    }`}
                  >
                    {idx === 0 && (
                      <span className="absolute right-4 top-4 text-[10px] font-bold uppercase tracking-[0.14em] text-red-600 bg-red-100 px-2.5 py-1 rounded-sm">
                        Prioritaire
                      </span>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600 bg-red-100 px-2.5 py-1 rounded-sm">
                        Urgent
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${tagText} ${tagBg} px-2.5 py-1 rounded-sm`}>
                        {tagLabel}
                      </span>
                      {need.category && (
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
                          {need.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[18px] font-bold leading-[1.2] tracking-[-0.018em] text-foreground">
                      {need.title.replace(/^URGENT\s*[—–-]\s*/i, "")}
                    </h3>
                    {need.summary && (
                      <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                        {need.summary}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                      {need.location && <span>{need.location}</span>}
                      {need.expires_at && (
                        <span>
                          · Expire le {new Date(need.expires_at).toLocaleDateString("fr-FR")}
                        </span>
                      )}
                    </div>
                    <a
                      href={need.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 inline-flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 ${btnBg}`}
                    >
                      {btnLabel}
                    </a>
                  </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Besoins du jour ── */}
        <section id="besoins" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[1120px] px-5 py-12 sm:py-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-[62ch]">
                <div className="flex items-center gap-3">
                  <span className="h-[7px] w-[7px] rounded-[1px] bg-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    01 — Besoins
                  </span>
                </div>
                <h2 className="mt-3 text-[28px] font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-[36px]">
                  Besoins du jour
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                  Besoins locaux repérés aujourd&apos;hui, vérifiés et redirigés vers leur source
                  d&apos;origine.
                </p>
              </div>
              <p className="shrink-0 text-[12px] font-bold uppercase tracking-[0.13em] text-foreground">
                Repérés aujourd&apos;hui.{" "}
                <span className="text-muted-foreground">Vérifiés. Actionnables.</span>
              </p>
            </div>

            {/* Loading / Error / Empty / List */}
            {loading ? (
              <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
              </div>
            ) : error ? (
              <p className="mt-7 text-[14px] text-red-600">
                Erreur de chargement : {error}
              </p>
            ) : regularNeeds.length === 0 ? (
              <p className="mt-7 text-[14px] text-muted-foreground">
                Aucun besoin vérifié pour le moment. Revenez plus tard dans la journée.
              </p>
            ) : (
              <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {regularNeeds.map((need) => (
                  <NeedCard key={need.id} need={need} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Méthode ── */}
        <section id="methode" className="scroll-mt-16 border-t border-border bg-muted/60">
          <div className="mx-auto max-w-[1120px] px-5 py-12 sm:py-14">
            <div className="max-w-[62ch]">
              <div className="flex items-center gap-3">
                <span className="h-[7px] w-[7px] rounded-[1px] bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  02 — Méthode
                </span>
              </div>
              <h2 className="mt-3 text-[28px] font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-[36px]">
                Comment ça marche
              </h2>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                Trois étapes, aucune zone grise : chaque besoin affiché reste rattaché à sa source.
              </p>
            </div>
            <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "On repère",
                  desc: "Nous suivons chaque jour des sources locales fiables.",
                },
                {
                  num: "02",
                  title: "On vérifie",
                  desc: "Chaque besoin affiché indique sa date de vérification et sa source.",
                },
                {
                  num: "03",
                  title: "On redirige",
                  desc: "Tu accèdes directement à la structure ou au site d'origine.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="group relative bg-card p-6 transition-colors duration-200 hover:bg-primary-soft/25 sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-[26px] font-extrabold leading-none tabular-nums tracking-[-0.03em] text-primary">
                      {step.num}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-bold leading-[1.2] tracking-[-0.022em] text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[34ch] text-[14px] leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sources ── */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1120px] px-5 py-12 sm:py-14">
            <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              <div className="max-w-[62ch]">
                <div className="flex items-center gap-3">
                  <span className="h-[7px] w-[7px] rounded-[1px] bg-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    03 — Sources
                  </span>
                </div>
                <h2 className="mt-3 text-[28px] font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-[36px]">
                  Sources suivies
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                  AideIci ne publie pas de besoins inventés. Le site repère, résume et redirige vers
                  des besoins publiés par des sources externes.
                </p>
              </div>
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                {[
                  {
                    title: "Collectivités locales",
                    desc: "Mairies, métropoles, CCAS.",
                  },
                  {
                    title: "Associations de terrain",
                    desc: "Structures locales identifiées.",
                  },
                  {
                    title: "Plateformes publiques",
                    desc: "Annonces officielles ouvertes.",
                  },
                  {
                    title: "Réseaux locaux vérifiés",
                    desc: "Relais de quartier connus.",
                  },
                ].map((src) => (
                  <div
                    key={src.title}
                    className="bg-card p-5 transition-colors duration-200 hover:bg-primary-soft/30"
                  >
                    <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                      {src.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-muted-foreground">{src.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Alertes ── */}
        <section id="alertes" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-[1120px] px-5 py-14 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              <div>
                <div className="max-w-[62ch]">
                  <div className="flex items-center gap-3">
                    <span className="h-[7px] w-[7px] rounded-[1px] bg-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      04 — Alertes
                    </span>
                  </div>
                  <h2 className="mt-3 text-[28px] font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-[36px]">
                    Recevoir les besoins près de chez moi
                  </h2>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                    Un récapitulatif quotidien des besoins utiles près de chez toi et, si
                    nécessaire, des alertes ponctuelles.
                  </p>
                </div>
                <ul className="mt-6 space-y-2 text-[13.5px] text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-[1px] bg-primary" />
                    1 email par jour, pas plus.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-[1px] bg-primary" />
                    Sources vérifiées uniquement.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-[1px] bg-primary" />
                    Désinscription en un clic.
                  </li>
                </ul>
              </div>

              <AlertForm />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-foreground/85">
        <div className="mx-auto max-w-[1120px] px-5 py-12">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <a
                href="#top"
                className="inline-flex items-center font-bold tracking-[-0.02em] text-foreground text-[15px]"
              >
                Aide<span className="text-primary">Ici</span>
                <span className="ml-[5px] mt-[-8px] h-[5px] w-[5px] rounded-[1px] bg-primary" />
              </a>
              <p className="mt-3 max-w-[38ch] text-[13px] leading-relaxed text-muted-foreground">
                Radar local des besoins utiles. Zone pilote : Bordeaux Métropole.
              </p>
            </div>
            <nav className="flex flex-col gap-2 sm:items-end">
              <a
                href="#top"
                className="w-fit text-[13px] font-medium text-muted-foreground decoration-primary decoration-2 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
              >
                Mentions légales
              </a>
              <a
                href="#top"
                className="w-fit text-[13px] font-medium text-muted-foreground decoration-primary decoration-2 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
              >
                Politique de confidentialité
              </a>
              <a
                href="#top"
                className="w-fit text-[13px] font-medium text-muted-foreground decoration-primary decoration-2 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="mt-9 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <p className="max-w-[62ch] text-[12px] leading-[1.6] text-muted-foreground">
              AideIci repère et résume des besoins publiés par des sources externes. Le site oriente,
              il n&apos;organise pas directement les missions.
            </p>
            <p className="shrink-0 text-[12px] tabular-nums text-muted-foreground">
              © 2026 AideIci
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
