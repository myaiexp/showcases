// observable-plot example: Sort: draw highlighted lines last
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sort: draw highlighted lines last',
  summary:
    'A boolean sort function moves the Michigan unemployment lines to the end of the index, so they draw on top of the grey ones.',
  section: 'Transform: Sort',
  tags: ['line', 'sort', 'stroke', 'z'],
  docs: ['repo/docs/transforms/sort.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
