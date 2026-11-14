// Chart.js example: Filled area under a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filled area under a line',
  summary:
    'Average monthly temperature with the area between the line and zero painted in. fill: \'origin\' fills to zero, which for a negative month means upward.',
  section: 'Chart types',
  tags: ['area', 'fill', 'origin'],
  docs: ['repo/docs/charts/area.md', 'repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
