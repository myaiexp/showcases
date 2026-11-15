// leaflet example: zoom-delta
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "zoomDelta",
  summary:
    "The zoomDelta option is the step of the zoom buttons and the + and - keys. The card presses the real zoom control buttons with zoomDelta 0.5; a selector changes zoomDelta (and zoomSnap to match).",
  section: "Zoom levels",
  tags: ["zoomDelta", "zoomSnap", "ZoomControl", "zoomIn", "zoomOut"],
  docs: ["repo/docs/examples/zoom-levels/index.md", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
