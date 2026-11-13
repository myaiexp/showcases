// echarts example: Smoothing on a value axis pair
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Smoothing on a value axis pair',
  summary:
    'A line over two value axes with plateaus and steep jumps, drawn over its straight-segment outline. Switch smoothMonotone between none, x and y and drag smooth to see when the curve overshoots.',
  section: 'Option: series.line',
  tags: ['smooth', 'smoothMonotone', 'value axis'],
  docs: ['repo/en/option/series/line.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
