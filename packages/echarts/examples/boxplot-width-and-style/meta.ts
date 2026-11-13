// echarts example: Boxplot boxWidth and per-item style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Boxplot boxWidth and per-item style',
  summary:
    'Control how wide boxes get with the [min, max] pair in boxWidth (pixels or percentages), restyle them with itemStyle, and see one data item override the series style. Hover a box for the emphasis style.',
  section: 'Option: series.boxplot',
  tags: ['boxplot', 'boxWidth', 'itemStyle', 'emphasis', 'data.itemStyle'],
  docs: ['repo/en/option/series/boxplot.md', 'repo/en/option/partial/item-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
