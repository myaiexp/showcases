// observable-plot example: Fixing overplotting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fixing overplotting',
  summary:
    'What is Plot? takes the crowded athlete scatterplot two ways: a rect mark with the bin transform, where fillOpacity counts athletes per bin, and a density mark drawing contours per sex.',
  section: 'Introduction',
  tags: ['bin', 'rect', 'fillOpacity', 'density', 'overplotting'],
  docs: ['repo/docs/what-is-plot.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
