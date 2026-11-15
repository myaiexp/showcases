// tanstack-charts example: Streamgraph: inside-out wiggle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Streamgraph: inside-out wiggle',
  summary:
    'order: \'inside-out\' with offset: \'wiggle\' builds a streamgraph from nonnegative layers: the biggest series sit in the middle and the stack is shifted so its lowest start is zero. A smooth curve makes the stream read as one shape.',
  section: 'Line and Area Marks',
  tags: ['areaY', 'stack', 'inside-out', 'wiggle', 'curve'],
  docs: ['repo/docs/reference/marks/line-and-area.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
