// echarts example: Horizontal boxplot layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Horizontal boxplot layout',
  summary:
    'The same boxplot with its category axis on x or on y, and the layout option forced to horizontal or vertical. See which combinations lay the boxes down and which keep them standing.',
  section: 'Option: series.boxplot',
  tags: ['boxplot', 'layout', 'boxWidth', 'xAxis', 'yAxis', 'category'],
  docs: ['repo/en/option/series/boxplot.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
