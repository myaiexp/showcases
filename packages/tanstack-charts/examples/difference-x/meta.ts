// tanstack-charts example: Horizontal difference with differenceX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Horizontal difference with differenceX',
  summary:
    'differenceX applies the same rule to x1 and x2 along a vertical y axis: a positive lobe is where x2 is larger than x1. Here a sensor reading is compared with its target as depth increases.',
  section: 'Difference Marks',
  tags: ['differenceX', 'x1', 'x2'],
  docs: ['repo/docs/reference/marks/difference.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
