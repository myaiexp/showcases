// leaflet example: Closest layer point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Closest layer point",
  summary:
    "Moving the pointer calls closestLayerPoint on a polyline with its layer point. A tick joins the pointer to the nearest spot, and the caption gives the pixel distance.",
  section: "Vector layers",
  tags: ["Polyline", "closestLayerPoint", "latLngToLayerPoint", "layerPointToLatLng"],
  docs: [
    'repo/src/layer/vector/Polyline.js',
    'repo/src/geometry/LineUtil.js',
    'repo/src/map/Map.js',
    'repo/src/layer/vector/CircleMarker.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
