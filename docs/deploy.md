# Guide de déploiement AideIci

## Prérequis

- Compte Supabase (gratuit)
- Compte Vercel ou Netlify (gratuit)
- Node.js 20+

## Étape 1 — Créer le projet Supabase

1. Aller sur https://supabase.com → New Project
2. Noter :
   - `SUPABASE_URL` (Project URL)
   - `SUPABASE_ANON_KEY` (anon public key)
   - `SUPABASE_SERVICE_ROLE_KEY` (service_role secret)

## Étape 2 — Appliquer les migrations

```bash
cd Aideici/supabase

# Appliquer le schéma
npx supabase db push

# Ou manuellement dans l'interface SQL Editor :
# 1. Exécuter migrations/001_schema.sql
# 2. Exécuter migrations/002_cron_jobs.sql
```

## Étape 3 — Déployer les Edge Functions

```bash
npx supabase functions deploy fetch_morning_needs
npx supabase functions deploy fetch_afternoon_needs

# Variables d'environnement
npx supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Étape 4 — Remplacer les placeholders frontend

Dans `frontend/public/index.html` et `frontend/admin/index.html` :

Remplacer :
- `__SUPABASE_URL__` → votre URL Supabase
- `__SUPABASE_ANON_KEY__` → votre clé anon publique

```bash
# Exemple avec sed
SUPABASE_URL="https://xxxxx.supabase.co"
SUPABASE_ANON_KEY="eyJ..."

sed -i '' "s|__SUPABASE_URL__|$SUPABASE_URL|g" frontend/public/index.html
sed -i '' "s|__SUPABASE_ANON_KEY__|$SUPABASE_ANON_KEY|g" frontend/public/index.html
sed -i '' "s|__SUPABASE_URL__|$SUPABASE_URL|g" frontend/admin/index.html
sed -i '' "s|__SUPABASE_ANON_KEY__|$SUPABASE_ANON_KEY|g" frontend/admin/index.html
```

## Étape 5 — Déployer le frontend

### Vercel

```bash
npx vercel Aideici/frontend --prod
```

### Netlify

Déposer le dossier `frontend/` sur Netlify ou connecter le repo.

## Étape 6 — Ajouter des sources

Dans l'interface Supabase → SQL Editor :

```sql
insert into sources (name, type, zone, url) values
  ('Mairie Lyon 1er', 'commune', '69001', 'https://api.lyon1.fr/besoins.json'),
  ('Restos du Cœur Rhône', 'asso', '69001', 'https://api.restosducoeur.org/rhone/besoins');
```

Remplacer les URLs par de vraies APIs retournant du JSON au format :

```json
[
  {
    "title": "Collecte alimentaire samedi",
    "summary": "Besoin de 5 bénévoles pour la collecte",
    "category": "social",
    "location": "Lyon 1er",
    "source_url": "https://mairie1.lyon.fr/collecte",
    "expires_at": "2026-08-05T18:00:00Z"
  }
]
```

## Étape 7 — Changer le code admin

Dans `frontend/admin/index.html`, ligne avec `ADMIN_CODE` :

```js
const ADMIN_CODE = 'votre-code-secret'; // changer avant déploiement
```

## Étape 8 — Activer les crons

Les crons sont créés par la migration `002_cron_jobs.sql`.

Pour vérifier :

```sql
select * from cron.job;
```

## Vérification finale

1. Page publique : affiche "Aucun besoin vérifié" → normal tant qu'aucun besoin n'est validé
2. Page admin : `/admin` → saisir le code → voir les brouillons
3. Valider un besoin → il apparaît sur la page publique
4. Crons : vérifier les logs dans Supabase → Edge Functions

## Debug

```sql
-- Voir les besoins par statut
select status, count(*) from needs group by status;

-- Voir les crons actifs
select * from cron.job;

-- Voir les logs des Edge Functions
-- Dans Supabase Dashboard → Edge Functions → Logs
```
