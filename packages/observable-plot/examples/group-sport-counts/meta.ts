// observable-plot example: Group: athletes by sport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: athletes by sport',
  summary:
    'barY with groupX counts Olympic athletes per sport; the outputs argument y: count sets the bar heights.',
  section: 'Transform: Group',
  tags: ['barY', 'groupX', 'count', 'ruleY'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
