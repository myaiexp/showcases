// echarts example: Geo center, zoom and aspectScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo center, zoom and aspectScale',
  summary:
    'Sliders for the geo component view: center (the longitude and latitude placed in the middle of the viewport), zoom, and aspectScale, which stretches the map horizontally while preserveAspect keeps its proportions. The preview sweeps the map and breathes the zoom.',
  section: 'Option: Components',
  tags: ['geo', 'center', 'zoom', 'aspectScale', 'preserveAspect', 'clip'],
  docs: [
    'repo/en/option/component/geo-common.md',
    'repo/en/option/component/geo.md',
    'repo/en/option/partial/view-coord-sys.md',
    'repo/en/api/echarts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
