// echarts example: Grouped boxplot series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grouped boxplot series',
  summary:
    'Three boxplot series share one category axis and sit side by side in each group. The quartiles are computed from generated samples; toggle a server in the legend or resample the data.',
  section: 'Option: series.boxplot',
  tags: ['boxplot', 'series', 'name', 'legend', 'boxWidth', 'emphasis.focus', 'data'],
  docs: ['repo/en/option/series/boxplot.md', 'repo/en/option/partial/emphasis-common.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
