// leaflet example: LatLng distanceTo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LatLng distanceTo",
  summary:
    "LatLng.distanceTo along a route of five cities: each leg's great-circle distance in kilometres, and the total, from the Haversine formula.",
  section: "Geometry & types",
  tags: ["LatLng", "distanceTo", "Polyline", "Marker"],
  docs: ['repo/src/geo/LatLng.js', 'repo/src/layer/vector/Polyline.js', 'repo/src/layer/marker/Marker.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
