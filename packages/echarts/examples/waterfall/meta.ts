// echarts example: Waterfall from stacked bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waterfall from stacked bars',
  summary:
    'ECharts has no waterfall series, so three stacked bar series fake one: an invisible helper floats a green increase series and a red decrease series. Draw new deltas to see the steps re-float.',
  section: 'Bar',
  tags: ['bar', 'stack', 'waterfall', 'silent', 'itemStyle', 'label'],
  docs: ['repo/contents/en/how-to/chart-types/bar/waterfall.md', 'repo/en/option/series/bar.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
