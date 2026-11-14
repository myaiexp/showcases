// deck-gl example: Counting accessor calls: data, updateTriggers, scale props
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Counting accessor calls: data, updateTriggers, scale props',
  summary:
    "An accessor counter makes the performance guide visible. A new data array, a changed updateTrigger and a radiusScale change all redraw the same circles, but call getRadius 20,000 times, 20,000 times and zero times.",
  section: 'Data and performance',
  tags: ['updateTriggers', 'radiusScale', 'data', 'accessors', 'performance'],
  docs: [
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
