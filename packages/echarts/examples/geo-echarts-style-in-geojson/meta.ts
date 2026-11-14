// echarts example: Region styles written in the GeoJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Region styles written in the GeoJSON',
  summary:
    'Since 5.6.0 a GeoJSON feature can carry its own style in properties.echartsStyle: a dotted or dashed border, a fill, a default selection, a label and a tooltip function. Switch between the styled and plain GeoJSON, and see a series data item override the fill written in the file.',
  section: 'Geo',
  tags: ['echartsStyle', 'registerMap geoJSON', 'series-map', 'data.itemStyle', 'selectedMode', 'borderType'],
  docs: [
    'repo/contents/en/basics/release-note/5-6-0.md',
    'repo/en/option/series/map.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/api/echarts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
