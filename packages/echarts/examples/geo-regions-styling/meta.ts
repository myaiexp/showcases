// echarts example: Geo regions: styling single countries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo regions: styling single countries',
  summary:
    'A geo component where geo.regions restyles five countries at a time: fill, dashed border, label, emphasis and select colours and a tooltip each. Pick a group of countries, switch selectedMode between single and multiple, and turn focus-blur on or off.',
  section: 'Geo',
  tags: ['geo', 'regions', 'itemStyle.areaColor', 'selectedMode', 'emphasis.focus', 'blur', 'center', 'zoom'],
  docs: [
    'repo/en/option/component/geo.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/partial/view-coord-sys.md',
    'repo/en/api/echarts.md',
    'repo/en/api/action.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
