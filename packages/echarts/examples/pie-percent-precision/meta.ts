// echarts example: Percent precision in labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Percent precision in labels',
  summary:
    'Five values whose shares are long fractions. Change percentPrecision and watch the percentage in the labels and the tooltip gain or lose decimals, in a string template and in a formatter callback.',
  section: 'Option: series.pie',
  tags: ['pie', 'percentPrecision', 'label.formatter', 'params.percent'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/1d-data.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
