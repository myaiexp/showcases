// observable-plot example: Facets: include parallel data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Facets: include parallel data',
  summary:
    'With top-level facets, mark data that is parallel but not identical needs facet: include; otherwise the whole array repeats in each facet.',
  section: 'Facets',
  tags: ['facet', 'include', 'dot'],
  docs: ['repo/docs/features/facets.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
