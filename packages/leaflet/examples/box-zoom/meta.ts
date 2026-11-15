// leaflet example: Box zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Box zoom",
  summary:
    "Hold Shift and drag a rectangle: the map fits it with fitBounds. boxzoomstart and boxzoomend are logged, and boxzoomend carries boxZoomBounds, which are drawn as a dashed rectangle. A toggle calls map.boxZoom.enable() and disable().",
  section: "Map interaction",
  tags: ["boxZoom", "boxzoomstart", "boxzoomend", "boxZoomBounds", "fitBounds"],
  docs: ["repo/src/map/Map.js", "repo/src/map/handler/BoxZoomHandler.js", "repo/src/layer/vector/Rectangle.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
