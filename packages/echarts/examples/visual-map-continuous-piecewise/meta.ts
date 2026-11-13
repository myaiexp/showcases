// echarts example: Continuous and piecewise visualMap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous and piecewise visualMap',
  summary:
    'The third value of each scatter point is mapped to color and symbol size by a visualMap. Switch between the continuous gradient bar and piecewise pieces, and between the visual channels.',
  section: 'Concepts',
  tags: ['visualMap', 'continuous', 'piecewise', 'inRange', 'pieces', 'dimension', 'calculable'],
  docs: [
    'repo/contents/en/concepts/visual-map.md',
    'repo/en/option/component/visual-map.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/option/component/visual-map-piecewise.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
