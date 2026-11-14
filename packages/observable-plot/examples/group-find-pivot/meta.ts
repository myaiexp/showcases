// observable-plot example: Group: find reducer pivots rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: find reducer pivots rows',
  summary:
    'Plot.find picks the female and the male value out of tall rows, so groupX pivots them into y1 and y2 for an arrow per sport.',
  section: 'Transform: Group',
  tags: ['link', 'groupX', 'find', 'pivot wider'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
