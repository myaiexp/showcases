// leaflet example: LatLng equals and its margin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LatLng equals and its margin",
  summary:
    "LatLng.equals with its default margin of 1e-9 degrees and with a maxMargin argument, for a point that drifts away from a fixed one. Sliders set the offset and the margin.",
  section: "Geometry & types",
  tags: ["LatLng", "equals", "maxMargin", "CircleMarker", "Circle"],
  docs: ['repo/src/geo/LatLng.js', 'repo/src/layer/vector/CircleMarker.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
