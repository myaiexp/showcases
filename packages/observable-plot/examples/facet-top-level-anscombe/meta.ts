// observable-plot example: Facets: top-level facet data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Facets: top-level facet data',
  summary:
    'The facet plot option with data and x: Anscombe\'s quartet as a scatterplot with a line in each of four horizontal facets.',
  section: 'Facets',
  tags: ['facet', 'line', 'dot', 'frame', 'aspectRatio'],
  docs: ['repo/docs/features/facets.md', 'repo/docs/data/anscombe.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
