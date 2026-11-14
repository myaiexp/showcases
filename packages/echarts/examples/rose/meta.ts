// echarts example: Rose chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rose chart',
  summary:
    'A Nightingale rose from a pie series with roseType. Switch between area mode, equal angles with radius carrying the value, and radius mode, where the angle also shows the share.',
  section: 'Pie',
  tags: ['pie', 'roseType', 'radius', 'itemStyle.borderRadius'],
  docs: [
    'repo/contents/en/how-to/chart-types/pie/rose.md',
    'repo/en/option/series/pie.md',
    'repo/en/option/partial/sector-border-radius.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
