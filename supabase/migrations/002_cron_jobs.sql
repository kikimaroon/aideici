-- AideIci — Cron jobs via pg_cron + pg_net
-- Requiert: pg_cron activé depuis Dashboard Supabase (Database > Extensions)
-- Docs: https://supabase.com/docs/guides/cron

-- Extensions nécessaires
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Cron matin — 8h tous les jours
-- Appelle la Edge Function fetch_morning_needs via son URL Supabase
select cron.schedule(
  'fetch-morning-needs',
  '0 8 * * *',
  $$
  select
    net.http_post(
      url := current_setting('app.settings.edge_function_base_url') || '/fetch_morning_needs',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 30000
    );
  $$
);

-- Cron après-midi — 14h tous les jours
select cron.schedule(
  'fetch-afternoon-needs',
  '0 14 * * *',
  $$
  select
    net.http_post(
      url := current_setting('app.settings.edge_function_base_url') || '/fetch_afternoon_needs',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 30000
    );
  $$
);

-- Job de nettoyage — expire les besoins dépassés à minuit
select cron.schedule(
  'expire-old-needs',
  '0 0 * * *',
  $$
  update needs
  set status = 'expired'
  where status = 'verified'
    and expires_at < now();
  $$
);
