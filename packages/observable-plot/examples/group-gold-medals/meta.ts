// observable-plot example: Group: sport by gold medals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: sport by gold medals',
  summary:
    'group on sport and gold count, shown as coloured cells, as dots sized by count, or as dots stroked by sex.',
  section: 'Transform: Group',
  tags: ['cell', 'dot', 'group', 'r', 'stroke'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
