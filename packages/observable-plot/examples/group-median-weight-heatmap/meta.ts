// observable-plot example: Group: median weight heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: median weight heatmap',
  summary:
    'group on both x and y with a median reducer colours a cell for each sport and sex.',
  section: 'Transform: Group',
  tags: ['cell', 'group', 'median', 'fill'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
