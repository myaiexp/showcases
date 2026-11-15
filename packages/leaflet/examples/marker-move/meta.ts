// leaflet example: Moving a marker with setLatLng
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Moving a marker with setLatLng",
  summary: "setLatLng() moves a marker and fires move with oldLatLng and latlng. It does not animate, so a timer calls it in small steps to glide the marker to each clicked point, and a polyline traces the path.",
  section: "Markers & icons",
  tags: ["Marker", "setLatLng", "getLatLng", "move", "oldLatLng", "Polyline"],
  docs: ['repo/src/layer/marker/Marker.js', 'repo/src/layer/vector/Polyline.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
