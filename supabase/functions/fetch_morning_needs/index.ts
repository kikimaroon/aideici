// AideIci — fetch_morning_needs
// Cron: tous les jours à 8h
// Cible: sources type 'commune' ou 'plateforme'

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface Source {
  id: string;
  name: string;
  type: string;
  zone: string;
  url: string;
}

interface RawNeed {
  title: string;
  summary?: string;
  category?: string;
  location?: string;
  source_url?: string;
  expires_at?: string;
}

function parseNeed(raw: RawNeed, source: Source) {
  return {
    source_id: source.id,
    title: raw.title?.slice(0, 255) || "Besoin sans titre",
    summary: raw.summary?.slice(0, 500) || null,
    category: raw.category || "non classé",
    location: raw.location || source.zone,
    source_url: raw.source_url || source.url,
    expires_at: raw.expires_at
      ? new Date(raw.expires_at).toISOString()
      : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: "draft" as const,
  };
}

Deno.serve(async (_req) => {
  const { data: sources, error: srcErr } = await supabase
    .from("sources")
    .select("*")
    .eq("active", true)
    .in("type", ["commune", "plateforme"]);

  if (srcErr) {
    return new Response(JSON.stringify({ error: srcErr.message }), { status: 500 });
  }

  let inserted = 0;

  for (const source of (sources as Source[]) || []) {
    try {
      const res = await fetch(source.url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) {
        console.warn(`[fetch_morning] ${source.name}: HTTP ${res.status}`);
        continue;
      }

      const rawNeeds: RawNeed[] = await res.json();
      if (!Array.isArray(rawNeeds)) {
        console.warn(`[fetch_morning] ${source.name}: réponse non-tableau`);
        continue;
      }

      const rows = rawNeeds.map((r) => parseNeed(r, source));
      const { error: insertErr } = await supabase.from("needs").insert(rows);

      if (insertErr) {
        console.error(`[fetch_morning] ${source.name}: insert error — ${insertErr.message}`);
      } else {
        inserted += rows.length;
      }
    } catch (err) {
      console.error(`[fetch_morning] ${source.name}: ${err.message}`);
    }
  }

  return new Response(JSON.stringify({ ok: true, inserted, sources_scanned: sources?.length ?? 0 }), {
    headers: { "Content-Type": "application/json" },
  });
});
