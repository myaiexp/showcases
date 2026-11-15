// leaflet example: setZoomAround a fixed point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setZoomAround a fixed point",
  summary:
    "Click the map to place an orange ring, then zoom with setZoomAround(latlng, zoom): the ring stays at the same place on screen. Plain setZoom zooms around the centre instead, and setZoomAround(new Point(0, 0), zoom) holds a screen pixel instead of a map point.",
  section: "Map view",
  tags: ["setZoomAround", "setZoom", "Point", "CircleMarker", "click"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/vector/CircleMarker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
