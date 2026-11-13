// echarts example: visualMap bound to series and dimension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'visualMap bound to series and dimension',
  summary:
    'Two visualMaps drive two scatter series: one colours by temperature, one sizes by humidity or temperature. Choose which series the colour map targets with seriesIndex and which data column the size map reads with dimension.',
  section: 'Option: Components',
  tags: ['visualMap', 'seriesIndex', 'dimension', 'inRange', 'controller', 'text'],
  docs: [
    'repo/en/option/component/visual-map.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/option/partial/visual-mapping.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
