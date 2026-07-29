-- AideIci — Trigger on subscriber INSERT → call Edge Function

-- Extension required
create extension if not exists pg_net with schema extensions;

-- Delete old trigger/fn if exists (for re-runs)
drop trigger if exists on_subscriber_insert on subscribers;
drop function if exists notify_new_subscriber;

-- Trigger function
create or replace function notify_new_subscriber()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform
    net.http_post(
      url := current_setting('app.settings.edge_function_base_url') || '/send_subscriber_confirmation',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object('record', row_to_json(NEW)::jsonb),
      timeout_milliseconds := 15000
    );
  return NEW;
end;
$$;

-- Attach trigger
create trigger on_subscriber_insert
  after insert on subscribers
  for each row
  execute function notify_new_subscriber();
