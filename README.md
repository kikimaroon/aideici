# AideIci

Chaque jour, les besoins utiles près de chez toi, vérifiés et actionnables.

## Architecture

```
Aideici/
├── supabase/
│   ├── migrations/
│   │   ├── 001_schema.sql          # Tables sources, needs, subscribers + RLS
│   │   └── 002_cron_jobs.sql       # pg_cron jobs (8h, 14h, minuit)
│   ├── functions/
│   │   ├── fetch_morning_needs/    # Edge Function — sources commune/plateforme
│   │   └── fetch_afternoon_needs/  # Edge Function — sources asso/reseau_local
│   └── config.toml
├── frontend/
│   ├── public/index.html           # Landing page publique
│   └── admin/index.html            # Back-office validation besoins
├── docs/
└── README.md
```

## Stack

| Couche | Technologie |
|--------|-------------|
| Backend | Supabase (Postgres + Edge Functions + pg_cron) |
| Frontend | HTML/CSS/JS vanilla + Supabase JS client |
| Hébergement | Supabase + Vercel / Netlify (frontend statique) |
| Cron | pg_cron → pg_net → Edge Functions |
| Admin | Page protégée par code simple |

## Schéma

### sources
| Colonne | Type | Notes |
|---------|------|-------|
| id | uuid | PK |
| name | text | Nom de la source |
| type | text | commune, asso, plateforme, reseau_local |
| zone | text | Code postal ou zone |
| url | text | URL à scrapper |
| active | boolean | default true |
| created_at | timestamptz | default now() |

### needs
| Colonne | Type | Notes |
|---------|------|-------|
| id | uuid | PK |
| source_id | uuid | FK → sources.id |
| title | text | Titre du besoin |
| summary | text | Résumé |
| category | text | Catégorie |
| location | text | Lieu |
| source_url | text | URL d'origine |
| detected_at | timestamptz | Détection automatique |
| verified_at | timestamptz | Validation manuelle |
| expires_at | timestamptz | Péremption |
| status | text | draft, verified, expired, rejected |

### subscribers
| Colonne | Type | Notes |
|---------|------|-------|
| id | uuid | PK |
| email | text | Email abonné |
| zone | text | Zone géographique |
| categories | text | Catégories |
| consent | boolean | Consentement RGPD |
| created_at | timestamptz | default now() |

## Edge Functions

| Nom | Cron | Sources ciblées |
|-----|------|-----------------|
| fetch_morning_needs | 8h | commune, plateforme |
| fetch_afternoon_needs | 14h | asso, reseau_local |

## Crons (pg_cron)

| Job | Horaire | Action |
|-----|---------|--------|
| fetch-morning-needs | `0 8 * * *` | Appel Edge Function matin |
| fetch-afternoon-needs | `0 14 * * *` | Appel Edge Function après-midi |
| expire-old-needs | `0 0 * * *` | Expire les besoins dépassés |

## Déploiement

### 1. Supabase

```bash
# Installer Supabase CLI
npx supabase login
npx supabase link --project-ref <PROJECT_REF>

# Appliquer les migrations
npx supabase db push

# Déployer les Edge Functions
npx supabase functions deploy fetch_morning_needs
npx supabase functions deploy fetch_afternoon_needs

# Configurer les variables d'environnement
npx supabase secrets set SUPABASE_URL=<url> SUPABASE_SERVICE_ROLE_KEY=<key>
```

### 2. Frontend

```bash
# Remplacer __SUPABASE_URL__ et __SUPABASE_ANON_KEY__ dans les fichiers HTML
# Déployer sur Vercel / Netlify ou servir en statique
```

### 3. Admin

- Page `/admin` protégée par code simple (`aideici-admin-2026`).
- Changer le code dans `frontend/admin/index.html` ligne `ADMIN_CODE` avant déploiement.
- Pour la production, remplacer par un vrai auth (Supabase Auth ou basique HTTP).

## Flux utilisateur

1. Visiteur arrive sur AideIci → voit les besoins vérifiés du jour
2. Clique sur un besoin → redirigé vers la source d'origine
3. S'inscrit aux alertes email (zone + catégories + consentement)
4. Reçoit des alertes quand de nouveaux besoins sont vérifiés dans sa zone

## Flux admin

1. L'admin accède à `/admin` → saisit le code d'accès
2. Voit la liste des brouillons (draft) détectés par les crons
3. Vérifie chaque besoin → "Valider" ou "Rejeter"
4. Les besoins vérifiés apparaissent sur la page publique

## Prochaines étapes (post-MVP)

- Remplacer les URLs factices des sources par de vrais endpoints
- Ajouter un parser HTML pour les sources sans API
- Notifications email automatiques aux abonnés quand un besoin est vérifié
- Dashboard de stats (visiteurs, clics, inscriptions)
- Support multi-zone
