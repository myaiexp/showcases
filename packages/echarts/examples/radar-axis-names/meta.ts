// echarts example: Radar axisName and indicator colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Radar axisName and indicator colours',
  summary:
    'Indicator names coloured one by one through indicator.color and reshaped by axisName.formatter. Move the names with axisNameGap, rotate the first axis with startAngle and flip the layout with clockwise.',
  section: 'Option: series.radar',
  tags: ['radar', 'axisName', 'formatter', 'axisNameGap', 'indicator.color', 'startAngle', 'clockwise'],
  docs: ['repo/en/option/component/radar.md', 'repo/en/option/series/radar.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
