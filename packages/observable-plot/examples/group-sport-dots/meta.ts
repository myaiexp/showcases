// observable-plot example: Group: counts as dot size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: counts as dot size',
  summary:
    'groupX can output any channel; r: count draws one dot per sport with an area proportional to its athletes.',
  section: 'Transform: Group',
  tags: ['dot', 'groupX', 'r', 'count'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
