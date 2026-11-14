// echarts example: Scatter on a polar coordinate system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter on a polar coordinate system',
  summary:
    'A sunflower of 150 points placed on polar, angleAxis and radiusAxis. The card spins it with startAngle; the full view also sets clockwise and a 270 or 180 degree sweep with endAngle.',
  section: 'Option: series.scatter',
  tags: ['scatter', 'polar', 'angleAxis', 'radiusAxis', 'startAngle', 'endAngle', 'clockwise'],
  docs: [
    'repo/en/option/series/scatter.md',
    'repo/en/option/component/polar.md',
    'repo/en/option/component/angle-axis.md',
    'repo/en/option/component/radius-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
