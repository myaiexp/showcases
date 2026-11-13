// echarts example: Doughnut chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Doughnut chart',
  summary:
    'A pie with an [inner, outer] radius. Labels are hidden and shown large in the hole for the highlighted sector; the inner radius and rounded corners are adjustable.',
  section: 'Pie',
  tags: ['pie', 'radius', 'label.position: center', 'emphasis.label', 'avoidLabelOverlap', 'borderRadius', 'highlight'],
  docs: ['repo/contents/en/how-to/chart-types/pie/doughnut.md', 'repo/en/option/series/pie.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
