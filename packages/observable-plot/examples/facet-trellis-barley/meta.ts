// observable-plot example: Facets: trellis dot plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Facets: trellis dot plot',
  summary:
    'A Trellis display of barley yields: fy facets by site, y by variety, stroke by year, with sort ordering both by median yield.',
  section: 'Facets',
  tags: ['dot', 'fy', 'sort', 'frame', 'grid'],
  docs: ['repo/docs/features/facets.md', 'repo/docs/data/barley.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
