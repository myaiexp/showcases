// echarts example: SVG floor plan
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG floor plan',
  summary:
    'An office floor plan registered as an SVG base map: named rooms take regions styles, multiple selection, focus-blur and tooltips, and sensors sit on it in SVG coordinates.',
  section: 'Geo',
  tags: ['registerMap svg', 'geo', 'regions', 'selectedMode', 'geoselectchanged', 'effectScatter'],
  docs: [
    'repo/contents/en/how-to/component-types/geo/svg-base-map.md',
    'repo/en/api/echarts.md',
    'repo/en/api/action.md',
    'repo/en/option/component/geo.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
