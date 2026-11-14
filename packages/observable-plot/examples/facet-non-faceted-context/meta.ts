// observable-plot example: Facets: non-faceted context marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Facets: non-faceted context marks',
  summary:
    'A mark with no fx or fy repeats in every facet: the whole penguin population shows as small gray dots behind each facet\'s own dots.',
  section: 'Facets',
  tags: ['dot', 'fx', 'fy', 'frame'],
  docs: ['repo/docs/features/facets.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
