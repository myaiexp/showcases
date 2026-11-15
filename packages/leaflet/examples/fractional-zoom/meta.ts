// leaflet example: fractional-zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fractional zoom",
  summary:
    "The zoomSnap option sets the steps zoom can take. With 0.25, setZoom(0.8) ends at 0.75. A selector changes zoomSnap and a slider asks for a zoom; the caption shows the zoom Leaflet actually settled on.",
  section: "Zoom levels",
  tags: ["zoomSnap", "setZoom", "getZoom", "zoomend"],
  docs: ["repo/docs/examples/zoom-levels/index.md", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
