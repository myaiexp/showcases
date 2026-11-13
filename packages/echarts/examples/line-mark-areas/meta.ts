// echarts example: Mark area bands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mark area bands',
  summary:
    'Shaded regions behind an hourly temperature line: night hours as an xAxis range, a comfort band as a yAxis range, a rectangle between two data coords and a band from the average to the maximum. Toggle each, set the opacity and label position.',
  section: 'Option: series.line',
  tags: ['markArea', 'xAxis', 'yAxis', 'coord', 'type', 'itemStyle.opacity', 'label.position', 'silent'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/mark-area.md', 'repo/en/option/partial/marker.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
