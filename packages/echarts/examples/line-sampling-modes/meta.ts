// echarts example: Sampling a long series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sampling a long series',
  summary:
    'A noisy 50,000-point signal with rare spikes, drawn through each sampling strategy: lttb, average, min, max, minmax and sum, or none. See which keep the spikes and which flatten them.',
  section: 'Option: series.line',
  tags: ['sampling', 'lttb', 'average', 'min', 'max', 'minmax', 'sum'],
  docs: ['repo/en/option/series/line.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
