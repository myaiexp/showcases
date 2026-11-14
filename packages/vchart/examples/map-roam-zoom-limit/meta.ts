// vchart example: Map: roam and zoomLimit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map: roam and zoomLimit",
  summary:
    "region.roam lets the reader drag and wheel-zoom the map, and zoomLimit clamps the scale between min and max. Change the maximum or switch roam off; the card zooms by itself through the projection zoom.",
  section: "Map",
  tags: ['region','roam','zoomLimit','projection'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Map.md',
    'repo/docs/assets/option/en/common/region.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
