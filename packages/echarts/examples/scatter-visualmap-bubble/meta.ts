// echarts example: Bubble chart driven by visualMap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bubble chart driven by visualMap',
  summary:
    'A bubble chart where one visualMap maps population to symbolSize and a second maps literacy to colour. Change the size range, the palette and the data.',
  section: 'Option: series.scatter',
  tags: ['scatter', 'visualMap', 'dimension', 'inRange', 'symbolSize'],
  docs: [
    'repo/en/option/series/scatter.md',
    'repo/en/option/component/visual-map.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/option/partial/visual-mapping.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
