// observable-plot example: Group: mode of sex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: mode of sex',
  summary:
    'The mode reducer shows the more common sex in each sport as a cell colour.',
  section: 'Transform: Group',
  tags: ['cell', 'groupX', 'mode', 'fill'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
