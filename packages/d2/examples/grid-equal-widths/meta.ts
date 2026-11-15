// d2 example: Matching widths to remove padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Matching widths to remove padding',
  summary:
    'Elements in a grid column share a width and those in a row share a height, so a longer label makes its neighbours roomier. Giving the cells the same explicit `width` removes the slack.',
  section: 'Grid Diagrams',
  tags: ['grid-columns', 'width'],
  docs: ['repo/docs/tour/grid-diagrams.md', 'repo/static/d2/grid-padding-1.d2', 'repo/static/d2/grid-padding-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
