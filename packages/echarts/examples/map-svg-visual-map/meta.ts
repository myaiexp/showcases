// echarts example: Map series on an SVG city plan
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map series on an SVG city plan',
  summary:
    'A city plan drawn as a hand-written SVG, registered with registerMap and shown by a map series: the nine named district polygons take their colour from a visualMap and their value from series data. Switch the metric between rent, tree cover and noise, hover for the tooltip and click to select one district.',
  section: 'Option: series.map',
  tags: ['series-map', 'registerMap svg', 'visualMap', 'selectedMode', 'layoutSize', 'data name'],
  docs: [
    'repo/contents/en/how-to/component-types/geo/svg-base-map.md',
    'repo/en/option/series/map.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/api/action.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
