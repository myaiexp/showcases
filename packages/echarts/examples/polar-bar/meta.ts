// echarts example: Bar chart in polar coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar chart in polar coordinates',
  summary:
    'Bar series with coordinateSystem polar. Put the category axis on the radius (rings) or on the angle (sectors), stack the series and round the bar ends.',
  section: 'Bar',
  tags: ['bar', 'polar', 'angleAxis', 'radiusAxis', 'coordinateSystem', 'roundCap', 'stack'],
  docs: [
    'repo/contents/en/how-to/chart-types/bar/polar-bar.md',
    'repo/en/option/series/bar.md',
    'repo/en/option/component/polar.md',
    'repo/en/option/component/angle-axis.md',
    'repo/en/option/component/radius-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
