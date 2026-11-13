// echarts example: Mark points on a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mark points on a line',
  summary:
    'Pins on a monthly series from three kinds of markPoint data: type min, max and average, an explicit coord on the category axis, and a fixed x/y position. Choose the symbol, its size and the label text, or redraw the data.',
  section: 'Option: series.line',
  tags: ['markPoint', 'type', 'coord', 'relativeTo', 'symbol', 'symbolSize', 'label.formatter'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/mark-point.md', 'repo/en/option/partial/marker.md', 'repo/en/option/partial/symbol.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
