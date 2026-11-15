// tanstack-charts example: Stack order and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack order and offset',
  summary:
    'layout: stack({...}) configures how areas pile up. The select moves between the default diverging stack, normalize (each x sums to one), center, a descending order by total and a reversed order, on the same three series.',
  section: 'Line and Area Marks',
  tags: ['areaY', 'stack', 'offset', 'order', 'reverse'],
  docs: [
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
