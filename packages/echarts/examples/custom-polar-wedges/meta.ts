// echarts example: Custom wedges on a polar system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom wedges on a polar system',
  summary:
    'A custom series with coordinateSystem polar. renderItem converts each value with api.coord, reads cx and cy from params.coordSys and returns a sector, so the chart is a rose of wedges. Change the wedge width, the corner radius and the angle axis direction.',
  section: 'Option: series.custom',
  tags: ['custom', 'coordinateSystem', 'polar', 'renderItem', 'params.coordSys', 'api.coord', 'sector'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/en/option/component/polar.md',
    'repo/en/option/component/angle-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
