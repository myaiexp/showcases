// echarts example: Scatter rows on single axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter rows on single axes',
  summary:
    'A punch card built from seven singleAxis rows, one scatter series per row, with symbol size showing activity per hour. Change the size scale, the symbol and the axis direction.',
  section: 'Option: series.scatter',
  tags: ['scatter', 'singleAxis', 'singleAxisIndex', 'symbolSize', 'title'],
  docs: [
    'repo/en/option/series/scatter.md',
    'repo/en/option/component/single-axis.md',
    'repo/en/option/partial/coord-sys.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
