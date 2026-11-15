// leaflet example: Polyline center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polyline center",
  summary:
    "Polyline.getCenter returns the point half way along the line, drawn in white; the centre of getBounds() is drawn in orange. The two differ for a lopsided line.",
  section: "Vector layers",
  tags: ["Polyline", "getCenter", "getBounds", "CircleMarker"],
  docs: ["repo/src/layer/vector/Polyline.js", "repo/src/geometry/LineUtil.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
