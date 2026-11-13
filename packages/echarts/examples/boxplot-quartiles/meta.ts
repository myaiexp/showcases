// echarts example: Boxplot from five-number data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Boxplot from five-number data",
  summary:
    "A boxplot given [min, Q1, median, Q3, max] rows directly, with outliers as a scatter series.",
  section: 'Option: Series',
  tags: ['boxplot', 'boxWidth', 'scatter', 'tooltip.formatter'],
  docs: ['repo/en/option/series/boxplot.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
