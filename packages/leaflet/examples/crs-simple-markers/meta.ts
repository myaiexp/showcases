// leaflet example: SimpleCRS markers and y, x order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SimpleCRS markers and y, x order",
  summary:
    "Four stars placed with the tutorial's xy helper (x, y in, LatLng(y, x) out) and four orange rings made by passing the same numbers to LatLng in the wrong order. A toggle hides the rings.",
  section: "Coordinate systems",
  tags: ["SimpleCRS", "LatLng", "Marker", "CircleMarker", "bindPopup"],
  docs: [
    'repo/docs/examples/crs-simple/index.md',
    'repo/src/geo/LatLng.js',
    'repo/src/layer/vector/CircleMarker.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
