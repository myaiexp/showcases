// echarts example: Basic pie chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Basic pie chart',
  summary:
    'A pie of five name/value items. Change the radius, padAngle and startAngle, click a sector to select and pull it out, and see stillShowZeroSum draw nothing when every value is 0.',
  section: 'Pie',
  tags: ['pie', 'radius', 'startAngle', 'padAngle', 'selectedMode', 'selectedOffset', 'stillShowZeroSum', 'select'],
  docs: ['repo/contents/en/how-to/chart-types/pie/basic-pie.md', 'repo/en/option/series/pie.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
