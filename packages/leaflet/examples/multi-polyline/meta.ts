// leaflet example: Multi-polyline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Multi-polyline",
  summary:
    "One Polyline built from a nested array holds two separate lines. getLatLngs() returns the nested arrays, toGeoJSON() a MultiLineString, and setStyle restyles both lines at once.",
  section: "Vector layers",
  tags: ["Polyline", "getLatLngs", "toGeoJSON", "setStyle"],
  docs: ["repo/src/layer/vector/Polyline.js", "repo/src/layer/vector/Path.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
