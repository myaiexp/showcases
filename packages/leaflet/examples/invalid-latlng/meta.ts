// leaflet example: Invalid coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Invalid coordinates",
  summary:
    "Five coordinate inputs checked with LatLng.validate and tried in a Polyline constructor, plus the Circle radius argument error. The drawn line uses only inputs that pass.",
  section: "Vector layers",
  tags: ["LatLng.validate", "Polyline", "Circle"],
  docs: ["repo/MIGRATION.md", "repo/src/layer/vector/Polyline.js", "repo/src/layer/vector/Circle.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
