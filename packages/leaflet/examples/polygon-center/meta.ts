// leaflet example: Polygon center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon center",
  summary:
    "Polygon.getCenter returns the centroid of the shape, drawn in white; the centre of getBounds() is drawn in orange. They differ for an L or a triangle.",
  section: "Vector layers",
  tags: ["Polygon", "getCenter", "getBounds", "CircleMarker"],
  docs: [
    'repo/src/layer/vector/Polygon.js',
    'repo/src/geometry/PolyUtil.js',
    'repo/src/layer/vector/CircleMarker.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
