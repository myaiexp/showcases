// echarts example: Geo bounding coordinates and clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo bounding coordinates and clip',
  summary:
    'boundingCoords says which longitude and latitude box of the map is fitted into the rectangle given to the geo component; the dashed outline shows that rectangle. Switch between regions, turn clip on and off to see the rest of the world spill out, and build the rectangle from edges or from layoutCenter and layoutSize.',
  section: 'Option: Components',
  tags: ['geo', 'boundingCoords', 'clip', 'layoutCenter', 'layoutSize', 'left', 'right', 'top', 'bottom'],
  docs: [
    'repo/en/option/component/geo-common.md',
    'repo/en/option/component/geo.md',
    'repo/en/option/partial/view-coord-sys.md',
    'repo/contents/en/how-to/component-types/geo/svg-base-map.md',
    'repo/en/api/echarts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
