// observable-plot example: Frame: separating facets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Frame: separating facets',
  summary:
    'Penguin culmen measurements faceted by species. With a frame behind the dots, the panels separate clearly; without it, they run together.',
  section: 'Mark: Frame',
  tags: ['frame', 'fx', 'dot', 'grid'],
  docs: ['repo/docs/marks/frame.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
