// leaflet example: Polygon with holes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon with holes",
  summary:
    "A Polygon given an outline and a second ring: the second ring is a hole the map shows through. setLatLngs adds and removes the hole.",
  section: "Vector layers",
  tags: ["Polygon", "setLatLngs"],
  docs: [
    'repo/src/layer/vector/Polygon.js',
    'repo/src/layer/vector/Polyline.js',
    'repo/src/map/Map.js',
    'repo/src/layer/DivOverlay.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
