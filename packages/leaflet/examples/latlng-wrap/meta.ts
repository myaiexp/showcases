// leaflet example: LatLng wrap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LatLng wrap",
  summary:
    "LatLng.wrap on a longitude from -540 to 540: a ring marks the unwrapped point and a marker the wrapped one, with the new coordinates in the caption.",
  section: "Geometry & types",
  tags: ["LatLng", "wrap", "worldCopyJump"],
  docs: ['repo/src/geo/LatLng.js', 'repo/src/map/Map.js', 'repo/src/layer/vector/CircleMarker.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
