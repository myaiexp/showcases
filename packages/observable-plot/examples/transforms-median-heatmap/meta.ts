// observable-plot example: Transforms: group heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms: group heatmap',
  summary:
    'Grouping on both x and y turns traffic into a heatmap: cells of the median vehicles per hour of day and location, sorted by fill.',
  section: 'Transforms',
  tags: ['cell', 'group', 'median', 'color'],
  docs: ['repo/docs/features/transforms.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
