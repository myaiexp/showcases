// echarts example: Symbols per data item: callbacks, rotation and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Symbols per data item: callbacks, rotation and offset',
  summary:
    'One scatter series whose symbol, size and rotation differ per point. Wind arrows turn with a per-item symbolRotate, a symbol callback swaps the shape by value, individual data items override the series, and a pin symbol is offset so its tip sits on the data.',
  section: 'Scatter',
  tags: ['symbol', 'symbolSize', 'symbolRotate', 'symbolOffset', 'data[].symbol', 'callback'],
  docs: [
    'repo/contents/en/how-to/chart-types/scatter/basic-scatter.md',
    'repo/en/option/series/scatter.md',
    'repo/en/option/partial/symbol.md',
    'repo/en/option/partial/icon.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
