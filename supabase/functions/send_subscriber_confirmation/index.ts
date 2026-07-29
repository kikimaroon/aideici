// AideIci — send_subscriber_confirmation
// Triggered on new subscriber INSERT via DB webhook
// Sends confirmation email to subscriber

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  const body = await req.json();
  const record = body.record;

  if (!record || !record.email || !record.consent) {
    return new Response(JSON.stringify({ ok: false, reason: "invalid record" }), { status: 400 });
  }

  const { data: needs } = await supabase
    .from("needs")
    .select("title, location, expires_at")
    .eq("status", "verified")
    .eq("location", record.zone)
    .gte("expires_at", new Date().toISOString())
    .order("verified_at", { ascending: false })
    .limit(3);

  const needsList = needs?.length
    ? needs.map((n: { title: string; location: string }) => `- ${n.title} (${n.location})`).join("\n")
    : "Aucun besoin actif dans votre zone pour le moment. Nous vous préviendrons dès qu'un nouveau besoin est vérifié.";

  const html = `<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a18;background:#fafaf8">
  <h1 style="font-weight:800;font-size:28px;margin-bottom:8px">Aide<span style="color:#e85d3a">Ici</span></h1>
  <p style="font-size:16px;color:#6b6b68;margin-bottom:24px">Inscription confirmée — vous recevrez les alertes pour <strong>${record.zone}</strong>.</p>
  <h2 style="font-size:18px;font-weight:700;margin-bottom:12px">Besoins actifs dans votre zone</h2>
  <pre style="background:#fff;border:1px solid #e0e0dc;padding:16px;border-radius:4px;font-size:14px;line-height:1.6;white-space:pre-wrap">${needsList}</pre>
  <p style="margin-top:24px;font-size:13px;color:#6b6b68">1 email par jour maximum · Désinscription en un clic · <a href="https://aideici.fr" style="color:#e85d3a">aideici.fr</a></p>
  <p style="font-size:11px;color:#6b6b68;margin-top:16px;border-top:1px solid #e0e0dc;padding-top:16px">AideIci oriente — il ne coordonne pas. Chaque besoin est vérifié avant publication. Conformément au RGPD, vos données servent uniquement à l'envoi des alertes.</p>
</body></html>`;

  if (RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "AideIci <alertes@aideici.fr>",
        to: record.email,
        subject: `AideIci — Alerte confirmée pour ${record.zone}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return new Response(JSON.stringify({ ok: false, reason: "email send failed" }), { status: 500 });
    }
  } else {
    // No email provider configured — log and skip
    console.log(`[email] Would send to ${record.email}: confirmation for ${record.zone}`);
    console.log(`[email] Needs in zone: ${needs?.length ?? 0}`);
  }

  return new Response(JSON.stringify({ ok: true, sent: !!RESEND_API_KEY }), {
    headers: { "Content-Type": "application/json" },
  });
});
