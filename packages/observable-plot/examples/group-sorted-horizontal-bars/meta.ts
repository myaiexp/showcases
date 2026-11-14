// observable-plot example: Group: sorted horizontal bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: sorted horizontal bars',
  summary:
    'groupY with barX draws horizontal bars; sort: {y: "x"} orders the sports by their counts.',
  section: 'Transform: Group',
  tags: ['barX', 'groupY', 'sort'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
