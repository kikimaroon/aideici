-- AideIci — Offers table (reverse flow: visitors propose skills)
-- Run: https://supabase.com/dashboard/project/pgobbkvtubjaguxqztss/sql/new

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  profession text not null,
  skills text,
  zone text not null,
  availability text,
  message text,
  created_at timestamptz not null default now()
);

comment on table offers is 'Offres d aide proposées par les visiteurs';

alter table offers enable row level security;

create policy "offers_anon_insert" on offers
  for insert with check (true);

create policy "offers_service_read" on offers
  for select using (true);
