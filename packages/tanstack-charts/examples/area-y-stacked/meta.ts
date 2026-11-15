// tanstack-charts example: Stacked areas from repeated x
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacked areas from repeated x',
  summary:
    'With only y and a series, areaY stacks the layers at each x: repeated x positions pile up, so the top edge is the total. The checkbox adds a line along each layer top with lineY, since areas do not draw their own outline.',
  section: 'Line and Area Marks',
  tags: ['areaY', 'z', 'implicit stack', 'fillOpacity'],
  docs: ['repo/docs/reference/marks/line-and-area.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
