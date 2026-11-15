// leaflet example: Polygon closing point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon closing point",
  summary:
    "The same five points, the last equal to the first, go to a Polygon and a Polyline. The Polygon removes the repeated last point and the Polyline keeps it.",
  section: "Vector layers",
  tags: ["Polygon", "Polyline", "getLatLngs"],
  docs: ["repo/src/layer/vector/Polygon.js", "repo/src/layer/vector/Polyline.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
