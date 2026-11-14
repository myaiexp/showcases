// echarts example: Map names: nameMap and region labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map names: nameMap and region labels',
  summary:
    'The same map series keyed three ways: by the GeoJSON name, by a nameMap that renames regions to Finnish, and by nameProperty pointing at a code property. Labels follow the chosen names and the data items must use them too. Pick the naming from the select.',
  section: 'Option: series.map',
  tags: ['series-map', 'nameMap', 'nameProperty', 'label', 'data.label', 'registerMap'],
  docs: [
    'repo/en/option/series/map.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/api/echarts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
