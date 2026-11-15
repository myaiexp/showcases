// leaflet example: Path to GeoJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path to GeoJSON",
  summary:
    "toGeoJSON on a Polyline, Polygon, Circle and CircleMarker, with a precision argument that rounds the coordinates. A Circle exports only its centre.",
  section: "Vector layers",
  tags: ["Polyline", "Polygon", "Circle", "CircleMarker", "toGeoJSON"],
  docs: ["repo/src/layer/vector/Polyline.js", "repo/src/layer/vector/Polygon.js", "repo/src/layer/vector/CircleMarker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
