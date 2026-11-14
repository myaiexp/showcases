// echarts example: Polar angle and radius axis options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polar angle and radius axis options',
  summary:
    'A scatter of readings on a polar coordinate system. Open the centre into a ring with polar.radius, change the angleAxis splitNumber, move its labels inside, toggle splitArea and minor ticks, and tilt the radius labels.',
  section: 'Option: Components',
  tags: ['polar', 'radius', 'angleAxis', 'radiusAxis', 'splitNumber', 'axisLabel.inside', 'axisLabel.rotate', 'splitArea', 'minorTick', 'minorSplitLine'],
  docs: [
    'repo/en/option/component/polar.md',
    'repo/en/option/component/angle-axis.md',
    'repo/en/option/component/radius-axis.md',
    'repo/en/option/component/axis-common.md',
    'repo/en/option/partial/circular-layout.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
