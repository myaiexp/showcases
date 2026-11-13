// echarts example: World map choropleth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'World map choropleth',
  summary:
    'GeoJSON countries registered with echarts.registerMap and drawn by a map series, each country coloured through a continuous visualMap, with roam and a highlight that tours the world.',
  section: 'Geo',
  tags: ['registerMap geoJSON', 'series-map', 'visualMap', 'roam'],
  docs: [
    'repo/en/api/echarts.md',
    'repo/en/option/series/map.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/api/action.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
