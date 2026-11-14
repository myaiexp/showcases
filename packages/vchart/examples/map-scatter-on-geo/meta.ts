// vchart example: Map: scatter series on a geo region
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map: scatter series on a geo region",
  summary:
    "A common chart with one geo region holding a map series and a scatter series: longitudeField and latitudeField on the region place twelve city bubbles, sized by value, on the world map. The values update every two seconds.",
  section: "Map",
  tags: ['common','region','coordinate','geo','longitudeField','latitudeField','scatter'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Map.md',
    'repo/docs/assets/option/en/common/region.md',
    'repo/docs/assets/option/en/series/map.md',
    'repo/docs/assets/option/en/chart/common.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
