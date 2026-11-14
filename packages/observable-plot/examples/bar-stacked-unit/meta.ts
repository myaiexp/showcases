// observable-plot example: Bar: stacked unit chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: stacked unit chart',
  summary:
    'One unit-width bar per penguin, stacked along x by species, filled and sorted by body mass; inset 0.5 separates the units.',
  section: 'Mark: Bar',
  tags: ['barX', 'stackX', 'inset', 'sort', 'fill', 'legend'],
  docs: ['repo/docs/marks/bar.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
