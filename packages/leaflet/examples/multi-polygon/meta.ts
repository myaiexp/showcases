// leaflet example: Multi-polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Multi-polygon",
  summary:
    "One Polygon from a three-level array makes three separate shapes, the first with a hole. getLatLngs shows the nesting and toGeoJSON returns a MultiPolygon.",
  section: "Vector layers",
  tags: ["Polygon", "getLatLngs", "toGeoJSON"],
  docs: ["repo/src/layer/vector/Polygon.js", "repo/src/layer/vector/Polyline.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
