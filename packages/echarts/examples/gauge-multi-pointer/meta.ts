// echarts example: Gauge with several pointers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gauge with several pointers',
  summary:
    'One gauge series with three data items, so three pointers, each with its own colour, title and detail box. Toggle progress.overlap, change the pointer width or draw new readings.',
  section: 'Option: series.gauge',
  tags: ['gauge', 'data', 'title', 'detail', 'offsetCenter', 'progress.overlap', 'pointer', 'anchor'],
  docs: ['repo/en/option/series/gauge.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
