// Chart.js example: Floating bars from start and end values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Floating bars from start and end values',
  summary:
    'Each month\'s coldest and warmest average temperature drawn as a bar that floats between the two. Give a bar a [start, end] pair instead of one number to show a range.',
  section: 'Chart types',
  tags: ['bar', 'floating', 'range', 'data'],
  docs: ['repo/docs/charts/bar.md', 'repo/docs/general/data-structures.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
