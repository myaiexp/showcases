// observable-plot example: Facets: annotate one facet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Facets: annotate one facet',
  summary:
    'A text mark whose fy is a single-element array annotates only the Adelie facet of a grouped bar chart.',
  section: 'Facets',
  tags: ['barX', 'groupY', 'text', 'fy', 'frameAnchor', 'lineWidth'],
  docs: ['repo/docs/features/facets.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
