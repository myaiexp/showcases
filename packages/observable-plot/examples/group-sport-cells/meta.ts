// observable-plot example: Group: counts as a heat strip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: counts as a heat strip',
  summary:
    'With no y channel, cell with groupX and fill: count paints a one-dimensional heatmap of athletes per sport.',
  section: 'Transform: Group',
  tags: ['cell', 'groupX', 'fill', 'count'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
