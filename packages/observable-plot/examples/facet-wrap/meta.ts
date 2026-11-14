// observable-plot example: Facets: wrapped facets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Facets: wrapped facets',
  summary:
    'Facet wrapping by hand: fx and fy computed from an index make a three-column grid of normalized area charts, labeled with text marks.',
  section: 'Facets',
  tags: ['areaY', 'normalizeY', 'text', 'fx', 'fy', 'frame'],
  docs: ['repo/docs/features/facets.md', 'repo/docs/data/bls-industry-unemployment.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
