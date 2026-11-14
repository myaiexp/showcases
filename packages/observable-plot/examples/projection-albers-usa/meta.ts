// observable-plot example: Projection: albers-usa
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: albers-usa',
  summary:
    'The albers-usa projection draws the nation outline and state borders with Alaska and Hawaii inset.',
  section: 'Projections',
  tags: ['projection', 'albers-usa', 'geo'],
  docs: ['repo/docs/features/projections.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
