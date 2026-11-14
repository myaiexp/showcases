// echarts example: Stacked bar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacked bar chart',
  summary:
    'Four bar series in two stack groups: series with the same stack name pile up in one column. Toggle stack off to see the same data as plain grouped bars.',
  section: 'Bar',
  tags: ['bar', 'stack', 'emphasis.focus', 'tooltip.axisPointer'],
  docs: [
    'repo/contents/en/how-to/chart-types/bar/stacked-bar.md',
    'repo/en/option/series/bar.md',
    'repo/en/option/component/tooltip.md',
    'repo/en/option/partial/tooltip-common.md',
    'repo/en/option/partial/axisPointer-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
