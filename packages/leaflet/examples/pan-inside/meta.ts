// leaflet example: panInside keeps a point in view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "panInside keeps a point in view",
  summary:
    "A point circles a loop bigger than the map. Every 60 ms panInside(latlng, {padding}) pans the map the least needed to keep the point inside a view shrunk by the padding (the dashed frame). A slider changes the padding and a toggle turns the following off.",
  section: "Map view",
  tags: ["panInside", "PanInsideOptions", "padding", "CircleMarker", "setLatLng"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/vector/CircleMarker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
