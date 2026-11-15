// leaflet example: zoom-methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ways to set the zoom",
  summary:
    "The zoom methods listed in the Zoom Levels tutorial, one button each: setZoom, setView, flyTo, zoomIn, zoomOut(delta), setZoomAround and fitBounds. The card runs through them.",
  section: "Zoom levels",
  tags: ["setZoom", "setView", "flyTo", "zoomIn", "zoomOut", "setZoomAround", "fitBounds"],
  docs: [
    'repo/docs/examples/zoom-levels/index.md',
    'repo/src/map/Map.js',
    'repo/src/layer/vector/Rectangle.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
