// echarts example: Line and area click events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line and area click events',
  summary:
    'A filled line that reports which part you touch. Set triggerEvent to false, true, line or area and hover or click the stroke, the fill and the points; the event log shows the selfType the chart sends.',
  section: 'Option: series.line',
  tags: ['triggerEvent', 'triggerLineEvent', 'areaStyle', 'selfType', 'chart.on', 'silent'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/silent.md', 'repo/en/option/partial/area-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
