// tanstack-charts example: Exact crossings on a log scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Exact crossings on a log scale',
  summary:
    'Crossings are solved in rendered pixels and mapped back to data values, so lobes still meet exactly when the y scale is logarithmic. The select switches the same data between a linear and a d3 log scale; the lobes keep touching at the lines\' crossing.',
  section: 'Difference Marks',
  tags: ['differenceY', 'scaleLog', 'invert'],
  docs: ['repo/docs/reference/marks/difference.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
