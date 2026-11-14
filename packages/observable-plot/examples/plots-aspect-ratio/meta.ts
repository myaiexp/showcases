// observable-plot example: Plots: aspect ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plots: aspect ratio',
  summary:
    'Penguin culmen measurements with aspectRatio: 1, so a unit of x is as long as a unit of y, against the default free height.',
  section: 'Plots',
  tags: ['aspectRatio', 'Plot.dot', 'inset', 'grid'],
  docs: ['repo/docs/features/plots.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
