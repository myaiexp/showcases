// echarts example: Map series: value calculation and legend symbols
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map series: value calculation and legend symbols',
  summary:
    'Three map series on the same registered map are merged into one: mapValueCalculation (sum, average, max, min) decides how their per-country values combine, and showLegendSymbol toggles the legend dot in each region. Pick both from the controls; the legend hides single surveys.',
  section: 'Option: series.map',
  tags: ['series-map', 'mapValueCalculation', 'showLegendSymbol', 'legend', 'visualMap'],
  docs: [
    'repo/en/option/series/map.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/api/echarts.md',
    'repo/en/option/component/visual-map-continuous.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
