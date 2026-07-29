-- Mix urgent needs verified_at timestamps so categories are interspersed
-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/pgobbkvtubjaguxqztss/sql/new

UPDATE needs SET verified_at = '2026-07-29T19:00:00Z' WHERE title LIKE 'URGENT — Bénévole Protection Civile%';
UPDATE needs SET verified_at = '2026-07-29T18:59:00Z' WHERE title LIKE 'URGENT — Sauver et soigner les animaux%';
UPDATE needs SET verified_at = '2026-07-29T18:58:00Z' WHERE title LIKE 'URGENT — Bénévole Secours Populaire%';
UPDATE needs SET verified_at = '2026-07-29T18:57:00Z' WHERE title LIKE 'URGENT — Aider à la reforestation%';
UPDATE needs SET verified_at = '2026-07-29T18:56:00Z' WHERE title LIKE 'URGENT — Don à la Croix-Rouge%';
UPDATE needs SET verified_at = '2026-07-29T18:55:00Z' WHERE title LIKE 'URGENT — Héberger des animaux%';
UPDATE needs SET verified_at = '2026-07-29T18:54:00Z' WHERE title LIKE 'URGENT — Cagnotte Œuvre des Pupilles%';
UPDATE needs SET verified_at = '2026-07-29T18:53:00Z' WHERE title LIKE 'URGENT — Tous les contacts%';
UPDATE needs SET verified_at = '2026-07-29T18:52:00Z' WHERE title LIKE 'URGENT — Fondation de France%';

-- Verify:
-- SELECT category, title, verified_at FROM needs
-- WHERE status='verified' AND title LIKE 'URGENT%'
-- ORDER BY verified_at DESC;
