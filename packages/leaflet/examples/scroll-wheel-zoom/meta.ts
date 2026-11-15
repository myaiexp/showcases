// leaflet example: Scroll wheel zoom options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scroll wheel zoom options",
  summary:
    "Wheel zoom with scrollWheelZoom true (around the pointer) or 'center', plus sliders for wheelPxPerZoomLevel (how many scroll pixels make a zoom level) and wheelDebounceTime. The handler reads the options on every wheel turn; the card sends scripted wheel events.",
  section: "Map interaction",
  tags: ["scrollWheelZoom", "wheelPxPerZoomLevel", "wheelDebounceTime", "zoomend", "CircleMarker"],
  docs: ["repo/src/map/Map.js", "repo/src/map/handler/ScrollWheelZoomHandler.js", "repo/src/layer/vector/CircleMarker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
