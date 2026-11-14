// observable-plot example: Facets: trellis arrows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Facets: trellis arrows',
  summary:
    'The barley trellis with arrows: groupY computes first and last yield per variety and site, and the stroke shows the year-over-year change.',
  section: 'Facets',
  tags: ['arrow', 'groupY', 'fy', 'facet', 'sort'],
  docs: ['repo/docs/features/facets.md', 'repo/docs/data/barley.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
