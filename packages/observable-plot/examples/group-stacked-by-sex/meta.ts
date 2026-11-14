// observable-plot example: Group: stacked by sex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: stacked by sex',
  summary:
    'A fill channel partitions each group, and barY stacks the counts; toggling shows that an explicit stackY gives the same chart.',
  section: 'Transform: Group',
  tags: ['barY', 'groupX', 'stackY', 'fill'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/transforms/stack.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
