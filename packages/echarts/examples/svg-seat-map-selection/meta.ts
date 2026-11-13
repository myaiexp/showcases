// echarts example: SVG seat map with selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG seat map with selection',
  summary:
    'A cinema hall written as an SVG string, registered with registerMap: each named rect is a seat region with its tier colour, label and price tooltip. Click free seats to select them and watch the total; sold seats are silent regions. The geoselectchanged event reports the picks.',
  section: 'Geo',
  tags: ['registerMap svg', 'geo', 'regions', 'silent', 'selectedMode', 'geoselectchanged', 'geoToggleSelect', 'layoutSize'],
  docs: [
    'repo/contents/en/how-to/component-types/geo/svg-base-map.md',
    'repo/en/tutorial/geo-svg.md',
    'repo/en/option/component/geo.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/api/action.md',
    'repo/en/api/events.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
