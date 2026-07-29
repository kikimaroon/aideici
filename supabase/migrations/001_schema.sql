-- AideIci — Schema initial
-- Tables: sources, needs, subscribers
-- RLS: public read verified needs, anon insert subscribers

-- 1. sources
create table sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('commune', 'asso', 'plateforme', 'reseau_local')),
  zone text not null,
  url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

comment on table sources is 'Sources fiables de besoins locaux';
comment on column sources.type is 'commune | asso | plateforme | reseau_local';

-- 2. needs
create table needs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references sources(id) on delete cascade,
  title text not null,
  summary text,
  category text,
  location text,
  source_url text,
  detected_at timestamptz not null default now(),
  verified_at timestamptz,
  expires_at timestamptz not null default (now() + interval '24 hours'),
  status text not null default 'draft' check (status in ('draft', 'verified', 'expired', 'rejected')),
  created_at timestamptz not null default now()
);

comment on table needs is 'Besoins détectés et qualifiés';
comment on column needs.status is 'draft | verified | expired | rejected';

create index idx_needs_status on needs(status);
create index idx_needs_expires_at on needs(expires_at);
create index idx_needs_detected_at on needs(detected_at desc);

-- 3. subscribers
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  zone text not null,
  categories text not null default '',
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table subscribers is 'Abonnés aux alertes email';

-- 4. RLS policies

alter table sources enable row level security;
alter table needs enable row level security;
alter table subscribers enable row level security;

-- sources: public read only
create policy "sources_public_read" on sources
  for select using (true);

-- needs: public read verified only
create policy "needs_public_read_verified" on needs
  for select using (status = 'verified');

-- needs: anon insert draft (for edge functions)
create policy "needs_service_insert" on needs
  for insert with check (true);

-- needs: admin update (via service_role)
create policy "needs_service_update" on needs
  for update using (true) with check (true);

-- subscribers: anon insert
create policy "subscribers_anon_insert" on subscribers
  for insert with check (true);

-- subscribers: no public read (privacy)
create policy "subscribers_service_read" on subscribers
  for select using (true);

-- 5. Seed sources (Lyon 69001)
insert into sources (name, type, zone, url) values
  ('Mairie Lyon 1er', 'commune', '69001', 'https://example.com/api/lyon1-besoins'),
  ('Restos du Cœur Rhône', 'asso', '69001', 'https://example.com/api/restoscoeur-rhone'),
  ('JeVeuxAider.gouv.fr — Lyon', 'plateforme', '69001', 'https://example.com/api/jva-lyon');
