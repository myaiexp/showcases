// echarts example: Downsampling bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Downsampling bars',
  summary:
    '3000 bars with a few spikes, squeezed into a few hundred pixels. Compare sampling off, lttb, average, min, max, minmax and sum.',
  section: 'Option: series.bar',
  tags: ['bar', 'sampling'],
  docs: ['repo/en/option/series/bar.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
