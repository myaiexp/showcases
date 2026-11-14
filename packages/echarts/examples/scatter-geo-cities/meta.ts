// echarts example: Scatter city points on a geo map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter city points on a geo map',
  summary:
    'City points as [lon, lat, population] on a geo component drawn from world GeoJSON, sized by population. Zoom the map, scale the symbols and switch the labels.',
  section: 'Option: series.scatter',
  tags: ['scatter', 'geo', 'coordinateSystem', 'registerMap', 'symbolSize', 'label'],
  docs: [
    'repo/en/option/series/scatter.md',
    'repo/en/option/component/geo.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/partial/coord-sys.md',
    'repo/en/option/partial/label.md',
    'repo/en/api/echarts.md',
    'repo/en/option/partial/symbol.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
