// echarts example: Line on polar coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line on polar coordinates',
  summary:
    'A line with coordinateSystem polar: twelve months around an angle axis and a value on the radius axis. Change startAngle, endAngle and clockwise, close the loop, fill it with areaStyle, smooth it, or stack a second ring.',
  section: 'Option: series.line',
  tags: ['coordinateSystem', 'polar', 'angleAxis', 'radiusAxis', 'startAngle', 'endAngle', 'clockwise', 'areaStyle', 'smooth', 'stack'],
  docs: [
    'repo/en/option/series/line.md',
    'repo/en/option/partial/coord-sys.md',
    'repo/en/option/component/polar.md',
    'repo/en/option/component/angle-axis.md',
    'repo/en/option/partial/circular-layout.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
