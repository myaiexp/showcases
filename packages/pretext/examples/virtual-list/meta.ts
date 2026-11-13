// Pretext example: virtualise 10,000 variable-height messages from layout() heights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Virtualized list from exact heights',
  summary:
    'Ten thousand messages are prepared once. layout() gives every row\'s exact height at the current width, prefix sums give the offsets, and only the rows in view are in the DOM.',
  section: 'Measure height',
  tags: ['virtualization', 'layout', 'scroll', 'prefix sums'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
