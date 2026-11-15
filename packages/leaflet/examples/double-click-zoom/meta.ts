// leaflet example: Double-click zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Double-click zoom",
  summary:
    "A select sets doubleClickZoom to true (zoom around the pointer), 'center' (zoom around the map centre) or false (handler disabled). Shift + double click zooms out. The card double clicks off-centre under each setting.",
  section: "Map interaction",
  tags: ["doubleClickZoom", "dblclick", "setZoomAround", "zoomDelta", "CircleMarker"],
  docs: ["repo/src/map/Map.js", "repo/src/map/handler/DoubleClickZoomHandler.js", "repo/src/layer/vector/CircleMarker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
