// leaflet example: Circle marker move
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circle marker move",
  summary:
    "A CircleMarker jumps between cities with setLatLng. Each call fires a move event carrying oldLatLng and latlng.",
  section: "Vector layers",
  tags: ["CircleMarker", "setLatLng", "move"],
  docs: ["repo/src/layer/vector/CircleMarker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
