// echarts example: Speedometer axisLine colour stops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Speedometer axisLine colour stops',
  summary:
    'A speedometer whose dial is cut into coloured segments by axisLine.lineStyle.color; the pointer and the value take the colour of the segment they fall in. Switch the colour stops, change splitNumber and the tick count, or push the needle to the ends.',
  section: 'Option: series.gauge',
  tags: ['gauge', 'axisLine', 'lineStyle.color', 'splitNumber', 'axisTick', 'splitLine', 'detail.formatter', 'itemStyle.color'],
  docs: ['repo/en/option/series/gauge.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
