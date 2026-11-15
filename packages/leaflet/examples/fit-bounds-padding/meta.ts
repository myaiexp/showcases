// leaflet example: fitBounds with padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fitBounds with padding",
  summary:
    "fitBounds on the bounds of Italy with four option sets: none, padding [30, 30], paddingTopLeft that leaves room for a side panel laid over the left of the map, and maxZoom 4. The dashed rectangle is the bounds, so you can see where each option puts it.",
  section: "Map view",
  tags: ["fitBounds", "padding", "paddingTopLeft", "maxZoom", "FitBoundsOptions", "Rectangle"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/vector/Rectangle.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
