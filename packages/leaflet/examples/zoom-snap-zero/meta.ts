// leaflet example: zoom-snap-zero
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "zoomSnap: 0",
  summary:
    "With zoomSnap 0 Leaflet never rounds the zoom level, and zoomDelta 0.25 makes the zoom buttons step by a quarter level. A slider calls setZoom with any value; the caption shows the exact zoom after each change.",
  section: "Zoom levels",
  tags: ["zoomSnap", "zoomDelta", "setZoom", "getZoom"],
  docs: ["repo/docs/examples/zoom-levels/index.md", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
