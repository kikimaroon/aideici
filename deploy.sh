#!/bin/bash
# AideIci — Quick deploy script
# Usage: chmod +x deploy.sh && ./deploy.sh

set -e

echo "=== AideIci Deploy ==="

# Check env vars
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "Err: set SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY"
  exit 1
fi

# Replace placeholders
echo "→ Replacing placeholders..."
cp frontend/public/index.html frontend/public/index.html.bak
cp frontend/admin/index.html frontend/admin/index.html.bak

sed -i '' "s|__SUPABASE_URL__|$SUPABASE_URL|g" frontend/public/index.html
sed -i '' "s|__SUPABASE_ANON_KEY__|$SUPABASE_ANON_KEY|g" frontend/public/index.html
sed -i '' "s|__SUPABASE_URL__|$SUPABASE_URL|g" frontend/admin/index.html
sed -i '' "s|__SUPABASE_ANON_KEY__|$SUPABASE_ANON_KEY|g" frontend/admin/index.html

# Deploy Edge Functions
echo "→ Deploying Edge Functions..."
cd supabase
npx supabase functions deploy fetch_morning_needs
npx supabase functions deploy fetch_afternoon_needs
cd ..

echo "→ Done."
echo "Next: push DB migrations (npx supabase db push)"
echo "Next: deploy frontend/ to Vercel or Netlify"
